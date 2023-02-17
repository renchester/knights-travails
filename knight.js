const Knight = () => {
  const visited = [];
  const moveCounter = 0;

  //  Check if knight is on board
  const onBoard = (knightX, knightY, boardX = 8, boardY = 8) =>
    knightX >= 1 && knightX <= boardX && knightY >= 1 && knightY <= boardY;

  const hasVisited = (knightX, knightY) => {
    visited.forEach((move) => {
      if (move[0] === knightX && move[1] === knightY) return true;
    });

    return false;
  };

  const generateMoves = (startX, startY) => {
    // Valid knight move coordinates for x and y
    const validX = [-2, -1, 1, 2, -2, -1, 1, 2];
    const validY = [-1, -2, -2, -1, 1, 2, 2, 1];

    const validMoves = [];

    for (let i = 0; i <= validX.length - 1; i++) {
      let moveX = startX + validX[i];
      let moveY = startY + validY[i];

      if (onBoard(moveX, moveY)) validMoves.push([moveX, moveY]);
    }

    return validMoves;
  };

  const traverse = (start, end) => {
    const [startX, startY] = start;
    const [endX, endY] = end;

    const validX = [-2, -1, 1, 2, -2, -1, 1, 2];
    const validY = [-1, -2, -2, -1, 1, 2, 2, 1];

    const queue = [];

    queue.push(start);

    while (queue.length) {
      const startPoint = queue.pop();

      if (startPoint[0] === endX && startPoint[1] === endY) {
        return [startPoint[0], startPoint[1]];
      }

      for (let i = 0; i < 8; i++) {
        const nextMoveX = startPoint[0] + validX[i];
        const nextMoveY = startPoint[1] + validY[i];

        if (
          onBoard(nextMoveX, nextMoveY) &&
          !hasVisited(nextMoveX, nextMoveY)
        ) {
          visited.push([nextMoveX, nextMoveY]);
        }
      }
    }
  };

  /*

  const traverse = (start, end, visitArr = []) => {
    let [startX, startY] = start;
    let [endX, endY] = end;
    let visited = visitArr;

    let travelCount = 0;

    if (startX == endX && startY == endY) return 'done';
    else {
      const availableMoves = generateMoves(startX, startY);

      console.log({ startX, startY, availableMoves });

      availableMoves.forEach((move) => {
        console.log(move);
        // traverse(move, end);
      });
    }
  };

  */

  return {
    generateMoves,
    traverse,
  };
};

const jerry = Knight();

jerry.traverse([1, 1], [2, 3]);
