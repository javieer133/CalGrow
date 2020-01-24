const crud = require('./crud');
module.exports = (app, db) => {
  app.get("/sector", (req, res) => crud.findAll(db.sector, req, res));

  app.get("/sector/:id", (req, res) => crud.find(db.sector, req, res));

  app.post("/sector", (req, res) => crud.create(db.sector, req, res));

  app.put("/sector/:id", (req, res) => crud.update(db.sector, req, res));

  app.delete("/sector/:id", (req, res) => crud.delete(db.sector, req, res));
}
