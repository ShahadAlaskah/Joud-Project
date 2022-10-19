export const Start = "Start";
export const Foggy = "Foggy";
export const Pessimist = "pessimist";
export const Nor = "nor";
export const Den = "den";
export const Tape = "tape";

export const createBoardItems = () => {
  let board = [{ roomNumber: 0, roomItem: Start }];
  const boardItems = [Foggy, Pessimist, Tape];

  for (let index = 1; index < 35; index++) {
    let boardItem = boardItems[Math.floor(Math.random() * boardItems.length)];
    board.push({ roomNumber: index, roomItem: boardItem });
  }
  board.push({ roomNumber: 35, roomItem: Den });

  return board;
};
export const createBoard = () => {
  let board = [{ roomNumber: 0, roomItem: Start }];

  for (let index = 1; index < 35; index++) {
    board.push({ roomNumber: index, roomItem: "X" });
  }
  board.push({ roomNumber: 35, roomItem: Den });

  return board;
};

export const adjacentRoom = (currentRoomNumber, selectedRoomNumber) => {
  let l = currentRoomNumber + 1;
  let r = currentRoomNumber - 1;
  let u = currentRoomNumber + 6;
  let d = currentRoomNumber - 6;
  if (
    l === selectedRoomNumber ||
    r === selectedRoomNumber ||
    u === selectedRoomNumber ||
    d === selectedRoomNumber
  ) {
    return true;
  }
  return false;
};
