const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/database');

const userRouter = require('./src/routes/user');
const postRouter = require('./src/routes/post');
//express initialization
const app = express();
/** Connect Database */
connectDB();

const port = 3000;


/**  middleware */
app.use(bodyParser.json());
app.use(cors());

//routes
app.use(userRouter);
app.use(postRouter);

app.get('/', (req, res) => {
  res.send(`WELCOME TO MICRO BLOG API`)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

