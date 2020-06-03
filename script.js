let canvas = document.getElementById("snake");
// context desenha os elementos na tela em 2D
let context =  canvas.getContext("2d");
//numero de pixel do jogo
let box = 32;
let snake = []
snake [0] = {
    x: 8 * box,
    y: 8 * box
}
// contador para a pontuação do player
let contador = 0;
let gravar = 0;

// classe para gravar o record
class Record {
    constructor(gravar){
        this.gravar = gravar
    }
    // salva o recorde do localStorage
    saveRecord (d) {
        localStorage.setItem('key', JSON.stringify(d))
    }
}


let array = Array();
let id = JSON.parse(localStorage.getItem('key'))
array = id

function recDados (){ 
    recor.innerHTML = array.gravar;      
}

let bd = new Record()

function cadastrar(gravar){

    let save = gravar

    let bd_gravar = new Record(
        gravar
    )
    console.log(" AQUI ESTÁ O RESULTADO ", bd_gravar)
    bd.saveRecord(bd_gravar)
}

let direction = "right";

// comida para aparecer aleatoriamente !! 
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    //cor do fundo do canva
    context.fillStyle = "lightgreen"
    // vai desenhar o retangulo
    context.fillRect(0,0,16 * box, 16*box);
}

function criarCobrinha(){

    for(i=0; i < snake.length; i++){
        context.fillStyle = "blue";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

}

//Desenhar a comida
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// teclas para movimentação da cobrinha
document.addEventListener('keydown', update);

function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){

    for ( i = 1; i < snake.length; i++){
        if(snake[0].x == snake [i].x && snake[0].y == snake[i].y){

            
            gravar = contador
            recDados(contador);

            if (gravar > array.gravar){
                cadastrar(gravar);  
            }
            
            console.log("chamou fim de jogo")
            console.log('chamou gravar', gravar)
            console.log('contador é igual: ', contador)
            
            
            clearInterval(jogo);
            alert('Game Over: :c')
        }
    }

    // para atravesar as paredas 
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake [0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    //chamada das funções
    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;

    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // remover a cabeça pra da a ideia de movimentação
    if ( snakeX != food.x || snakeY != food.y){
        snake.pop ();
    } else {
        food.x =  Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        
        contador = contador + 1 ;
        console.log(contador);
        insere();
        
    }

    function insere () {
        cont.innerHTML = contador;
    }

    //nova cabeça 
    let newHead = {
        x: snakeX, 
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);
recDados();





 