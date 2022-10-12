/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (newBoard, x, y, newNonMinesCount) => {
    newBoard[x][y].revealed = true;
    newNonMinesCount--;

    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'newBoard' may be changed in this function.

    const offset = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];

    if (newBoard[x][y].value === 0) {
      for (let i = 0; i < offset.length; i++) {
        const bs = newBoard.length;
        const pos = offset[i];
        const _x = x + pos[0];
        const _y = y + pos[1];
        
        if (_x >= 0 && _x < bs && _y >= 0 && _y < bs) {
          if (!newBoard[_x][_y].revealed && !newBoard[_x][_y].flagged && !newBoard[_x][_y].value !== '💣') {
            ({ newBoard, newNonMinesCount } = revealed(newBoard, _x, _y, newNonMinesCount));
          }
        }
      }
    }

    return { newBoard, newNonMinesCount };
};
