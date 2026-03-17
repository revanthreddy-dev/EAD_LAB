import { useState } from "react";
import "./Counter.css"



function Counter() {
    const[count,setCount] = useState(0);
    const[theme,setTheme] = useState("light");

    return(
        <div className={`counter-container ${theme}`}>
            <div className="glass-card">
                <h1 className="title">Smart Counter</h1>
                <h2 className="count-display">{count}</h2>
                
                <div className="button-group">
                    <button className="btn btn-primary" onClick={()=> setCount(count+1)}>
                        Increment
                    </button>
                    <button className="btn btn-secondary" onClick={()=> setCount(count-1)} disabled={count===0}>
                        Decrement
                    </button>
                    <button className="btn btn-outline" onClick={()=>setCount(0)}>
                        Reset
                    </button>
                </div>
                
                <button className="btn btn-outline theme-toggle" onClick={()=>setTheme(theme==="light"?"dark":"light")}>
                    Toggle Theme
                </button>
            </div>
        </div>
    );
}

export default Counter;