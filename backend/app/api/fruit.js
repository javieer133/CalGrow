const crud = require('./crud');
module.exports = (app, db) => {
  app.get("/fruit", (req, res) => crud.findAll(db.fruit, req, res));

  app.get("/fruit/:id", (req, res) => crud.find(db.fruit, req, res));

  app.post("/fruit", (req, res) => crud.create(db.fruit, req, res));

  app.put("/fruit/:id", (req, res) => crud.update(db.fruit, req, res));

  app.delete("/fruit/:id", (req, res) => crud.delete(db.fruit, req, res));

  app.get("/fruit/field/:id/:type", (req, res) => {

    const mysql = require('mysql2');
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'calgrow_admin',
      password: 'V0n,^a.O]P!;q~eqG[',
      database: 'calgrow_measurement'
    });

    
    consultTypes = {
     month :  `GROUP BY YEAR(M.createdAt), MONTH(M.createdAt) ORDER BY M.createdAt, S.id`, 
     week : `GROUP BY M.createdAt ORDER BY M.createdAt, S.id`,
     year : `GROUP BY YEAR(M.createdAt) ORDER BY M.createdAt `
    }
    
    var consult = ` 
    SELECT AVG(M.ecuatorial_length) AVGEcu, AVG(M.polar_length) AVGPol, 
          day(M.createdAt) day, YEAR(M.createdAt) year, YEAR(M.createdAt)+1 year2,
          monthname(M.createdAt) month 
        FROM measurement M 
        JOIN fruit F on M.fruitId = F.id 
        JOIN plant P on F.plantId = P.id 
        JOIN sector S on P.sectorId = S.id
        JOIN field D on S.fieldId = D.id 
        WHERE D.id = ?
    `  
    switch (req.params.type) {
      case 'month': consult = consult + consultTypes.month;
        break;
      case 'week':  consult = consult + consultTypes.week;
          break;
      case 'year':  consult = consult + consultTypes.year;
          break;
    }
    
    connection.query(
      consult,
      [req.params.id],
      function(err, results) {
        var periods = [];
        if(req.params.type != 'year'){
            //Agrupamos por periodos
            results.reduce((res, value) => {
              if (!res[value.year]) {
                  res[value.year] = { period: value.year +'-'+ value.year2, labels: [],polarData:[], ecuatorialData:[] };
                  periods.push(res[value.year])
              }
              res[value.year].labels.push( 
                  req.params.type == 'week' ? 
                                      value.day + '-' + value.month.substring(0, 3) : 
                                      value.month.substring(0, 3) 
              );
              res[value.year].polarData.push(value.AVGPol);
              res[value.year].ecuatorialData.push(value.AVGEcu);
              return res;
            }, {});
        } else {
            periods.push({ period: 'Histórico', labels: [], polarData:[], ecuatorialData:[] }) 
            results.forEach( element => {
              periods[0].labels.push(element.year);
              periods[0].polarData.push(element.AVGPol);
              periods[0].ecuatorialData.push(element.AVGEcu);
            });
        }
        res.status(200).json({
          status: 200,
          message: 'OK',
          payload: periods,
        })
      }
    );   
  });
  

}
