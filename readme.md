# 2D-Pong

This project is a rendition of the classic Atari Pong game, where a player competes against an computer opponent. The game mechanics involve moving paddles up and down to hit a moving ball. The objective is to score points by making the ball pass the opponent's paddle.

## Code Overview

### Constants

- **WINNING_SCORE**: The score required to win the game.
- **PADDLE_SPEED**: Speed at which the paddles move.

### Variables

The game uses the following state variables:

- **game_status**: Determines the current state of the game (0 for stopped and 1 for running).
- **scores**: Keeps track of the Player and AI scores.
- **winner**: Holds the winner of the game.
- **ball_position**: Stores the current position of the ball and its velocity in both x and y axes.

### Cached Element References

The game caches several DOM elements for performance, including:

- Player and AI scores.
- Left and right paddles.
- Ball.
- Play button.
- Countdown display.

Additionally, it has preloaded audio clips for various game events like paddle bounce, board bounce, button click, and scoring.

### Event Listeners

- The play button starts or restarts the game.
- Arrow keys are used to move the player's paddle.

### Functions

- `init()`: Initializes the game by resetting scores, board state, and starting the countdown.
- `reset_board()`: Resets the board to its initial state.
- `reset_ball_position()`: Resets the ball's position and velocity.
- `update_score()`: Updates the displayed score.
- `start_countdown()`: Starts a countdown before the game begins.
- `render()`: Renders the game's current state.
- `update_ball_heading()`: Updates the ball's movement.
- `ball_collision()`: Checks for ball collisions with the top and bottom of the board.
- `ball_collision_with_paddle()`: Checks if the ball collides with either paddle.
- `render_ball_position()`: Updates the displayed position of the ball.
- `move_paddle()`: Moves the player's paddle based on arrow key input.
- `AI_paddle_movement()`: Determines the movement of the AI's paddle based on the ball's position.
- `check_scoring()`: Checks and updates the score after each round.
- `display_winner()`: Displays the winner of the game.

## Examples
![Pong Image](PICTURE/picture.png)

## Technologies
### Software Used:
- Microsoft VS Code : Version 1.83.0
- Github
- Google Chrome : Version 118.0.5993.70

### Language Used:
- JavaScript : Version ES13 ECMAScript 2022
- CSS3 : Version W3 CSS 4.15
- HTML : Version 5

### Operating System:
- macOS : Ventura 13.6

## How to Play

Go to : https://pyconqueror.github.io/2D-Pong/

1. Click the "Start Game" button.
2. Use the `ArrowUp` and `ArrowDown` keys to move your paddle.
3. Try to hit the ball with your paddle to send it towards the AI's side.
4. Score a point each time the ball passes the AI's paddle.
5. The first player to reach the **WINNING_SCORE** wins the game.

## Known Bugs
- The ball will not bounce from the paddle at certain angle

## What can be improved
- Add level of difficulties
- Add Multiplayer support

## Other
This Project was created under course "Software Engineering Immersive" presented by student of General Assembly Australia