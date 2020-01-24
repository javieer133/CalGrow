const crud = require('./crud');
module.exports = (app, db) => {
  app.get("/specie", (req, res) => crud.findAll(db.specie, req, res));

  app.get("/specie/:id", (req, res) => crud.find(db.specie, req, res));

  app.post("/specie", (req, res) => crud.create(db.specie, req, res));

  app.put("/specie/:id", (req, res) => crud.update(db.specie, req, res));

  app.delete("/specie/:id", (req, res) => crud.delete(db.specie, req, res));
}
