// backend/index.ts
import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { scrapeAmazon } from './scraper';

const app = express();
const PORT = 3000;

// Configure CORS to allow requests from the frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

// Create an endpoint for scraping Amazon products
app.get('/api/scrape', (req, res) => {
    (async () => {
      try {
        // Extract the keyword from the query parameters
        const { keyword } = req.query;
        
        // Validate the keyword parameter
        if (!keyword || typeof keyword !== 'string') {
          return res.status(400).json({ 
            error: 'Keyword not provided or invalid' 
          });
        }
        
        console.log(`Searching for products: ${keyword}`);
        
        // Call the scraping function to fetch Amazon products
        const products = await scrapeAmazon(keyword);
        
        // Return the results as JSON
        res.json({ success: true, data: products });
      } catch (error) {
        console.error('Error during scraping:', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        
        // Return error response
        res.status(500).json({ 
          error: 'Failed to get data from Amazon',
          message 
        });
      }
    })();
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Test the endpoint at http://localhost:${PORT}/api/scrape?keyword=headphones`);
});