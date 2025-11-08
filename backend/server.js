const http = require('http');

const app = require('./app');

const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Le serveur démarre au port numéro: ${port}`);

});