const cinemaController = function () {
    const getAllMovies = async function (context) {
        const loggedIn = helper.addHeaderInfo(context);
        context.loggedIn = loggedIn;

        if (!loggedIn) {
            context.redirect('#/login');
            return;
        }

        const response = await requester.request('appdata', `movies?query={}&sort={"tickets": -1}`, 'GET', 'Kinvey');
        context.movies = response;

        helper.loadPartialsTo(context)
            .then(function () {
                this.partial('../../views/cinema/allMovies.hbs');
            });
    }

    const getAddMovie = async function (context) {
        const loggedIn = helper.addHeaderInfo(context);
        context.loggedIn = loggedIn;

        if (!loggedIn) {
            context.redirect('#/login');
            return;
        }

        helper.loadPartialsTo(context)
            .then(function () {
                this.partial('../../views/cinema/addMovie.hbs');
            });
    }

    const postAddMovie = function (context) {
        context.params.tickets = Number(context.params.tickets);
        const postBody = { ...context.params };

        const response = requester.request('appdata', 'movies', 'POST', 'Kinvey', postBody);

        response.then(() => context.redirect('#/cinema'));
    }

    const getBuyTicket = async function (context) {
        const before = await requester.request('appdata', `movies/${context.params._id}`, 'GET', 'Kinvey');

        if (before.tickets == '0') {
            return;
        }

        before.tickets -= 1;

        const postBody = {
            "title": before.title,
            "description": before.description,
            "imageUrl": before.imageUrl,
            "genres": before.genres,
            "tickets": before.tickets,
        }

        const response = await requester.request('appdata', `movies/${context.params._id}`, 'PUT', 'Kinvey', postBody);
        context.redirect('#/cinema');
    }

    const getDetailsMovie = async function (context) {
        const loggedIn = helper.addHeaderInfo(context);
        context.loggedIn = loggedIn;

        if (!loggedIn) {
            context.redirect('#/login');
            return;
        }

        const response = await requester.request('appdata', `movies/${context.params._id}`, 'GET', 'Kinvey');

        Object.keys(response).forEach((key) => {
            context[key] = response[key];
        });

        helper.loadPartialsTo(context)
            .then(function () {
                this.partial('../../views/cinema/detailsMovie.hbs');
            });
    }

    const getMyMovies = async function (context) {
        const loggedIn = helper.addHeaderInfo(context);
        context.loggedIn = loggedIn;

        if (!loggedIn) {
            context.redirect('#/login');
            return;
        }

        const response = await requester.request('appdata', `movies?query={"_acl.creator":"${sessionStorage.id}"}&sort={"tickets": -1}`, 'GET', 'Kinvey');
        context.movies = response;

        helper.loadPartialsTo(context)
            .then(function () {
                this.partial('../../views/cinema/myMovies.hbs')
            });
    };

    const getEditMovie = async function (context) {
        const loggedIn = helper.addHeaderInfo(context);
        context.loggedIn = loggedIn;

        if (!loggedIn) {
            context.redirect('#/login');
            return;
        }

        const response = await requester.request('appdata', `movies/${context.params._id}`, 'GET', 'Kinvey');

        Object.keys(response).forEach((key) => {
            context[key] = response[key];
        });

        helper.loadPartialsTo(context)
            .then(function () {
                this.partial('../../views/cinema/editMovie.hbs')
            });
    };

    const postEditMovie = function (context) {
        const postBody = {
            "title": context.params.title,
            "description": context.params.description,
            "imageUrl": context.params.imageUrl,
            "genres": context.params.genres,
            "tickets": Number(context.params.tickets)
        }

        requester.request('appdata', `movies/${context.params._id}`, 'PUT', 'Kinvey', postBody)
            .then(() => {
                context.redirect(`#/detailsMovie/${context.params._id}`);
            });
    };

    const getDeleteMovie = async function (context) {
        const loggedIn = helper.addHeaderInfo(context);
        context.loggedIn = loggedIn;

        if (!loggedIn) {
            context.redirect('#/login');
            return;
        }

        const response = await requester.request('appdata', `movies/${context.params._id}`, 'GET', 'Kinvey');

        Object.keys(response).forEach((key) => {
            context[key] = response[key];
        });

        helper.loadPartialsTo(context)
            .then(function () {
                this.partial('../../views/cinema/deleteMovie.hbs')
            });
    }

    const postDeleteMovie = function (context) {
        const response = requester.request('appdata', `movies/${context.params._id}`, 'DELETE', 'Kinvey');

        response.then(() => { context.redirect('#/cinema') });
    }
    
    return {
        getAllMovies,
        getAddMovie,
        postAddMovie,
        getBuyTicket,
        getDetailsMovie,
        getMyMovies,
        getEditMovie,
        postEditMovie,
        getDeleteMovie,
        postDeleteMovie
    }
}();