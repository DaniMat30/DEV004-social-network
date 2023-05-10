import { onNavigate } from '../router';
import { crearUsuario } from '../lib/firebase';

export function register() {
  // crea contenedor principal
  const section = document.createElement('section');
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');
  const buttonRegister = document.createElement('button');
  const buttonHome = document.createElement('button');
  // modifica propiedades de los elemento
  inputEmail.setAttribute('type', 'email');
  inputPassword.setAttribute('type', 'password');
  buttonRegister.textContent = 'Registrate';
  buttonHome.textContent = 'Volver al home';
  buttonRegister.addEventListener('click', () => {
    // llama funcion navigate y pasa string con la ruta
    // onNavigate('/wall');
    if (inputEmail.value === '' || inputPassword.value === '') {
      alert('verifica tus datos');
    } else {
      crearUsuario(inputEmail.value, inputPassword.value).then(() => {
        onNavigate('/wall');
      });
    }
  });
  buttonHome.addEventListener('click', () => {
    // llama funcion navigate y pasa string con la ruta
    onNavigate('/');
  });
  // suman elementos a contenedor madre
  section.append(inputEmail, inputPassword, buttonRegister, buttonHome);
  // retorna contenedor madre
  return section;
}
