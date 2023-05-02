const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth/2;
canvas.height =innerHeight/2;
//  ctx.fillStyle='red';
// ctx.fillRect(10,10,100,100)
class Obj{
    constructor(position,size){
        this.position = position;
        this.width = size;
        this.height = size;
        
    }
    draw(){
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }

}
class Platform {
    constructor(position, width, height) {
        this.position = position;
        this.width = width;
        this.height = height;
    }

    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}


const player = new Obj({x:100,y:100},30);
const platform1 = new Platform({x: 0, y: canvas.height - 50}, canvas.width, 50);
const platform2 = new Platform({x: 200, y: canvas.height - 200}, 150, 20);
const platform3 = new Platform({x: 400, y: canvas.height - 300}, 150, 200);

const platforms = [platform1, platform2,platform3];

function drawObjects() {
    // player.draw();                                                                                                                   
    platforms.forEach(platform => {
        platform.draw();                                                                        
    });
}
player.draw();
var velocity = 1;
var gravity = 0.5;
var xpos = false;
var posx = false;
var onPlatform = false;
var onPlatform2 = false;
var playerTop = player.position.x+player.width;                                                    
var playerBottom = player.position.y+player.height;




function checkCollisions() {
platforms.forEach(platform => {
if (player.position.y+player.height> platform.position.y &&
    player.position.y < platform.position.y + platform.height &&
    player.position.x + player.width > platform.position.x &&
    player.position.x < platform.position.x + platform.width) {
  // collision detected
  onPlatform = true;      
  velocity = 0;
  player.position.y = platform.position.y - player.height;   
 
  
}
});
}



function update(){
    window.requestAnimationFrame(update);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(xpos){player.position.x += 5;}
    if(posx){player.position.x -=5;}
    player.position.y += velocity;
    if(player.position.y+player.height+velocity<canvas.height)
    {velocity += gravity;}else{velocity = 0;
    player.position.y  = canvas.height-player.height;
    }
    if(player.position.x<0){player.position.x =0}
    if(player.position.x + player.width>canvas.width){
        player.position.x = canvas.width-player.width;
    }
    if(player.position.y<0){
    player.position.y =0
    velocity =0;}

    
    checkCollisions();
    player.draw();
    platform1.draw();
    platform2.draw();
    platform3.draw();
  
};
update();

window.addEventListener('keydown',(e)=>{
    if(e.key == 'ArrowUp'){
        velocity = -10;
        console.log(player.position);
    }
    if(e.key == 'ArrowRight'){
        xpos = true;
    }
    if(e.key == 'ArrowLeft'){
       posx = true;
    }
})
window.addEventListener('touchstart',(e)=>{
    if(e){
        velocity = -14;
    }
    
});
window.addEventListener('touchmove',(e)=>{
    if(e){
    xpos = true;    
    }
});
window.addEventListener('touchend',(e)=>{
    if(e){
        xpos = false;
    }
});
window.addEventListener('keyup',(e)=>{
    if(e.key == 'ArrowUp'){
        velocity = -14;
        console.log(player.position);
    }
    if(e.key == 'ArrowRight'){
        xpos = false;
    }
    if(e.key == 'ArrowLeft'){
       posx = false;
    }
})