/*----- constants -----*/
const WINNING_SCORE = 5
const PADDLE_SPEED = 30
/*----- app's state (variables) -----*/
let game_status = 0 //game_status is added to make the render function exit the loop, when restart the game
let scores
let results
let winner
let ball_position = {
    x_axis: 300, // x-axis 300 (half of 600px width)
    y_axis: 200, // y-axis 200(half of 400px height)
    x_velocity: 3, // Speed and direction of the ball on the x axis
    y_velocity: 3  // Speed and direction of the ball on the y axis
}

/*----- cached element references -----*/
const player_score = document.querySelector('.player_score')
const AI_score = document.querySelector('.ai_score')
const left_paddle = document.querySelector('.left_paddle')
const right_paddle = document.querySelector('.right_paddle')
const ball = document.querySelector('.ball')
const play_button = document.querySelector('#start_button')
const countdown = document.querySelector('.countdown')
const paddle_bounce_sound = new Audio('./AUDIO/paddle.wav')
const board_bounce_sound = new Audio('./AUDIO/board.wav')
const button_click_sound = new Audio('./AUDIO/button.wav')
const score_sound = new Audio('./AUDIO/score.wav')
const win_sound = new Audio('./AUDIO/win.wav')
const lose_sound = new Audio('./AUDIO/lose.wav')
/*----- event listeners -----*/
play_button.addEventListener('click', init)
document.addEventListener('keydown', move_paddle)
/*----- functions -----*/

function init() {
    button_click_sound.play()
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
    game_status = 0 //added game_status here to stop render loop after scoring
    ball.style.display = 'none' // added this display style to hide the ball after restarting
    ball.style.top =  '50%' //reset the ball to middle of the board
    ball.style.left = '50%' 
    left_paddle.style.top = '50%' //reset the paddle to starting position
    right_paddle.style.top = '50%'
    reset_ball_position()
}

function reset_ball_position() {
    ball_position.x_axis = 300
    ball_position.y_axis = 200
    const random3 = () => (Math.random() > 0.5) ? 3 : -3
    ball_position.x_velocity = random3()
    ball_position.y_velocity = random3()
}

function update_score() {
    player_score.innerText = scores.Player  
    AI_score.innerText = scores.AI
}

function start_countdown() {
    play_button.innerText = 'Restart Game' //once button clicked change to Restart Game
    countdown.innerText = 3 //set the initial countdown to 3
    countdown.style.display = 'block' //upon calling make the countdown timer visible on the screen
    let countdown_timer = 4
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
        ball_collision_with_paddle()
        update_ball_heading()
        ball_collision()
        render_ball_position()
        AI_paddle_movement()
        check_scoring()
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
    if (ball_position.y_axis <= 0|| ball_position.y_axis >= 390) {// when ball going upwards it become negative
        ball_position.y_velocity = -ball_position.y_velocity //when ball going downwards it become positive
        board_bounce_sound.play()                            //so when hit the board, deduct with y_velocity
    }                                                        //positive become negative & and negative become positive 
    }                                                        

function ball_collision_with_paddle() {
    const ball_width_coordinate = ball_position.x_axis + ball.offsetWidth //by adding x_axis + width = rightmost coordinate
    const ball_height_coordinate = ball_position.y_axis + ball.offsetHeight //by adding y_axis + height = bottommost coordinate 
    const left_paddle_vertical = left_paddle.offsetTop + left_paddle.offsetHeight //by adding left_paddle.offsetTop + height = bottommost coordinate 
    const right_paddle_vertical = right_paddle.offsetTop + right_paddle.offsetHeight //by adding right_paddle.offsetTop + height = bottommost coordiante
    const right_boundary = 600 - right_paddle.offsetWidth // calculate the right paddle's left boundary (taking its width into account)
    // check if ball collide with left paddle
    if (ball_position.x_axis <= left_paddle.offsetWidth && //if ball's left side hit left paddle's right side within the width
        ball_position.y_axis < left_paddle_vertical && //and ball y_axis is before left paddle vertical coordinate
        ball_height_coordinate > left_paddle.offsetTop) { //and ball_height_coordinate is before paddle top coordinate
            ball_position.x_velocity *= -1 //by multiplying minus 1, velocity will change from 5 to -5(move to the left)
            paddle_bounce_sound.play()
        }// all this rule is to make sure the ball bounce perfectly with the paddle, if one condition is removed, the ball will not bounce at some angle
    // check if ball collide with right paddle
    else if (ball_width_coordinate >= right_boundary &&  //if ball's right side hit right paddle's left side within the width
        ball_position.y_axis < right_paddle_vertical &&  //and ball's y_axis is before right paddle vertical coordinate
        ball_height_coordinate > right_paddle.offsetTop ) { //and ball_height_coordinate is before paddle top coordinate
            ball_position.x_velocity *= -1 //by miltiplying minus 1, velocity will change from -5 to 5(move to the right)
            paddle_bounce_sound.play()
        }
}

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
    let current_position = right_paddle.offsetTop //get current paddle position using offsetTop, to get only integer
    if (current_position - PADDLE_SPEED > 0) { //cannot be lesser than 0, if not paddle will exit the board
        right_paddle.style.top = (current_position - PADDLE_SPEED) + 'px'
    } else { // if deduction of current_position and PADDLE_SPEED is less than 0, set it to 0px so it doesnt exit the board
        right_paddle.style.top = '0px'
    }
}

function move_paddle_down() {
    let current_position = right_paddle.offsetTop 
    if (current_position + right_paddle.offsetHeight < 340) {  // 400 = board height, offsetHeight to get padding height in integer
        right_paddle.style.top = (current_position + PADDLE_SPEED) + 'px'
    } else {
        right_paddle.style.top = '340px'// if paddle current position added with paddle_speed(10) is greater than 400, set it 340
    }                                   //paddle height - board height = 340  
}

function AI_paddle_movement() {
    const ball_current_positon = ball_position.y_axis
    const paddle_center = left_paddle.offsetTop + left_paddle.offsetHeight / 2 //to get paddle center coordinate we add top with height and divide by 2
    const distance_difference = ball_current_positon - paddle_center //if its postive = ball below the paddle, if its negative = ball above the paddle
    const left_paddle_speed = 10
    let move_amount = Math.max(-left_paddle_speed, Math.min(left_paddle_speed, distance_difference))// Calculate the direction of the paddle movement based on distance_difference. and within the ai_paddle_speed
    let new_paddle_position = left_paddle.offsetTop + move_amount
    if (new_paddle_position < 0) {
        new_paddle_position = 0
    } else if (new_paddle_position + left_paddle.offsetHeight > 400) {
        new_paddle_position = '340px' //if new_paddle_position with paddle height exceeds 400(board heihgt), set limit to 340px.
    }
    left_paddle.style.top = new_paddle_position + 'px'
}

function check_scoring() {
    if (ball_position.x_axis <= 0) {
        score_sound.play()
        scores.Player += 1
        update_score()
        if (scores.Player >= WINNING_SCORE) {
            game_status = 0
            winner = 'Player'
            win_sound.play()
            display_winner()
        } else { //reset the board and start countdown again if player scores
            reset_board()
            start_countdown()
        }
    } 
    else if (ball_position.x_axis + ball.offsetWidth >= 600) {
        score_sound.play()
        scores.AI += 1
        update_score()
        if (scores.AI >= WINNING_SCORE) {
            game_status = 0
            winner = 'AI'
            lose_sound.play()
            display_winner()
        } else { //reset the board and start countdown again if AI scores
            reset_board()  
            start_countdown()
        }
    }
}

function display_winner() {
    countdown.innerText = 'Winner is ' + winner + '!'
    countdown.style.display = 'block'
}