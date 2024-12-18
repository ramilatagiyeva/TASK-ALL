const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search');
const searchResults = document.getElementById('search-results');
searchButton.addEventListener('click', function() {
    const searchQuery = searchInput.value.trim().toLowerCase();
    if (searchQuery === "") {
        searchResults.innerHTML = "<p>Please enter a search query.</p>";
        return;
    }
    fetch('https://655f2b37879575426b44b8f7.mockapi.io/productss')
        .then(response => response.json()) 
        .then(products => {
            searchResults.innerHTML = '';
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchQuery)
            );
            if (filteredProducts.length > 0) {
                filteredProducts.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.classList.add('product-item');
                    productElement.innerHTML = `
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p><strong>Price:</strong> $${product.price}</p>
                    `;
                    searchResults.appendChild(productElement);
                });
            } else {
                searchResults.innerHTML = "<p>No products</p>";
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            searchResults.innerHTML = "<p>There was an error fetching the products. Please try again later.</p>";
        });
});
