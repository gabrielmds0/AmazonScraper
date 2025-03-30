// Import required libraries
import axios from "axios";
import { JSDOM } from 'jsdom';

// Define the product interface to structure the scraped data
interface Product {
    title: string;
    imageUrl: string | null;
    rating: string | number;
    reviewCount: number;
}

/**
 * Scrapes Amazon product listings for a given keyword
 * @param keyword - The search term to look for on Amazon
 * @returns A promise that resolves to an array of product objects
 */
export async function scrapeAmazon(keyword: string): Promise<Product[]> {
    try {
        // Set up headers to mimic a regular browser request
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br'
        };
        
        // Construct the Amazon search URL
        const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
        console.log(`Accessing URL: ${url}`);

        // Make request to fetch the HTML
        const response = await axios.get(url, { headers });
        
        // Create a virtual DOM to parse the HTML content
        const dom = new JSDOM(response.data);
        const document = dom.window.document;
        
        // Select all product elements from the search results page
        const productElements = document.querySelectorAll('[data-component-type="s-search-result"]');
        console.log(`Found ${productElements.length} products`);
        
        const products: Product[] = [];
        
        // Process each product element to extract required information
        productElements.forEach((productElement) => {
            try {
              // Extract product title
              const titleElement = productElement.querySelector('h2');
              const title = titleElement ? titleElement.textContent?.trim() || 'Title not available' : 'Title not available';
              
              // Extract product image URL
              const imageElement = productElement.querySelector('img.s-image');
              const imageUrl = imageElement ? imageElement.getAttribute('src') : null;
              
              // Extract product rating (stars out of five)
              const ratingElement = productElement.querySelector('.a-icon-star-small');
              let rating: string | number = 'No rating';
              if (ratingElement) {
                const ratingText = ratingElement.textContent?.trim() || '';
                const ratingMatch = ratingText.match(/[\d.]+/);
                rating = ratingMatch ? parseFloat(ratingMatch[0]) : 'No rating';
              }
              
              // Extract number of reviews
              const reviewCountElement = productElement.querySelector('span.a-size-base.s-underline-text');
              let reviewCount = 0;
              if (reviewCountElement) {
                const reviewText = reviewCountElement.textContent?.trim() || '0';
                reviewCount = parseInt(reviewText.replace(/[^0-9]/g, ''), 10) || 0;
              }
              
              // Add the product to our results array
              products.push({
                title,
                imageUrl,
                rating,
                reviewCount
              });
            } catch (error) {
              console.error('Error processing product:', error);
              // Continue to the next product if there's an error
            }
          });
          
          return products;
    } catch (error) {
      console.error('Error during scraping:', error);
      throw new Error(`Scraping failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }