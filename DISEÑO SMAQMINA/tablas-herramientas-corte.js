let herramientas = JSON.parse(localStorage.getItem("herramientas")) || []; // Obtiene las herramientas guardadas en localStorage o crea un arreglo vacío si no existen datos
let tabla = document.getElementById("tabladatos"); // Obtiene la tabla del HTML donde se van a mostrar los datos
const usuarioActivo = localStorage.getItem("usuarioActivo");
let accion=document.getElementById("accion")
function guardar(){ // Función para guardar el arreglo actualizado en localStorage
    localStorage.setItem("herramientas", JSON.stringify(herramientas)); // Convierte el arreglo a texto JSON y lo guarda
}

function cargarTabla(){ // Función que carga nuevamente la tabla con los datos actuales

    tabla.innerHTML = ""; // Limpia la tabla antes de volver a llenarla

    for(let i = 0; i < herramientas.length; i++){ // Recorre el arreglo herramientas

        let fila = tabla.insertRow(); // Inserta una nueva fila en la tabla

        fila.insertCell(0).innerText = i + 1; // Inserta la celda del número consecutivo

        let nombreCell = fila.insertCell(1); // Inserta la celda para el nombre
        nombreCell.innerText = herramientas[i].nombre; // Muestra el nombre de la herramienta

        let cantidadCell = fila.insertCell(2); // Inserta la celda para la cantidad
        cantidadCell.innerText = herramientas[i].bueno; // Muestra por defecto la cantidad en buen estado

        let celdaEstado = fila.insertCell(3); // Inserta la celda donde irá el select

        let select = document.createElement("select"); // Crea el elemento select
        let estados = ["Bueno", "Regular", "Malo"]; // Crea un arreglo con los estados posibles

        estados.forEach(function(estado){ // Recorre el arreglo estados
            let option = document.createElement("option"); // Crea una opción
            option.text = estado; // Asigna el texto a la opción
            select.add(option); // Agrega la opción al select
        });

        select.addEventListener("change", function(){ // Evento cuando el usuario cambie el estado

            if(select.value === "Bueno"){ // Si selecciona Bueno
                cantidadCell.innerText = herramientas[i].bueno; // Muestra la cantidad buena
            }
            if(select.value === "Regular"){ // Si selecciona Regular
                cantidadCell.innerText = herramientas[i].regular; // Muestra la cantidad regular
            }
            if(select.value === "Malo"){ // Si selecciona Malo
                cantidadCell.innerText = herramientas[i].malo; // Muestra la cantidad mala
            }
        });

        celdaEstado.appendChild(select); // Agrega el select a la celda
        if (usuarioActivo){
        let celdaAccion = fila.insertCell(4); // Inserta la celda donde irán los botones

        let botonModificar = document.createElement("button"); // Crea el botón modificar
        botonModificar.innerText = "✏️"; // Asigna el texto del botón
        botonModificar.style.backgroundColor="white"; // Cambia el color de fondo del botón

        botonModificar.addEventListener("click", function(){ // Evento al hacer clic en modificar
            let nuevoNombre = prompt("Nuevo nombre:", herramientas[i].nombre); // Pide nuevo nombre
            let nuevoBueno = prompt("Cantidad Bueno:", herramientas[i].bueno); // Pide nueva cantidad buena
            let nuevoRegular = prompt("Cantidad Regular:", herramientas[i].regular); // Pide nueva cantidad regular
            let nuevoMalo = prompt("Cantidad Malo:", herramientas[i].malo); // Pide nueva cantidad mala

            if(nuevoNombre !== null){ // Si el usuario no cancela
                herramientas[i].nombre = nuevoNombre; // Actualiza el nombre
                herramientas[i].bueno = parseInt(nuevoBueno) || 0; // Actualiza bueno convirtiéndolo a número
                herramientas[i].regular = parseInt(nuevoRegular) || 0; // Actualiza regular
                herramientas[i].malo = parseInt(nuevoMalo) || 0; // Actualiza malo
            }

            guardar(); // Guarda los cambios
            cargarTabla(); // Recarga la tabla
        });

        celdaAccion.appendChild(botonModificar); // Agrega el botón modificar a la celda

        let botonEliminar = document.createElement("button"); // Crea el botón eliminar
        botonEliminar.innerText = "🗑️"; // Texto del botón eliminar
        botonEliminar.style.backgroundColor = "white"; // Color de fondo blanco

        botonEliminar.addEventListener("click", function(){ // Evento al hacer clic en eliminar
            herramientas.splice(i, 1); // Elimina la herramienta en la posición i
            guardar(); // Guarda los cambios
            cargarTabla(); // Recarga la tabla
        });

        celdaAccion.appendChild(botonEliminar);
    }
    else{
        accion.style.display="none"
    } // Agrega el botón eliminar a la celda
    }
}

cargarTabla(); // Llama la función para que la tabla cargue al iniciar
let menu = document.getElementById("menuAccesibilidad");
let boton = document.getElementById("botonAccesibilidad");

/* Abrir / cerrar menú */
boton.addEventListener("click", () => {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
});

/* FUNCIONES */

function toggleOscuro(){
    document.body.classList.toggle("dark-mode");
    guardarConfig();
}

function toggleContraste(){
    document.body.classList.toggle("alto-contraste");
    guardarConfig();
}


function mayusculas(){
    document.body.classList.toggle("mayusculas");
    guardarConfig();
}

function resetEstilos(){
    document.body.classList.remove("dark-mode", "alto-contraste", "mayusculas");
    localStorage.removeItem("configAccesibilidad");
}
function leerPagina(){
    if (speechSynthesis.speaking) return;

    let texto = document.body.innerText;
    vozActiva = new SpeechSynthesisUtterance(texto);

    speechSynthesis.speak(vozActiva);
}
function detenerLectura() {
    speechSynthesis.cancel();
}
/* GUARDAR CONFIGURACIÓN */

function guardarConfig(){
    localStorage.setItem("configAccesibilidad", JSON.stringify({
        oscuro: document.body.classList.contains("dark-mode"),
        contraste: document.body.classList.contains("alto-contraste"),
        mayuscula: document.body.classList.contains("mayusculas"),
    }));
}

/* CARGAR CONFIGURACIÓN */

window.onload = function(){
    let config = JSON.parse(localStorage.getItem("configAccesibilidad"));

    if(config){
        if(config.oscuro) document.body.classList.add("dark-mode");
        if(config.contraste) document.body.classList.add("alto-contraste");
        if(config.mayuscula) document.body.classList.add("mayusculas");
    }
}

