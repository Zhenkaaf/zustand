import {
    decreaseCountFn,
    increaseCountFn,
    useCounter,
} from "../store/useCounter";

/* type PropsType = {
    onIncrement: () => void;
    onDecrement: () => void;
}; */
const Buttons = () => {
    console.log("BUTTONS");
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
