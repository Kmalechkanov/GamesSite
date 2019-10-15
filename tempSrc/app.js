import { getRenderer } from './renderer.js';
import { Alien } from './alien.js';

var aliens = [new Alien(5, 10, 50, 50),
    new Alien(105, 10, 50, 50),
    new Alien(205, 10, 50, 50),
    new Alien(305, 10, 50, 50),
    new Alien(405, 10, 50, 50)
];

startGame();

function startGame() {
    const renderer = getRenderer();

    setInterval(render, 16)
        //requestAnimationFrame(render);

    let way = 1;
    const aliensCount = aliens.length - 1;

    function render() {
        console.log('somewhere!');

        renderer.begin();
        aliens.forEach(alien => {
            if (aliens[aliensCount].x + aliens[aliensCount].width >= 700 && way == 1 ||
                aliens[0].x <= 100 && way == -1) {
                way *= -1;
            } else {
                alien.x += way;
            }
            renderer.renderAlien(alien);
            console.log(way);
        });
        console.log(aliens[aliensCount].x + aliens[aliensCount].width);
        renderer.end();

        //requestAnimationFrame(render);
    }
};


// function component(width, height, x, y) {
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//     this.color = ['red', 'blue', 'orange'];
//     this.update = function() {
//         this.color.splice(0, 0, this.color[this.color.length - 1]);
//         this.color.pop();
//         this.x += 1;
//         console.log(this.x);
//         console.log(this.color);
//         ctx = myGameArea.context;
//         ctx.fillStyle = this.color[0];
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
// }