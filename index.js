var carritoVisible = false;


if (document.readyState == 'loading'){
    document.addEventListener ('DOMContentLoaded', ready)
} else {
    ready();
}


function ready (){
//funcion a boton eliminar
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i=0; i< botonesEliminarItem.length;i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }


    //agrego funcionalidad al boton sumar
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i=0; i< botonesSumarCantidad.length;i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }


    //agrego funcionalidad al restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i=0; i< botonesRestarCantidad.length;i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }


    //agrego funcioanlidad a los botones agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked)
    }


    //funcion al boton pagar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}


//elimino item
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();




    //actualizamos total del carrio eliminado el item
    actualizarTotalCarrito();


    //controla si hay elementos en el carrito una vez que se elimino
    //si no hay debo ocultar carrito
    ocultarCarrito ()


}




function actualizarTotalCarrito(){
    //seleccionar contenedro carrito
    var carritoContenedor = document.getElementsByClassName('carrito') [0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;


    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName ('carrito-item-precio') [0]
        console.log(precioElemento);




    //quitamos simbolo peso y punto
    var precio = parseFloat (precioElemento.innerText.replace ('$', '').replace ('.', ''));
    console.log(precio);
    var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
    var cantidad = cantidadItem.value;
    console.log(cantidad);
    total = total + (precio * cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ',00';
}




// function ocultarCarrito(){
//     var carritoItems = document.getElementsByClassName('carrito-items')[0];
//     if (carritoItems.childElementCount==0){
//         var carrito = document.getElementsByClassName('carrito')[0];
//         carrito.style.marginRight = '-100%';
//         carrito.style.opacity = '0';
//         carritoVisible = false;


//         //maximimo contenedor de elemntos
//         var items = document.getElementsByClassName('contenedor-items')[0];
//         items.style.width = '100%';
//     }


// }


//Aumento en uno la cantidad del elemento seleciconado


function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;


    //actualizamos el total
    actualizarTotalCarrito ()
}


function restarCantidad (event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;


    //controlamos que no sea menor que 1
    if(cantidadActual>=1){
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;


    //actualizamos el total
    actualizarTotalCarrito ()
    }
}




function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    console.log(titulo);
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName ('img-item')[0].src;
    console.log(imagenSrc);


    //agrega elemento al carrito
    agregarItemAlCarrito(titulo, precio, imagenSrc);
}


function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = 'item';
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];


    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0; i< nombresItemsCarrito.length; i++){
        if (nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }


    var itemCarritoContenido = `


    <div class="carrito-item">
                    <img src="${imagenSrc}" alt="" width="80px">
                    <div class="carrito-item-detalles">
                        <span class="carrito-item-titulo">${titulo}</span>
                        <div class="selector-cantidad">
                            <i class="fa-solid fa-minus restar-cantidad"></i>
                            <input type="text" value="1" class="carrito-item-cantidad" disabled>
                            <i class="fa-solid fa-plus sumar-cantidad"></i>
                        </div>
                        <span class="carrito-item-precio"> ${precio}</span>
                    </div>
                    <span class="btn-eliminar">
                        <i class="fa-solid fa-trash"></i>
                    </span>
                </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);


    //funcionalidad eliminar a nuevos items
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click',eliminarItemCarrito);


    //agregar funcionalidad sumar nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);    


    //agregar funcionalidad restar nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);    


}


function pagarClicked(event){
    alert('Gracias por tu compra!');
    //elimino elementos
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
}
var carritoVisible = false;


if (document.readyState == 'loading'){
    document.addEventListener ('DOMContentLoaded', ready)
} else {
    ready();
}


function ready (){
//funcion a boton eliminar
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i=0; i< botonesEliminarItem.length;i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }


    //agrego funcionalidad al boton sumar
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i=0; i< botonesSumarCantidad.length;i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }


    //agrego funcionalidad al restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i=0; i< botonesRestarCantidad.length;i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }


    //agrego funcioanlidad a los botones agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked)
    }


    //funcion al boton pagar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}


//elimino item
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();




    //actualizamos total del carrio eliminado el item
    actualizarTotalCarrito();


    //controla si hay elementos en el carrito una vez que se elimino
    //si no hay debo ocultar carrito
    ocultarCarrito ()


}




function actualizarTotalCarrito(){
    //seleccionar contenedro carrito
    var carritoContenedor = document.getElementsByClassName('carrito') [0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;


    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName ('carrito-item-precio') [0]
        console.log(precioElemento);




    //quitamos simbolo peso y punto
    var precio = parseFloat (precioElemento.innerText.replace ('$', '').replace ('.', ''));
    console.log(precio);
    var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
    var cantidad = cantidadItem.value;
    console.log(cantidad);
    total = total + (precio * cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ',00';
}




// function ocultarCarrito(){
//     var carritoItems = document.getElementsByClassName('carrito-items')[0];
//     if (carritoItems.childElementCount==0){
//         var carrito = document.getElementsByClassName('carrito')[0];
//         carrito.style.marginRight = '-100%';
//         carrito.style.opacity = '0';
//         carritoVisible = false;


//         //maximimo contenedor de elemntos
//         var items = document.getElementsByClassName('contenedor-items')[0];
//         items.style.width = '100%';
//     }


// }


//Aumento en uno la cantidad del elemento seleciconado


function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;


    //actualizamos el total
    actualizarTotalCarrito ()
}


function restarCantidad (event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;


    //controlamos que no sea menor que 1
    if(cantidadActual>=1){
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;


    //actualizamos el total
    actualizarTotalCarrito ()
    }
}




function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    console.log(titulo);
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName ('img-item')[0].src;
    console.log(imagenSrc);


    //agrega elemento al carrito
    agregarItemAlCarrito(titulo, precio, imagenSrc);
}


function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = 'item';
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];


    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0; i< nombresItemsCarrito.length; i++){
        if (nombresItemsCarrito[i].innerText==titulo){
                Swal.fire({
                        title: `El producto ya se encuentra en el carrito`,
                        width: 600,
                        padding: '3em',
                        color: '#000000',
                        background: '#FFEBCD ',
                
                
                        })
            return;
        }
    }


    var itemCarritoContenido = `


    <div class="carrito-item">
                    <img src="${imagenSrc}" alt="" width="80px">
                    <div class="carrito-item-detalles">
                        <span class="carrito-item-titulo">${titulo}</span>
                        <div class="selector-cantidad">
                            <i class="fa-solid fa-minus restar-cantidad"></i>
                            <input type="text" value="1" class="carrito-item-cantidad" disabled>
                            <i class="fa-solid fa-plus sumar-cantidad"></i>
                        </div>
                        <span class="carrito-item-precio"> ${precio}</span>
                    </div>
                    <span class="btn-eliminar">
                        <i class="fa-solid fa-trash"></i>
                    </span>
                </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);


    //funcionalidad eliminar a nuevos items
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click',eliminarItemCarrito);


    //agregar funcionalidad sumar nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);    


    //agregar funcionalidad restar nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);    


}


function pagarClicked(event){
        Swal.fire({
        title: `Gracias por tu compra`,
        width: 600,
        padding: '3em',
        color: '#000000',
        background: '#FFEBCD ',


        })

    //elimino elementos
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
}
