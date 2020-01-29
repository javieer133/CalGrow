const crud = require('./crud'); 

module.exports = (app, db) => {
  const tables = {
    field: db.field,
    fruit: db.fruit,
    sector: db.sector,
    plant: db.plant
  }
  app.get("/field", (req, res) => crud.findAll(db.field, req, res));

  app.get("/field/:id", (req, res) => crud.find(db.field, req, res));

  app.post("/field", (req, res) => crud.create(db.field, req, res));

  app.put("/field/:id", (req, res) => crud.update(db.field, req, res));

  app.delete("/field/:id", (req, res) => crud.delete(db.field, req, res));

  
  app.get("/field/suscription/:id/", (req, res) => {
    const mysql = require('mysql2');
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'javier',
      password: 'Javierihm798',
      database: 'calgrow'
    });

    var consult = ` 
      SELECT *
      FROM field 
      WHERE subscriptionId = ? 
      ORDER BY createdAt
    ` 
    connection.query(
      consult,
      [req.params.id],
      function(err, results) {
        res.status(200).json({
          status: 200,
          message: 'OK',
          payload: results,
        })
      });

    
  });

  app.get("/field/:id/counts", (req, res) => {
    const mysql = require('mysql2');
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'javier',
      password: 'Javierihm798',
      database: 'calgrow'
    });
  
  
    // Get quantity of sectors, plants and fruits for fieldId
    var consult = `
      SELECT COUNT(*) count FROM sector WHERE fieldId = ? 
      UNION ALL
      SELECT COUNT(*)  
        FROM plant P 
        JOIN sector S on P.sectorId = S.id
        WHERE S.fieldId = ?
      UNION ALL
      SELECT COUNT(*)
        FROM fruit F
        JOIN plant P on F.plantId = P.id
        JOIN sector S on P.sectorId = S.id
        WHERE S.fieldId = ?
    `
    connection.query(
      consult,
      [req.params.id,req.params.id,req.params.id],
      (err, results) => {
        console.log(results)
        res.status(200).json({
          status: 200,
          message: 'OK',
          payload: [{ sectors: results[0].count, plants: results[1].count, fruits: results[2].count }]
        })
      }
    );
    
    
  });

  

  

}
