"use strict"

//you can change the cell number here the gird is a square if the gridSize is 10 it will be 10 X 10
let grideSize = 10;
const board = document.querySelector(".board");
const restartButton = document.querySelector(".restart");
let gridBoard = [];
//you can change the difficulty by increasing the number of bombs to be found i put 15 you can start with less
const difficulty = 15;
let bombs = [];
let cellElements = [];
const surroundingPattern = [
    [-1,-1],[0,-1],[1,-1]
    ,[-1,0],        [1,0]
    ,[-1,1],[0,1],[1,1]
];

function intializeBoard()
{
    for(let i = 0; i < grideSize; i++)
        {
            let rows = [];

            for(let j = 0; j < grideSize; j++)
            {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.style.gridColumn = j + 1;
                cell.style.gridRow = i + 1;
                cell.dataset.column = j;
                cell.dataset.row = i;
                cell.addEventListener("click", detectClick);
                rows.push(cell);
                board.appendChild(cell);
            }

            cellElements.push(rows);
        }

    for(let i = 0; i < difficulty; i++)
        {
            let collumn = [];
        
            for(let j = 0; j < difficulty; j++)
            {
                collumn.push(0);
            }
        
            gridBoard.push(collumn);
        }
}

function generateBombs()
{
    for(let i = 0; i < difficulty; i++)
    {
        let bomb = [];

        do
        {
            bomb[0] = Math.floor(Math.random() * 10);
            bomb[1] = Math.floor(Math.random() * 10);
        }
        while(isBombDuplicated(bomb));

        bombs.push([bomb[0],bomb[1]]);
    }

    bombs.forEach(Element => 
    {
        gridBoard[Element[1]][Element[0]] = -1;
    });
    console.log(bombs);
}

function isBombDuplicated(bomb)
{
    for(let i = 0; i < bombs.length; i++)
    {
        if(bomb[0] === bombs[i][0] && bomb[1] === bombs[i][1])
        {
            return true;
        }
    }
    return false;
}

function calculateSurroundingNumbers()
{
    bombs.forEach(bomb => 
    {
        surroundingPattern.forEach(pattern => 
        {
            let collumn = bomb[0] + pattern[0];
            let row = bomb[1] + pattern[1];
            if( collumn >= 0 && collumn < 10 && row >= 0 && row < 10)
            {
                if(gridBoard[row][collumn] >= 0)
                {
                    gridBoard[row][collumn] += 1;
                }
            }
        });
    });
}

function detectClick(event)
{
    let clickedCell = event.target;

    if(clickedCell.className !== "cell")
    {
        return;
    }

    if(gridBoard[clickedCell.dataset.row][clickedCell.dataset.column] < 0)
    {
        cellElements[clickedCell.dataset.row][clickedCell.dataset.column].className = "bomb";
        gameOver();
    }

    if(gridBoard[clickedCell.dataset.row][clickedCell.dataset.column] >= 0)
    {
        cellElements[clickedCell.dataset.row][clickedCell.dataset.column].className = "cellTwo";

        if(gridBoard[clickedCell.dataset.row][clickedCell.dataset.column] > 0)
        {
            cellElements[clickedCell.dataset.row][clickedCell.dataset.column].innerHTML = gridBoard[clickedCell.dataset.row][clickedCell.dataset.column];
        }
    }
    revealSurroundingCells(clickedCell);
}

function revealSurroundingCells(clickedCell)
{
    surroundingPattern.forEach(pattern => 
    {
        let collumn = Number(clickedCell.dataset.column) + pattern[0];
        let row = Number(clickedCell.dataset.row) + pattern[1];

        revealCell(row,collumn);
    });
}

function revealCell(row,collumn)
{
    if( collumn >= 0 && collumn < 10 && row >= 0 && row < 10 )
        {
            if(gridBoard[row][collumn] === 0)
            {
                cellElements[row][collumn].className = "cellTwo";
                gridBoard[row][collumn] = "#";
                revealSurroundingCells(cellElements[row][collumn]);
            }
            if(gridBoard[row][collumn] > 0)
            {
                cellElements[row][collumn].className = "cellTwo";
                cellElements[row][collumn].innerHTML = gridBoard[row][collumn];
                return;
            }
            if(gridBoard[row][collumn] < 0)
            {
                return;
            }
        }
}

function gameOver()
{
    gridBoard = [];
    for(let i = 0; i < difficulty; i++)
        {
            let collumn = [];
        
            for(let j = 0; j < difficulty; j++)
            {
                collumn.push("#");
            }
        
            gridBoard.push(collumn);
        }
}

restartButton.addEventListener("click", startGame);

function startGame()
{
    board.replaceChildren();
    gridBoard = [];
    bombs = [];
    cellElements = [];
    intializeBoard();
    generateBombs();
    calculateSurroundingNumbers();
    console.log(gridBoard);
}

startGame();