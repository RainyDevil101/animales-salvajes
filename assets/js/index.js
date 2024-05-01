// Requerimientos
// 1. Crear las clases representadas en el diagrama implementando la herencia indicada.
// (2 Puntos)
// 2. Crear las instancias de las clases utilizando los datos del formulario.
// (2 Puntos)
// 3. Realizar una consulta asíncrona utilizando una función async/await para obtener las
// imágenes correspondientes a los animales. (1 Punto)
// 4. Realizar por lo menos una función autoejecutable IIFE. (1 Punto)
// 5. Dividir el código en módulos (2 Puntos)
// 6. Utilizar la manipulación del DOM para mostrar en la tabla los animales registrados con
// el formulario. (2 Puntos)
// 7. Validar que el usuario haya asignado todos los datos del animal antes de que éste sea
// agregado a la tabla. (Opcional)
// 8. Devolver el formulario en un estado inicial luego de registrar a cada animal. (Opcional)
// 9. Programar la interacción del botón de audio, en donde deberás reproducir el sonido
// del animal en el sitio web. (Opcional)
// 10. Mostrar el detalle de cada animal en una ventana modal al ser presionada su imagen.
// (Opcional)
import { Lion, Bear, Hawk, Wolf, Snake } from './classes/index.js';

(() => {
  // Escuchar el botón para agregar

  let animals = [];

  // Obtener elementos del DOM

  const btnRegistrar = document.getElementById('btnRegistrar');
  const animalSelect = document.getElementById('animal');
  const ageSelect = document.getElementById('edad');
  const commentsInput = document.getElementById('comentarios');
  const tableAnimales = document.getElementById('Animales');
  const modalBody = document.getElementById('modal-body');
  const previewImage = document.getElementById('preview');
  const modal = document.getElementById('exampleModal');

  // Evento click en el botón de registrar

  btnRegistrar.addEventListener('click', async () => {
    // Obtener valores del formulario
    const name = animalSelect.value.trim();
    const age = ageSelect.value.trim();
    const comments = commentsInput.value.trim();

    // Validaciones
    if (!name || name == 'Seleccione un animal') {
      alert('Debes seleccionar un animal 🦁');
      return;
    }
    if (!age || age == 'Seleccione un rango de años') {
      alert('Debes ingresar la edad del animal 🦁');
      return;
    }
    if (!comments || comments == '') {
      alert('Debes ingresar un comentario 🦁');
      return;
    }

    // Verificar si el animal ya fue registrado
    const animalExists = animals.find((animal) => animal.getName === name);
    if (animalExists) {
      alert('El animal ya fue registrado 🦁');
      return;
    }

    // Obtener imagen y sonido
    const { urlImage: img } = await getImage(name);
    const { urlSound: sound } = await getSound(name);

    // Crear instancia del animal
    let animalInstance;
    switch (name) {
      case 'Leon':
        animalInstance = new Lion(name, age, img, comments, sound);
        break;
      case 'Oso':
        animalInstance = new Bear(name, age, img, comments, sound);
        break;
      case 'Aguila':
        animalInstance = new Hawk(name, age, img, comments, sound);
        break;
      case 'Lobo':
        animalInstance = new Wolf(name, age, img, comments, sound);
        break;
      case 'Serpiente':
        animalInstance = new Snake(name, age, img, comments, sound);
        break;
    }

    // Agregar animal al array
    animals.push(animalInstance);

    // Mostrar animal en la tabla
    renderAnimalCard(animalInstance);

    // Limpiar formulario después de registrar el animal
    animalSelect.value = 'Seleccione un animal';
    ageSelect.value = 'Seleccione un rango de años';
    commentsInput.value = '';
    previewImage.style.backgroundImage = '';
  });

  // Función para renderizar la tarjeta de un animal

  function renderAnimalCard(animal) {
    console.log(animal);
    const card = document.createElement('div');
    card.className = 'p-2';

    const cardContent = document.createElement('div');
    cardContent.className = 'card';
    cardContent.style.width = '10rem';
    cardContent.style.height = '18rem';
    cardContent.style.border = 'none';
    cardContent.style.display = 'flex';
    cardContent.style.flexDirection = 'column';

    const animalImage = document.createElement('img');
    animalImage.src = animal.getImg;
    animalImage.className = 'card-img-top animal-card';
    animalImage.alt = '...';
    animalImage.style.flex = '8';
    animalImage.style.objectFit = 'cover';
    animalImage.dataset.toggle = 'modal';
    animalImage.dataset.target = '#exampleModal';

    const audio = document.createElement('audio');
    audio.src = animal.getSound;
    audio.controls = false;
    audio.autoplay = false;

    const div = document.createElement('div');
    div.style.backgroundColor = 'gray';
    div.style.flex = '2';
    div.addEventListener('click', () => {
      audio.play();
    });

    const p = document.createElement('p');
    p.style.display = 'flex';
    p.style.justifyContent = 'center';
    p.style.alignItems = 'center';
    p.style.margin = 'auto';
    p.style.height = '100%';

    const span = document.createElement('span');
    span.style.fontSize = '1.5rem';
    span.style.cursor = 'default';
    span.innerHTML = '&#128266;';

    p.appendChild(span);
    div.appendChild(p);
    div.appendChild(audio);
    cardContent.appendChild(animalImage);
    cardContent.appendChild(div);
    card.appendChild(cardContent);
    tableAnimales.appendChild(card);

    // Evento click en la imagen del animal
    animalImage.addEventListener('click', () => {
      modalBody.innerHTML = `
      <img src="${animal.getImg}" class="card-img-top animal-card" alt="..." style="object-fit: cover; " />
      <div style="color: white; text-align: center; margin-top: 1rem;" >
      <p style="font-weight: bold;" >${animal.getAge}</p>
      <label style="font-weight: bold;">Comentarios</label>
      <p>${animal.getComments}</p>
      </div>
    `;
    });
  }

  // Función para obtener la imagen de un animal
  async function getImage(name) {
    if (!name) throw new Error('Debes proporcionar un animal 🦁');
    const baseURL = '../assets/imgs/';
    const animalFormat = {
      Leon: 'png',
      Lobo: 'jpg',
      Oso: 'jpg',
      Serpiente: 'jpg',
      Aguila: 'png',
    };
    const formatImage = animalFormat[name];
    return {
      urlImage: `${baseURL}${name}.${formatImage}`,
    };
  }

  // Función para obtener el sonido de un animal
  async function getSound(name) {
    if (!name) throw new Error('Debes proporcionar un animal 🦁');
    const baseURL = '../assets/sounds/';
    const animalFormat = {
      Leon: 'Roar',
      Lobo: 'Howl',
      Oso: 'Growl',
      Serpiente: 'Hiss',
      Aguila: 'Screech',
    };
    const formatSound = animalFormat[name];
    return {
      urlSound: `${baseURL}${formatSound}.mp3`,
    };
  }

  // Cambiar imagen al seleccionar un animal
  animalSelect.addEventListener('change', async () => {
    const { urlImage } = await getImage(animalSelect.value);
    previewImage.style.backgroundImage = `url(${urlImage})`;
  });
})();

// Codigo sin refactorizar

/*

document.getElementById('btnRegistrar').addEventListener('click', async () => {
  // Obtener los datos del formulario

  const name = document.getElementById('animal').value.trim();

  if (!name || name == 'Seleccione un animal') {
    alert('Debes seleccionar un animal 🦁');
    return;
  }

  // Revisar si el animal ya fue registrado

  const animalExists = animals.find((animal) => animal.getName === name);

  console.log(animals);

  if (animalExists) {
    alert('El animal ya fue registrado 🦁');
    return;
  }

  console.log(123);

  const { urlImage: img } = await getImage(name);
  const { urlSound: sound } = await getSound(name);

  const age = document.getElementById('edad').value.trim();

  if (!age || age == 'Seleccione un rango de años') {
    alert('Debes ingresar la edad del animal 🦁');
    return;
  }

  const comments = document.getElementById('comentarios').value.trim();

  if (!comments || comments == '') {
    alert('Debes ingresar un comentario 🦁');
    return;
  }

  // Crear la instancia de la clase

  let animal;

  switch (name) {
    case 'Leon':
      animal = new Lion(name, age, img, comments, sound);
      break;
    case 'Oso':
      animal = new Bear(name, age, img, comments, sound);
      break;
    case 'Aguila':
      animal = new Hawk(name, age, img, comments, sound);
      break;
    case 'Lobo':
      animal = new Wolf(name, age, img, comments, sound);
      break;
    case 'Serpiente':
      animal = new Snake(name, age, img, comments, sound);
      break;
  }

  animals.push(animal);

  // Agregar la instancia a un array.

  // Mostrar la instancia en la table

  // <div class="p-2">
  //   <div
  //     class="card"
  //     style="
  //               width: 10rem;
  //               height: 18rem;
  //               border: none;
  //               display: flex;
  //               flex-direction: column;
  //             "
  //   >
  //     <img
  //       src="./assets/imgs/Leon.png"
  //       class="card-img-top animal-card"
  //       alt="..."
  //       style="flex: 8"
  //       data-toggle="modal"
  //       data-target="#exampleModal"
  //     />
  //     <div  id="leon-audio" style="background-color: gray; flex: 2">
  //       <p
  //         style="
  //                   display: flex;
  //                   justify-content: center;
  //                   align-items: center;
  //                   margin: auto;
  //                   height: 100%;
  //                 "
  //       >
  //         <audio src="./assets/sounds/Roar.mp3"></audio>
  //         <span style="font-size: 1.5rem; cursor: default">&#128266;</span>
  //       </p>
  //     </div>
  //   </div>
  // </div>;



  const table = document.getElementById('Animales');

  const card = document.createElement('div');
  card.className = 'p-2';

  const cardContent = document.createElement('div');
  cardContent.className = 'card';
  cardContent.style.width = '10rem';
  cardContent.style.height = '18rem';
  cardContent.style.border = 'none';
  cardContent.style.display = 'flex';
  cardContent.style.flexDirection = 'column';

  const animalImage = document.createElement('img');
  animalImage.src = animal.getImg;
  animalImage.className = 'card-img-top animal-card';
  animalImage.alt = '...';
  animalImage.style.flex = '8';
  animalImage.style.objectFit = 'cover';
  animalImage.dataset.toggle = 'modal';
  animalImage.dataset.target = '#exampleModal';

  const div = document.createElement('div');
  div.style.backgroundColor = 'gray';
  div.style.flex = '2';

  const p = document.createElement('p');
  p.style.display = 'flex';
  p.style.justifyContent = 'center';
  p.style.alignItems = 'center';
  p.style.margin = 'auto';
  p.style.height = '100%';

  const span = document.createElement('span');
  span.style.fontSize = '1.5rem';
  span.style.cursor = 'default';
  span.innerHTML = '&#128266;';

  p.appendChild(span);
  div.appendChild(p);
  cardContent.appendChild(animalImage);
  cardContent.appendChild(div);
  card.appendChild(cardContent);
  table.appendChild(card);

  // Reproducir el audio

  const audio = document.createElement('audio');
  audio.src = animal.getSound;
  audio.controls = false;
  audio.autoplay = false;

  div.addEventListener('click', () => {
    audio.play();
  });

  // Mostrar el detalle de cada animal en una ventana modal al ser presionada su imagen

  const modal = document.getElementById('exampleModal');
  const modalBody = document.getElementById('modal-body');

  animalImage.addEventListener('click', () => {
    modalBody.innerHTML = `
      <img src="${animal.getImg}" class="card-img-top animal-card" alt="..." style="object-fit: cover; " />
      <div style="color: white; text-align: center; margin-top: 1rem;" >
      <p style="font-weight: bold;" >${animal.getAge}</p>
      <label style="font-weight: bold;">Comentarios</label>
      <p>${animal.getComments}</p>
      </div>
    `;
  });

  // Limpiar el formulario

  document.getElementById('animal').value = 'Seleccione un animal';
  document.getElementById('edad').value = 'Seleccione un rango de años';
  document.getElementById('comentarios').value = '';
  changeImage('../assets/imgs/lion.svg');
});

// Función autoejecutable

const getImage = async (name) => {
  if (!name) throw new Error('Debes proporcionar un animal 🦁');

  const baseURL = '../assets/imgs/';

  const animalFormat = {
    Leon: 'png',
    Lobo: 'jpg',
    Oso: 'jpg',
    Serpiente: 'jpg',
    Aguila: 'png',
  };

  const formatImage = animalFormat[name];

  console.log(`${baseURL}${name}.${formatImage}`);

  return {
    urlImage: `${baseURL}${name}.${formatImage}`,
  };
};

const changeImage = (urlImage) => {
  const img = document.getElementById('preview');
  img.style.backgroundImage = `url(${urlImage})`;
};

// Obtener audio

const getSound = async (name) => {
  if (!name) throw new Error('Debes proporcionar un animal 🦁');

  const baseURL = '../assets/sounds/';

  const animalFormat = {
    Leon: 'Roar',
    Lobo: 'Howl',
    Oso: 'Growl',
    Serpiente: 'Hiss',
    Aguila: 'Screech',
  };

  const formatSound = animalFormat[name];

  return {
    urlSound: `${baseURL}${formatSound}.mp3`,
  };
};

// Cambiar imagenes al seleccionarlas con una función autoejecutable

(() => {
  const animal = document.getElementById('animal');

  animal.addEventListener('change', async () => {
    const { urlImage } = await getImage(animal.value);
    changeImage(urlImage);
  });
})();

*/
