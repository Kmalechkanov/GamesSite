var ns = 'http://www.w3.org/2000/svg'
 
var way = "none";
var isShootOnCd = true;
var isKeyDown = false;
var aliensX = 0;
var aliensWay = "right";
 
function keyListener(){
    if(event.keyCode == 97){
        way = "left";
    } else if(event.keyCode == 100){
        way = "right";
    }
}
 
async function clickDown(){
    isKeyDown=true;
   
    while(isKeyDown){
        if(!isShootOnCd){
            isShootOnCd = true;
            console.log("shoot");
            createShootRect();
        }
        await new Promise(r => setTimeout(r, 10));
    }  
}
 
function clickUp(){
    isKeyDown = false;
}
 
function createShootRect(){
    let playerRect = document.getElementById("player");
    let numberX = Number(playerRect.getAttribute('x'));
    let rectNode = document.createElementNS(ns,'rect');
    rectNode.setAttribute('class', "shoot");
    rectNode.setAttribute('x', numberX+20);
    rectNode.setAttribute('y', 450);
    rectNode.setAttribute('width', 10);
    rectNode.setAttribute('height', 30);
    rectNode.setAttribute('fill', "green");
   
    let svg = document.querySelector('svg');
    svg.insertBefore(rectNode, svg.childNodes[0]);
}
 
function createAlienRect(x, y){
    let rectNode = document.createElementNS(ns,'rect');
    rectNode.setAttribute('class', "alien");
    rectNode.setAttribute('x', x);
    rectNode.setAttribute('y', y);
    rectNode.setAttribute('width', 50);
    rectNode.setAttribute('height', 50);
    rectNode.setAttribute('fill', "purple");
       
    return rectNode;
}
 
function appendOneRowAliens(posY){
    let svg = document.querySelector('svg');
    aliensX = 0;
    svg.appendChild(createAlienRect(50, posY));
    svg.appendChild(createAlienRect(150, posY));
    svg.appendChild(createAlienRect(250, posY));
    svg.appendChild(createAlienRect(350, posY));
}
 
function pointInBox(boxX, boxY, pointX, pointY){
    if (boxY <= pointY && boxY+50 >= pointY &&
        boxX <= pointX && boxX+50 >= pointX)
        return true;
    return false;
}
 
//Initial function
(async ()=>{
    document.querySelector('body').addEventListener('keypress', keyListener);

    let frame = 0;
    let playerRect = document.getElementById("player");
    appendOneRowAliens(50);
    appendOneRowAliens(150);
   
    while(true){
        let aliens = document.querySelectorAll('.alien');
       
        if(frame == 100){
            frame = 0;
        }
        if(frame%5 == 2){
            if(aliens.length == 0)
            {  
                let h1 = document.createElement("h1");
                h1.setAttribute('style','text-align:center');
                h1.textContent = "You won!"
                document.body.appendChild(h1);
                return;
            }
           
            let hitSide = false;
           
            if(aliens[0].getAttribute('x') <=0)
            {
                aliensWay = "right";
                hitSide = true;
            } else if(aliens[aliens.length-1].getAttribute('x') >= 450) {
                aliensWay = "left";
                hitSide = true;
            } else {
                hitSide = false;
            }
           
            for(let i = 0; i < aliens.length;i++){
                let alienX = Number(aliens[i].getAttribute('x'));
                let alienY = Number(aliens[i].getAttribute('y'));
               
                if(aliensWay == "left"){
                    aliensX-=1;
                    aliens[i].setAttribute('x', alienX-1)
                } else {
                    aliensX+=1;
                    aliens[i].setAttribute('x', alienX+1)
                }
               
                if(hitSide){
                    aliens[i].setAttribute('y', alienY+=50)
                }
            }
        }
        if(frame%50 == 2){
            isShootOnCd = false;
        }
       
        if(way == "left"){
            let numberX = Number(player.getAttribute('x'));
            if(numberX >=0)
                player.setAttribute('x',numberX-5);
        }
        else if(way == "right"){
            let numberX = Number(player.getAttribute('x'));
                if(numberX+50 <=500)
            player.setAttribute('x',numberX+5);
        }
        way = "none";
   
        let shoots = document.querySelectorAll(".shoot");
 
        if(shoots != null){
            for(let i = 0; i < shoots.length; i++){        
                let currentPosY = Number(shoots[i].getAttribute("y"));
                let currentPosX = Number(shoots[i].getAttribute("x"));
               
                if (currentPosY+30 < 0){
                    shoots[i].remove();
                    break;
                } else {
                    for(let j = 0; j < aliens.length;j++){
                        let alienX = Number(aliens[j].getAttribute('x'));
                        let alienY = Number(aliens[j].getAttribute('y'));
                       
                        if(pointInBox(alienX, alienY, currentPosX, currentPosY)){
                            aliens[j].remove();
							shoots[i].remove();
                        }
                    }
                }
                shoots[i].setAttribute("y", currentPosY-1);
            }
        }
       
        frame++;
        await new Promise(r => setTimeout(r, 10));
    }
})();