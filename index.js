"use strict"

let board = document.querySelector(".board");
let gridBoard = [];
let difficulty = 6;
let bombs = [];
let surroundingPattern = [
    [-1,-1],[-1,0],[-1,1]
    ,[0,-1],        [0,1]
    ,[1,-1],[1,0],[1,1]
];

function intialize()
{
    for(let i = 1; i < 11; i++)
        {
            for(let j = 1; j < 11; j++)
            {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.style.gridColumn = i;
                cell.style.gridRow = j;
                cell.addEventListener("click", detectClick);
                board.appendChild(cell);
            }
        }

    for(let i = 0; i < 10; i++)
        {
            let column = [];
        
            for(let j = 0; j < 10; j++)
            {
                column.push(0);
            }
        
            gridBoard.push(column);
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
        while(checkDuplicates(bomb));

        bombs.push([bomb[0],bomb[1]]);
    }

    bombs.forEach(Element => 
    {
        gridBoard[Element[0]][Element[1]] = -1;
    });
}

function checkDuplicates(bomb)
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

function generateSurroundingNumbers()
{
    bombs.forEach(Element => 
    {
        surroundingPattern.forEach(pattern => 
        {
            let collumn = Element[0] + pattern[0];
            let row = Element[1] + pattern[1];
            if( collumn >= 0 && collumn < 10 && row >= 0 && row < 10)
            {
                if(gridBoard[collumn][row] >= 0)
                {
                    gridBoard[Element[0]+pattern[0]][Element[1]+pattern[1]] += 1;
                }
            }
        });
    });
}

function detectClick(event)
{
    event.target.className = "cellTwo";
}


function revealAll()
{
    for(let i = 0; i < 10; i++)
    {
        for(let j = 0; j < 10; j++)
        {
            if(gridBoard[j][i] >= 0)
            {
                let newCell = document.createElement("div");
                newCell.className = "cellTwo";
                newCell.style.gridColumn = i + 1;
                newCell.style.gridRow = j + 1;
                if(gridBoard[j][i] > 0)
                {
                    newCell.innerHTML = gridBoard[j][i];
                }
                board.appendChild(newCell);
            }
        }
    }
}


intialize();
generateBombs();
generateSurroundingNumbers();
revealAll();
console.log(gridBoard);