const express = require('express');
const axios = require('axios');
const qs = require('qs');
const app = express();
const port = 3008;

app.get('/suap-auth-service', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    loginSuap(username, password).then(response => {
        res.send(response);
    });
});

app.listen(port, () => {});

async function loginSuap(username, password) {
    const data = qs.stringify({
        'username': username,
        'password': password
    });
    const config = {
        method: 'post',
        url: 'https://suap.ifrn.edu.br/api/v2/autenticacao/token/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };
    return await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error;
        });
}
