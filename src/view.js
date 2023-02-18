import knightIcon from './img/knight.png';

const View = (() => {
  const squares = [...document.querySelectorAll('.board__square')];
  const btnReset = document.querySelector('.btn__reset');

  const generateKnightIconMarkup = () => ` 
        <img
            src="${knightIcon}"
            class="knight__icon"
            alt="Knight Icon"/>`;

  const generatePathMarkup = (i, totalLength) => ` 
            <div class="path-number__icon">${+i + 1}</div>
              <img
                src="${knightIcon}"
                class="knight__icon ${
                  i === 0 || i === totalLength ? '' : 'path-visited'
                }"
                alt="Knight Icon"
              />`;

  const resetSquares = () => {
    squares.forEach((square) => (square.innerHTML = ''));
  };

  const renderPath = (allPaths) => {
    allPaths.forEach((path, index, array) => {
      const [targetX, targetY] = path;

      squares.forEach((square) => {
        const { x, y } = square.dataset;

        if (+targetX === +x && +targetY === +y) {
          square.insertAdjacentHTML(
            'afterbegin',
            generatePathMarkup(index, array.length - 1),
          );
        }
      });
    });
  };

  const addHandlerSquares = (handler) => {
    squares.forEach((square) =>
      square.addEventListener('click', (e) => {
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

  const addHandlerReset = (handler) => {
    btnReset.addEventListener('click', resetSquares);
    btnReset.addEventListener('click', handler);
  };

  return {
    renderPath,
    resetSquares,
    addHandlerSquares,
    addHandlerReset,
  };
})();

export default View;
