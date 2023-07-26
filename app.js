const express = require('express')
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require("body-parser");
const user = require('./modals/User');
const signinHandler = require('./controllers/_signinHandler');
const signupHandler = require('./controllers/_signupHandler');
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, './templates'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/SocietySync');
  console.log("connected to db")
}

app.get('/', (req, res) => {
  res.render('index', { pageTitle: 'My Page', name: 'John' });
})

const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');

app.use('/signin', signinRouter);
app.use('/signup', signupRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://127.0.0.1:${port}`)
})