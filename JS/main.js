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
const WINNING_SCORE = 10
const PADDLE_SPEED = 20
/*----- app's state (variables) -----*/
let game_status = 0 //game_status is added to make the render function exit the loop, when restart the game
let scores
let results
let winner
let ball_position = {
    x_axis: 300, // x-axis 300 (half of 600px width)
    y_axis: 200, // y-axis 200(half of 400px height)
    x_velocity: 2, // Speed and direction of the ball on the x axis
    y_velocity: 2  // Speed and direction of the ball on the y axis
}

/*----- cached element references -----*/
const player_score = document.querySelector('.player_score')
const AI_score = document.querySelector('.ai_score')
const left_paddle = document.querySelector('.left_paddle')
const right_paddle = document.querySelector('.right_paddle')
const ball = document.querySelector('.ball')
const play_button = document.querySelector('#start_button')
const countdown = document.querySelector('.countdown')

/*----- event listeners -----*/
play_button.addEventListener('click', init)
document.addEventListener('keydown', move_paddle);

/*----- functions -----*/

function init() {
    game_status = 0 //1 to run the game, 0 stop the game
    scores = { //upon calling, reset the scores to 0 
        Player : 0,
        AI : 0
    }
    reset_board() //reset the board to the inital state
    update_score() //update the score after resetting
    start_countdown()
}

function reset_board() {
    ball.style.display = 'none' // added this display style to hide the ball after restarting
    ball.style.top =  '50%' //reset the ball to middle of the board
    ball.style.left = '50%' 
    left_paddle.style.top = '50%' //reset the paddle to starting position
    right_paddle.style.top = '50%'
    reset_ball_position()
}

function reset_ball_position() {
    ball_position.x_axis = 300;
    ball_position.y_axis = 200;
    ball_position.x_velocity = 2;
    ball_position.y_velocity = 2;
}

function update_score() {
    player_score.innerText = scores.Player  
    AI_score.innerText = scores.AI
}

function start_countdown() {
    play_button.innerText = 'Restart Game' //once button clicked change to Restart Game
    countdown.innerText = 3 //set the initial countdown to 3
    countdown.style.display = 'block' //upon calling make the countdown timer visible on the screen
    let countdown_timer = 3
    countdown_initiate() //this function will deduct 1 from the countdown_timer every 1 second

    function countdown_initiate(){
        countdown_timer -= 1
        countdown.innerText = countdown_timer
        if (countdown_timer > 0) {
            setTimeout(countdown_initiate, 1000) //check if countdown is not 0, if not call the function again in 1 second
        } else {
            countdown.style.display = 'none'//hide the countdown timer from the screen
            game_status = 1 //start the game by change the game_status to 1
            render()
        }
    }
}

function render() {
    if (game_status === 1) { //check if game is running, if yes render everything.
        ball.style.display = 'block'//make ball visible  
        update_ball_heading()
        ball_collision()
        render_ball_position()
        AI_paddle_movement()
        requestAnimationFrame(render) //keep looping the render function 
    } else {
        return
    }
}

function update_ball_heading() { //very basic ball movement logic
    ball_position.x_axis += ball_position.x_velocity
    ball_position.y_axis += ball_position.y_velocity
}

function ball_collision() {
    if (ball_position.y_axis <= 0|| ball_position.y_axis >= 400) {// when ball going upwards it become negative
        ball_position.y_velocity = -ball_position.y_velocity //when ball going downwards it become positive
    }                                                        //so when hit the board, deduct with y_velocity
}                                                            //positive become negative & and negative become positive 
              
function render_ball_position() { //render ball position with x and y axis from the ball_position state
    ball.style.left = ball_position.x_axis + 'px'
    ball.style.top = ball_position.y_axis + 'px'
}

function move_paddle(key) {
    if (key.code === 'ArrowDown') {
        move_paddle_down()
    } else if(key.code === 'ArrowUp') {
        move_paddle_up()
    }
}

function move_paddle_up() {
    let current_position = right_paddle.offsetTop
    if (current_position > 0) { //cannot be lesser than 0, if not paddle will exit the board
        right_paddle.style.top = (current_position - PADDLE_SPEED) + 'px';
    }
}

function move_paddle_down() {
    let current_position = right_paddle.offsetTop //get current paddle position using offsetTop, to get only integer
    if (current_position + right_paddle.offsetHeight < 400) {  // 400 = board height, offsetHeight to get padding height in integer
        right_paddle.style.top = (current_position + PADDLE_SPEED) + 'px'
    } // if paddle current position added with paddle_speed(10) is greater than 400, it will not move
}

function AI_paddle_movement() {
    let ball_y_position = ball_position.y_axis //get ball y_aixs current position
    let paddle_center = left_paddle.offsetHeight / 2 //to get the paddle center px
    left_paddle.style.top = (ball_y_position - paddle_center) + 'px'
}
