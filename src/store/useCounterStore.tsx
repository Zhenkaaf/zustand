import { create, type StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface IActions {
    increaseCount: () => void;
    decreaseCount: () => void;
}
interface IInitialState {
    value: number;
    color: string;
}
interface ICounterState extends IInitialState, IActions {}

const initialState: IInitialState = {
    value: 66,
    color: "purple",
};

const counterStore: StateCreator<
    ICounterState,
    [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set) => ({
    ...initialState,
    increaseCount: () =>
        set((state) => ({ value: state.value + 1 }), false, "incr"),
    decreaseCount: () =>
        set((state) => ({ value: state.value - 1 }), false, "decr"),
});

export const useCounter = create<ICounterState>()(
    devtools(
        persist(counterStore, {
            name: "zustandCount",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ value: state.value }),
        }),
    ),
);

export const useGetCount = () => useCounter((state) => state.value);
export const increaseCountFn = () => useCounter.getState().increaseCount();
export const decreaseCountFn = () => useCounter.getState().decreaseCount();
