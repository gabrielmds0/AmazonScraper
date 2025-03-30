# Amazon Product Scraper
A web application that scrapes Amazon product listings based on search keywords, providing clean and organized results.

## Features
- Search Amazon products by keyword
- Display product details including:
  - Product title
  - Rating (stars out of five)
  - Number of reviews
  - Product image
- Responsive design for desktop and mobile devices
- Error handling for failed requests

## Technologies Used
### Backend
- Bun (JavaScript/TypeScript runtime)
- Express.js (Web server framework)
- Axios (HTTP client)
- JSDOM (HTML parser)
- TypeScript (Type-safe JavaScript)

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Vite (Build tool)

## Setup Instructions
### Prerequisites
- [Bun](https://bun.sh) 1.0.0 or higher
- [Node.js](https://nodejs.org) 14.0.0 or higher
- A modern web browser

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/amazon-scraper.git
cd amazon-scraper
```

2. Set up the backend:
```bash
cd backend
bun install
```

3. Set up the frontend:
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
bun run index.ts
```
The server will start on http://localhost:3000

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm run dev
```
The frontend will be available at http://localhost:5173 (or another port if 5173 is in use)

3. Open your browser and navigate to the frontend URL (http://localhost:5173)

## Usage

1. Enter a product keyword in the search field (e.g., "headphones", "laptop")
2. Click the "Search Products" button
3. Wait for the results to load
4. Browse through the product cards displaying titles, images, ratings, and review counts

## Code Structure

```
amazon-scraper/
├── backend/               # Backend API with Bun
│   ├── node_modules/
│   ├── index.ts           # Main server file
│   ├── scraper.ts         # Amazon scraping logic
│   └── package.json
│
├── frontend/              # Frontend with Vite
│   ├── node_modules/
│   ├── index.html         # Main HTML file
│   ├── style.css          # Styles
│   ├── main.js            # JavaScript logic
│   └── package.json
│
└── README.md              # This file
```

## Important Notes

- This scraper is intended for educational purposes only
- Excessive scraping may lead to IP blocking by Amazon
- Amazon's HTML structure may change, potentially breaking the scraper

## Troubleshooting

If you encounter issues:

- Make sure both backend and frontend servers are running simultaneously
- Check that the correct ports (3000 for backend, 5173 for frontend) are available
- Verify your internet connection is working
- Try a different search keyword if no results appear
