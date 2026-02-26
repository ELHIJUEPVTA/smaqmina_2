
// Usuario válido para entrar al sistema
const USER_CORRECTO = "tralalero";

// Contraseña válida
const PASS_CORRECTA = "admin123";

// Contador de intentos fallidos
let intentos = 0;

// Variable que indica si el login está bloqueado
let bloqueado = false;

// Tiempo de bloqueo (3 minutos = 180 segundos)
let tiempoRestante = 180;

// Variable que guardará el intervalo del contador
let intervalo = null;


// Formulario principal del login
const form = document.getElementById("formLogin");

// Input donde el usuario escribe su nombre
const userInput = document.getElementById("userInput");

// Input donde se escribe la contraseña
const passInput = document.getElementById("passInput");

// Div donde se muestran alertas (errores o éxito)
const alerta = document.getElementById("alertaSesion");

// Botón del ojito para mostrar/ocultar contraseña
const btnVer = document.getElementById("btnVerPass");

// Checkbox de "Recuérdame"
const checkRecordar = document.getElementById("checkRecordar");

if (form) {
    
  // Revisamos si antes se guardó un usuario en el navegador
  const usuarioGuardado = localStorage.getItem("usuarioRecordado");
  // Si existe, lo colocamos automáticamente en el input
  if (usuarioGuardado) {
    userInput.value = usuarioGuardado;
    checkRecordar.checked = true;
  }

  function mostrar(texto, tipo = "error") {

    // Mostramos el cuadro de alerta
    alerta.style.display = "block";

    // Ponemos el mensaje dentro del div
    alerta.textContent = texto;

    // Si es éxito → verde
    if (tipo === "success") {
      alerta.style.backgroundColor = "#d4edda";
      alerta.style.color = "#155724";
    }

    // Si es error → rojo
    else {
      alerta.style.backgroundColor = "#f8d7da";
      alerta.style.color = "#721c24";
    }
  }


  btnVer.addEventListener("click", function (e) {

    // Evitamos que el botón haga algo raro en el formulario
    e.preventDefault();

    // Cambiamos el tipo del input entre password y text
    passInput.type =
      passInput.type === "password" ? "text" : "password";

    // Cambiamos el icono según el estado
    btnVer.textContent =
      passInput.type === "password" ? "👁" : "🙈";
  });


  function bloquearLogin() {

    // Activamos el bloqueo
    bloqueado = true;

    // Reiniciamos el tiempo a 3 minutos
    tiempoRestante = 180;

    // Si ya había un contador activo, lo detenemos antes
    if (intervalo) {
      clearInterval(intervalo);
    }

    // Iniciamos el contador que se actualiza cada segundo
    intervalo = setInterval(() => {

      // Calculamos minutos
      let min = Math.floor(tiempoRestante / 60);

      // Calculamos segundos
      let seg = tiempoRestante % 60;

      // Mostramos el mensaje con el tiempo restante
      mostrar(
        `🚫 Has fallado 3 veces. Espera ${min}:${seg < 10 ? "0" : ""}${seg}...`
      );

      // Restamos 1 segundo
      tiempoRestante--;

      // Cuando se acaba el tiempo...
      if (tiempoRestante < 0) {

        // Detenemos el contador
        clearInterval(intervalo);

        // Reiniciamos intentos
        intentos = 0;

        // Quitamos el bloqueo
        bloqueado = false;

        // Avisamos que ya puede intentar otra vez
        mostrar("✅ Ya puedes intentar nuevamente.", "success");
      }

    }, 1000);
  }

  form.addEventListener("submit", function (e) {

    // Evitamos que la página se recargue
    e.preventDefault();

    // Si está bloqueado, no dejamos intentar
    if (bloqueado) return;

    // Guardamos los valores escritos
    const u = userInput.value.trim();
    const p = passInput.value.trim();

    if (u === "" || p === "") {
      mostrar("⚠ Completa todos los campos.");
      return;
    }

    if (checkRecordar.checked) {
      localStorage.setItem("usuarioRecordado", u);
    } else {
      localStorage.removeItem("usuarioRecordado");
    }

    if (u === USER_CORRECTO && p === PASS_CORRECTA) {

      // Mensaje de acceso correcto
      mostrar("✅ Acceso correcto. Entrando...", "success");

      // ✅ Guardar usuario como sesión activa
       localStorage.setItem("usuarioActivo", u);


      // Redirigimos a inicio.html después de 1.5 segundos
      setTimeout(() => {
        window.location.href = "inicio.html";
      }, 1500);

    } else {

      // Si falló, aumentamos intentos
      intentos++;

      // Mensaje de error
      mostrar("❌ Usuario o contraseña incorrectos.");

      // Si llega a 3 intentos → bloqueo
      if (intentos >= 3) {
        bloquearLogin();
      }
    }
  });

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