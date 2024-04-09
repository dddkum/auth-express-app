const Todos = require("../models/todos-model");

class TodosService {
  async getTodos() {
    const todos = await Todos.find({});
    return todos;
  }

  async postTodo(todoData){
    const todo = await Todos.create(todoData);
    return todo;
  }
}

module.exports = new TodosService();
