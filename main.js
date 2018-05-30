var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;

// Direction X,Y
var dx = 2;
var dy = -2;

// Ball
var ballRadius = 10;

// Paddle 
var paddleheight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

// Keyboards
var rightPressed = false;
var leftPressed = false;

// Bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHieght = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for ( var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for ( var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1  };
    }
}

// Score
var score = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

// Drawing the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0,Math.PI*2);
    ctx.fillStyle = "lightblue";
    ctx.fill();
    ctx.closePath;
};

// Drawing the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleheight, paddleWidth, paddleheight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

// Draw bricks
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r*(brickHieght + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHieght);
                ctx.fillStyle = "green";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Collision detection
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHieght) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATION!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Draw score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Score: " + score, 8, 20);
} 

// Drawing EVERTTHING
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    collisionDetection();

    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if ( y + dy < ballRadius ) {
        dy = -dy;
    } else if ( y + dy > canvas.height-ballRadius ) {
        if ( x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            alert("Game over");
            document.location.reload();
        }
    }

    if (rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 3;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 3;
    }

    x += dx;
    y += dy;
}

setInterval(draw, 10); 