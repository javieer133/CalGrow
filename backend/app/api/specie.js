const crud = require('./crud');
module.exports = (app, db) => {
  app.get("/specie", (req, res) => crud.findAll(db.specie, req, res));

  app.get("/specie/:id", (req, res) => crud.find(db.specie, req, res));

  app.post("/specie", (req, res) => crud.create(db.specie, req, res));

  app.put("/specie/:id", (req, res) => crud.update(db.specie, req, res));

  app.delete("/specie/:id", (req, res) => crud.delete(db.specie, req, res));

  app.get("/specie/avg/:idField", (req, res) => {
    const mysql = require('mysql2');
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'calgrow_admin',
      password: 'V0n,^a.O]P!;q~eqG[',
      database: 'calgrow_measurements'
    });


      var consult = ` 
      select avg (medida) as avgField from specie s 
      join sector sec on sec.specieID = s.id
      join field f on f.id = sec.fieldId
      where f.id = ?
      
      ` 
      connection.query(
        consult,
        [req.params.idField],
        function(err, results) {
          res.status(200).json({
            status: 200,
            message: 'OK',
            payload: results,
          })
        });
      });
}
