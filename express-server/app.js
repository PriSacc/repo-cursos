// var express = require("express"); //uso del módulo express
// var app = express(); //inicializa un servidor web
// app.use(express.json()); //usa json
// app.listen(3000, () => console.log('Server runing in port 3000')); //va a estar en este puerto

// //CONFIGURACIÓN DE TRES RUTAS con .get y .post
// app.get("/url", (req, res, next) => res.json(
//     ["Paris", "Barcelona", "Barranquilla", "Montevideo", "Bariloche", "México DF", "NY"]
//   )
// );

// var misDestinos = [];
// app.get("/my", (req, res, next) => res.json(misDestinos));
// app.post("/my", (req, res, next) => {
//   console.log(req,body);
//   misDestinos = req.body;
//   res.json(misDestinos);
// });

var express = require("express"), cors = require('cors');
var app = express(); 
app.use(express.json());
app.use(cors()); //permitir que no me llamen de un browser en una pag html que tiene el puerto 3000
app.listen(3000, () => console.log('Server runing in port 3000')); //va a estar en este puerto

var ciudades = ["Paris", "Barcelona", "Barranquilla", "Montevideo", "Bariloche", "México DF", "NY"];
app.get("/ciudades", (req, res, next) => res.json(
  ciudades.filter( 
    (c) => c.toLowerCase().indexOf(
      req.query.q.toString().toLowerCase()) 
    > -1)
  )
);

var misDestinos = [];
app.get("/my", (req, res, next) => res.json(misDestinos));
app.post("/my", (req, res, next) => {
  console.log(req,body);
  misDestinos.push(req.body.nuevo);
  res.json(misDestinos);
});