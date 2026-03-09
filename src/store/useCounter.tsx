import { create } from "zustand";

interface ICounterState {
    value: number;
    increaseCount: () => void;
    decreaseCount: () => void;
}
interface IInitialState {
    value: number;
}

const initialState: IInitialState = {
    value: 66,
};
export const useCounter = create<ICounterState>()((set) => ({
    ...initialState,
    increaseCount: () => set((state) => ({ value: state.value + 1 })),
    decreaseCount: () => set((state) => ({ value: state.value - 1 })),
}));

export const useGetCount = () => useCounter((state) => state.value);
export const increaseCountFn = () => useCounter.getState().increaseCount();
export const decreaseCountFn = () => useCounter.getState().decreaseCount();
