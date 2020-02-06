const crud = require('./crud');
module.exports = (app, db) => {
  app.get("/measurement", (req, res) => crud.findAll(db.measurement, req, res));

  app.get("/measurement/:id", (req, res) => crud.find(db.measurement, req, res));

  app.post("/measurement", (req, res) => crud.create(db.measurement, req, res));

  app.put("/measurement/:id", (req, res) => crud.update(db.measurement, req, res));

  app.delete("/measurement/:id", (req, res) => crud.delete(db.measurement, req, res));

  app.get("/measurement/avg/", (req, res) => {
    const mysql = require('mysql2');
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'calgrow_admin',
      password: 'V0n,^a.O]P!;q~eqG[',
      database: 'calgrow_measurements'
    });
  
  
      var consult = ` 
      SELECT avg(ecuatorial_length) AS ecAVG, avg(polar_length) AS pAVG FROM measurement WHERE fruitId = ?
      ` 
      connection.query(
        consult,
        function(err, results) {
          res.status(200).json({
            status: 200,
            message: 'OK',
            payload: results,
          })
        });
      });
}
