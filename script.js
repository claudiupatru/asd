const cells = document.querySelectorAll(".cell")
const statusText = document.querySelector("#statusText")
const resetBtn = document.querySelector("#resetBtn")
const start = document.querySelector("#start")

const winConditions = [
    [0,1,2],
    [0,3,6],
    [6,7,8],
    [2,5,8],
    [3,4,5],
    [0,4,8],
    [2,4,6],
    [1,4,7]
]

let options = ["","","","","","","","",""]
let currentPlayer = "X"
let running = false

statusText.textContent = "Press Start Button";

start.addEventListener("click",initializeGame);

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    resetBtn.addEventListener("click", restartGame);
    start.style.display = "none" 
    statusText.textContent = `Andra's turn`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);

    if(checkWinner()) {
        return;
    }

    // Make the computer's choice random
    let computerChoice;
    do {
        computerChoice = Math.floor(Math.random() * 9); // Choose a random index between 0 and 8
    } while (options[computerChoice] != ""); // Keep choosing random indices until an empty cell is found

    const cell = document.querySelector(`.cell[cellIndex="${computerChoice}"]`);
    updateCell(cell, computerChoice);

    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    if (currentPlayer === "X"){
    cell.textContent = currentPlayer;
    } else {cell.textContent = "O"}
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "Computer" : "X";
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        statusText.textContent +=" Press Restart";
        running = false;
        return true;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!\nPress Restart`;
        running = false;
        return true;
    }
    else{
        changePlayer();
        return false;
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Press Start Button`;
    cells.forEach(cell => cell.textContent = "");
    start.style.display  = "";
}
