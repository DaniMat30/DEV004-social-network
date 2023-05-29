/* eslint-disable comma-dangle */
/* eslint-disable no-alert */
/* eslint-disable quotes */
import { onNavigate } from "../router/index.js";
import { entrarConGoogle, entrarConEmail } from "../lib/firebase.js";

export function home() {
  // Crea contenedor principal
  const contenedorHome = document.createElement("div");
  contenedorHome.classList.add("home-container");
  const inputEmail = document.createElement("input");
  inputEmail.textContent = "input";
  inputEmail.style.width = "291px";
  inputEmail.style.height = "30px";
  inputEmail.style.backgroundColor = "#99A98F";
  const inputPassword = document.createElement("input");
  inputPassword.textContent = "Entrar";
  inputPassword.style.width = "291px";
  inputPassword.style.height = "30px";
  inputPassword.style.backgroundColor = "#99A98F";
  inputEmail.setAttribute("type", "email");
  inputPassword.setAttribute("type", "password");
  // Agrega color de fondo al contenedor principal
  contenedorHome.style.backgroundColor = "#E3F2C1";

  // Crea contenedor para la imagen de fondo
  const backgroundImageContainer = document.createElement("div");
  backgroundImageContainer.classList.add("background-image");

  // Crea imagen de fondo
  const backgroundImage = document.createElement("img");
  backgroundImage.src = "https://markhampubliclibrary.ca/wp-content/uploads/sites/74/2020/06/History-of-Audiobooks.jpg";
  backgroundImage.classList.add("background-image__img");

  // Agrega imagen de fondo al contenedor
  backgroundImageContainer.appendChild(backgroundImage);

  // Agrega contenedor de imagen de fondo al contenedor principal
  contenedorHome.appendChild(backgroundImageContainer);

  ///
  // Crea botones
  const buttonEntrar = document.createElement("button");
  buttonEntrar.textContent = "Entrar";
  buttonEntrar.style.width = "300px";
  buttonEntrar.style.height = "30px";
  buttonEntrar.style.backgroundColor = "#99A98F";
  buttonEntrar.addEventListener("click", () => {
    if (inputEmail.value === "" || inputPassword.value === "") {
      alert("verifica tus datos");
    } else {
      entrarConEmail(inputEmail.value, inputPassword.value).then((resp) => {
        if (resp.includes("auth/wrong")) {
          alert("error en contraseña, verifica");
        } else if (resp.includes("auth/user-not-found")) {
          alert("error en correo, verifica");
        } else {
          onNavigate("/wall");
        }
      });
    }
  });

  ///
  const buttonRegister = document.createElement("button");
  buttonRegister.textContent = "Crea nueva cuenta";
  buttonRegister.style.width = "300px";
  buttonRegister.style.height = "30px";
  buttonRegister.style.backgroundColor = "#99A98F";
  buttonRegister.addEventListener("click", () => {
    // Llama funcion navigate y pasa string con la ruta
    onNavigate("/register");
  });
  buttonRegister.classList.add("button-re");

  const buttonGoogle = document.createElement("button");
  buttonGoogle.textContent = "Entrar con Google";
  buttonGoogle.style.width = "300px";
  buttonGoogle.style.height = "30px";
  buttonGoogle.style.backgroundColor = "#99A98F";
  buttonGoogle.addEventListener("click", () => {
    // Llama funcion navigate y pasa string con la ruta
    entrarConGoogle().then(() => {
      onNavigate("/wall");
    });
  });

  // Agrega botones al contenedor principal
  contenedorHome.append(
    inputEmail,
    inputPassword,
    buttonEntrar,
    buttonRegister,
    buttonGoogle
  );

  // Retorna contenedor principal
  return contenedorHome;
}

// Crea la etiqueta link
const cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "styles.css";

// Agrega la etiqueta link a la sección head del documento
document.head.appendChild(cssLink);
