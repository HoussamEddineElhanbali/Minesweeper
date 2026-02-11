# Minesweeper Game

This is a basic implementation of the classic Minesweeper game using HTML, CSS, and JavaScript. The game generates a 10x10 grid, places bombs randomly, and calculates surrounding numbers to indicate how many bombs are adjacent to each cell.

## Features

- Game Grid: A 10x10 grid where each cell can be clicked to reveal either a number (indicating bombs around it) or a bomb itself.
- Bombs: Randomly placed bombs within the grid.
- Difficulty: The number of bombs can be adjusted using the difficulty variable.
- Game Over: If a bomb is clicked, the game ends, and all cells are locked.
- Restart: The game can be restarted using the restart button.

## How to Play

- Click on any cell to reveal it. If the cell contains a number, it indicates how many bombs are in the surrounding cells.
- If a bomb is revealed, the game is over.
- The goal is to reveal all the cells that do not contain bombs without clicking on a bomb.