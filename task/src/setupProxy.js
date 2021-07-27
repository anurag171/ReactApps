const proxy = require('http-proxy-middleware');

module.exports = function(app){

    app.use(
        proxy("v1/create-task",{

            target:"https://127.0.0.1:8083",            
            changeOrigin: true
        })
    );
};