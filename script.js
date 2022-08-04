const body = document.querySelector('body');
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArr = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let isInitialLoad = true;

let img;

let count = 5;
const apiKey = 'GarSNaDMsojS9fi2DsREH7HLrfkwCsrYhCMkx8feLaE';

let apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

const setAttributes = function (element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const updateURL = function (imageCount) {
  apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imageCount}`;
};

const imageLoaded = function () {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    count = 30;
    ready = true;
    body.style.removeProperty('overFlow');
    loader.hidden = true;
  }
};

const displayPhoto = function () {
  body.style.overflow = 'hidden';

  imagesLoaded = 0;
  totalImages = photosArr.length;
  console.log('total images', totalImages);

  photosArr.forEach(photo => {
    const item = document.createElement('a');

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    img = document.createElement('img');
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

    if (isInitialLoad) {
      updateURL(30);
      isInitialLoad = false;
    }
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
