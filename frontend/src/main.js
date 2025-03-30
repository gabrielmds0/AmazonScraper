import './style.css'

// DOM Elements - Get references to all the UI elements we need to manipulate
const keywordInput = document.getElementById('keyword');
const searchButton = document.getElementById('searchBtn');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('errorMessage');
const resultsElement = document.getElementById('results');

// API URL - The endpoint to fetch Amazon product data
const API_URL = 'http://localhost:3000/api/scrape';

/**
 * Toggle the loading indicator visibility
 * @param {boolean} show - Whether to show or hide the loading indicator
 */
function toggleLoading(show) {
  loadingElement.classList.toggle('hidden', !show);
}

/**
 * Display an error message to the user
 * @param {string} message - The error message to display
 */
function showError(message) {
  errorElement.textContent = message;
  errorElement.classList.remove('hidden');
}

/**
 * Clear any displayed error messages
 */
function clearError() {
  errorElement.textContent = '';
  errorElement.classList.add('hidden');
}

/**
 * Render the product data on the page
 * @param {Array} products - Array of product objects to display
 */
function renderProducts(products) {
  // Clear any previous results
  resultsElement.innerHTML = '';

  // Handle the case of no products found
  if (products.length === 0) {
    resultsElement.innerHTML = '<p>No products found for this keyword.</p>';
    return;
  }

  // Create a card for each product
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    // Generate star rating display
    let starsHTML = '';
    if (product.rating !== 'No rating') {
      const rating = parseFloat(product.rating);
      starsHTML = '★'.repeat(Math.floor(rating)) +
        (rating % 1 >= 0.5 ? '½' : '') +
        '☆'.repeat(5 - Math.ceil(rating));
    } else {
      starsHTML = 'No rating';
    }

    // Create the product card HTML
    productCard.innerHTML = `
      <img 
        src="${product.imageUrl || 'placeholder-image.jpg'}" 
        alt="${product.title}" 
        class="product-image"
        onerror="this.src='data:image/svg+xml;charset=UTF-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22288%22 height%3D%22225%22 viewBox%3D%220 0 288 225%22%3E%3Crect fill%3D%22%23f5f5f5%22 width%3D%22288%22 height%3D%22225%22%2F%3E%3Ctext fill%3D%22%23aaa%22 font-family%3D%22sans-serif%22 font-size%3D%2220%22 text-anchor%3D%22middle%22 x%3D%22144%22 y%3D%22112%22%3EImage unavailable%3C%2Ftext%3E%3C%2Fsvg%3E';"
      >
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <div class="rating">
          <span class="stars">${starsHTML}</span>
          <span class="review-count">(${product.reviewCount} reviews)</span>
        </div>
      </div>
    `;

    // Add the product card to the results container
    resultsElement.appendChild(productCard);
  });
}

/**
 * Fetch products from the API based on the keyword
 * @param {string} keyword - The search term to look for products
 */
async function fetchProducts(keyword) {
  clearError();
  toggleLoading(true);

  try {
    // Make API request to the backend
    const response = await fetch(`${API_URL}?keyword=${encodeURIComponent(keyword)}`);
    const data = await response.json();

    // Handle unsuccessful responses
    if (!response.ok) {
      throw new Error(data.message || 'Error fetching products');
    }

    // Display the results
    toggleLoading(false);
    renderProducts(data.data);
  } catch (error) {
    toggleLoading(false);
    showError(`Failed to fetch products: ${error.message}`);
    resultsElement.innerHTML = '';
  }
}

// Add event listener for the search button
searchButton.addEventListener('click', () => {
  const keyword = keywordInput.value.trim();

  // Validate input
  if (!keyword) {
    showError('Please enter a keyword');
    return;
  }

  fetchProducts(keyword);
});

// Add event listener to allow search when Enter key is pressed
keywordInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    searchButton.click();
  }
});