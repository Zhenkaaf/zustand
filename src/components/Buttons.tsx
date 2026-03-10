import {
    decreaseCountFn,
    increaseCountFn,
    useCounter,
} from "../store/useCounterStore";

/* type PropsType = {
    onIncrement: () => void;
    onDecrement: () => void;
}; */
const Buttons = () => {
    const onIncrement = useCounter((state) => state.increaseCount);
    const onDecrement = useCounter((state) => state.decreaseCount);
    return (
        <div>
            {/* <button onClick={onIncrement}>Increase number</button>
            <button onClick={onDecrement}>Decrease number</button> */}
            <button onClick={increaseCountFn}>Increase number</button>
            <button onClick={decreaseCountFn}>Decrease number</button>
        </div>
    );
};

export default Buttons;
