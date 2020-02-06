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
      user: 'calgrow_admin',
      password: 'V0n,^a.O]P!;q~eqG[',
      database: 'calgrow_measurements'
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

  app.get("/field/avg/:id/", (req, res) => {
    const mysql = require('mysql2');
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'calgrow_admin',
      password: 'V0n,^a.O]P!;q~eqG[',
      database: 'calgrow_measurements'
    });

    var consult = ` 
    SELECT avg(ecuatorial_mean) AS ecAVG, avg(polar_mean) AS pAVG FROM mean as m
    inner join plant p on m.plantId = p.id
    inner join sector s on s.id = p.sectorId
    inner join field f on s.fieldId = f.id
    where f.id = ?
    GROUP BY f.id
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

  app.get("/field/avgDate/:id/:startDate/:endDate", (req, res) => {
    const mysql = require('mysql2');
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'calgrow_admin',
      password: 'V0n,^a.O]P!;q~eqG[',
      database: 'calgrow_measurements'
    });

    var consult = ` 
    SELECT avg(ecuatorial_mean) AS ecAVG, avg(polar_mean) AS pAVG FROM mean as m
    inner join plant p on m.plantId = p.id
    inner join sector s on s.id = p.sectorId
    inner join field f on s.fieldId = f.id
    where f.id = ? and m.updatedAt >= ? and m.updatedAt < ? + INTERVAL 1 DAY  
    GROUP BY f.id 
    ` 
    connection.query(
      consult,
      [req.params.id, req.params.startDate, req.params.endDate],
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
      user: 'calgrow_admin',
      password: 'V0n,^a.O]P!;q~eqG[',
      database: 'calgrow_measurements'
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
