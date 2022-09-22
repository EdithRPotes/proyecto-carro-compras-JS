//--Variables 

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector( '#lista-carrito tbody'); //'#lista-cursos'
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = []; 

//--- funcion para registrar todos los EvenListener
cargarEventListeners(); // llamando la funcion 
function cargarEventListeners (){
    //Cuando agrego un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click',agregarCurso); 

    // Elimina cursos del carrito 
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
      //console.log('vaciando carrito..');
      articulosCarrito= [];

      limpiarHTML();//se elimina todo el html
    })
}

//---   Funciones 

function agregarCurso (e){
    e.preventDefault();
// controlando Bubbling
  if(e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado = e.target.parentElement.parentElement; // importante
    leerDatosCurso(cursoSeleccionado);
    
  } 
 
 
}


//---- Lee el contenido del HTML al que le dimos click y extrae la informacion del curso 
function leerDatosCurso(curso) {
//  console.log(curso);

 //---Crear un objeto con el contenido del curso actual 
const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1

}

// Actualiza la cantidad 
// Revisa si un elemento ya existe en el carrito
const existe= articulosCarrito.some(curso=> curso.id=== infoCurso.id);
if(existe){

//Actualiza la cantidad
const cursos= articulosCarrito.map(curso=>{
  if(curso.id=== infoCurso.id){
      curso.cantidad++;
      return curso; //Retorna el objeto actualizado
  }else{
    return curso; // retorna los objetos que no son los duplicados
  }
})
}else{
//---- Agregar elementos al  arreglo del carrito 
articulosCarrito = [...articulosCarrito, infoCurso];
}

// console.log(infoCurso)


console.log(articulosCarrito);
carritoHTML();

}

function eliminarCurso(e) {
  e.preventDefault();
  if(e.target.classList.contains('borrar-curso') ) {
       // e.target.parentElement.parentElement.remove();
       const cursoId = e.target.getAttribute('data-id')
       
       // Eliminar del arreglo del carrito
       articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

       carritoHTML(); //itero sobre el carrito y muestro en el html
  }
}

//...Muestra el Carrito de compras en el HTML

function carritoHTML(){
    
    //----limpiar el HTML
    limpiarHTML();

    //----Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
       // DESCTRUCTURING
       const{imagen,titulo,precio,cantidad}=curso;
        const row = document.createElement ('tr');
        row.innerHTML = `
        <td>
          <img src="${imagen}"  width = "100">
         </td>
        <td> ${titulo}</td>
        <td> ${precio}</td>
        <td> ${cantidad}</td>
        <td> <a href="#" class="borrar-curso" data-id ="${curso.id}">X</a> </td>
        `;

        //---Agrega el HTML del carrito en el tbody
      contenedorCarrito.appendChild(row);
    });

  
}

//Elimina los cursos del tbody repetidos
function limpiarHTML(){
    // contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild){
       contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}