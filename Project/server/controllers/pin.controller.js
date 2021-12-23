const Pin = require("../models/pin.model");
const jwt = require("jsonwebtoken");


module.exports = {

    findAllPins: (req, res) =>{
        Pin.find({})
            .populate("createdBy", "username")
            .then((allPins)=>{
                console.log(allPins);
                res.json(allPins)
            })
            .catch((err)=>{
                console.log("Find all pins failed");
                res.json({message: "Something went wrong in findAllPins", error: err})
            })
    },

    findOnePin: (req, res) =>{
        Pin.findOne({_id: req.params.id})
            .then((onePin)=>{
                console.log(onePin);
                res.json(onePin)
            })
            .catch((err)=>{
                console.log("Failed to find one pin");
                res.json({ message: 'Something went wrong in findOnePin', error: err });
            })
    },


    //create new product with user login
    createNewPin: (req, res) =>{
        const newPinObj = new Pin(req.body);

        const decodedJWT = jwt.decode(req.cookies.usertoken,{
            complete: true
        })


        newPinObj.createdBy = decodedJWT.payload.id;

        newPinObj.save()
            .then((newPin) => {
                console.log(newPin);
                res.json(newPin);
            })
            .catch((err) => {
                console.log("Something went wrong in createNewPin");
                res.status(400).json(err);
            });
    },



    updatePin: (req, res) =>{
        Pin.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true, runValidators:true }
        )
            .then((updatedPin)=>{
                console.log(updatedPin);
                res.json(updatedPin);
                
            })
            .catch((err)=>{
                res.status(400).json(err);
            })
    },


    deletePin: (req, res) =>{
        Pin.deleteOne({_id: req.params.id})
            .then((deletedPin)=>{
                console.log(deletedPin);
                res.json(deletedPin)
            })
            .catch((err)=>{
                console.log("Delete pin failed");
                res.json({ message: 'Something went wrong in deletePin', error: err });
            })
    },

}