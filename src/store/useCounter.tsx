import { create, type StateCreator } from "zustand";

interface IActions {
    increaseCount: () => void;
    decreaseCount: () => void;
}
interface IInitialState {
    value: number;
}
interface ICounterState extends IInitialState, IActions {}

const initialState: IInitialState = {
    value: 66,
};

const counterStore: StateCreator<ICounterState> = (set) => ({
    ...initialState,
    increaseCount: () => set((state) => ({ value: state.value + 1 })),
    decreaseCount: () => set((state) => ({ value: state.value - 1 })),
});

export const useCounter = create<ICounterState>()(counterStore);

export const useGetCount = () => useCounter((state) => state.value);
export const increaseCountFn = () => useCounter.getState().increaseCount();
export const decreaseCountFn = () => useCounter.getState().decreaseCount();
