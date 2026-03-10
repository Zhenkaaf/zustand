import { create, type StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface ITodo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}
interface IActions {
    fetchTodos: () => Promise<void>;
    deleteTodo: (todoId: number) => Promise<void>;
    toggleTodo: (todoId: number) => void;
}
interface IInitialState {
    todos: ITodo[];
    isLoading: boolean;
}
interface ITodosState extends IInitialState, IActions {}

const initialState: IInitialState = {
    todos: [],
    isLoading: false,
};

const todosStore: StateCreator<
    ITodosState,
    [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set, get) => ({
    ...initialState,
    fetchTodos: async () => {
        /* Если новое значение зависит от предыдущего состояния — используй функцию.
        Если не зависит — можно передать объект. 
        false означает merge, а не полную замену состояния.
        "fetchTodos" — это имя действия для DevTools.*/
        set({ isLoading: true }, false, "fetchTodos");
        try {
            const res = await fetch("https://dummyjson.com/todos?limit=3");
            if (!res.ok) {
                throw new Error(`Server error ${res.status}`);
            }
            const data = await res.json();
            set({ todos: data.todos }, false, "fetchTodos/success");
        } catch (err) {
            console.error("Error fetching todos:", err);
            set({ todos: [] }, false, "fetchTodos/failed");
        } finally {
            set({ isLoading: false }, false, "fetchTodos/finally");
        }
    },
    deleteTodo: async (todoId) => {
        try {
            const res = await fetch("https://dummyjson.com/todos/" + todoId, {
                method: "DELETE",
            });
            if (!res.ok) {
                throw new Error(`Server error ${res.status}`);
            }
            const data = await res.json();
            if (data.isDeleted) {
                set(
                    () => {
                        const todos = get().todos;
                        return {
                            todos: todos.filter((todo) => todo.id !== todoId),
                        };
                    },
                    false,
                    "deleteTodo",
                );
            }
        } catch (err) {
            console.error("Error deleting todo:", err);
        }
    },
    toggleTodo: (todoId) => {
        set(
            (state) => ({
                todos: state.todos.map((todo) =>
                    todo.id === todoId
                        ? { ...todo, completed: !todo.completed }
                        : todo,
                ),
            }),
            false,
            "toggleTodo",
        );
    },
});

export const useTodosStore = create<ITodosState>()(
    devtools(
        persist(todosStore, {
            name: "zustandTodos",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ todos: state.todos }),
        }),
    ),
);

export const useGetTodos = () => useTodosStore((state) => state.todos);
export const useIsLoading = () => useTodosStore((state) => state.isLoading);
export const fetchTodos = () => useTodosStore.getState().fetchTodos();
export const deleteTodo = (todoId: number) =>
    useTodosStore.getState().deleteTodo(todoId);
export const toggleTodo = (todoId: number) =>
    useTodosStore.getState().toggleTodo(todoId);
