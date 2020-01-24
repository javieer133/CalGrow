const crud = require('./crud');
module.exports = (app, db) => {
  app.get("/variety", (req, res) => crud.findAll(db.variety, req, res));

  app.get("/variety/:id", (req, res) => crud.find(db.variety, req, res));

  app.post("/variety", (req, res) => crud.create(db.variety, req, res));

  app.put("/variety/:id", (req, res) => crud.update(db.variety, req, res));

  app.delete("/variety/:id", (req, res) => crud.delete(db.variety, req, res));
}
