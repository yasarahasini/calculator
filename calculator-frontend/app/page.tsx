'use client';

import { useEffect, useState } from 'react';

type Calculation = {
  id: number;
  num1: number;
  num2: number;
  operator: string;
  result: number;
};

export default function Home() {
  const API_URL = 'http://localhost:3000/calculator';

  const [display, setDisplay] = useState('0');
  const [num1, setNum1] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [isResult, setIsResult] = useState(false);
  const [history, setHistory] = useState<Calculation[]>([]);


  const handleNumber = (value: string) => {
    if (isResult) {
      setDisplay(value);
      setIsResult(false);
      return;
    }

    setDisplay(prev => (prev === '0' ? value : prev + value));
  };

 
  const handleOperator = (op: string) => {
    setNum1(Number(display));
    setOperator(op);
    setDisplay('0');
    setIsResult(false);
  };


  const calculate = async () => {
    if (num1 === null || operator === null) return;

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        num1,
        num2: Number(display),
        operator,
      }),
    });

    const data = await res.json();

    setDisplay(String(data.result));
    setNum1(data.result);
    setOperator(null);
    setIsResult(true);

    loadHistory();
  };

 
  const clearAll = () => {
    setDisplay('0');
    setNum1(null);
    setOperator(null);
    setIsResult(false);
  };

 
  const loadHistory = async () => {
    const res = await fetch(API_URL);
    setHistory(await res.json());
  };

  useEffect(() => {
    loadHistory();
  }, []);

 
  return (
    <main className="container">
      <div className="calculator">
        <div className="screen">{display}</div>

        <div className="buttons">
          {[
            '7','8','9','/',
            '4','5','6','*',
            '1','2','3','-',
            '0','C','=','+'
          ].map(btn => (
            <button
              key={btn}
              className={
                btn === '=' ? 'equal' :
                btn === 'C' ? 'clear' :
                ['+','-','*','/'].includes(btn) ? 'operator' : ''
              }
              onClick={() => {
                if (btn === 'C') clearAll();
                else if (btn === '=') calculate();
                else if (['+','-','*','/'].includes(btn)) handleOperator(btn);
                else handleNumber(btn);
              }}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      <div className="history">
        <h2>History</h2>
        <ul>
          {history.map(h => (
            <li key={h.id}>
              {h.num1} {h.operator} {h.num2} = <b>{h.result}</b>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
