import main from './sass/main.scss';

import Knight from './model';
import View from './view';

let vertices = [];
let knight;

const controlChessSquares = (coordinates) => {
  if (vertices.length > 0) {
    vertices.push(coordinates);

    const pathTaken = knight.findShortestPath(vertices[1]);

    View.displayStatus('start');
    View.resetSquares();
    View.renderPath(pathTaken);

    vertices = [];
  }

  if (vertices.length < 1) {
    knight = Knight(coordinates);
    vertices.push(coordinates);

    View.displayStatus('end');
  }
};

const controlResetSquares = () => {
  vertices = [];
  View.displayStatus('start');
};

const init = () => {
  View.addHandlerSquares(controlChessSquares);
  View.addHandlerReset(controlResetSquares);
};

init();
