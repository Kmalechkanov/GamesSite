const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    this.get('#/home', homeController.getHome);

    this.get('#/login', userController.getLogin);
    this.post('#/login', userController.postLogin);

    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister);

    this.get('#/logout', userController.getLogout);

    this.get('#/cinema', cinemaController.getAllMovies);
    this.get('#/addMovie', cinemaController.getAddMovie);
    this.post('#/addMovie', cinemaController.postAddMovie);

    this.get('#/buyTicket/:_id', cinemaController.getBuyTicket);
    this.get('#/detailsMovie/:_id', cinemaController.getDetailsMovie);

    this.get('#/myMovies', cinemaController.getMyMovies);

    this.get('#/editMovie/:_id', cinemaController.getEditMovie);
    this.post('#/editMovie/:_id', cinemaController.postEditMovie);
   
    this.get('#/deleteMovie/:_id', cinemaController.getDeleteMovie);
    this.post('#/deleteMovie/:_id', cinemaController.postDeleteMovie);
});

app.run('#/home');