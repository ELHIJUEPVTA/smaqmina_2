function guardar(){ // Función para guardar una herramienta

    let nombre = document.getElementById("Nombre").value; // Obtiene el valor del input "Nombre"

    let bueno = parseInt(document.getElementById("Cantidad_buena").value) || 0; // Convierte la cantidad buena a número, si está vacío pone 0
    let regular = parseInt(document.getElementById("Cantidad_regular").value) || 0; // Convierte la cantidad regular a número, si está vacío pone 0
    let malo = parseInt(document.getElementById("Cantidad_mala").value) || 0; // Convierte la cantidad mala a número, si está vacío pone 0

    let herramientas = JSON.parse(localStorage.getItem("herramientas")) || []; // Obtiene el arreglo del localStorage o crea uno vacío
    let existe = herramientas.some(function(herramienta){ // Recorre el arreglo para verificar si ya existe

        return herramienta.nombre.toLowerCase() === nombre.toLowerCase(); // Compara los nombres sin importar mayúsculas o minúsculas
    });

    if(existe){ // Si la herramienta ya existe
        alert("❌ Esa herramienta ya está registrada"); // Muestra mensaje de advertencia
        return; // Detiene la ejecución de la función
    }
        if(bueno<0||malo<0||regular<0){
        alert("datos incorrectos")
        return
    }
    let nueva={ // Crea un nuevo objeto herramienta
        nombre: nombre, // Guarda el nombre
        bueno: bueno, // Guarda la cantidad buena
        regular: regular, // Guarda la cantidad regular
        malo: malo, // Guarda la cantidad mala
        estado: "Bueno" // Asigna estado inicial
    };

    herramientas.push(nueva); // Agrega la nueva herramienta al arreglo

    localStorage.setItem("herramientas", JSON.stringify(herramientas)); // Guarda el arreglo actualizado en localStorage

    alert("Guardado correctamente"); // Muestra mensaje de confirmación
        document.getElementById("Nombre").value = ""; // Limpia el input Nombre
    document.getElementById("Cantidad_buena").value = ""; // Limpia el input Cantidad buena
    document.getElementById("Cantidad_regular").value = ""; // Limpia el input Cantidad regular
    document.getElementById("Cantidad_mala").value = ""; // Limpia el input Cantidad mala
}
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