const { Schema, model } = require("mongoose");

const TodosSchema = new Schema({
  todo: { type: String },
  noteDate: { type: Date },
  deadLineDate: { type: Date },
});

module.exports = model("Todos", TodosSchema);
