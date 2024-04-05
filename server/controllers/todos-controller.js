const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const todosService = require("../service/todos-service");

class TodosController {
  async getTodos(req, res, next) {
    try {
      const todosData = await todosService.getTodos();
      return res.json(todosData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TodosController();
