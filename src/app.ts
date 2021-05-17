import express, { Request, Response } from 'express';
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'alanspa')));

app.get('/', (req : Request, res : Response) => {
  res.send(`oloko`);
});

app.get('/api', (req : Request, res : Response) => {
  res.send('Eita');
  console.log(req.query)
});

app.get('/api/:oi', (req : Request, res : Response) => {
    res.send('Eita');
    console.log(req.params)
    console.log(req.url);
    console.log(req.body);
  });

app.listen(port, (err : void) => {
  if (err != null) {
    return console.log(err);
  }
  return console.log(`server is listening on ${port}`);
});