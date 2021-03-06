const crud = require('./crud');
module.exports = (app, db) => {
  app.get("/sector/:id", (req, res) => crud.find(db.sector, req, res));

  app.post("/sector", (req, res) => crud.create(db.sector, req, res));

  app.put("/sector/:id", (req, res) => crud.update(db.sector, req, res));

  app.delete("/sector/:id", (req, res) => crud.delete(db.sector, req, res));

  app.get("/sector", (req, res) => {
    const mysql = require('mysql2');
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'calgrow_admin',
      password: 'V0n,^a.O]P!;q~eqG[',
      database: 'calgrow_measurements'
    });


      var consult = ` 
      SELECT s.id, s.name, s.fieldId, s.createdAt,s.updatedAt,sp.name AS especie, s.specieId 
      FROM  sector s 
      LEFT JOIN specie sp 
      ON s.specieId = sp.id 
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

      app.get("/sector/field/:idField/", (req, res) => {
        const mysql = require('mysql2');
        const connection = mysql.createConnection({
          host: 'localhost',
          user: 'calgrow_admin',
          password: 'V0n,^a.O]P!;q~eqG[',
          database: 'calgrow_measurements'
        });
    
    
          var consult = ` 
          SELECT * FROM sector WHERE fieldId = ?
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

          app.get("/sector/harvest/:idSector/", (req, res) => {
            const mysql = require('mysql2');
            const connection = mysql.createConnection({
              host: 'localhost',
              user: 'calgrow_admin',
              password: 'V0n,^a.O]P!;q~eqG[',
              database: 'calgrow_measurements'
            });
        
        
              var consult = ` 
              select s.harvestDays, s.seasonStart from specie s 
              join sector sec on sec.specieId = s.id
              where sec.id = ?
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
