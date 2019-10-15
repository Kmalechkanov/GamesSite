export function getRenderer() {
    const ctx = getContext();

    function begin() {
        ctx.save();
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 800, 600);
    }

    function end() {
        ctx.restore();
    }

    function renderAlien(curAlien) {
        let x = curAlien.x;
        let y = curAlien.y;
        let width = curAlien.width;
        let height = curAlien.height;

        ctx.save();
        ctx.fillStyle = "#75712e";
        ctx.fillRect(x, y, width, height);
        ctx.restore();
    }

    return {
        begin,
        end,
        renderAlien
    };
}

function getContext() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    return ctx;
}