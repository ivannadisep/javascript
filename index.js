// // // //ARREGLO DE PRODUCTOS
const productosArray = []

// // //OBJETO Y CLASE
class NuevoProducto{
    constructor(nombre, precio, stock, id){
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.id = id;
}
}


const amelie= new NuevoProducto('Amelie', 6000, 20, 1);
productosArray.push(amelie);
const lipa= new NuevoProducto('Lipa', 7500, 5, 2);
productosArray.push(lipa);
const ocean= new NuevoProducto('Ocean', 7500, 8, 3);
productosArray.push(ocean);
const dua= new NuevoProducto('Dua', 13500, 5, 4);
productosArray.push(dua);
const lula= new NuevoProducto('Lula', 10000, 8, 5);
productosArray.push(lula);
const gabi= new NuevoProducto('Gabi', 15500, 8, 6);
productosArray.push(gabi);

// // console.log(productosArray)

//DOM

const selectProd = document.getElementById ('lista')

productosArray.forEach(elemento=>{
    const optionProd = document.createElement ('option')
    optionProd.innerText = `${elemento.nombre} : $${elemento.precio}`
    optionProd.setAttribute('id', `${elemento.id}`)
    selectProd.append(optionProd)
})


//EVENTOS Y LIBRERIA
const carrito = []

const button = document.getElementById('button')
const finalizar = document.getElementById('finalizar')

button.onclick = () => {
        const indexProd = selectProd.selectedIndex
        const prooductoSeleccionado = productosArray [indexProd]
        carrito.push(prooductoSeleccionado)
}


finalizar.onclick = () => {
        let total = 0
        carrito.forEach (prod =>{
      total = total + prod.precio
});
Swal.fire({
        title: `Elegiste ${carrito.length} productos. El total de tu compra es ${total}`,
        width: 600,
        padding: '3em',
        color: '#000000',
        background: '#FFEBCD ',

})
}


//STORAGE Y JSON
const formularioUsuario = document.getElementById('formulario')
const titulo = document.getElementById('titulo')
const nombreUsuario = document.getElementById('nombre')
const apellidoUsuario = document.getElementById('apellido')

const infoUsuario = {}

//evento 

formularioUsuario.onsubmit = (e) =>{
        e.preventDefault ()
        infoUsuario.nombre = nombreUsuario.value
        infoUsuario.apellido = apellidoUsuario.value
        localStorage.setItem('infoUsuario',JSON.stringify(infoUsuario))
}

const infoUsuarioStorage = JSON.parse(localStorage.getItem('infoUsuario'))
console.log(infoUsuarioStorage)
if(infoUsuarioStorage.nombre !==""){
        titulo.innerText = `Hola ${infoUsuarioStorage.nombre}, bienvenida de nuevo! `
}
