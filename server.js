const express = require("express");
const mysql = require("mysql2");

// https://www.bezkoder.com/node-js-rest-api-express-mysql/
// https://diegooo.com/node-js-y-express-js-como-crear-un-proyecto/


const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Cambia esto según tu configuración
  password: "password", // Cambia esto según tu configuración
  database: "escuela", // Cambia esto según tu configuración
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

// Endpoint GET para obtener datos de la base de datos
app.get("/ruta", (req, res) => {
  const query = "SELECT * FROM your_table_name"; // Cambia "your_table_name" por el nombre de tu tabla

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error ejecutando la consulta:", err);
      res.status(500).json({ error: "Error al obtener los datos" });
      return;
    }
    res.json(results);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
