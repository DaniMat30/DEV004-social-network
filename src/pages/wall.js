export function wall() {
  // crea contenedor principal
  const mainContainer = document.createElement('div');
  
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
  basicDriveLink.href = 'https://drive.google.com/...';
  basicDriveLink.textContent = 'Enlace a Google Drive';
  basicSection.appendChild(basicTitle);
  basicSection.appendChild(basicDriveLink);
  
  const intermediateSection = document.createElement('section');
  const intermediateTitle = document.createElement('h2');
  intermediateTitle.textContent = 'Nivel intermedio';
  const intermediateDriveLink = document.createElement('a');
  intermediateDriveLink.href = 'https://drive.google.com/...';
  intermediateDriveLink.textContent = 'Enlace a Google Drive';
  intermediateSection.appendChild(intermediateTitle);
  intermediateSection.appendChild(intermediateDriveLink);
  
  const advancedSection = document.createElement('section');
  const advancedTitle = document.createElement('h2');
  advancedTitle.textContent = 'Nivel avanzado';
  const advancedDriveLink = document.createElement('a');
  advancedDriveLink.href = 'https://drive.google.com/...';
  advancedDriveLink.textContent = 'Enlace a Google Drive';
  advancedSection.appendChild(advancedTitle);
  advancedSection.appendChild(advancedDriveLink);
  
  // crea la sección de comentarios
  const commentsSection = document.createElement('section');
  const commentsTitle = document.createElement('h2');
  commentsTitle.textContent = 'Comentarios y recomendaciones';
  const commentsForm = document.createElement('form');
  commentsForm.innerHTML = `
    <label for="name">Nombre:</label>
    <input type="text" id="name" name="name">
    <label for="comment">Comentario:</label>
    <textarea id="comment" name="comment"></textarea>
    <button type="submit">Enviar</button>
  `;
  commentsSection.appendChild(commentsTitle);
  commentsSection.appendChild(commentsForm);
  // añadir guardarPost a boton de enviar
  // el boton enviar debe capturar el valor del text area id="comment"
  // agrega todas las secciones al contenedor principal
  mainContainer.appendChild(header);
  mainContainer.appendChild(basicSection);
  mainContainer.appendChild(intermediateSection);
  mainContainer.appendChild(advancedSection);
  mainContainer.appendChild(commentsSection);
  
  return mainContainer;
};