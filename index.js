let listaDeCompras = []
let listaComprado = []

let hayArticulo = localStorage.getItem('listaDeCompras')
if (!hayArticulo){
    localStorage.setItem('listaDeCompras', JSON.stringify([]))
} 

let hayComprado = localStorage.getItem('comprado')
if (!hayComprado){
    localStorage.setItem('listaComprado', JSON.stringify([]))
} 

let listaCompras = document.getElementById('listaCompras')
let listaDeArticulos = JSON.parse(localStorage.getItem('listaDeCompras'))
let items = listaDeArticulos.map((e) => {
    return `<br><li>${e.articulo}<button id="editar" class="boton iBoton">Editar</button></li><hr>`
})
listaCompras.innerHTML = items.join('')
document.getElementById('listaCompras').appendChild(listaCompras)

function agregarArticulo(){
    let articulo = document.getElementById('articulo').value
    let articuloAgregado = JSON.parse(localStorage.getItem('listaDeCompras'))
    if(articulo === ''){
        alert('Ups! Olvidaste agregar un articulo')
    }
    else{
        articuloAgregado.push({articulo})
        localStorage.setItem('listaDeCompras', JSON.stringify(articuloAgregado))
        document.getElementById('articulo').value = ''
    }
    window.location.reload()
}
function borrarActual() {
    localStorage.clear()
    window.location.reload()
}