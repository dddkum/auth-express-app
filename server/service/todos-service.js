const Todos = require("../models/todos-model");

class TodosService {
  async getTodos() {
    const todos = await Todos.find({}).select('todo noteDate deadLineDate id').exec();
    return todos.map((todo) => ({
      todo: todo.todo,
      noteDate: todo.noteDate,
      deadLineDate: todo.deadLineDate,
      id: todo.id,
    }));
  }

  async reorderTodos() {
    const todos = await Todos.find().sort({ id: 1 }).exec();

    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i];

      if (todo.id !== i + 1) {
        // если есть пропуски в числовом порядке id, необходимо переупорядочить и перезаписать документы
        for (let j = 0; j < todos.length; j++) {
          const todoToUpdate = todos[j];
          todoToUpdate.id = j + 1;
          await todoToUpdate.save();
        }
        break;
      }
    }
  }

  async postTodo(todoData) {
    const todos = await Todos.find().exec();
    const lastTodo = todos[todos.length - 1];

    if (lastTodo) {
      todoData.id = lastTodo.id + 1;
    } else {
      todoData.id = 1;
    }

    const todo = await Todos.create(todoData);
    await this.reorderTodos();

    return todo;
  }
}

module.exports = new TodosService();

