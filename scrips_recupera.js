// Espera a que toda la página HTML cargue completamente antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {

    // Guardamos el formulario completo en una variable para poder usarlo después
    const form = document.getElementById("formReset");

    // Si el formulario no existe, el script no se ejecuta (evita errores)
    if (!form) return;

    // Capturamos el input donde el usuario escribe su correo
    const correoInput = document.getElementById("correoInput");

    // Capturamos el botón que enviará el código de confirmación
    const btnEnviarCodigo = document.getElementById("btnEnviarCodigo");

    // Capturamos el input donde el usuario debe escribir el código recibido
    const codigoInput = document.getElementById("codigoInput");

    // Capturamos el primer campo de contraseña (nueva contraseña)
    const pass1 = document.getElementById("pass1");

    // Capturamos el segundo campo (confirmar contraseña)
    const pass2 = document.getElementById("pass2");

    // Capturamos el div donde se mostrarán mensajes de error o éxito
    const alerta = document.getElementById("alertaReset");

    // Capturamos el icono 👁 para ver la primera contraseña
    const verPass1 = document.getElementById("verPass1");

    // Capturamos el icono 👁 para ver la segunda contraseña
    const verPass2 = document.getElementById("verPass2");


    // Creamos una variable para guardar el código que se enviará al correo
    // Al inicio está en null porque todavía no se ha generado
    let codigoGenerado = null;


    // Esta función sirve para mostrar mensajes al usuario en pantalla
    function mostrarAlerta(mensaje, tipo = "error") {

        // Colocamos el texto dentro del div de alerta
        alerta.textContent = mensaje;

        // Hacemos visible la alerta
        alerta.style.display = "block";

        // Si el tipo es success, se muestra en verde
        if (tipo === "success") {

            // Agrega la clase de éxito (verde)
            alerta.classList.add("alert-success");

        } else {

            // Si no es éxito, se quita esa clase y queda en rojo
            alerta.classList.remove("alert-success");
        }
    }


    // Función para alternar entre ver u ocultar una contraseña
    function togglePassword(input, icono) {

        // Verificamos si actualmente el campo está oculto (password)
        const esPassword = input.type === "password";

        // Si estaba oculto lo mostramos, y si estaba visible lo ocultamos
        input.type = esPassword ? "text" : "password";

        // Cambiamos el icono según el estado
        icono.textContent = esPassword ? "🙈" : "👁";
    }


    // Evento click para mostrar/ocultar la primera contraseña
    verPass1.addEventListener("click", () => togglePassword(pass1, verPass1));

    // Evento click para mostrar/ocultar la segunda contraseña
    verPass2.addEventListener("click", () => togglePassword(pass2, verPass2));


    // Cuando el usuario presiona el botón "Enviar código"
    btnEnviarCodigo.addEventListener("click", function () {

        // Guardamos el correo escrito eliminando espacios innecesarios
        const correo = correoInput.value.trim();

        // Si el correo está vacío, mostramos un mensaje y detenemos el proceso
        if (correo === "") {

            // Mensaje de advertencia
            mostrarAlerta("⚠ Ingresa tu correo primero.");

            // return detiene la ejecución aquí
            return;
        }

        // Generamos un número aleatorio de 6 dígitos (código de confirmación)
        codigoGenerado = Math.floor(100000 + Math.random() * 900000);

        // Mostramos el código como simulación (en un sistema real se enviaría al correo)
        mostrarAlerta(
            "📩 Código enviado al correo (simulado): " + codigoGenerado,
            "success"
        );
    });


    // Cuando el usuario envía el formulario para cambiar contraseña
    form.addEventListener("submit", function (e) {

        // Evita que la página se recargue automáticamente
        e.preventDefault();

        // Guardamos el código que el usuario escribió
        const codigoIngresado = codigoInput.value.trim();

        // Guardamos la nueva contraseña escrita
        const nuevaPass = pass1.value.trim();

        // Guardamos la confirmación de contraseña escrita
        const confirmarPass = pass2.value.trim();


        // Validar que primero se haya generado un código
        if (codigoGenerado === null) {

            // Si no se generó, no se puede continuar
            mostrarAlerta("⚠ Primero debes enviar el código al correo.");
            return;
        }

        // Validar que el código ingresado sea igual al generado
        if (codigoIngresado != codigoGenerado) {

            // Si es diferente, mostramos error
            mostrarAlerta("❌ El código ingresado es incorrecto.");
            return;
        }

        // Validar que la contraseña tenga mínimo 6 caracteres
        if (nuevaPass.length < 6) {

            // Si es muy corta, mostramos advertencia
            mostrarAlerta("⚠ La contraseña debe tener mínimo 6 caracteres.");
            return;
        }

        // Validar que ambas contraseñas sean iguales
        if (nuevaPass !== confirmarPass) {

            // Si no coinciden, no se puede cambiar
            mostrarAlerta("❌ Las contraseñas no coinciden.");
            return;
        }

        // Guardamos la contraseña nueva en localStorage como simulación
        localStorage.setItem("passwordSistema", nuevaPass);

        // Mensaje final de éxito
        mostrarAlerta(
            "✅ Contraseña restablecida con éxito. Redirigiendo...",
            "success"
        );

        // Esperamos 2 segundos antes de enviar al login
        setTimeout(() => {

            // Redirigimos a la página principal de inicio de sesión
            window.location.href = "index.html";

        }, 2000);

    });


    // Extra: ocultar la alerta cuando el usuario vuelva a escribir algo
    correoInput.addEventListener("input", () => alerta.style.display = "none");
    codigoInput.addEventListener("input", () => alerta.style.display = "none");
    pass1.addEventListener("input", () => alerta.style.display = "none");
    pass2.addEventListener("input", () => alerta.style.display = "none");

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