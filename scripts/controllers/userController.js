const userController = function() {
    const getLogin = function(context) {
        const loggedIn = helper.addHeaderInfo(context);

        if (loggedIn) {
            context.redirect('#/home');
            return;
        }

        helper.loadPartialsTo(context)
            .then(function() {
                this.partial('../../views/user/login.hbs')
            });
    };

    const postLogin = function(context) {
        const postBody = {...context.params };
        if (postBody.username.length < 5 || postBody.password.length < 5) {
            let currentAlert = document.getElementsByClassName('notificationMess')[0];
            currentAlert.textContent = 'Username and password must be more than 5 symbols!';
            currentAlert.parentNode.style.backgroundColor = '#f44336';
            currentAlert.parentNode.style.display = 'block';
            return;
        }

        console.log(postBody);
        const response = requester.request('user', 'login', 'POST', 'Basic', postBody);

        response.then((data) => {

            if (data == 'red') {
                let currentAlert = document.getElementsByClassName('notificationMess')[0];
                currentAlert.textContent = 'Wrong input!';
                currentAlert.parentNode.style.backgroundColor = '#f44336';
                currentAlert.parentNode.style.display = 'block';
                return;
            } else {
                let currentAlert = document.getElementsByClassName('notificationMess')[0];
                currentAlert.textContent = 'All Right!';
                currentAlert.parentNode.style.backgroundColor = '#00ff7f';
                currentAlert.parentNode.style.display = 'block';
            }

            sessionStorage.setItem('id', data._id);
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('authtoken', data._kmd.authtoken);

            context.redirect('#/home');
        });
    };

    const getRegister = function(context) {
        const loggedIn = helper.addHeaderInfo(context);

        if (loggedIn) {
            context.redirect('#/home');
            return;
        }

        helper.loadPartialsTo(context)
            .then(function() {
                this.partial('../../views/user/register.hbs')
            });
    };

    const postRegister = function(context) {
        const postBody = {...context.params };
        if (postBody.username.length < 5 || postBody.password.length < 5) {
            let currentAlert = document.getElementsByClassName('notificationMess')[0];
            currentAlert.textContent = 'Username and password must be more than 5 symbols!';
            currentAlert.parentNode.style.backgroundColor = '#f44336';
            currentAlert.parentNode.style.display = 'block';
            return;
        } else if (postBody.password != postBody.rePassword) {
            let currentAlert = document.getElementsByClassName('notificationMess')[0];
            currentAlert.textContent = 'Password must match RePassword!';
            currentAlert.parentNode.style.backgroundColor = '#f44336';
            currentAlert.parentNode.style.display = 'block';
            return;
        } else {
            let currentAlert = document.getElementsByClassName('notificationMess')[0];
            currentAlert.textContent = 'All Right!';
            currentAlert.parentNode.style.backgroundColor = '#00ff7f';
            currentAlert.parentNode.style.display = 'block';
        }

        delete postBody['rePassword'];

        const response = requester.request('user', '', 'POST', 'Basic', postBody);

        response.then((data) => {
            sessionStorage.setItem('id', data._id);
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('authtoken', data._kmd.authtoken);

            context.redirect('#/home');
        });
    };

    const getLogout = function(context) {
        requester.request('user', '_logout', 'POST', 'Kinvey');

        sessionStorage.clear();
        context.redirect('#/home');
    };

    const getProfile = function(context) {
        helper.loadPartialsTo(context)
            .then(function() {
                this.partial('../../views/user/profile.hbs')
            });
    };

    return {
        getLogin,
        postLogin,
        getRegister,
        postRegister,
        getLogout,
        getProfile
    }
}();