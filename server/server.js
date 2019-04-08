const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const listRoutes = require('./handlers/listRoutes');

app.get('/', function(req, res) {
    res.send('Hi, Response !');
})

app.post('/', function(req, res) {
    res.send('Hi, Response !');
})


app.get('/user', function(req, res) {
    res.send('Hi, Users Response !');
})

listRoutes.listAllRoutes(app._router.stack);

const port = 8000;
app.listen(port, () => {
  console.log('We are live on ' + port);
});