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

import { Lion } from './classes/index.js';

// Escuchar el botón para agregar

document.getElementById('btnRegistrar').addEventListener('click', async () => {
  // Obtener los datos del formulario

  const animal = document.getElementById('animal').value;
  const age = document.getElementById('edad').value;
  const comments = document.getElementById('comentarios').value;
});

// Función autoejecutable

const getImage = async (animal) => {
  if (!animal) throw new Error('Debes proporcionar un animal 🦁');

  const baseURL = '../assets/imgs/';

  const animalFormat = {
    Leon: 'png',
    Lobo: 'jpg',
    Oso: 'jpg',
    Serpiente: 'jpg',
    Aguila: 'png',
  };

  const formatImage = animalFormat[animal];

  console.log(`${baseURL}${animal}.${formatImage}`);

  return {
    url: `${baseURL}${animal}.${formatImage}`,
  };
};

const changeImage = (url) => {
  const img = document.getElementById('preview');
  img.style.backgroundImage = `url(${url})`;
};

// Cambiar imagenes al seleccionarlas con una función autoejecutable

(() => {
  const animal = document.getElementById('animal');

  animal.addEventListener('change', async () => {
    const { url } = await getImage(animal.value);
    changeImage(url);
  });
})();
