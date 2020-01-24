const crud = require('./crud');
module.exports = (app, db) => {
  app.get("/measurement", (req, res) => crud.findAll(db.measurement, req, res));

  app.get("/measurement/:id", (req, res) => crud.find(db.measurement, req, res));

  app.post("/measurement", (req, res) => crud.create(db.measurement, req, res));

  app.put("/measurement/:id", (req, res) => crud.update(db.measurement, req, res));

  app.delete("/measurement/:id", (req, res) => crud.delete(db.measurement, req, res));
}
