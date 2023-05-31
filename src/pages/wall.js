/* eslint-disable no-alert */
import { onSnapshot } from 'firebase/firestore';
import {
  guardarPost,
  verPosts,
  deletePost,
  editPost,
  auth,
} from '../lib/firebase.js';
console.log(auth.currentUser?.displayName);
export function wall() {
  const centerContentClass = 'center-content';
  // crea contenedor principal
  const mainContainer = document.createElement('div');
  mainContainer.classList.add(centerContentClass);
  // Establece el color de fondo
  document.body.style.backgroundColor = '#FDCEDF'; // el color que desees
  document.body.style.backgroundImage = 'url("https://www.dzoom.org.es/wp-content/uploads/2020/02/texturas-04-734x489.jpg")';

  // crea el encabezado de la página
  const header = document.createElement('header');
  const title = document.createElement('h1');
  title.textContent = 'Wellcome!';
  header.appendChild(title);

  // crea las secciones de los niveles de dificultad
  const basicSection = document.createElement('section');
  const basicTitle = document.createElement('h3');
  basicTitle.textContent = 'Elementary ';
  const basicDriveLink = document.createElement('a');
  basicDriveLink.href = 'https://drive.google.com/drive/folders/1O7qRwghYitinx1pAiJ-87MdfHJQXNQZL?usp=sharing';
  basicDriveLink.textContent = 'go to read';
  basicDriveLink.target = '_blank'; // Abre el enlace en una nueva pestaña
  basicSection.appendChild(basicTitle);
  basicSection.appendChild(basicDriveLink);

  const intermediateSection = document.createElement('section');
  const intermediateTitle = document.createElement('h3');
  intermediateTitle.textContent = 'Intermediate';
  const intermediateDriveLink = document.createElement('a');
  intermediateDriveLink.href = 'https://drive.google.com/drive/folders/0B4nVUO0Gb-y3LU5MOFlPLVpfVjQ?resourcekey=0-EIH4-BNT2KZnWoxgPNWSKA&usp=sharing';
  intermediateDriveLink.textContent = 'Go to read';
  intermediateSection.appendChild(intermediateTitle);
  intermediateSection.appendChild(intermediateDriveLink);

  const advancedSection = document.createElement('section');
  const advancedTitle = document.createElement('h3');
  advancedTitle.textContent = 'Advanced';
  const advancedDriveLink = document.createElement('a');
  advancedDriveLink.href = 'https://drive.google.com/drive/folders/1O7qRwghYitinx1pAiJ-87MdfHJQXNQZL?usp=sharing';
  advancedDriveLink.textContent = 'Go to read';
  advancedSection.appendChild(advancedTitle);
  advancedSection.appendChild(advancedDriveLink);

  // crea la sección de comentarios
  const commentsSection = document.createElement('section');
  const commentsTitle = document.createElement('h4');
  commentsTitle.textContent = 'Comments and recommendations';
  const commentsForm = document.createElement('article');
  const textarea = document.createElement('textarea');
  textarea.id = 'comentario';
  textarea.id = 'comentario';
  textarea.style.width = '97%';
  textarea.style.height = '100px';
  textarea.style.backgroundColor = '#C4DFDF';
  textarea.placeholder = 'Book title\nAuthor \nMy book review';
  commentsForm.appendChild(textarea);

  const formButton = document.createElement('button');
  formButton.id = 'buttonSend';
  formButton.textContent = 'Send ';
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

  onSnapshot(verPosts(), (snapshot) => {listPost.innerHTML="";
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
          editPost(btnDelete.value, newText).then(() => {
            p.textContent = newText; // Actualizar el contenido del post en el DOM
          });
        }
      });
      btnDelete.textContent = 'Eliminar';
      btnDelete.value = post.id;
      p.textContent = `Autor: ${post.data().authorName} - ${post.data().text}`;
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
