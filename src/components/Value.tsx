import { useCounter, useGetCount } from "../store/useCounter";

const Value = () => {
    const count = useCounter((state) => state.value);
    const theSameCount = useGetCount();
    return (
        <>
            <h2>count: {count}</h2>
            <h2>the same count: {theSameCount}</h2>
        </>
    );
};

export default Value;
