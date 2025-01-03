"use strict"

let board = document.querySelector(".board");
let gridBoard = [];
let difficulty = 10;
let bombs = [];
let cellElements = [];
let surroundingPattern = [
    [-1,-1],[0,-1],[1,-1]
    ,[-1,0],        [1,0]
    ,[-1,1],[0,1],[1,1]
];

//initialize the game
function intializeBoard()
{
    for(let i = 0; i < 10; i++)
        {
            let rows = [];

            for(let j = 0; j < 10; j++)
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

    //filling gridboard with 0
    for(let i = 0; i < 10; i++)
        {
            let collumn = [];
        
            for(let j = 0; j < 10; j++)
            {
                collumn.push(0);
            }
        
            gridBoard.push(collumn);
        }
}

//generate bomb positions
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

        bombs.push([bomb[1],bomb[0]]);
    }

    //adding bombs to the grid
    bombs.forEach(Element => 
    {
        gridBoard[Element[1]][Element[0]] = -1;
    });
}


//check if a bomb position is duplicated
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

//calculate numbers indicating bomb Surrounding
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

//handle a cell click
function detectClick(event)
{
    if(gridBoard[event.target.dataset.row][event.target.dataset.column] >= 0)
    {
        cellElements[event.target.dataset.row][event.target.dataset.column].className = "cellTwo";
    }
    revealSurroundingCells(event.target);
}

//reveal surrounding cells
function revealSurroundingCells(clickedCell)
{
    surroundingPattern.forEach(pattern => 
    {
        let collumn = Number(clickedCell.dataset.column) + pattern[0];
        let row = Number(clickedCell.dataset.row) + pattern[1];

        revealCell(row,collumn);
    });
}

//reveal a single cell
function revealCell(row,collumn)
{
    if( collumn >= 0 && collumn < 10 && row >= 0 && row < 10 )
        {
            if(gridBoard[row][collumn] === 0)
            {
                cellElements[row][collumn].className = "cellTwo";
                gridBoard[row][collumn] = -2;
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



intializeBoard();
generateBombs();
calculateSurroundingNumbers();
console.log(gridBoard);