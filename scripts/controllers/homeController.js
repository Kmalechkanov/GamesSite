const homeController = function() {
    const getHome = async function(context) {
        const loggedIn = helper.addHeaderInfo(context);

        let extended = {};
        context.loggedIn = loggedIn;

        if (loggedIn) {
            context.username = sessionStorage.username;
        }

        helper.loadPartialsTo(context)
            .then(function() {
                this.partial('../../views/home/home.hbs')
            });
    };

    const getContact = async function(context) {
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
        getHome,
        getContact
    }
}();