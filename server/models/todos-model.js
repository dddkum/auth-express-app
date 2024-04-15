const { Schema, model } = require("mongoose");

const TodosSchema = new Schema(
    {
      id: { type: Number, unique: true, required: true },
      todo: { type: String, required: true },
      noteDate: { type: Date, required: true },
      deadLineDate: { type: Date, required: true },
    },
    {
      versionKey: false,
    }
);

module.exports = model("Todos", TodosSchema);
