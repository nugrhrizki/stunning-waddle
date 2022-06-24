import { Request, Response } from "express";
import { errorResponse, successResponse } from "../helpers";

import { AppDataSource } from "../data-source";
import { Todo } from "../entity/Todo";

const todo = AppDataSource.getRepository(Todo);

export const create = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, description } = req.body;
  const newTodo = new Todo();
  newTodo.name = name;
  newTodo.description = description;
  newTodo.is_completed = false;

  try {
    await todo.save(newTodo);
    successResponse(res, newTodo);
  } catch (err) {
    errorResponse(res, err);
  }
};

export const getAll = async (_: Request, res: Response) => {
  try {
    const todos = await todo.find();
    successResponse(res, todos);
  } catch (err) {
    errorResponse(res, err);
  }
};

export const get = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const todo_ = await todo.findOneBy({ id });
    successResponse(res, todo_);
  } catch (err) {
    errorResponse(res, err);
  }
};

export const update = async (req: Request, res: Response) => {
  const { id, name, description, is_completed } = req.body;
  try {
    const updatedTodo = await todo.findOneBy({ id });
    if (updatedTodo) {
      updatedTodo.name = name;
      updatedTodo.description = description;
      updatedTodo.is_completed = is_completed;
      await todo.save(updatedTodo);
      const todos = await todo.find();
      successResponse(res, todos);
    } else {
      errorResponse(res, "Todo not fonud");
    }
  } catch (err) {
    errorResponse(res, err);
  }
};

export const destroy = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    await todo.delete({ id });
    successResponse(res, "todo deleted");
  } catch (err) {
    errorResponse(res, err);
  }
};
