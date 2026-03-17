import { useState, useEffect } from "react";
import "./Timer.css";

function Timer() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div className="timer-container">
            <div className="glass-card">
                <h1 className="title">Timer</h1>

                <p className="time-display">
                    {minutes < 10 ? "0" : ""}{minutes}:
                    {seconds < 10 ? "0" : ""}{seconds}
                </p>

                <div className="button-group">
                    <button className="btn btn-primary" disabled={isRunning} onClick={() => setIsRunning(true)}>Start</button>
                    <button className="btn btn-secondary" disabled={!isRunning} onClick={() => setIsRunning(false)}>Stop</button>

                    <button className="btn btn-outline" onClick={() => {
                        setTime(0);
                        setIsRunning(false);
                    }}>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Timer;