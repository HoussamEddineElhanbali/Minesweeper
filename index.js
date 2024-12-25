"use strict"

let board = document.querySelector(".board");

for(let i = 1; i < 11; i++)
{
    for(let j = 1; j < 11; j++)
    {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.gridColumn = i;
        cell.style.gridRow = j;
        board.appendChild(cell);
    }
}

let cellTwo = document.createElement("div");

cellTwo.classList.add("cellTwo");
cellTwo.style.gridColumn = 5;
cellTwo.style.gridRow = 5;
board.appendChild(cellTwo);