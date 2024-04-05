const Todos = require("../models/todos-model");

class TodosService {
  async getTodos() {
    const todos = await Todos.find({});
    return todos;
  }
}

module.exports = new TodosService();
