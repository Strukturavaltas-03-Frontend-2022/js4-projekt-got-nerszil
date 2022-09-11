'use strict';

const main = document.querySelector('.main');
const asideImg = document.querySelector('.asideImg');
const name = document.querySelector('.name');
const symbol = document.querySelector('.symbol');
const longinfo = document.querySelector('.longinfo');


const actors = [];
fetch('./json/got.json')
  .then(x => x.json())
  .then(y => {
    for (const item of y) {
      if (!item.dead === true) {
        actors.push(item);
      }
    }
    sortByNames();
    container();
    eventListener();
    infos(0)
  });

const container = () => {
  for (let i = 0; i < actors.length; i += 1) {
    const characters = actors[i];
    const charInfo = 
    `<div class="flex-container clearfix">
    <div class="img-container"><img src="${characters.portrait}" alt="${characters.name}"></d>
    <p>${characters.name}</p>
    </div>`;
    main.insertAdjacentHTML('beforeend', charInfo);
  }
};

const infos = i => {
  asideImg.src = actors[i].picture;
  name.innerText = `${actors[i].name}`;
  symbol.src = `./assets/houses/${actors[i].house}.PNG`;
  longinfo.innerText = `${actors[i].bio}`;
};

const sortByNames = () => {
  function array(a, b) {
    if (a.name.split("").slice(-1) < b.name.split("").slice(-1)) { return -1; }
    if (a.name.split("").slice(-1) > b.name.split("").slice(-1)) { return 1; }
    return 0;
  }
  actors.sort(array);
};

const eventListener = () => {
  const flexContainer = document.querySelectorAll('.flex-container');
  for (let i = 0; i < flexContainer.length; i += 1) {
    flexContainer[i].addEventListener('click', () => {
      infos(i);
    });
  }
};
