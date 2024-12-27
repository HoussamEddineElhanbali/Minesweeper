"use strict"

let board = document.querySelector(".board");
let gridBoard = [];

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

function detectClick(event)
{
    event.target.className = "cellTwo";
}

let bombs = [];

function generateBombs()
{
    let bomb;

    bomb = fillBomb();

    bombs.forEach(Element => 
    {
        while(Element.x === bomb.x && Element.y === bomb.y)
            {
                bomb = fillBomb();
            }
    });

    bombs.push(bomb);
}

function fillBomb()
{
    let x = Math.floor((Math.random() * 10) + 1);
    let y = Math.floor((Math.random() * 10) + 1);
    
    return {x,y};
}

intialize();

generateBombs();
console.log(bombs);