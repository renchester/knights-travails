const PositionNode = (coords, parentVal = null) => {
  const [x, y] = coords;
  const position = coords;
  const children = [];
  const parent = parentVal;

  const addChild = (child) => {
    children.push(child);
  };

  return {
    x,
    y,
    position,
    parent,
    children,
    addChild,
  };
};

const Knight = (startPoint) => {
  let rootNode;
  let visited;

  const createPathTree = () => {
    const queue = [rootNode];

    while (queue.length > 0) {
      const currNode = queue.shift();
      const allMoves = generateMoves(currNode.position);

      const nextMoves = allMoves.filter((move) => !hasVisited(move));

      nextMoves.forEach((move) => {
        const node = PositionNode(move, currNode);
        currNode.addChild(node);

        visited.push(node.position);
        queue.push(node);
      });
    }
  };

  const findShortestPath = (target) => {
    const [targetX, targetY] = target;

    if (rootNode.position[0] === targetX && rootNode.position[1] === targetY) {
      return rootNode;
    }

    const queue = [...rootNode.children];

    while (queue.length > 0) {
      const currNode = queue.shift();

      // Check if node is target
      if (currNode.position[0] === targetX && currNode.position[1] === targetY)
        return getPath(currNode);

      queue.push(...currNode.children);
    }
  };

  const getPath = (node) => {
    const path = [node.position];

    while (node.parent !== null) {
      node = node.parent;
      path.push(node.position);
    }

    return path.reverse();
  };

  //  Check if knight is on board
  const onBoard = (boardPosition, boardSize = 8) =>
    boardPosition[0] >= 1 &&
    boardPosition[0] <= boardSize &&
    boardPosition[1] >= 1 &&
    boardPosition[1] <= boardSize;

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

      if (onBoard([moveX, moveY])) validMoves.push([moveX, moveY]);
    }

    return validMoves;
  };

  const init = (startPoint) => {
    if (!onBoard(startPoint)) return 'Invalid board position';

    rootNode = PositionNode(startPoint);
    visited = [startPoint];

    createPathTree();
  };

  init(startPoint);

  return {
    findShortestPath,
  };
};

const knight1 = Knight([1, 1]);

// const jerry = Knight();

// const result = jerry.findShortestPath([1, 1], [4, 4]);

// console.log(result);
