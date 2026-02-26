
document.addEventListener("DOMContentLoaded", function () {

    // 1️⃣ CONTROL DE LÁPICES
    const lapices = document.querySelectorAll(".icon"); // todos los botones de edición
    const usuarioActivo = localStorage.getItem("usuarioActivo");

    if (usuarioActivo) {
        lapices.forEach(btn => btn.style.display = "inline-block"); // mostrar lápices
    } else {
        lapices.forEach(btn => btn.style.display = "none"); // ocultar lápices
    }



});


// Obtener los botones de lápiz
let lapices = document.querySelectorAll(".icon");

// Revisar si hay sesión activa
let usuarioActivo = localStorage.getItem("usuarioActivo");

// Mostrar lápices solo si hay sesión activa
if (usuarioActivo) {
    lapices.forEach(btn => btn.style.display = "inline-block");
} else {
    lapices.forEach(btn => btn.style.display = "none");
}

    //  Cargar datos guardados al iniciar la página
    let elementos = document.querySelectorAll("[id]");

    for (let i = 0; i < elementos.length; i++) {
        let guardado = localStorage.getItem(elementos[i].id);
        if (guardado !== null) {
            elementos[i].textContent = guardado;
        }
    }

    // Seleccionar botones editar
    let botones = document.querySelectorAll(".icon");

    for (let i = 0; i < botones.length; i++) {

        botones[i].addEventListener("click", function () {

            // Obtener el main donde está el botón
            let seccion = this.parentElement;

            // Buscar los elementos con id dentro de esa sección
            let campos = seccion.querySelectorAll("[id]");

            for (let j = 0; j < campos.length; j++) {

                let valorActual = campos[j].textContent

                // Obtener el texto del <strong>
                let textoCampo = campos[j].previousElementSibling.textContent
                //se almacena el dato ingresado del prompt en una variable
                let nuevoValor = prompt(
                    `Vas a editar: ${textoCampo}\nValor actual:${valorActual}\n\nEscribe el nuevo valor
                    \nSi deseas salir presiona cancelar, si deseas editar el siguiente elemento presiona aceptar`);
                    //aqui se condiciona segun el valor de la anterior variable
                if (nuevoValor === null) {
                    break; // salir del ciclo
                }

                if(nuevoValor !== ""){

                    // Cambiar en pantalla
                    campos[j].textContent = nuevoValor

                    // Guardar en localStorage
                   let clave = window.location.pathname + "_" + campos[j].id;
                    localStorage.setItem(clave, nuevoValor)
                }
            }

        });

    }
    lapices.forEach(btn => {
    btn.addEventListener("click", function () {
        // Selecciona todos los spans dentro del mismo main
        let spans = btn.parentElement.querySelectorAll("span[id]");
        spans.forEach(span => {
            let nuevo = prompt("Editar valor:", span.textContent);
            if (nuevo !== null) {
                span.textContent = nuevo;
                // Guardar cambios en localStorage
                localStorage.setItem(span.id, nuevo);
            }
        });
    });
});

window.addEventListener("load", function () {
    if (localStorage.getItem("fotoPerfil")) {
        const icono = document.getElementById("iconoNavbar");
        if (icono) icono.src = localStorage.getItem("fotoPerfil");
    }
});
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






