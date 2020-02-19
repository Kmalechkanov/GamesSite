const app = Sammy('body', function() {
    this.use('Handlebars', 'hbs');

    this.get('#/', homeController.getHome);
    this.get('#/home', homeController.getHome);

    this.get('#/login', userController.getLogin);
    this.post('#/login', userController.postLogin);

    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister);

    this.get('#/logout', userController.getLogout);

    this.get('#/profile', userController.getProfile);

    this.get('#/contact', homeController.getContact);
    
    this.get('#/games', gamesController.getGames);
    this.get('#/games/snake', gamesController.getSnake);
    this.get('#/games/tictactoe', gamesController.getTicTacToe);
    this.get('#/games/spaceinvaders', gamesController.getSpaceInvaders);
    this.get('#/games/flappybird', gamesController.getFlappyBird);
    this.get('#/games/sudoku', gamesController.getSudoku);
});

app.run('#/');