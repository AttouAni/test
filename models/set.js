const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const setSchema = new Schema({
    reps: { type: Number, required: true },
    weight:{ type: Number, required: true},
    exercice:{type: Schema.Types.ObjectId, ref:"Exercice"}
});

module.exports = mongoose.model("Set", setSchema);