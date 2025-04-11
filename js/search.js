// Base de datos de productos (debes reemplazarla con tus 10 productos reales)
const products = [
    {
        id: 1,
        name: "Vestido Aurora",
        price: 120000,
        category: "dama",
        material: "eco",
        image: "img/vestido-dama-1.jpg",
        tags: ["algodón orgánico", "verano"]
    },
    {
        id: 2,
        name: "Traje Eco",
        price: 150000,
        category: "caballero",
        material: "eco",
        image: "img/vestido-caballero-1.jpg",
        tags: ["lino reciclado", "oficina"]
    },
    // Añade aquí los otros 8 productos de tu galería
    // Ejemplo adicional:
    {
        id: 3,
        name: "Vestido Brisa",
        price: 135000,
        category: "dama",
        material: "eco",
        image: "img/vestido-dama-2.jpg",
        tags: ["bambú", "playa"]
    }
];

// Elementos del DOM
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsGrid = document.getElementById('results-grid');
const resultsTitle = document.getElementById('results-title');
const categoryFilters = document.querySelectorAll('input[name="category"]');
const materialFilter = document.querySelector('input[name="material"]');

// Función para filtrar productos
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategories = Array.from(categoryFilters)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
    const onlyEco = materialFilter.checked;

    const filteredProducts = products.filter(product => {
        // Buscar en nombre y etiquetas
        const matchesSearch = searchTerm === '' || 
                             product.name.toLowerCase().includes(searchTerm) || 
                             product.tags.some(tag => tag.includes(searchTerm));
        
        // Filtrar por categoría
        const matchesCategory = selectedCategories.includes(product.category);
        
        // Filtrar por material ecológico
        const matchesMaterial = !onlyEco || product.material === "eco";
        
        return matchesSearch && matchesCategory && matchesMaterial;
    });

    displayResults(filteredProducts);
}

// Función para mostrar resultados
function displayResults(filteredProducts) {
    resultsGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
        resultsTitle.textContent = "No encontramos resultados";
        resultsGrid.innerHTML = '<p class="no-results">Prueba con otros términos de búsqueda o ajusta los filtros.</p>';
        return;
    }

    resultsTitle.textContent = `${filteredProducts.length} ${filteredProducts.length === 1 ? 'resultado' : 'resultados'}`;

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toLocaleString('es-CO')}</p>
            </div>
        `;
        // Opcional: Redirigir a la página del producto al hacer clic
        productCard.addEventListener('click', () => {
            window.location.href = `gallery.html#product-${product.id}`;
        });
        resultsGrid.appendChild(productCard);
    });
}

// Event Listeners
searchInput.addEventListener('input', filterProducts);
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    filterProducts();
});
categoryFilters.forEach(checkbox => checkbox.addEventListener('change', filterProducts));
materialFilter.addEventListener('change', filterProducts);

// Inicializar con todos los productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    displayResults(products);
});