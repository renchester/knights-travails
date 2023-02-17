const PositionNode = (coords) => {
  const [x, y] = coords;
  const children = [];

  let parent = null;

  const setParent = (parentValue) => {
    parent = parentValue;
  };

  const addChild = (child) => {
    children.push(child);
  };

  return {
    x,
    y,
    parent,
    children,
    setParent,
    addChild,
  };
};

const Knight = (startPoint) => {
  if (!onBoard(startPoint)) return 'Invalid board position';

  const rootNode = PositionNode(startPoint);
  const visited = [startPoint];

  createPathTree();

  const createPathTree = () => {
    const queue = [rootNode];

    while (queue.length > 0) {
      const currNode = queue.shift();
      const allMoves = generateMoves([currNode.x, currNode.y]);

      const nextMoves = allMoves.filter((move) => !hasVisited(move));

      nextMoves.forEach((move) => {
        const node = PositionNode(move);
        currNode.addChild(node);
        node.setParent(currNode);

        queue.push(node);
      });
    }
  };

  const findShortestPath = (start, end) => {};

  //  Check if knight is on board
  const onBoard = (knightX, knightY, boardSize = 8) =>
    knightX >= 1 &&
    knightX <= boardSize &&
    knightY >= 1 &&
    knightY <= boardSize;

  const hasVisited = (boardPosition) => {
    return visited.some(
      (move) => move[0] === boardPosition[0] && move[1] === boardPosition[1],
    );
  };

  const generateMoves = (boardPosition) => {
    const [startX, startY] = boardPosition;

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

  /*
  const findShortestPath = (start, end) => {
    if (!onBoard(...start)) return 'Starting point is not on board';
    if (!onBoard(...end)) return 'Destination point is not on board';

    const [startX, startY] = start;
    const [endX, endY] = end;

    const queue = [];

    queue.push(start);
    visited.push(start);

    while (queue.length) {
      const startPoint = queue.shift();

      //   CALL BACK PORTION

      if (startPoint[0] === endX && startPoint[1] === endY) {
        return 'finished';
      }

      for (let i = 0; i < 8; i++) {
        const nextMoveX = startPoint[0] + validX[i];
        const nextMoveY = startPoint[1] + validY[i];

        if (
          onBoard(nextMoveX, nextMoveY) &&
          !hasVisited(nextMoveX, nextMoveY)
        ) {
          visited.push([nextMoveX, nextMoveY]);
          queue.push([nextMoveX, nextMoveY]);

          knightMoves[nextMoveX][nextMoveY] =
            knightMoves[startPoint[0]][knightMoves[1]] + 1;
        }
      }
    }
    return -1;
  };

  */

  return {
    generateMoves,
    findShortestPath,
  };
};

// const jerry = Knight();

// const result = jerry.findShortestPath([1, 1], [4, 4]);

// console.log(result);
