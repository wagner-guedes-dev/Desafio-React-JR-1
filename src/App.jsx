// # React Interview Challenge.

// Desenvolva uma aplicação em que:

// - o usuário pode clicar em qualquer lugar da página.
// - deve-se renderizar um pequeno círculo na posição clicada.
// - a cada clique, mantém-se os círculos já criados e renderiza-se um novo.
// - crie duas funcionalidades para a aplicação:
//     - desfazer (undo)
//     - refazer (redo)



import { useState } from 'react'

import './App.css'

function App() {
  const [list, setList] = useState([])
  const [undid, setUndid] = useState([]);

  const handlePoint = (e) =>{

    const positions = {
      eixoX: e.clientX,
      eixoY: e.clientY
    }
    setList((prev)=> [...prev, positions])
    setUndid([])
  }
  
  const handleUndo = (e)=>{
    e.stopPropagation()

    if(list.length === 0){
      return
    }
    const lastItem = list[list.length - 1];
    setUndid((prev) => [...prev, lastItem]);

    setList((prev)=>{
      const newArr = [...prev].slice(0, -1)
      return newArr
    })
  }


  
  const handleRedo = (e)=>{
    e.stopPropagation()

    if (undid.length === 0) {
      return;
    }

    const recoveredDot = undid[undid.length - 1];
    setUndid((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });
    setList((prev) => [...prev, recoveredDot]);

  }

  return (
    <div className="App" onClick={handlePoint}>

      <div className='buttons'>
        <button onClick={handleUndo} title='Desfazer'>Undo</button>
        <button onClick={handleRedo} title='Refazer'>Redo</button>
      </div>

      {list.map((e, index)=>(
        <span key={index} className='point' style={{top:e.eixoY, left:e.eixoX}}/>
      ))}
    </div>
  )
}

export default App
