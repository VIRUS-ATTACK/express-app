const workerpool = require('workerpool');
const pool = workerpool.pool();

const express = require('express')
const app = express()
const port = 3000

function poolExecute(req,res){
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  pool.exec(add, [a, b])
    .then(function (result) {
      console.log('result', result); // outputs 7
      res.status(200).send(String(result));
    })
    .catch(function (err) {
      console.error(err);
    })
    .then(function () {
      pool.terminate(); // terminate all workers when done
    });
}

function add(a, b) {
  return a + b;
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/add-nos', (req, res) =>{
  poolExecute(req, res);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})