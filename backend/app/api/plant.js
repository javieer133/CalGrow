const crud = require('./crud');
module.exports = (app, db) => {
  app.get("/plant", (req, res) => crud.findAll(db.plant, req, res));

  app.get("/plant/:id", (req, res) => crud.find(db.plant, req, res));

  app.post("/plant", (req, res) => crud.create(db.plant, req, res));

  app.put("/plant/:id", (req, res) => crud.update(db.plant, req, res));

  app.delete("/plant/:id", (req, res) => crud.delete(db.plant, req, res));

  app.get("/plant/sector/:idSector/", (req, res) => {
    const mysql = require('mysql2');
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'calgrow_admin',
      password: 'V0n,^a.O]P!;q~eqG[',
      database: 'calgrow_measurements'
    });
  
  
      var consult = ` 
      SELECT * FROM plant WHERE sectorId = ?
      ` 
      connection.query(
        consult,
        [req.params.idSector],
        function(err, results) {
          res.status(200).json({
            status: 200,
            message: 'OK',
            payload: results,
          })
        });
      });
}