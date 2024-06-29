import React, { useState } from 'react';
import axios from 'axios';
import './Calculator.css';

function Calculator() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null); // Nuevo estado para manejar errores

  const handleCalculate = async (operation) => {
    let url;

    

    switch (operation) {
      case 'add':
        url = `http://localhost:8080/sumar?numberA=${encodeURIComponent(number1)}&numberB=${encodeURIComponent(number2)}`;
        break;
      case 'subtract':
        url = `http://localhost:8080/restar?numberA=${encodeURIComponent(number1)}&numberB=${encodeURIComponent(number2)}`;
        break;
      case 'multiply':
        url = `http://localhost:8080/multiplicar?numberA=${encodeURIComponent(number1)}&numberB=${encodeURIComponent(number2)}`;
        break;
      case 'divide':
        url = `http://localhost:8080/dividir?numberA=${encodeURIComponent(number1)}&numberB=${encodeURIComponent(number2)}`;
        break;
      default:
        return;
    }

    console.log(`Operación: ${operation}, Número 1: ${number1}, Número 2: ${number2}`);


    try {
      const response = await axios.post(url);
      console.log("Response Data:", response.data);
      setResult(response.data.resultado);
      setError(null); // Limpiar cualquier error previo si la operación tiene éxito
    } catch (error) {
      console.error('Error making request', error);
      if (error.response) {
        console.error('Server Error:', error.response.data);
        setError(error.response.data); // Capturar el mensaje de error del servidor
      } else if (error.request) {
        console.error('Request Error:', error.request);
      } else {
        console.error('Other Error:', error.message);
      }
    }
  };

   return (
    <div className="calculator">
      <h1>SOAP Calculator</h1>
      <div className="input-section">
        <label>
          Number 1:
          <input type="number" value={number1} onChange={(e) => setNumber1(e.target.value)} />
        </label>
        <label>
          Number 2:
          <input type="number" value={number2} onChange={(e) => setNumber2(e.target.value)} />
        </label>
      </div>
      <div className="button-section">
        <button onClick={() => handleCalculate('add')}>Add</button>
        <button onClick={() => handleCalculate('subtract')}>Subtract</button>
        <button onClick={() => handleCalculate('multiply')}>Multiply</button>
        <button onClick={() => handleCalculate('divide')}>Divide</button>
      </div>
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}
      {result !== null && (
        <div className="result">
          <h2>Result: {result}</h2>
        </div>
      )}
    </div>
  );
}

export default Calculator;
