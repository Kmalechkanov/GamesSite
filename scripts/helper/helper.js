const helper = function() {

    const handler = function(response) {

        if (response.status >= 400) {
            throw new Error(`Error: ${response.statusText}`);
        }

        if (response.status !== 204) {
            response = response.json();
        }

        return response;
    };

    const addHeaderInfo = function(context) {
        const loggedIn = sessionStorage.getItem('authtoken') !== null;

        if (loggedIn) {
            context.loggedIn = loggedIn;
            context.username = sessionStorage.getItem('username');
            return true;
        }
        return false;
    }

    const loadPartialsTo = function(context, externalPartials) {
        let defaultPartials = {
            'header': "../../views/common/header.hbs",
            'footer': "../../views/common/footer.hbs",
            'alert': "../../views/common/notification.hbs"
        };

        if (externalPartials) {
            for (const key in externalPartials) {
                const element = externalPartials[key];
                defaultPartials[key] = element;
            }
        }

        return context.loadPartials(defaultPartials);
    }

    // const commonTemplatingJson = {
    //     header: "../views/common/header.hbs",
    //     footer: "../views/common/footer.hbs",
    //     content: "../views/feed/content.hbs"
    //     empty: "../views/feed/empty.hbs",
    // };


    return {
        handler,
        addHeaderInfo,
        loadPartialsTo
    }
}();