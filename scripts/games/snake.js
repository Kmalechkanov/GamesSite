var svgns = "http://www.w3.org/2000/svg";
var template = document.createElementNS(svgns, "rect");
template.setAttribute("class", "player");
template.setAttribute("stroke", "black");
template.setAttribute("fill", "full");
template.setAttribute("width", "10");
template.setAttribute("height", "10");
template.setAttribute("stroke-width", "1");

function svgAddBlock(tempId, tempX, tempY) {
    template.setAttribute("id", tempId);
    template.setAttribute("x", tempX * 10 + 1);
    template.setAttribute("y", tempY * 10 + 1);

    return template;
};

let guildMaker = (function () {
    var counter = 0;
    return function () { counter += 1; return "snake" + counter }
})();

let queue = ["player"];

let apple = true;

let x = 15;
let y = 15;

let appleX = 30;
let appleY = 30;
let score = 0;

let way = 'right';
let lastWay = 'left';

function addToQueue(guild) {
    queue.push(guild);
};

function removeFromQueue() {
    queue.shift();
};

function getLastFromQueue() {
    return queue[queue.length - 1];
};

function getFirstFromQueue() {
    return queue[0];
};

function newApple() {
    appleX = getRandomInt(30);
    appleY = getRandomInt(30);
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

(() => {
    document.onkeydown = async function (e) {
        e = e || window.event;

        if (e.keyCode == "37" && lastWay != 'right') {
            way = "left";
        } else if (e.keyCode == "38" && lastWay != 'down') {
            way = "up";
        } else if (e.keyCode == "39" && lastWay != 'left') {
            way = "right";
        } else if (e.keyCode == "40" && lastWay != 'up') {
            way = "down";
        } else if (e.keyCode == "76") {
            apple = true;
        }
    };

    movementManager();
})();

async function movementManager() {
    let svg = document.querySelector("svg");
    newApple();
    let newSvg = svgAddBlock("apple", appleX, appleY).cloneNode(true);
    newSvg.setAttribute('class', 'apple');
    svg.appendChild(newSvg);


    while (true) {
        if (way == "left") {
            x--;
            if (x === -1) {
                x += 30;
            }
        } else if (way == "up") {
            y--;
            if (y === -1) {
                y += 30;
            }
        } else if (way == "right") {
            x++;
            if (x === 30) {
                x -= 30;
            }
        } else if (way == "down") {
            y++;
            if (y === 30) {
                y -= 30;
            }
        }

        lastWay = way;

        let snakeParts = document.querySelectorAll(".player");
        for (let i = 1; i < snakeParts.length; i++) {
            if (snakeParts[i].getAttribute('y') == y * 10 + 1 &&
                snakeParts[i].getAttribute('x') == x * 10 + 1) {
                document.querySelector('h1').textContent = "You got " + score + " score!";
                return;
            }
        }

        if (x == appleX && y == appleY) {
            newApple();
            score++;
            document.querySelector('h1').textContent = "You score is " + score + "!";
            document.getElementById("apple").setAttribute('x', appleX * 10 + 1);
            document.getElementById("apple").setAttribute('y', appleY * 10 + 1);
        } else {
            let lastPart = document.getElementById(getFirstFromQueue());
            let response = lastPart.remove();
            removeFromQueue();
        }

        let guild = guildMaker();
        addToQueue(guild);
        let newSvg = svgAddBlock(guild, x, y).cloneNode(true)
        svg.appendChild(newSvg);

        await new Promise(r => setTimeout(r, 100));
    }
};