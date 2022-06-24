import { Todo } from "../types";

interface TodoProps {
  todo: Todo;
  toggle: (id: number) => () => void;
  deleteTodo: (id: number) => () => void;
}

const TodoItem = ({ todo, toggle, deleteTodo }: TodosProps) => {
  return (
    <li className="p-4 bg-white rounded grow">
      <div className="flex">
        <div className="flex justify-center items-center w-12">
          <input
            className="scale-150"
            type="checkbox"
            onChange={toggle(todo.id)}
            checked={todo.is_completed}
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold">{todo.name}</h3>
          <p>{todo.description}</p>
          <button
            onClick={deleteTodo(todo.id)}
            className="px-4 py-2 border border-gray-200 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
