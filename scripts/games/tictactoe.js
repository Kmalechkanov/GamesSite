const svg = document.querySelector("svg");
svg.addEventListener("click", function (event) {
    console.log("jivsam");
    if (newGame) {
        resetSvg();
        console.log("reset");
        newGame = false;
        return;
    }

    if (event.target.getAttribute("fill") == "white") {
        event.target.setAttribute("fill", getColor());
        if (checkForWinner()) {
            let newChild = document.createElement("h1");
            newChild.textContent = getColor() + " Won!";
            document.querySelector("body").appendChild(newChild);
        }
        counter++;
    }
});

function resetSvg(){
    for(let i = 0; i < 9; i++){
        svg.children[i+2].setAttribute("fill", "white");
    }
}

let newGame = false;
let counter = 0;

function getColor() {
    let color = "green";
    if (counter % 2 === 0) {
        color = "red";
    }

    return color;
}

function checkForWinner() {
    let table = [...svg.children];
    table.splice(0, 2);

    if (table[0].getAttribute("fill") != 'white' && table[0].getAttribute("fill") == table[1].getAttribute("fill") && table[1].getAttribute("fill") == table[2].getAttribute("fill")
        || table[3].getAttribute("fill") != 'white' && table[3].getAttribute("fill") == table[4].getAttribute("fill") && table[4].getAttribute("fill") == table[5].getAttribute("fill")
        || table[6].getAttribute("fill") != 'white' && table[6].getAttribute("fill") == table[7].getAttribute("fill") && table[7].getAttribute("fill") == table[8].getAttribute("fill")
        || table[0].getAttribute("fill") != 'white' && table[0].getAttribute("fill") == table[3].getAttribute("fill") && table[3].getAttribute("fill") == table[6].getAttribute("fill")
        || table[1].getAttribute("fill") != 'white' && table[1].getAttribute("fill") == table[4].getAttribute("fill") && table[4].getAttribute("fill") == table[7].getAttribute("fill")
        || table[2].getAttribute("fill") != 'white' && table[2].getAttribute("fill") == table[5].getAttribute("fill") && table[5].getAttribute("fill") == table[8].getAttribute("fill")
        || table[0].getAttribute("fill") != 'white' && table[0].getAttribute("fill") == table[4].getAttribute("fill") && table[4].getAttribute("fill") == table[8].getAttribute("fill")
        || table[2].getAttribute("fill") != 'white' && table[2].getAttribute("fill") == table[4].getAttribute("fill") && table[4].getAttribute("fill") == table[6].getAttribute("fill")
    ) {
        newGame = true;
        return true;
    }

    return false;
}