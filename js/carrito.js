import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
  const carrito = obtenerCarrito() || [];
  actualizarContador(carrito);

  const layout = document.querySelector(".carrito-layout");
  const contenedor = document.getElementById("contenedor-carrito");
  const resumenDiv = document.getElementById("resumen-carrito");

  // Siempre limpio lo que hubiera antes
  if (contenedor) contenedor.innerHTML = "";
  if (resumenDiv) resumenDiv.innerHTML = "";

  // 🟣 CARRITO VACÍO
  if (!carrito.length) {
    // usamos layout a pantalla completa con un solo mensaje
    layout.style.display = "block";
    layout.innerHTML = `
      <p class="mensaje-carrito-vacio">Tu carrito está vacío ☹️</p>
    `;
    return;
  }

  // 🟢 CARRITO CON PRODUCTOS → volvemos al layout de 2 columnas
  layout.style.display = "grid";

  let totalCompra = 0;

  const listaResumen = document.createElement("ul");
  listaResumen.classList.add("lista-resumen-carrito");

  carrito.forEach((producto, indice) => {
    // ---- Tarjeta visual ----
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta-producto");

    const img = document.createElement("img");
    img.src = `../${producto.img}`;
    img.alt = producto.nombre;

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const descripcion = document.createElement("p");
    descripcion.classList.add("descripcion");
    descripcion.textContent = producto.descripcion;

    const precio = document.createElement("p");
    precio.textContent = `$ ${Number(producto.precio).toLocaleString("es-AR")}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn-carrito", "btn-eliminar-carrito");
    btnEliminar.textContent = "Eliminar producto 🗑️";

    btnEliminar.addEventListener("click", () => {
      eliminarProducto(indice);
      renderizarCarrito();
    });

    tarjeta.appendChild(img);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(descripcion);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(btnEliminar);

    contenedor.appendChild(tarjeta);

    // ---- Resumen ----
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - $ ${Number(
      producto.precio
    ).toLocaleString("es-AR")}`;
    listaResumen.appendChild(li);

    totalCompra += Number(producto.precio);
  });

  // Agrego lista al resumen
  resumenDiv.appendChild(listaResumen);

  const totalP = document.createElement("p");
  totalP.classList.add("total-carrito");
  totalP.textContent = `Total: $ ${totalCompra.toLocaleString("es-AR")}`;
  resumenDiv.appendChild(totalP);

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn-carrito", "btn-vaciar-carrito");
  btnVaciar.textContent = "Vaciar carrito 🧺";

  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });

  resumenDiv.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});
