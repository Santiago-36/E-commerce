// acript del carrito
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

// script inicio de sesion
function validacion() {
    let nombre = document.getElementById('nombre').Value;
    let email = document.getElementById('correo').value;

    if (nombre=="" || email==""){
        alert('Todos los cambios son obligatorios');
        return false;
    }
    return true;
}
function mostrarImagen(event){
    let imagen = document.getElementById('verImagen');
    imagen.src=URL.createObjectURL(event.target.files[0])
}

// script registro
function guardar() {
    const id = document.getElementById("txtId").value;
    const nombre = document.getElementById("txtNombre").value;
    const talla = document.getElementById("txtTalla").value;
    const descripcion = document.getElementById("txtDescripcion").value;
    const precio = document.getElementById("txtPrecio").value;
    const cantidad = document.getElementById("txtCantidad").value;
    document.getElementById("txtId").value="";
    document.getElementById("txtNombre").value="";
    document.getElementById("txtTalla").value="";
    document.getElementById("txtDescripcion").value="";
    document.getElementById("txtPrecio").value="";
    document.getElementById("txtCantidad").value="";
    data = {}
    data.id = parseInt(id)
    data.nombre = nombre
    data.talla = talla
    data.descripcion = descripcion
    data.precio = parseFloat(precio)
    data.cantidad = parseFloat(cantidad)

    fetch("http://localhost:8000/products",
        {
            headers:{
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        }
    )
        .then(response => response.json())
        .then(data => {
            alert(data.msg)
        })

}