const PinController = require("../controllers/pin.controller");

const { authenticate } = require("../config/jwt.config");


module.exports = (app) =>{

app.get("/api/pins", PinController.findAllPins);

app.post("/api/pins", authenticate, PinController.createNewPin);

app.get("/api/pin/:id", PinController.findOnePin);

app.put("/api/pin/:id", PinController.updatePin);

app.delete("/api/pin/:id", PinController.deletePin);

}