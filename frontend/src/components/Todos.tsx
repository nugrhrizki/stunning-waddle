import { Todo } from "../types";
import TodoItem from "./TodoItem";

interface TodosProps {
  todos: Todo[];
  toggle: (id: number) => () => void;
  deleteTodo: (id: number) => () => void;
}

const Todos = ({ todos, toggle, deleteTodo }: TodosProps) => {
  return (
    <ul className="flex gap-4 mt-4 flex-col">
      {todos.length > 0
        ? todos.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              toggle={toggle}
              deleteTodo={deleteTodo}
            />
          ))
        : "No todo"}
    </ul>
  );
};

export default Todos;
