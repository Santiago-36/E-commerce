let cart = [];
        let cartCount = 0;

        function addToCart(productName, price) {
            cart.push({ name: productName, price: price });
            cartCount++;
            document.getElementById('cartCount').textContent = cartCount;
            
            // Simple notification
            alert(`${productName} agregado al carrito!`);
        }

        function toggleCart() {
            if (cart.length === 0) {
                alert('El carrito está vacío');
                return;
            }
            
            let cartItems = cart.map(item => `${item.name} - $${item.price.toLocaleString()} COP`).join('\n');
            let total = cart.reduce((sum, item) => sum + item.price, 0);
            
            alert(`Carrito de compras:\n\n${cartItems}\n\nTotal: $${total.toLocaleString()} COP`);
        }

        function filterCategory(category) {
            const cards = document.querySelectorAll('.card');
            const buttons = document.querySelectorAll('.nav-categories button');
            
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            event.target.classList.add('active');
            
            // Show/hide cards based on category
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.card');
            
            cards.forEach(card => {
                const title = card.querySelector('h2').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });