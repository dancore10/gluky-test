/* 
    * Constante API
*/
const HOST = "https://gorest.co.in/public-api";
const TOKEN = "Bearer dPP8uJy1tj9ThP5-laG2svpwXikEruXEz7Uf"
/*
    * Creación de clase con metodos
*/
class Request {
    constructor() {
        this.type = "Request"
    }

    getJSON(url){
        return new Promise(function(resolve, reject) {
            fetch(HOST + url, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': TOKEN,
                    'Content-Type': 'application/json',
                    'access-method': 'api-json'
                },
            }).then(function(response) {
                response.json().then(function(res) {
                    resolve(res);
                }).catch(function(res) {
                    reject(res);
                });
            });
        });
    }

    postJSON(url, data) {
        return new Promise(function(resolve, reject) {
            fetch(HOST + url, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': TOKEN,
                    'Content-Type': 'application/json',
                    'access-method': 'api-json'
                },
                credentials: 'same-origin',
                method: "POST",
                body: JSON.stringify(data)
            }).then(function(response) {
                response.json().then(function(res) {
                    resolve(res);
                }).catch(function(res) {
                    reject(res);
                });
            }).catch(function(err) {
            });
        });
    }
}

// module.exports.Request();
// module.exports = {
//     Request
// }
export default Request;