import { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "./types";
import Todos from "./components/Todos";

function App() {
  const [todo, setTodo] = useState({ name: "", description: "" });
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/todos/get-all")
      .then(({ data }) => setTodos(data.data))
      .catch((err) => console.log(err));
  }, []);

  const updateName = (e: any) => {
    const { value } = e.target as HTMLInputElement;
    setTodo((t) => ({ ...t, name: value }));
  };

  const updateDescription = (e: any) => {
    const { value } = e.target as HTMLInputElement;
    setTodo((t) => ({ ...t, description: value }));
  };

  const submit = async () => {
    try {
      await axios
        .post("http://localhost:8080/todos/create", todo)
        .then(({ data }) => setTodos((t) => [...t, data.data]));
      setTodo({ name: "", description: "" });
    } catch (err) {
      // TODO: handle error
      console.log(err);
    }
  };

  const toggleCompleted = (id: number) => async () => {
    try {
      const currentTodo = todos.filter((t) => t.id === id)[0];
      currentTodo.is_completed = !currentTodo.is_completed;
      await axios
        .patch("http://localhost:8080/todos/update", currentTodo)
        .then(() => {
          setTodos((t) => t.map((u) => (u.id === id ? currentTodo : u)));
        });
    } catch (err) {
      // TODO: handle error
      console.log(err);
    }
  };

  const deleteTodo = (id: number) => async () => {
    try {
      // FIXME: change to delete method instead
      await axios.post("http://localhost:8080/todos/delete", { id }).then(() =>
        setTodos((t) => {
          const newTodo = t.filter((u) => u.id !== id);
          return newTodo;
        })
      );
    } catch (err) {
      // TODO: handle error
      console.log(err);
    }
  };

  return (
    <div className="p-4 container mx-auto">
      <div className="bg-teal-500 p-4 rounded-lg">
        <input
          className="block rounded p-2 w-full"
          placeholder="name"
          value={todo.name}
          onChange={updateName}
        />
        <input
          className="block my-4 rounded p-2 w-full"
          placeholder="description"
          value={todo.description}
          onChange={updateDescription}
        />
        <button className="px-4 py-2 bg-white rounded" onClick={submit}>
          submit
        </button>
      </div>
      <Todos todos={todos} toggle={toggleCompleted} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
