// Start :
// start message/prompt : Click Start to play


// Set ball to center of the board
// Set paddle_1 (AI) to left side and centered (centered vertically in board)
// Set paddle_2 (human) to right side and centered (centered vertically in board)
// Set initial ball direction (left or right)
// Set initial scores to 0 for both human and AI
// when ball hit the paddle, play bounce sound
// Score limit of 10

// if player reach score of 10, prompt user wins message
// otherwise prompt user lose message

// game board logic :
// ball cannot exit top or bottom of board - reverse ball direction
// if ball collides with left or right paddle, - reverse ball direction
// if ball passes left paddle = increase player socre by 1 
// if ball passes right paddle = increase AI score by 1

// game controls:
// up / down button to control player's paddle (left paddle)
// create a AI algo to follow ball's vertical position (right paddle)

/*----- constants -----*/


/*----- app's state (variables) -----*/
let scores
let results
let winner

/*----- cached element references -----*/
const player_score = document.querySelector('.player_score')
const AI_score = document.querySelector('.AI_score')
const left_paddle = document.querySelector('.paddle_1')
const right_paddle = document.querySelector('.paddle_2')
const ball = document.querySelector('.ball')
/*----- event listeners -----*/


/*----- functions -----*/
init()

function init() {
    scores = {
        Player : 0,
        AI : 0
    }
}






