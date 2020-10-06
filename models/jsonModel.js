var mongoose = require('mongoose');

var JsonModelSchema = mongoose.Schema({
    "_id": String, 
    "plante": String, 
    "famille": String, 
    "color": Array, 
    "plantDetails": Object, 
    "classification": Object, 
});
// je crée un model et j'attache le schema ci dessus
var JSONMODEL = mongoose.model('JSONMODEL', JsonModelSchema);

module.exports = JSONMODEL;