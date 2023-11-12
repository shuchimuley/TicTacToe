// declaring constants and variables 
const WINNING_COMBINATION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const PLAYER_X = "X";
const PLAYER_O = "O";
const cellElements = document.querySelectorAll(".grid-item");
const buttonElement = document.getElementById("submitBtn");

let isPlayerOselected = false;
var PLAYER_X_ARRAY = [];
var PLAYER_O_ARRAY = [];
let noofturns = 0;
let playerWin = "";
var isGameOver = false;

// Add click event to all the cells
addEventListenersToCells();

// Adding click event to the 'reset game' button
buttonElement.addEventListener('click',function(){
    
    // Reset all variables
    isGameOver = false;
    noofturns = 0;
    PLAYER_X_ARRAY = [];
    PLAYER_O_ARRAY = [];
    isPlayerOselected = false;
    playerWin = "";
    document.getElementById("message").innerHTML = playerWin;

    // For each cell remove all the listeners
    cellElements.forEach(cell => {
        cell.removeEventListener('click', () => {
            console.log("Event listeners removed");
        });
    });

    // Reset the content for each cell
    cellElements.forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove("clicked");
    });    
});

// Callback function for add listeners 
function addEventListenersToCells() {
cellElements.forEach(cell => {
    cell.addEventListener('click', function() {
        if (!this.classList.contains("clicked") && !isGameOver){
            noofturns++;
            if(isPlayerOselected){
                this.innerHTML = "<span style='color:#000'>O</span>";
                
                this.classList.add("clicked");
                
                // add the cell numbers to the list
                PLAYER_O_ARRAY.push(parseInt(this.id));
                
            } else {
                this.innerHTML = "X";
                this.classList.add("clicked");
                
                // add the cell numbers to the list
                PLAYER_X_ARRAY.push(parseInt(this.id));
            }
        }
        
        // sort the array when the number of turns are more than 5. This is because the game can be won after minimum 5 turns
        if (noofturns >=5){
            // See if player X or O is selected
            if (isPlayerOselected){
                PLAYER_O_ARRAY.sort();
                console.log(`Player 0 sorted : ${PLAYER_O_ARRAY}`);

                // find winning player
                let winOrNot = isAWinner(PLAYER_O_ARRAY);
                if (winOrNot){
                    playerWin = "Player O won the game!";
                    isGameOver = true;
                } else if (noofturns == 9) { 
                    playerWin = "Game is Draw";
                    isGameOver = true;
                }
            
            } else {
                PLAYER_X_ARRAY.sort();
                
                // find winning player
                let winOrNot = isAWinner(PLAYER_X_ARRAY);
                if (winOrNot){
                    playerWin = "Player X won the game!";
                    isGameOver = true;
                } else if (noofturns == 9) { 
                    playerWin = "Game is Draw";
                    isGameOver = true;
                } 
                
            }

        }
        
        // Select the next player
        isPlayerOselected = !isPlayerOselected;
        document.getElementById("message").innerHTML = playerWin;
       
    });
});
}

// Check to see if there is a winner
function isAWinner(winningArray){
    let isWin = false;

    // check the array for each X and O players with the winning combination
     for (var i = 0; i < WINNING_COMBINATION.length; i++){
        if(WINNING_COMBINATION[i].every(val => winningArray.includes(val)))
        {
            isWin = true;
            break;
        }
     }
    return isWin;
}
