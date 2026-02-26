

// Este botón es el icono que usamos para mostrar u ocultar la contraseña
const togglePass = document.getElementById('togglePass');

// Campo donde el usuario escribe su contraseña
const inputPass = document.getElementById('contrasena');

// Campo donde el usuario confirma la contraseña
const inputConfirm = document.getElementById('confirmarContrasena');

// Campo del nombre de usuario
const inputUsuario = document.getElementById('usuario');

// Campo del correo electrónico
const inputCorreo = document.getElementById('correo');

// Campo del número telefónico
const inputTelefono = document.getElementById('telefono');

// Este div sirve para mostrar mensajes de error o éxito arriba del formulario
const globalAlert = document.getElementById('globalAlert');

// Cuando el usuario hace clic en el icono del ojito 👁
togglePass.addEventListener('click', () => {

    // Revisamos si la contraseña ya está visible
    const visible = inputPass.type === 'text';

    // Si está visible, la ocultamos, si está oculta, la mostramos
    inputPass.type = visible ? 'password' : 'text';

    // También hacemos lo mismo con el campo de confirmar contraseña
    inputConfirm.type = visible ? 'password' : 'text';

    // Cambiamos el icono dependiendo del estado
    togglePass.textContent = visible ? '👁' : '🙈';
});


// Esta función sirve para mostrar mensajes en pantalla
// Por ejemplo: errores o confirmación de éxito
function showAlert(msg, type = 'error') {

    // Colocamos el mensaje dentro del div de alerta
    globalAlert.textContent = msg;

    // Si es éxito, se pone verde, si es error queda normal (rojo)
    globalAlert.className = 'alert ' + (type === 'success' ? 'success' : '');

    // Mostramos el mensaje
    globalAlert.style.display = 'block';
}

// Se usa cuando queremos quitar el mensaje de la pantalla
function hideAlert() {
    globalAlert.style.display = 'none';
}

// Esta función pone un borde rojo al campo que esté mal
function showError(input) {
    input.classList.add('invalid');
}

// Cuando el usuario empieza a escribir, quitamos errores anteriores
function clearErrors() {

    // Capturamos todos los inputs del formulario
    const inputs = document.querySelectorAll('input');

    // Recorremos cada input y le quitamos el borde rojo si lo tenía
    inputs.forEach(input => input.classList.remove('invalid'));

    // También ocultamos el mensaje global
    hideAlert();
}


// Cada vez que el usuario escriba en un input, se limpian los errores
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', clearErrors);
});



// 7. VALIDACIÓN DEL FORMULARIO


// Capturamos el formulario completo cuando el usuario presiona "Crear cuenta"
document.getElementById('loginForm').addEventListener('submit', function(e) {

    // Evitamos que la página se recargue automáticamente
    e.preventDefault();

    // Guardamos los valores escritos por el usuario
    const usuario = inputUsuario.value.trim();
    const correo = inputCorreo.value.trim();
    const telefono = inputTelefono.value.trim();
    const contrasena = inputPass.value.trim();
    const confirmacion = inputConfirm.value.trim();


    // ───────────────────────────────
    // VALIDACIÓN 1: CAMPOS VACÍOS
    // ───────────────────────────────

    // Revisamos que el usuario no deje ningún campo vacío
    if (!usuario || !correo || !telefono || !contrasena || !confirmacion) {

        // Mensaje general de advertencia
        showAlert('⚠ Por favor, completa todos los campos para registrarte.');

        // Marcamos en rojo algunos campos importantes si están vacíos
        if (!usuario) showError(inputUsuario);
        if (!contrasena) showError(inputPass);

        // Detenemos el envío
        return;
    }


    // ───────────────────────────────
    // VALIDACIÓN 2: CONTRASEÑAS IGUALES
    // ───────────────────────────────

    // Verificamos que la contraseña y la confirmación sean iguales
    if (contrasena !== confirmacion) {

        // Mostramos mensaje de error
        showAlert('❌ Las contraseñas no coinciden.');

        // Marcamos ambos campos como incorrectos
        showError(inputPass);
        showError(inputConfirm);

        // Detenemos el proceso
        return;
    }


    // ───────────────────────────────
    // REGISTRO SIMULADO (PROYECTO)
    // ───────────────────────────────

    // Capturamos el botón para cambiar el texto mientras "carga"
    const btn = document.getElementById('btnLogin');

    // Cambiamos el texto del botón para que se vea más real
    btn.textContent = 'Procesando...';

    // Lo desactivamos para que no se pueda presionar varias veces
    btn.disabled = true;


    // Simulamos que el sistema se demora un poco registrando
    setTimeout(() => {

        // Mostramos mensaje final de éxito
        showAlert('✅ Cuenta creada con éxito. Redirigiendo...', 'success');

        // Después de 1.5 segundos enviamos al login
        setTimeout(() => {

            // Redirige al usuario a la página principal de inicio de sesión
            window.location.href = 'index.html';

        }, 1500);

    }, 1200);
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