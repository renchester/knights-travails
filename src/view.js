import knightIcon from './img/knight.png';

const View = (() => {
  const squares = [...document.querySelectorAll('.board__square')];
  const boardEl = document.querySelector('.board__wrapper');
  const btnReset = document.querySelector('.btn__reset');
  const statusEl = document.querySelector('.status-bar');
  const themeSwitcher = document.querySelector('#themeSwitch');

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

  const displayStatus = (status) => {
    statusEl.textContent =
      status === 'start'
        ? 'Choose a starting point'
        : 'Choose a destination point for the knight';
  };

  const addHandlerSquares = (handler) => {
    boardEl.addEventListener('click', (e) => {
      const chosenSquare = e.target.closest('.board__square');

      if (!chosenSquare) return;

      const { x, y } = chosenSquare.dataset;

      chosenSquare.innerHTML = '';
      chosenSquare.insertAdjacentHTML('afterbegin', generateKnightIconMarkup());

      handler([+x, +y]);
    });
  };

  const addHandlerReset = (handler) => {
    btnReset.addEventListener('click', resetSquares);
    btnReset.addEventListener('click', handler);
  };

  const addHandlerToggleTheme = () => {
    themeSwitcher.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('preferredTheme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('preferredTheme', 'light');
      }
    });
  };

  const setPageTheme = () => {
    const preferredTheme = localStorage.getItem('preferredTheme');

    if (!preferredTheme || preferredTheme === 'light') {
      document.body.classList.remove('dark-mode');
      themeSwitcher.checked = false;
    } else if (preferredTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeSwitcher.checked = true;
    }
  };

  return {
    renderPath,
    resetSquares,
    displayStatus,
    addHandlerSquares,
    addHandlerReset,
    addHandlerToggleTheme,
    setPageTheme,
  };
})();

export default View;
