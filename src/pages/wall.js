/* eslint-disable no-alert */
import { onSnapshot } from 'firebase/firestore';
import {
  guardarPost, verPosts, deletePost, editPost,
} from '../lib/firebase.js';

export function wall() {
  // crea contenedor principal
  const mainContainer = document.createElement('div');
  // Establece el color de fondo
  document.body.style.backgroundColor = '#FDCEDF'; // el color que desees

  // crea el encabezado de la página
  const header = document.createElement('header');
  const title = document.createElement('h1');
  title.textContent = '¡Bienvenido!';
  header.appendChild(title);

  // crea las secciones de los niveles de dificultad
  const basicSection = document.createElement('section');
  const basicTitle = document.createElement('h2');
  basicTitle.textContent = 'Nivel básico';
  const basicDriveLink = document.createElement('a');
  basicDriveLink.href = 'https://drive.google.com/drive/folders/1O7qRwghYitinx1pAiJ-87MdfHJQXNQZL?usp=sharing';
  basicDriveLink.textContent = 'Enlace a Google Drive';
  basicDriveLink.target = '_blank'; // Abre el enlace en una nueva pestaña
  basicSection.appendChild(basicTitle);
  basicSection.appendChild(basicDriveLink);

  const intermediateSection = document.createElement('section');
  const intermediateTitle = document.createElement('h2');
  intermediateTitle.textContent = 'Nivel intermedio';
  const intermediateDriveLink = document.createElement('a');
  intermediateDriveLink.href = 'https://drive.google.com/drive/folders/1O7qRwghYitinx1pAiJ-87MdfHJQXNQZL?usp=sharing';
  intermediateDriveLink.textContent = 'Enlace a Google Drive';
  intermediateSection.appendChild(intermediateTitle);
  intermediateSection.appendChild(intermediateDriveLink);

  const advancedSection = document.createElement('section');
  const advancedTitle = document.createElement('h2');
  advancedTitle.textContent = 'Nivel avanzado';
  const advancedDriveLink = document.createElement('a');
  advancedDriveLink.href = 'https://drive.google.com/drive/folders/1O7qRwghYitinx1pAiJ-87MdfHJQXNQZL?usp=sharing';
  advancedDriveLink.textContent = 'Enlace a Google Drive';
  advancedSection.appendChild(advancedTitle);
  advancedSection.appendChild(advancedDriveLink);

  // crea la sección de comentarios
  const commentsSection = document.createElement('section');
  const commentsTitle = document.createElement('h2');
  commentsTitle.textContent = 'Comentarios y recomendaciones';
  const commentsForm = document.createElement('article');
  commentsForm.innerHTML = `
    <label for="name">Nombre:</label>
    <input type="text" id="name" name="name">
    <label for="comment">Comentario:</label>
   
   
  `;
  const textarea = document.createElement('textarea');
  textarea.id = 'comentario';
  commentsForm.appendChild(textarea);

  const formButton = document.createElement('button');
  formButton.id = 'buttonSend';
  formButton.textContent = 'Enviar';
  commentsForm.append(formButton);

  formButton.addEventListener('click', () => {
    // alert(textarea.value)
    // const comment = document.getElementById('comment').value;
    // console.log(comment);
    // Valides que el textarea.value === ''
    if (textarea.value !== '') {
      guardarPost(textarea.value);
      textarea.value = '';
    } else {
      alert('Captura un msj');
    }
  });

  commentsSection.appendChild(commentsTitle);
  commentsSection.appendChild(commentsForm);
  mainContainer.appendChild(header);
  mainContainer.appendChild(basicSection);
  mainContainer.appendChild(intermediateSection);
  mainContainer.appendChild(advancedSection);
  mainContainer.appendChild(commentsSection);
  const listPost = document.createElement('article');
  mainContainer.appendChild(listPost);
  //   verPosts(()=>{});
  // console.log(verPosts);

  onSnapshot(verPosts(), (snapshot) => {
    snapshot.forEach((post) => {
      // console.log(post, '****');
      const containerPost = document.createElement('section');
      const p = document.createElement('p');
      const btnEdit = document.createElement('button');
      const btnDelete = document.createElement('button');
      btnEdit.textContent = 'Editar';
      btnEdit.addEventListener('click', () => {
        const newText = prompt('Ingresa el nuevo texto del post:');
        if (newText) {
          editPost(btnDelete.value, newText)
            .then(() => {
              p.textContent = newText; // Actualizar el contenido del post en el DOM
            });
        }
      });
      btnDelete.textContent = 'Eliminar';
      btnDelete.value = post.id;
      p.textContent = post.data().text;
      containerPost.append(p, btnDelete, btnEdit);
      listPost.appendChild(containerPost);
      // btnDelete añadir manejador de eventos (addeventlistener)
      btnDelete.addEventListener('click', () => {
      // crear la funcion en firebase.js DELETEPOST y llamas al metodo DELETEDOC de firestore
        deletePost(btnDelete.value).then(() => {
          containerPost.remove();
        });
      });
    });
  });

  return mainContainer;
}
