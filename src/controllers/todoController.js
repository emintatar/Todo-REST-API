const todo = require("../models/todoModel");

const todoAdd = async (req, res) => {
  try {
    const _todo = await todo.findOne({
      name: req.body.name,
    });
    if (_todo) {
      return res.status(400).json({
        success: false,
        message: "Todo already exists",
      });
    }

    const todoData = new todo(req.body);

    await todoData
      .save()
      .then(() => {
        res.status(201).json(todoData);
      })
      .catch((error) => {
        res.status(400).json({
          success: false,
          message: "Error: " + error.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error: " + error.message,
    });
  }
};

const todoGetAll = async (req, res) => {
  const page = req.query.page;
  const limit = 2;
  const skip = Number(page - 1) * limit;

  try {
    const _todo = await todo.find({}).limit(limit).skip(skip);

    if (!_todo) {
      return res.status(400).json({
        success: false,
        message: "No todo found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Todo found",
      data: _todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error: " + error.message,
    });
  }
};

const todoUpdate = async (req, res) => {
  const id = req.params.id;

  try {
    const _todo = await todo.findByIdAndUpdate(id, req.body);
    if (!_todo) {
      return res.status(400).json({
        success: false,
        message: "No todo found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: _todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error: " + error.message,
    });
  }
};

const todoDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const _todo = await todo.findByIdAndDelete(id);
    if (!_todo) {
      return res.status(400).json({
        success: false,
        message: "No todo found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: _todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error: " + error.message,
    });
  }
};

const todoGetId = async (req, res) => {
  const id = req.params.id;

  try {
    const _todo = await todo.findById(id);
    if (!_todo) {
      return res.status(400).json({
        success: false,
        message: "No todo found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Todo found",
      data: _todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error: " + error.message,
    });
  }
};

module.exports = {
  todoAdd,
  todoGetAll,
  todoUpdate,
  todoDelete,
  todoGetId,
};
