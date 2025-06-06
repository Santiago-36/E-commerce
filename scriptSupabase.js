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
//factura
function factura() {
  const nombre = document.getElementById("nombre").value;
  const fecha = new Date();


  const total = 1000;

  document.getElementById("nombre").value = "";

  data = {};

  data.fecha = fecha;
  data.total = total;
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
