function App() {
    const [expression, setExpression] = React.useState("0");
    const [answer, setAnswer] = React.useState(0);

    const display = (symbol) => {
        if (symbol === "0" && expression === "0") return;
        if (expression === "0" && /[1-9.]/.test(symbol)) setExpression(symbol);
        else if (/[+\-*/]$/.test(expression) && /[+\-*/]/.test(symbol)) {
            setExpression(prev => prev.slice(0, -1) + symbol);
        } else if (expression[expression.length - 1] === "=") {
            if (/[0-9.]/.test(symbol)) setExpression(symbol);
            else setExpression(answer + symbol);
        } else {
            if (symbol === ".") {
                const lastNumber = expression.split(/[\+\-\*\/]/).pop();
                if (lastNumber.includes(".")) return;
            }
            setExpression(prev => prev + symbol);
        }
    };

    const calculate = () => {
        if (!/[+\-*/]$/.test(expression)) {
            try {
                const result = eval(expression);
                const formattedResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(4));
                setAnswer(formattedResult);
                setExpression(prev => prev + "=");
            } catch (error) {
                setAnswer("Error");
            }
        }
    };

    const allClear = () => {
        setExpression("0");
        setAnswer(0);
    };

    const clear = () => {
        setExpression(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
    };

    return (
        <div className="container">
            <div className="grid">
                <div id="display" className="display">
                    <input type="text" value={expression} placeholder="0" disabled />
                    <div className="total">{answer}</div>
                </div>
                <div onClick={allClear} className="padButton AC red">AC</div>
                <div onClick={clear} id="clear" className="padButton C red">C</div>
                <div onClick={() => display("*")} id="multiply" className="padButton times">*</div>
                <div onClick={() => display("7")} id="seven" className="padButton seven darkgray">7</div>
                <div onClick={() => display("/")} id="divide" className="padButton div">/</div>
                <div onClick={() => display("8")} id="eight" className="padButton eight darkgray">8</div>
                <div onClick={() => display("9")} id="nine" className="padButton nine darkgray">9</div>
                <div onClick={() => display("-")} id="subtract" className="padButton minus">-</div>
                <div onClick={() => display("4")} id="four" className="padButton four darkgray">4</div>
                <div onClick={() => display("5")} id="five" className="padButton five darkgray">5</div>
                <div onClick={() => display("6")} id="six" className="padButton six darkgray">6</div>
                <div onClick={() => display("+")} id="add" className="padButton plus">+</div>
                <div onClick={() => display("1")} id="one" className="padButton one darkgray">1</div>
                <div onClick={() => display("2")} id="two" className="padButton two darkgray">2</div>
                <div onClick={() => display("3")} id="three" className="padButton three darkgray">3</div>
                <div onClick={() => calculate()} id="equals" className="padButton equal orange">=</div>
                <div onClick={() => display("0")} id="zero" className="padButton zero darkgray">0</div>
                <div onClick={() => display(".")} id="decimal" className="padButton dot darkgray">.</div>
            </div>
        </div>
    );
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
