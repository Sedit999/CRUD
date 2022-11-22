let listaDeCompras = []
let listaComprado = []

let hayArticulo = localStorage.getItem('listaDeCompras')
if (!hayArticulo){
    localStorage.setItem('listaDeCompras', JSON.stringify([]))
} 

let hayComprado = localStorage.getItem('listaComprado')
if (!hayComprado){
    localStorage.setItem('listaComprado', JSON.stringify([]))
} 

let listaCompras = document.getElementById('listaCompras')
let listaDeArticulos = JSON.parse(localStorage.getItem('listaDeCompras'))
let items = listaDeArticulos.map((e) => {
    return `<br><li id="producto">
                <div id="contenido">${e.articulo}</div>
                <div id="btns_producto">
                    <button id="borrar" class="btn_lista iBoton" onclick="borrarArticulo('${e.id}')">Borrar</button>
                    <button id="editar_art" class="btn_lista iBoton" onclick="editarArticulo('${e.articulo}')">Editar</button>
                    <button id="btn_comprado" class="btn_lista iBoton" onclick="comprado('${e.id}')">Comprado</button>
                </div>
            </li>`
})
listaCompras.innerHTML = items.join('')
document.getElementById('listaCompras').appendChild(listaCompras)

//agregar a comprado
//aún no funciona, no entiendo la razón
let listaComprados = document.getElementById('comprado')
let addComprados = JSON.parse(localStorage.getItem('listaComprado'))
let itemsComprados = addComprados.map((e) => {
    return `<br><li id="producto">
                <div id="contenido">${e.articulo}</div>
                <div id="btns_producto">
                    <button id="borrar" class="btn_lista iBoton">Regresar</button>
                </div>
            </li>`
})
listaComprados.innerHTML = itemsComprados.join('')
document.getElementById('comprado').appendChild(listaComprados)

function agregarArticulo(){
    let articuloAgregado = JSON.parse(localStorage.getItem('listaDeCompras'))
    let articulo = document.getElementById('articulo').value
    let id = generarId();
    if(articulo === ''){
        alert('Ups! Olvidaste agregar un articulo')
    }
    else{
        articuloAgregado.push({
            id,
            articulo
        })
        localStorage.setItem('listaDeCompras', JSON.stringify(articuloAgregado))
        document.getElementById('articulo').value = ''
    }
    window.location.reload()
}
function borrarArticulo(id_el){
    let articuloElimindado = JSON.parse(localStorage.getItem('listaDeCompras')) 
    for (let i = 0; i<=articuloElimindado.length-1; i++){
        if(articuloElimindado[i].id == id_el){
            articuloElimindado.splice(i, 1)
        }
    }
    localStorage.setItem('listaDeCompras', JSON.stringify(articuloElimindado))
    document.getElementById('articulo').value = ''
    window.location.reload() 
}
function editarArticulo(articulo_lista){
    document.getElementById('articulo').value = articulo_lista
    let agregar = document.getElementById('agregar')
    let editar = document.getElementById('editar')
    let datos = document.getElementById('ingresarDatos')
    let articuloEditado = JSON.parse(localStorage.getItem('listaDeCompras'))
    let id;
    for (let i = 0; i<=articuloEditado.length-1; i++){
        if(articuloEditado[i].articulo == articulo_lista){
            id = articuloEditado[i].id
        }
    }
    agregar.style.setProperty("display", "none")
    editar.style.setProperty("visibility", "visible")
    editar.setAttribute('onclick',`editar('${id}')`)
    datos.style.setProperty("background-color", "#0022ffa1")
}
function comprado(id){
    let articuloComprado = JSON.parse(localStorage.getItem('listaDeCompras')) 
    let articulo_listaComprado = JSON.parse(localStorage.getItem('listaComprado')) 
    let artComprado;
    for (let i = 0; i<=articuloComprado.length-1; i++){
        if(articuloComprado[i].id == id){
            artComprado = articuloComprado[i]
            articuloComprado.splice(i, 1)
        }
    }
    localStorage.setItem('listaDeCompras', JSON.stringify(articuloComprado))
    articulo_listaComprado.push(artComprado)
    localStorage.setItem('listaComprado', JSON.stringify(articulo_listaComprado))
    document.getElementById('articulo').value = ''
    window.location.reload()
}
function editar(id){
    let articuloEditado = JSON.parse(localStorage.getItem('listaDeCompras')) 
    let articulo = document.getElementById('articulo').value
    for (let i = 0; i<=articuloEditado.length-1; i++){
        if(articuloEditado[i].id == id){
            articuloEditado.splice(i, 1, {id,articulo})
        }
    }
    localStorage.setItem('listaDeCompras', JSON.stringify(articuloEditado))
    document.getElementById('articulo').value = ''
    window.location.reload() 
}
function borrarActual() {
    localStorage.clear()
    window.location.reload()
}
function generarId() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let resultado = '';
  for (let i = 0; i < 5; i++) {
    resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return resultado;
}