const express = require('express')
const bodyParser = require('body-parser')
// corsポリシーに抵触するため、その対策としてcorsを利用する
const cors = require('cors')
const sqlite3 = require('sqlite3');
const { check, validationResult } = require('express-validator');

const db = new sqlite3.Database('charadata.db');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/test', (req, res) => {
  db.serialize(() => {
    db.all('select * from charadata', (err, rows) => {
      if(!err) res.send(rows);
    })
  })
});

app.get('/edit', (req, res) => {
  const { id } = req.query;

  db.serialize(() => {
    db.all(`select * from charadata where id = ${id}`, (err, rows) => {
      if(!err) res.send(rows[0]);
    });
  });
}); 

const validationList = [
  { name: 'name', value: '名前'},
  // { name: 'age', value: '年齢' },
	{ name: 'producation', value: '登場作品' },
	{ name: 'skill', value: '能力' },
	{ name: 'type', value: 'タイプ' },
]

const validation = validationList.map(el => 
  check(`${el.name}`, `${el.value}を入力してください`).notEmpty()
);
validation.push(check(`age`, `年齢(数値)を入力してください`).custom(el =>!isNaN(el)));

app.post('/add', validation, (req, res) => {
  const errors = validationResult(req);
  const { is, age, name, producation, skill, type } = req.body;

  const response = {
    message: ''
  };

  if(!errors.isEmpty()) {
    response.errors = errors.array().map(el => {
      return {
        msg: el.msg,
        param: el.param,
      }
    });
    response.message = 'エラーが発生しました。';
    res.send(response);
  } else {
    db.serialize(() => {
      db.run(`insert into charadata (name, producation, age, skill, type, 'is') values (? ,? ,? ,?, ?, ?)`,
        name, producation, age, skill, type, is
      );
      response.message = 'success';
      res.send(response);
  });
  }
});

app.post('/changeData', validation, (req, res) => {
  const errors = validationResult(req);
  const { id, is, age, name, producation, skill, type } = req.body;

  const response = {
    message: ''
  };

  if(!errors.isEmpty()) {
    response.errors = errors.array().map(el => {
      return {
        msg: el.msg,
        param: el.param,
      }
    });
    response.message = 'エラーが発生しました。';
    res.send(response);
  } else {
    const queryString = `update charadata set name = '${name}', age = ${age}, 'is' = ${is}, skill = '${skill}', type = '${type}', producation = '${producation}' where id = ${id}`;

    db.serialize(() => {
      db.run(queryString);
      response.message = 'success';
      res.send(response);
    });
  }
});

app.post('/characterDelete', (req, res) => {
  const { id } = req.body;
  const queryString = `delete from charadata where id = ${id}`;

  db.serialize(() => {
    db.all(queryString, err => {
      res.send({message: !err ? 'success' : 'エラーが発生しました。'});
    });
  });
})

app.listen(process.env.PORT || 8000);