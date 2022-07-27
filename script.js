//

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArr = [];

const count = 10;
const apiKey = 'GarSNaDMsojS9fi2DsREH7HLrfkwCsrYhCMkx8feLaE';

const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

const displayPhoto = function () {
  photosArr.forEach(photo => {
    console.log(photo);
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);

    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

const getPhoto = async function () {
  try {
    const response = await fetch(apiURL);
    photosArr = await response.json();

    displayPhoto();
  } catch (error) {
    // Catch error
  }
};

getPhoto();
