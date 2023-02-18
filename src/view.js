/* eslint-disable prefer-arrow-callback */
import knightIcon from './img/knight.png';

const View = (() => {
  const squares = [...document.querySelectorAll('.board__square')];

  const generateMarkup = () => ` 
        <img
            src="${knightIcon}"
            class="knight__logo"
            alt="Knight Logo"/>`;

  const addHandlerSquares = (handler) => {
    squares.forEach((square) =>
      square.addEventListener('click', function getSquareCoordinates(e) {
        const chosenSquare = e.target.closest('.board__square');
        const { x, y } = chosenSquare.dataset;

        chosenSquare.innerHTML = '';
        chosenSquare.insertAdjacentHTML('afterbegin', generateMarkup());

        handler([+x, +y]);
      }),
    );
  };

  const resetSquares = (exemptSquare) => {
    // Reset all squares except for an exemot square if given
  };

  const renderPath = (path) => {};

  return {
    renderPath,
    addHandlerSquares,
  };
})();

export default View;
