import main from './sass/main.scss';

import Knight from './model';
import View from './view';

let vertices = [];
let knight;

const controlChessSquares = (coordinates) => {
  if (vertices.length > 0) {
    vertices.push(coordinates);

    const pathTaken = knight.findShortestPath(vertices[1]);
    console.log(pathTaken);

    View.renderPath(pathTaken);

    vertices = [];
  }

  if (vertices.length < 1) {
    knight = Knight(coordinates);
    vertices.push(coordinates);
  }
};

const init = () => {
  View.addHandlerSquares(controlChessSquares);
};

init();
