import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-tarjetas");
  let carrito = obtenerCarrito() || [];
  actualizarContador(carrito);

  // -------------------------
  //   PRODUCTOS PRINCIPALES
  // -------------------------
  fetch("./data/productos.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error HTTP status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("DATA", data);
      data.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-producto");

        const img = document.createElement("img");
        img.src = `./${producto.img}`;
        img.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const descripcion = document.createElement("p");
        descripcion.classList.add("descripcion");
        descripcion.textContent = producto.descripcion;

        const precio = document.createElement("p");
        precio.textContent = `$${producto.precio}`;

        const boton = document.createElement("button");
        boton.classList.add("btn-carrito");
        boton.textContent = "Agregar al carrito";

        boton.addEventListener("click", () => {
          agregarAlCarrito(producto);
          carrito = obtenerCarrito() || [];
          actualizarContador(carrito);
        });

        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(descripcion);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(boton);

        contenedor.appendChild(tarjeta);
      });
    })
    .catch((err) => {
      console.log("Error al cargar productos:", err);
      mostrarMensaje(
        "❌ Error al cargar los productos. Intente más tarde.",
        "error"
      );
    });

  // -------------------------
  //          ASIDE
  // -------------------------
  fetch("./data/promos.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error HTTP status: ${res.status}`);
      }
      return res.json();
    })
    .then((promos) => {
      const contenedorPromos = document.getElementById("contenedor-promos");
      if (!contenedorPromos) return;

      promos.forEach((promo) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-aside");

        const titulo = document.createElement("h3");
        titulo.textContent = promo.nombre;

        const img = document.createElement("img");
        // por consistencia:
        img.src = `./${promo.img}`;
        img.alt = promo.nombre;

        const precio = document.createElement("p");
        precio.textContent = `$${promo.precio}`;

        const boton = document.createElement("button");
        boton.classList.add("btn-carrito");
        boton.textContent = "🛒 Agregar";

        boton.addEventListener("click", () => {
          agregarAlCarrito(promo);
          carrito = obtenerCarrito() || [];
          actualizarContador(carrito);
        });

        tarjeta.appendChild(titulo);
        tarjeta.appendChild(img);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(boton);

        contenedorPromos.appendChild(tarjeta);
      });
    })
    .catch((err) => {
      console.log("Error cargando promos:", err);
    });
});
