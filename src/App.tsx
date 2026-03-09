import "./App.css";
import Icons from "./components/Icons";
import Values from "./components/Values";
import Buttons from "./components/Buttons";

function App() {
    /*  const handleIncrement = () => {
        setCount((count) => count + 1);
    };
    const handleDecrement = () => {
        setCount((count) => count - 1);
    }; */

    return (
        <>
            <Icons />
            <Values />
            <Buttons />
        </>
    );
}

export default App;
