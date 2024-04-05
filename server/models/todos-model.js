const { Schema, model } = require("mongoose");

const TodosSchema = new Schema({
  todo: { type: Schema.Types.ObjectId, ref: "User" },
  noteDate: { type: Date },
  deadLineDate: { type: Date },
});

module.exports = model("Todos", TodosSchema);
