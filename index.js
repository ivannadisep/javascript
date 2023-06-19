

let producto = parseInt(prompt('Que producto deseas comprar? 1.Amelie - 2.Lipa - 3.Ocean'))
let seguirComprando = true 
let totalCompra = 0

while(seguirComprando===true){
if (producto===1){
    totalCompra = totalCompra + 6000
}   else if (producto===2){
        totalCompra = totalCompra + 7500
}   else if (producto===3){
        totalCompra = totalCompra + 7500
}

decision = parseInt (prompt ('Quieres seguir comprando? 1.Si - 2.No'))
if(decision===1){
    producto = parseInt(prompt('Que producto deseas comprar? 1.Ocean - 2.Lipa - 3.Amelie'))
} else{
    seguirComprando = false
}
}

const totalCompraConDescuento = descuento (totalCompra)
alert(`El total de tu compra es ${totalCompraConDescuento}`)

//funcion descuento

function descuento(valor){
let descuento = 0
if(valor<=6500){
    descuento = 5
} else if(valor >700){
    descuento = 10
}

let valorDescuento = valor * (descuento/100)
let valorFinal = valor - valorDescuento
return valorFinal
console.log (valorFinal)
}