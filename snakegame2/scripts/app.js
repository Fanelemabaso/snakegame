const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//Create the unit
const box = 32;

//ground image image
const ground = new Image();
ground.src = "img/ground.png";

//food image
const food = new Image();
food.src = "img/food.png";


// Load audio files
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3"
eat.src = "audio/eat.mp3"
up.src = "audio/up.mp3"
left.src = "audio/left.mp3"
right.src = "audio/right.mp3"
down.src = "audio/down.mp3"

//the snake 
let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box

}

//Create the food 
let foods = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

//Create the score variable
let score = 0;

//Control the snake
let d;

document.addEventListener("keydown",direction);

function direction(event){

    let key = event.keyCode;
    if(key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if (key == 38 && d != "DOWN"){
        up.play();
        d = "UP";
    }else if (key == 39 && d != "LEFT"){
        right.play();
        d = "RIGHT";
    }else if (key == 40 && d != "UP"){
        down.play();
        d = "DOWN";
    }
}
//check collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}
//draw everything to the canvas

function draw(){
    ctx.drawImage(ground,0,0);
    for (let i = 0; i < snake.length ; i++){
        ctx.fillStyle = (i == 0)? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "blue";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    ctx.drawImage(food,foods.x,foods.y);
    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    

    //which direction of the snake
    if(d == "LEFT")snakeX -= box;
    if(d == "UP")snakeY -= box;
    if(d == "RIGHT")snakeX += box;
    if(d == "DOWN")snakeY += box;

    //if the snake eats the food increment the snake
    if(snakeX == foods.x && snakeY == foods.y){
        score++;
        eat.play();
        foods = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        
        //we dont remove the tail

    }else{
        //remove the tail
        snake.pop();
    }
    //Add new head 

    let newHead = {
        x : snakeX,
        y : snakeY
    }
    //Game over rules
    if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);


    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

//call the draw function every 100 ms

let game = setInterval(draw,100);

