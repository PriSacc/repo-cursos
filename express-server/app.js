var express = require("express"); //uso del módulo express
var app = express(); //inicializa un servidor web
app.use(express.json()); //usa json
app.listen(3000, () => console.log('Server runing in port 3000')); //va a estar en este puerto

//CONFIGURACIÓN DE TRES RUTAS con .get y .post
app.get("/url", (req, res, next) => res.json(
    ["Paris", "Barcelona", "Barranquilla", "Montevideo", "Bariloche", "México DF", "NY"]
  )
);

var misDestinos = [];
app.get("/my", (req, res, next) => res.json(misDestinos));
app.post("/my", (req, res, next) => {
  console.log(req,body);
  misDestinos = req.body;
  res.json(misDestinos);
});