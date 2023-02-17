/**
 * Node factory function
 *
 * @param {[x, y]} coords - Takes an array with exactly two values representing
 * the x and y position of the node
 * @param {*} parentVal - Default: null; Links the node to a parent node if given
 *
 * @returns an object representing the node's position and links
 */

const PositionNode = (coords, parentVal = null) => {
  const position = coords;
  const children = [];
  const parent = parentVal;

  const proto = {
    addChild(child) {
      children.push(child);
    },
  };

  return Object.assign(Object.create(proto), { position, children, parent });
};

/**
 * Knight factory function
 *
 * @param {[x, y]} startPoint - Takes an array with exactly two values
 * representing the x and y starting position of Knight
 * @returns a Knight object with the findShortestPath method
 */

const Knight = (startPoint) => {
  let rootNode;
  let visited;

  // Helper function to check if the current node is the target destination
  const doesPositionMatch = (node, target) =>
    node.position[0] === target[0] && node.position[1] === target[1];

  // Helper function to check if the position given is within the boundaries of the board
  const onBoard = (boardPosition, boardSize = 8) =>
    boardPosition[0] >= 1 &&
    boardPosition[0] <= boardSize &&
    boardPosition[1] >= 1 &&
    boardPosition[1] <= boardSize;

  // Helper function to check if the position given has been visited. Compares position
  // an array 'visited' which is a property of the knight
  const hasVisited = (boardPosition) =>
    visited.some(
      (move) => move[0] === boardPosition[0] && move[1] === boardPosition[1],
    );

  /**
   * Generates all the possible moves a knight can take
   * @param {[x,y]} boardPosition - Takes an array with exactly two values representing the x and y position of the knight
   * @returns an array of moves with each move in the format *[x, y]*
   */

  const generateMoves = (boardPosition) => {
    // Valid knight move coordinates for x and y
    const validX = [-2, -1, 1, 2, -2, -1, 1, 2];
    const validY = [-1, -2, -2, -1, 1, 2, 2, 1];

    const validMoves = [];

    for (let i = 0; i <= validX.length - 1; i++) {
      const moveX = boardPosition[0] + validX[i];
      const moveY = boardPosition[1] + validY[i];

      if (onBoard([moveX, moveY])) validMoves.push([moveX, moveY]);
    }

    return validMoves;
  };

  /**
   * Traces the path that the knight took to get to the destination using parental links
   * @param {{position: [x, y], parent: {}}} node
   * @returns an array with the traversed paths *[[x1, y1], [x2, y2], [x3, y3]]*
   */
  const getPath = (node) => {
    const path = [];

    while (node) {
      path.push(node.position);
      node = node.parent;
    }

    return path.reverse();
  };

  /**
   * Uses breadth-first search to get the shortest path of a knight from one point to another.
   *
   * @param {[x, y]} target - Takes an array with exactly two values representing the x and y position of the destination
   * @returns an array of traversed paths from the starting point(root) to the destination
   */

  const findShortestPath = (target) => {
    const queue = [rootNode];

    while (queue.length > 0) {
      const currNode = queue.shift();

      // 1Check if starting point is the target
      if (doesPositionMatch(currNode, target)) return getPath(currNode);

      // Generate all possible moves then filter out valid moves on unvisited squares
      const allMoves = generateMoves(currNode.position);
      const nextMoves = allMoves.filter((move) => !hasVisited(move));

      // Create a link between current node and next move nodes (creates a tree)
      nextMoves.forEach((move) => {
        const node = PositionNode(move, currNode);
        currNode.addChild(node);
        visited.push(node.position);

        // Check if node is the target position
        if (doesPositionMatch(node, target)) return getPath(node);
      });

      // Enqueue node children
      queue.push(...currNode.children);
    }
  };

  // Init function to take the place of a constructor
  const init = (start) => {
    if (!onBoard(start)) return 'Invalid board position';

    rootNode = PositionNode(start);
    visited = [start];
  };

  init(startPoint);

  return {
    findShortestPath,
  };
};

export default Knight;
