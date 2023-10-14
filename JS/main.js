// Start :
// start message/prompt : Click Start to play


// Set ball to center of the board
// Set left_paddle (AI) to left side and centered (centered vertically in board)
// Set right_paddle (Player) to right side and centered (centered vertically in board)
// Set initial ball direction (center to left or right)
// Set initial scores to 0 for both human and AI

// Score limit of 10

// if player reach score of 10, prompt user wins message
// otherwise prompt user lose message

// game board logic :
// ball cannot exit top or bottom of board - reverse ball direction
// if ball hit with left or right paddle, - reverse ball direction
// when ball hit the paddle, play bounce sound
// if ball passes left paddle = increase player socre by 1 
// if ball passes right paddle = increase AI score by 1

// game controls:
// up / down button to control player's paddle (right paddle)
// create a AI algo to follow ball's vertical position (left paddle)

/*----- constants -----*/


/*----- app's state (variables) -----*/
let scores
let results
let winner

/*----- cached element references -----*/
const player_score = document.querySelector('.player_score')
const AI_score = document.querySelector('.AI_score')
const left_paddle = document.querySelector('.left_paddle')
const right_paddle = document.querySelector('.right_paddle')
const ball = document.querySelector('.ball')
const play_button = document.querySelector('#start_button')
/*----- event listeners -----*/
play_button.addEventListener('click, init')

/*----- functions -----*/
init()

function init() {
    scores = { //upon calling, reset the scores to 0 
        Player : 0,
        AI : 0
    }
    reset_board() //reset the board to the inital state
    update_score() //update the score after resetting
}

function reset_board() {
    ball.style.top =  '50%' //reset the ball to middle of the board
    ball.style.left = '50%' 
    left_paddle.style.top = '50%' //reset the paddle to middle of the board
    right_paddle.style.top = '50%'
}

function update_score() {
    player_score.innerText = scores.Player  
    AI_score.innerText = scores.AI
}






