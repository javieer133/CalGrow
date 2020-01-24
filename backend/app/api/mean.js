const crud = require('./crud');
module.exports = (app, db) => {
  app.get("/mean", (req, res) => crud.findAll(db.mean, req, res));

  app.get("/mean/:id", (req, res) => crud.find(db.mean, req, res));

  app.post("/mean", (req, res) => crud.create(db.mean, req, res));

  app.put("/mean/:id", (req, res) => crud.update(db.mean, req, res));

  app.delete("/mean/:id", (req, res) => crud.delete(db.mean, req, res));
}
