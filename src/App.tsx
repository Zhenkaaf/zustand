import "./App.css";
import Icons from "./components/Icons";
import Values from "./components/Values";
import Buttons from "./components/Buttons";
import { useEffect } from "react";
import {
    deleteTodo,
    fetchTodos,
    toggleTodo,
    useGetTodos,
    useIsLoading,
} from "./store/useTodosStore";

function App() {
    const todos = useGetTodos();
    const isLoading = useIsLoading();

    useEffect(() => {
        fetchTodos();
    }, []);

    if (isLoading) {
        return <h2>loading...</h2>;
    }
    return (
        <>
            <Icons />
            <Values />
            <Buttons />

            <div>
                {todos.map((todo) => (
                    <div
                        key={todo.id}
                        style={{
                            border: "1px solid gray",
                            padding: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <p
                            style={{
                                textDecoration: todo.completed
                                    ? "line-through"
                                    : "none",
                            }}
                        >
                            {todo.todo}
                        </p>

                        <button onClick={() => toggleTodo(todo.id)}>
                            {todo.completed ? "Undo" : "Complete"}
                        </button>

                        <button
                            onClick={() => deleteTodo(todo.id)}
                            style={{ marginLeft: "10px" }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
