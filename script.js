// acript del carrito
let cart = [];
let cartCount = 0;
let total = 0;

function addToCart(productName, price) {
  cart.push({ name: productName, price: price });
  cartCount++;
  document.getElementById("cartCount").textContent = cartCount;

  // Simple notification
  Toastify({
    text: productName + " Añadido correctamente",
    duration: 3000,
    close: true,
    gravity: "top", // top or bottom
    position: "right", // left, center or right
    backgroundColor: "#4caf50",
  }).showToast();
}

// Nueva función toggleCart con modal
function toggleCart() {
  if (cart.length === 0) {
    Toastify({
      text: "Aún no hay nada en el carrito",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "red",
    }).showToast();
    return;
  }

  // Mostrar el modal
  const modal = document.getElementById("cartModal");
  const cartItemsList = document.getElementById("cartItemsList");
  const cartTotal = document.getElementById("cartTotal");

  // Limpiar contenido anterior
  cartItemsList.innerHTML = "";

  // Agregar cada producto al modal
  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toLocaleString()} COP</div>
                    </div>
                `;
    cartItemsList.appendChild(cartItem);
  });

  // Calcular y mostrar total
  let total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = `Total: $${total.toLocaleString()} COP`;

  // Mostrar el modal
  modal.style.display = "block";

  // Ocultar mensaje de éxito si estaba visible
  document.getElementById("successMessage").style.display = "none";
}

// Función para cerrar el carrito (botón Finalizar)
function closeCart() {
  const modal = document.getElementById("cartModal");
  modal.style.display = "none";
}

// Función para comprar (botón Comprar)
function buyCart() {
  document.getElementById("comprar").addEventListener("click", function (event) {
    event.preventDefault(); // Evita la recarga de la página
    console.log("Botón presionado sin recargar la página");
  });

  // Capturar el valor del nombre correctamente
  let nombre = document.getElementById("nombre").value.trim();
  const successMessage = document.getElementById("successMessage");

  if (nombre === "") {
    successMessage.style.display = "none";
  } else {
    successMessage.style.display = "block";
    // Limpiar el carrito después de 2 segundos
  setTimeout(() => {
    cart = [];
    cartCount = 0;
    document.getElementById("cartCount").textContent = cartCount;

    // Actualizar la vista del carrito
    toggleCart();

    // Mostrar notificación de éxito
    Toastify({
      text: "¡Compra realizada con éxito!",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "#4caf50",
    }).showToast();
  }, 2000);
  }

  // Verificar si el carrito está vacío antes de proceder
  if (cart.length === 0) {
    Toastify({
      text: "Tu carrito está vacío",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "red",
    }).showToast();
    return;
  }

  
}


// Cerrar modal al hacer clic fuera de él
window.onclick = function (event) {
  const modal = document.getElementById("cartModal");
  if (event.target === modal) {
    closeCart();
  }
};

function exportExcel() {
  // Estructura de datos para la hoja de cálculo
  const ws_data = [["Producto", "Precio", "subtotal"]];
  let total = cart.reduce((sum, item) => sum + item.price, 0);
  // Llenar los datos del carrito
  cart.forEach((item) => {
    const subtotal = item.price;
    ws_data.push([item.name, item.price, subtotal]);
  });

  ws_data.push(["", "Total", total]);
  ws_data.push(["", "", ""]);
  ws_data.push(["Nombre", "Nombre del cliemte", ""]);
  ws_data.push(["Factura No", "numero", ""]);

  // Crear hoja y libro de Excel
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Carrito");

  // Generar y descargar el archivo Excel
  XLSX.writeFile(wb, "carrito.xlsx");
}
function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Encabezado
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Factura", 20, 20);

  // Datos del carrito
  let y = 40;
  doc.setFontSize(12);
  doc.text("Productos", 20, y);
  doc.text("Precio", 90, y);
  doc.text("Subtotal", 140, y);

  y += 10;
  let total = 0;

  cart.forEach((item) => {
    doc.text(item.name, 20, y);
    doc.text(`$${item.price.toFixed(2)}`, 90, y);
    doc.text(`$${item.price.toFixed(2)}`, 140, y);
    total += item.price;
    y += 10;
  });

  // Línea separadora
  doc.line(20, y, 180, y);
  y += 10;

  // Total
  doc.setFont("helvetica", "bold");
  doc.text("Total:", 90, y);
  doc.text(`$${total.toFixed(2)}`, 140, y);

  y += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Nombre", 20, y);
  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Nombre del cliente", 20, y);
  // Descargar el archivo
  doc.save("carrito.pdf");
}


function filterCategory(category) {
  const cards = document.querySelectorAll(".card");
  const buttons = document.querySelectorAll(".nav-categories button");

  // Remove active class from all buttons
  buttons.forEach((btn) => btn.classList.remove("active"));

  // Add active class to clicked button
  event.target.classList.add("active");

  // Show/hide cards based on category
  cards.forEach((card) => {
    if (category === "all" || card.dataset.category === category) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

// Search functionality
document.getElementById("searchInput").addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const title = card.querySelector("h2").textContent.toLowerCase();
    const description = card.querySelector("p").textContent.toLowerCase();

    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});

// script inicio de sesion
function validacion() {
  let nombre = document.getElementById("nombre").Value;
  let email = document.getElementById("correo").value;

  if (nombre == "" || email == "") {
    alert("Todos los cambios son obligatorios");
    return false;
  }
  return true;
}
function mostrarImagen(event) {
  let imagen = document.getElementById("verImagen");
  imagen.src = URL.createObjectURL(event.target.files[0]);
}
// script registro
function guardar() {
  const nombre = document.getElementById("txtNombre").value;
  const talla = document.getElementById("txtTalla").value;
  const descripcion = document.getElementById("txtDescripcion").value;
  const precio = document.getElementById("txtPrecio").value;
  const cantidad = document.getElementById("txtCantidad").value;

  document.getElementById("txtNombre").value = "";
  document.getElementById("txtTalla").value = "";
  document.getElementById("txtDescripcion").value = "";
  document.getElementById("txtPrecio").value = "";
  document.getElementById("txtCantidad").value = "";
  data = {};

  data.nombre = nombre;
  data.talla = talla;
  data.descripcion = descripcion;
  data.precio = parseFloat(precio);
  data.cantidad = parseFloat(cantidad);

  fetch("http://localhost:8000/products", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "ok") {
        alert(data.msg);
      } else {
        alert(data.msg.details);
      }
    });
}
//
function factura() {
  const fecha = new Date().toLocaleDateString();
  document.getElementById("fecha").textContent = fecha;
  let total = cart.reduce((sum, item) => sum + item.price, 0);
  const nombre = document.getElementById("nombre").value;

  document.getElementById("nombre").value = "";
  data = {};

  data.fecha = fecha;
  data.total = parseFloat(total);
  data.nombre = nombre;

  fetch("http://localhost:8000/factura", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "ok") {
        alert(data.msg);
      } else {
        alert(data.msg.details);
      }
    });
}
