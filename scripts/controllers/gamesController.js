const gamesController = function() {
    const getGames = async function(context) {
        const loggedIn = helper.addHeaderInfo(context);

        let extended = {};
        context.loggedIn = loggedIn;

        if (loggedIn) {
            context.username = sessionStorage.username;
        }

        helper.loadPartialsTo(context)
            .then(function() {
                this.partial('../../views/games/games.hbs');
            });
    };

    const getSnake = async function(context) {
        const loggedIn = helper.addHeaderInfo(context);

        let extended = {};
        context.loggedIn = loggedIn;

        if (loggedIn) {
            context.username = sessionStorage.username;
        }

        helper.loadPartialsTo(context)
            .then(function() {
                this.partial('../../views/games/snake.hbs')
            });
    };

    const getTicTacToe = async function(context) {
        const loggedIn = helper.addHeaderInfo(context);

        let extended = {};
        context.loggedIn = loggedIn;

        if (loggedIn) {
            context.username = sessionStorage.username;
        }

        helper.loadPartialsTo(context)
            .then(function() {
                this.partial('../../views/contact.hbs')
            });
    };

    return {
        getGames,
        getSnake,
        getTicTacToe
    }
}();