const crud = require('./crud');
module.exports = (app, db) => {
  app.get("/plant", (req, res) => crud.findAll(db.plant, req, res));

  app.get("/plant/:id", (req, res) => crud.find(db.plant, req, res));

  app.post("/plant", (req, res) => crud.create(db.plant, req, res));

  app.put("/plant/:id", (req, res) => crud.update(db.plant, req, res));

  app.delete("/plant/:id", (req, res) => crud.delete(db.plant, req, res));
}
