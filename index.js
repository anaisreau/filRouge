const express = require('express');
const app = express();
const port = 3000;
const connection = require('./conf');

// Support JSON-encoded bodies
app.use(express.json());
// Support URL-encoded bodies
app.use(express.urlencoded({
  extended: true
}));



app.get('/api/person', (req, res) => {
    connection.query('SELECT * from person', (err, results) => {
        if (err) {
        res.status(500).send('Erreur lors de la récupération des personnes');
      } else {
        res.json(results);
      }
    });
  });

  app.get('/api/person/name', (req, res) => {
    connection.query('SELECT name from person', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des employés');
      } else {
        res.json(results);
      }
    });
  });


app.get('/api/person/name/member', (req, res) => {
  connection.query('SELECT name, member from person WHERE member=true', (err, results) => {
  if (err) {
    res.status(500).send('Erreur lors de la récupération des personnes');
  } else {
    res.json(results);
  }
});
});
app.get('/api/person/name/age', (req, res) => {
  connection.query('SELECT name, birthday, age from person WHERE age>30', (err, results) => {
  if (err) {
    res.status(500).send('Erreur lors de la récupération des personnes');
  } else {
    res.json(results);
  }
});
});

app.get('/api/person/name/filter', (req, res) => {
  connection.query(`SELECT name from person WHERE name LIKE '%a%'`, (err, results) => {
  if (err) {
    res.status(500).send('Erreur lors de la récupération des personnes');
  } else {
    res.json(results);
  }
});
});

app.get('/api/person/name/begin', (req, res) => {
  connection.query(`SELECT name from person WHERE name LIKE 'a%'`, (err, results) => {
  if (err) {
    res.status(500).send('Erreur lors de la récupération des personnes');
  } else {
    res.json(results);
  }
});
});

app.get('/api/person/name/old', (req, res) => {
  connection.query('SELECT name, birthday, age from person WHERE birthday > 1991-12-12 and member=true', (err, results) => {
  if (err) {
    res.status(500).send('Erreur lors de la récupération des personnes');
  } else {
    res.json(results);
  }
});
});

app.get('/api/person/name/age/:order', (req, res) => {
  connection.query(`SELECT * from person ORDER BY age ${req.params.order}`, (err, results) => {
  if (err) {
    res.status(500).send('Erreur lors de la récupération des personnes');
  } else {
    res.json(results);
  }
});
});

app.post('/api/person', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO person SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'une personne");
    } else {
      res.send(200);
    }
  });
});

app.put('/api/person/:id', (req, res) => {
  const idPerson = req.params.id;
  const formData = req.body;
  connection.query('UPDATE person SET ? WHERE id = ?', [formData, idPerson], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'une personne");
    } else {
      res.sendStatus(200);
    }
  });
});
  
app.put('/api/person/member/:name', (req, res) => {
  const namePerson = req.params.name;
  connection.query('UPDATE person SET member=NOT member WHERE name= ?', [namePerson], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'une personne");
    } else {
      res.sendStatus(200);
    }
  });
});
app.delete('/api/person/:id', (req, res) => {
  const idPerson= req.params.id;
  connection.query('DELETE FROM person WHERE id = ?',[idPerson], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'une personne");
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/api/person/delete/false', (req, res) => {
  connection.query('DELETE FROM person WHERE member= false', err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'une personne");
    } else {
      res.sendStatus(200);
    }
  });
});

  app.listen(port, (err) => {
    if (err) {
      throw new Error('Something bad happened...');
    }
  
    console.log(`Server is listening on ${port}`);
  });
