import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Block from './Components/Block';
function App() {
  const [state,setState] = useState(Array(9).fill(null));
  const [winner , setWinner]=useState<string>("")
  const[currentTurn , setcurrentTurn] = useState("X");
  const[xWins , setxWins] = useState<number>(0);
  const[oWins , setoWins] = useState<number>(0);

  const checkWinner = (state:Array<string | null >) => {
    const win = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    for(let i=0;i<win.length;i++){
      const[a,b,c] = win[i];
      if(state[a] !== null && state[a] === state[b] && state[a] === state[c]) return true;
    }
    return false;
  }

  const handleBlockClick = (index:number) => {
    const stateCopy = Array.from(state);

    if(stateCopy[index] !== null || winner) return;

    stateCopy[index] = currentTurn;

    const win = checkWinner(stateCopy);

    if(win){
      setWinner(currentTurn)

      if(currentTurn === 'X') setxWins(xWins+1);
      else if(currentTurn === 'O') setoWins(oWins+1);
    } 

    else if(stateCopy.every(cell => cell !== null)){
      setWinner("Draw");
    }

    else {setcurrentTurn(currentTurn === 'X'?'O':'X');}
    setState(stateCopy);
  };

  return (
    <div className='board-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ color: "#82a4c1" }}>Tic-Tac-Toe</h1>
      <h2 style={{ color: "#82a4c1" }}>
          {winner ? (winner === "Draw" ? "It's a draw!" : `${winner} wins!`) : `Next player: ${currentTurn}`}
        </h2>
      <div className='board'>
        <div className="row">
          <Block onClick={() => handleBlockClick(0)} value={state[0]} />
          <Block onClick={() => handleBlockClick(1)} value={state[1]} />
          <Block onClick={() => handleBlockClick(2)} value={state[2]} />
        </div>
        <div className="row">
          <Block onClick={() => handleBlockClick(3)} value={state[3]} />
          <Block onClick={() => handleBlockClick(4)} value={state[4]} />
          <Block onClick={() => handleBlockClick(5)} value={state[5]} />
        </div>
        <div className="row">
          <Block onClick={() => handleBlockClick(6)} value={state[6]} />
          <Block onClick={() => handleBlockClick(7)} value={state[7]} />
          <Block onClick={() => handleBlockClick(8)} value={state[8]} />
        </div>
      </div>
     
      <button className='btn' onClick={() => {
        setState(Array(9).fill(null));
        setWinner("");
        setcurrentTurn("X");
      }} style={{ marginTop: '20px' }}>Reset</button>

      <div className="scores"  style={{ color: "#82a4c1" , display:'flex', gap:'4rem'}}>
        <div className="wins" style={{display:'flex', gap:'1rem'}}>
        <p>X Wins: {xWins}</p>
        <p>O Wins: {oWins}</p>
        
        </div>
        <button className='reset-score' onClick={()=>{
          setoWins(0);
          setxWins(0);
        }} >Reset Score</button>
      </div>
    </div>
  );
}

export default App;
