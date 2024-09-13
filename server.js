const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'escuela'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// CRUD para la tabla 'cursos'
app.get('/cursos', (req, res) => {
  db.query('SELECT * FROM cursos', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post('/cursos', (req, res) => {
  const { nombre, creditos, profesor_id } = req.body;
  db.query('INSERT INTO cursos (nombre, creditos, profesor_id) VALUES (?, ?, ?)',
    [nombre, creditos, profesor_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

app.put('/cursos/:id', (req, res) => {
  const { nombre, creditos, profesor_id } = req.body;
  db.query('UPDATE cursos SET nombre = ?, creditos = ?, profesor_id = ? WHERE curso_id = ?',
    [nombre, creditos, profesor_id, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

app.delete('/cursos/:id', (req, res) => {
  db.query('DELETE FROM cursos WHERE curso_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// CRUD para la tabla 'estudiantes'
app.get('/estudiantes', (req, res) => {
  db.query('SELECT * FROM estudiantes', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post('/estudiantes', (req, res) => {
  // const objeto = {
  //   propiedad: 'hola',
  //   propiedad2: 'hola',
  //   propiedad3: 'hola',
  // }

  // const { propiedad2 } = objeto;
  const { nombre, fecha_nacimiento, grado } = req.body;

  db.query('INSERT INTO estudiantes (nombre, fecha_nacimiento, grado) VALUES (?, ?, ?)',
    [nombre, fecha_nacimiento, grado],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

app.put('/estudiantes/:id', (req, res) => {
  const { nombre, fecha_nacimiento, grado } = req.body;
  const { id } = req.params;
  db.query('UPDATE estudiantes SET nombre = ?, fecha_nacimiento = ?, grado = ? WHERE estudiante_id = ?',
    [nombre, fecha_nacimiento, grado, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

app.delete('/estudiantes/:id', (req, res) => {
  db.query('DELETE FROM estudiantes WHERE estudiante_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// CRUD para la tabla 'inscripciones'
app.get('/inscripciones', (req, res) => {
  db.query('SELECT * FROM inscripciones', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post('/inscripciones', (req, res) => {
  const { estudiante_id, curso_id, fecha_inscripcion } = req.body;
  db.query('INSERT INTO inscripciones (estudiante_id, curso_id, fecha_inscripcion) VALUES (?, ?, ?)',
    [estudiante_id, curso_id, fecha_inscripcion],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

app.put('/inscripciones/:id', (req, res) => {
  const { estudiante_id, curso_id, fecha_inscripcion } = req.body;
  db.query('UPDATE inscripciones SET estudiante_id = ?, curso_id = ?, fecha_inscripcion = ? WHERE inscripcion_id = ?',
    [estudiante_id, curso_id, fecha_inscripcion, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

app.delete('/inscripciones/:id', (req, res) => {
  db.query('DELETE FROM inscripciones WHERE inscripcion_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// CRUD para la tabla 'profesores'
app.get('/profesores', (req, res) => {
  db.query('SELECT * FROM profesores', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post('/profesores', (req, res) => {
  const { nombre, especialidad } = req.body;
  db.query('INSERT INTO profesores (nombre, especialidad) VALUES (?, ?)',
    [nombre, especialidad],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

app.put('/profesores/:id', (req, res) => {
  const { nombre, especialidad } = req.body;
  db.query('UPDATE profesores SET nombre = ?, especialidad = ? WHERE profesor_id = ?',
    [nombre, especialidad, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

app.delete('/profesores/:id', (req, res) => {
  db.query('DELETE FROM profesores WHERE profesor_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
