import express, { Request, Response } from 'express';

const app = express();
const port = 3000;
app.get('/', (req : Request, res : Response) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.post('/', (req : Request, res : Response) => {
  res.send('Eita');
});

app.listen(port, (err : void) => {
  if (err != null) {
    return console.log(err);
  }
  return console.log(`server is listening on ${port}`);
});