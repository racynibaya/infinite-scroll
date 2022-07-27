const body = document.querySelector('body');
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArr = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const count = 30;
const apiKey = 'GarSNaDMsojS9fi2DsREH7HLrfkwCsrYhCMkx8feLaE';

const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

const setAttributes = function (element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const imageLoaded = function () {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    body.style.removeProperty('overFlow');
  }
};

const displayPhoto = function () {
  imagesLoaded = 0;
  totalImages = photosArr.length;
  console.log('total images', totalImages);

  photosArr.forEach(photo => {
    const item = document.createElement('a');

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener('load', imageLoaded);

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

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready === true
  ) {
    ready = false;
    getPhoto();
  }
});

getPhoto();
