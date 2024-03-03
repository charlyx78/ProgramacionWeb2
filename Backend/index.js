import express from 'express'
import bodyParser from 'body-parser'

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json())

app.post('/login', (req, res) => {
    const {name, pass} = req.body;

    console.log(req.body)

    if(name == 'sami' && pass == '123'){
        res.status(200).send();
    }
    else{
        res.status(402).send();
    }
    
});


app.listen(3000, () => {
    console.log('App listening on port 3000');
});
