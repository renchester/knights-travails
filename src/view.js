/* eslint-disable prefer-arrow-callback */
import knightIcon from './img/knight.png';

const View = (() => {
  const squares = [...document.querySelectorAll('.board__square')];

  const generateKnightIconMarkup = () => ` 
        <img
            src="${knightIcon}"
            class="knight__icon"
            alt="Knight Icon"/>`;

  const generatePathMarkup = (i) => ` 
            <div class="path-number__icon">${+i + 1}</div>
              <img
                src="${knightIcon}"
                class="knight__icon path-visited"
                alt="Knight Icon"
              />`;

  const addHandlerSquares = (handler) => {
    squares.forEach((square) =>
      square.addEventListener('click', function getSquareCoordinates(e) {
        const chosenSquare = e.target.closest('.board__square');
        const { x, y } = chosenSquare.dataset;

        chosenSquare.innerHTML = '';
        chosenSquare.insertAdjacentHTML(
          'afterbegin',
          generateKnightIconMarkup(),
        );

        handler([+x, +y]);
      }),
    );
  };

  const resetSquares = (exemptSquare) => {
    // Reset all squares except for an exemot square if given
  };

  const renderPath = (allPaths) => {
    allPaths.forEach((path, index) => {
      const [targetX, targetY] = path;

      squares.forEach((square) => {
        const { x, y } = square.dataset;

        if (+targetX === +x && +targetY === +y) {
          square.insertAdjacentHTML('afterbegin', generatePathMarkup(index));
        }
      });
    });
  };

  return {
    renderPath,
    addHandlerSquares,
  };
})();

export default View;
