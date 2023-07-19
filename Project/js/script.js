let inputDir = {
    x:0,
    y:0
}
let foodSound = new Audio("./static/eating.mp3");
let gameOver = new Audio("./static/game_over.wav");
let background = new Audio("./static/background.mp3");
let directionSound = new Audio("./static/direction.mp3");
let speed = 5;
let score=0;
let lastPaintTime =0;
let snakeArr = [
    {x:13  , y:15}
];
food = {x:6  , y:7}
// ============Game function====================//

const main= (currTime)=>{
    window.requestAnimationFrame(main);
    // console.log(currTime);
    if((currTime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = currTime;
    gameEngine();
    
}


const isCollide =(arr)=>{
  // ===============if we bump into yourself =====================//
     for(let i= 1 ; i< arr.length; i++){
        if(arr[i].x ===  arr[0].x && arr[i].y===  arr[0].y){
            return true;
            
        }
    }

    //============if you bump in to the wall==================//
        if(arr[0].x >= 18  || arr[0].x<=0  ||  arr[0].y >= 18  || arr[0].y <=0) {
            return true;
        }
     

}

const gameEngine = ()=>{
 //========== update the snak array and food==================//

     if(isCollide(snakeArr)){
        gameOver.play();
        background.pause();
        inputDir = {x:0 , y:0};
        alert("Game Over !! press any key to start");
        snakeArr = [
            {x:13  , y:15}
        ];
        score=0;
     }

     // if you have eaten the food then increase the score and regenerate the food=================
     if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score+=1;

        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore" , JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "hiscore " + hiscoreval;

        }
        scoreBox.innerHTML = "score: " + score;
        foodSound.play();
        snakeArr.unshift({
            x:snakeArr[0].x +
            inputDir.x ,
            y:snakeArr[0].y +
            inputDir.y
        })
        let a=2;
        let b=16;
        food = {x:Math.round(a +(b-a)* Math.random()) ,  y:Math.round(a +(b-a)* Math.random()) }

     } 

     //==============Move the snake=====================//
     for(let i= snakeArr.length-2 ; i>=0 ; i--){
        snakeArr[i+1] = {...snakeArr[i]};
     }
     snakeArr[0].x += inputDir.x;
     snakeArr[0].y += inputDir.y;

 // ==============display the snake and food==================//
 board.innerHTML ="";
 snakeArr.forEach((e , index)=>{
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index===0){
        snakeElement.classList.add("head"); 
    }
    else{
        snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
 });

 foodElement = document.createElement("div");
 foodElement.style.gridRowStart = food.y;
 foodElement.style.gridColumnStart = food.x;
 foodElement.classList.add("food");
 board.appendChild(foodElement);
}


//=========Main Logic Starts here====================//

let hiscore = localStorage.getItem("hiscore");
if( hiscore == null){
    hiscoreval = 0;
    localStorage.setItem("hiscore" , JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "hiscore " + hiscore;
}


window.requestAnimationFrame(main);

window.addEventListener("keydown" ,  e=>{
    inputDir = {x:0 , y:1} // start the game 
    directionSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("arroe up"); 
            inputDir.x = 0;
            inputDir.y = -1;   
            break;

        case "ArrowDown":
            console.log("arroe down");   
            inputDir.x = 0;
            inputDir.y = 1;  
            break;
        case "ArrowLeft":
            console.log("arroe Left");  
            inputDir.x = -1;
            inputDir.y = 0;   
            break;  
            
        case "ArrowRight":
            console.log("arroe right");  
            inputDir.x = 1;
            inputDir.y = 0;   
            break;
        default:
    }
})