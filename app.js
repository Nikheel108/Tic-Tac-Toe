let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let gamePage = document.querySelector(".main-container");
let onePlayerBtn = document.querySelector("#one-player-btn");
let twoPlayerBtn = document.querySelector("#two-player-btn");
let modeContainer = document.querySelector(".mode-container");

let nameContainer = document.querySelector(".name-container");
let player1Input = document.querySelector("#player1-name");
let player2Input = document.querySelector("#player2-name");
let startBtn = document.querySelector("#start-btn");


let player1Name = "Player 1";
let player2Name = "Player 2";

let turnO = true; //player X , player O
let isOnePlayer = false;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

modeContainer.classList.remove("hide");
msgContainer.classList.add("hide");
gamePage.classList.add("hide");

const resetGame = () => {
    turnO =true;
    enableboxes();
    msgContainer.classList.add("hide");
    gamePage.classList.remove("hide");
    modeContainer.classList.add("hide");
    // If mode selector is visible, hide game page
    // if (!modeContainer.classList.contains("hide")) {
    //     gamePage.classList.add("hide");
    // }
};

const newGame = () => {
    turnO =true;
    enableboxes();
    msgContainer.classList.add("hide");
    gamePage.classList.add("hide");
    modeContainer.classList.remove("hide");
    msg.style.color = "rgb(236, 188, 55)";
    // If mode selector is visible, hide game page
//     if (!modeContainer.classList.contains("hide")) {
//         gamePage.classList.add("hide");
//     }
};

//Mode selection handlers
onePlayerBtn.addEventListener("click", () => {
    isOnePlayer = true;
    modeContainer.classList.add("hide");
    nameContainer.classList.remove("hide");
    player2Input.classList.add("hide");
    player1Input.value = "";
    player1Input.placeholder = "Your Name";
    // gamePage.classList.remove("hide");
    // resetGame();
});

twoPlayerBtn.addEventListener("click", () => {
    isOnePlayer = false;
    modeContainer.classList.add("hide");
    nameContainer.classList.remove("hide");
    player2Input.classList.remove("hide");
    player1Input.value = "";
    player2Input.value = "";
    player1Input.placeholder = "Player 1 Name";
    player2Input.placeholder = "Player 2 Name";
    // gamePage.classList.remove("hide");
    // resetGame();
});

// Start game after entering names
startBtn.addEventListener("click", () => {
    player1Name = player1Input.value.trim() || "Player 1";
    player2Name = isOnePlayer ? "Bot" : (player2Input.value.trim() || "Player 2");
    nameContainer.classList.add("hide");
    gamePage.classList.remove("hide");
    resetGame();
});



// Computer AI: pick random empty box
const computerMove = () => {
    let emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
    if (emptyBoxes.length === 0) return;
    let box = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    box.innerText = "X";
    box.disabled = true;
    turnO = true;
    checkWinner();
}



const disableboxes = () => {
    for (let box of boxes){
        box.disabled = true
    }
};

const enableboxes = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    let winnerName = winner === "O" ? player1Name : player2Name;
    msg.innerText = `Congratulations, Winner is ${winnerName}`;
    msg.style.color = "#10e61aff";//green
    disableboxes();
    msgContainer.classList.remove("hide");
    gamePage.classList.add("hide");
    modeContainer.classList.add("hide");
    
};


const showDraw = () => {
    msg.innerText = "Play again , It's a Draw! ";
    msg.style.color = "#ec2412ff"; // orange/red for draw
    disableboxes();
    msgContainer.classList.remove("hide");
    gamePage.classList.add("hide");
    modeContainer.classList.add("hide");
};



const checkWinner= () => {
    let winnerFound = false;
    for(let pattern of winPatterns){
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;

        if(posVal1 != "" && posVal2 != "" && posVal3 != ""){
            if (posVal1 == posVal2 && posVal2 == posVal3){
                winnerFound = true;
                console.log("Winner",posVal1);
                showWinner(posVal1);
                return;
            
            }
            
        }
    }

    // check for draw
    let filledBoxes = Array.from(boxes).every(box => box.innerText !== "");
    if(!winnerFound && filledBoxes){
        showDraw();
    }
};

boxes.forEach((box, idx) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return ;
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();

        // If 1 player mode and game not over, let computer play
        if (isOnePlayer && !turnO && msgContainer.classList.contains("hide")) {
        computerMove();
        }
    });
});


newGameBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click",resetGame);