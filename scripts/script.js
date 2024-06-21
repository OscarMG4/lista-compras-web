let listaProductos = [];

//agregar un producto a la lista
function agregarProducto(nombre, precio) {
    let producto = {
        nombre: nombre,
        precio: precio,
        comprado: false
    };

    listaProductos.push(producto);

    actualizarLista();
}

function toggleComprado(index) {
    listaProductos[index].comprado = !listaProductos[index].comprado;
    actualizarLista();
}

function eliminarProducto(index) {
    listaProductos.splice(index, 1);
    actualizarLista();
}

function limpiarLista() {
    listaProductos = [];
    actualizarLista();
}

function actualizarLista() {
    let listaCompras = document.getElementById("listaCompras");

    listaCompras.innerHTML = "";

    //agregar elementos a listaCompras
    listaProductos.forEach((producto, index) => {
        let item = document.createElement("li");
        item.textContent = `${producto.nombre} - S/.${producto.precio.toFixed(2)}`;

        //estado como comprado
        let botonComprar = document.createElement("button");
        botonComprar.textContent = producto.comprado ? "Comprado" : "Marcar como comprado";
        botonComprar.onclick = function () {
            toggleComprado(index);
        };
        item.appendChild(botonComprar);

        //eliminar
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.onclick = function () {
            eliminarProducto(index);
        };
        item.appendChild(botonEliminar);

        listaCompras.appendChild(item);
    });

    marcarProducto();
}

function marcarProducto() {
    let productosArriba = document.querySelectorAll(".contenedor > div");

    productosArriba.forEach((productoArriba, index) => {
        //obtener el nombre
        let nombreProductoArriba = productoArriba.querySelector(".informacion > p:first-child").textContent.trim();

        //buscar el producto
        let productoLista = listaProductos.find(producto => producto.nombre === nombreProductoArriba);

        if (productoLista && productoLista.comprado) {
            productoArriba.style.opacity = "0.5";
        } else {
            productoArriba.style.opacity = "1";
        }
    });
}


actualizarLista();
