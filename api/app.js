import express from 'express';
import router from './src/routes.js'
import mongoose from 'mongoose';
import cors from 'cors'

mongoose.connect("mongodb://localhost:27017/reactlogin")
    .then(
    console.log("connected to mongobd")
).catch((err) => {
    console.log(err.message)
})

const app = express();

app.use(cors())
app.use(express.json())

app.use(router)

app.use(function (req, res) {
    res.status(404).send("404")
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

app.listen(8000, (err) => {
    if (err) return console.log(err)
    console.log("connected to port 8000")
})