import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // Estados para minutos, segundos, milisegundos, si está corriendo, y tiempos parciales
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState([]);

  // Función para alternar entre iniciar y pausar el cronómetro
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Función para resetear el cronómetro
  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
    setLapTimes([]);
  };

  // Función para guardar tiempos parciales
  const recordLap = () => {
    setLapTimes([
      ...lapTimes,
      `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`,
    ]);
  };

  // useEffect para manejar la actualización del cronómetro
  useEffect(() => {
    let interval;
    if (isRunning) {
      // Actualización cada 10ms para milisegundos
      interval = setInterval(() => {
        setMilliseconds(prevMilliseconds => {
          if (prevMilliseconds === 99) {  // Si los milisegundos llegan a 99, resetea y suma 1 segundo
            setSeconds(prevSeconds => {
              if (prevSeconds === 59) {  // Si los segundos llegan a 59, resetea y suma 1 minuto
                setMinutes(prevMinutes => prevMinutes + 1);
                return 0;
              } else {
                return prevSeconds + 1;
              }
            });
            return 0;  // Reinicia los milisegundos
          } else {
            return prevMilliseconds + 1;  // Suma 1 a los milisegundos
          }
        });
      }, 10);  // Intervalo de 10ms
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);  // Limpiar intervalo cuando se desmonte el componente
  }, [isRunning]);

  return (
    <div className="timer-container">
      <h1>Cronómetro</h1>
      <h2>I.E.S</h2>
      <div className="timer-display">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}:{String(milliseconds).padStart(2, '0')}
      </div>

      <div className="buttons">
        <button onClick={toggleTimer} className={`start-stop-btn ${isRunning ? 'pause' : 'start'}`}>
          {isRunning ? 'Pausar' : 'Iniciar'}
        </button>
        <button onClick={resetTimer} className="reset-btn">
          Resetear
        </button>
        <button onClick={recordLap} className="lap-btn">
          Parcial
        </button>
      </div>

      {lapTimes.length > 0 && (
        <div className="lap-times">
          <h3>Tiempos Parciales</h3>
          <ul>
            {lapTimes.map((lap, index) => (
              <li key={index}>{lap}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
