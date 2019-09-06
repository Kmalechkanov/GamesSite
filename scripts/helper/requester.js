const requester = function() {

    const appKey = 'kid_SJm807THH';
    const appSecret = 'af189c2966ea4c768ae12d5a877f34c0';

    const baseUrl = 'https://baas.kinvey.com';

    const makeAuth = function(auth) {
        return auth === 'Basic' ?
            'Basic ' + btoa(appKey + ':' + appSecret) :
            'Kinvey ' + sessionStorage.getItem('authtoken');
    }

    const makeSettings = (method, auth, data) => {
        const settings = {
            method,
            headers: {
                'Authorization': makeAuth(auth),
                'Content-Type': 'application/json'
            }
        };

        if (method === 'POST' || method === 'PUT') {
            settings.body = JSON.stringify(data);
        }

        return settings;
    }

    const request = async function(path, url, method, auth, body) {
        try {
            const totalUrl = `${baseUrl}/${path}/${appKey}/${url}`
            const headers = makeSettings(method, auth, body);

            const response = await fetch(totalUrl, headers);
            const responseJson = await helper.handler(await response);

            return await responseJson;
        } catch (err) {
            return "red";
        }
    }

    return {
        request
    }
}();