let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let contador = 0

function criarBG(){ /*cria o fundo*/
    context.fillStyle = "lightgreen"; /*define a cor*/
    context.fillRect(0, 0, 16 * box, 16 * box); /*define o tamanho*/
}

function criarCobrinha(){ /*cria a cobrinha*/
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

/*Função responsável por captura o teclar das teclas do teclado.*/
function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){

    /*Faz a cobrinha aparecer do outro lado da tela.*/
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    /*Verifica a colisão.*/ 
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            document.getElementById("ponto").innerHTML = "VOCÊ PERDEU :(";
        }
        
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); /*retira o último elemento do array.*/
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        contador++;
        document.getElementById("ponto").innerHTML = "PONTOS: ";
        document.getElementById("ponto").innerHTML += contador;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); /*Insere um elemento no começo do array.*/
    

}

let jogo = setInterval(iniciarJogo, 100); /*Defini o tempo para iniciar o jogo. Neste caso o tempo é de 100ms.*/



