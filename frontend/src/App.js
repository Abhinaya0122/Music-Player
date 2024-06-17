// import React, {useState} from 'react'
// import Card from './components/Card'
// import List from './components/List'

// function App() {
//   const [musicNumber, setMusicNumber]=useState(0)
//   const [open, setOpen]=useState(false)
//   return (
//     <div className='container'>
//       <div className='shape shape-1'></div>
//       <div className='shape shape-2'></div>
//       <div className='shape shape-3'></div>
//       <main>
//         <Card props ={{musicNumber,setMusicNumber,setOpen}}/>
//         <List props ={{open,setOpen, musicNumber,setMusicNumber}} />
//       </main>
//     </div>
//   )
// }

// export default App
import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import List from './components/List';

function App() {
  const [musicNumber, setMusicNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [musicData, setMusicData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/musics')
      .then(response => response.json())
      .then(data => setMusicData(data))
      .catch(error => console.error('Error fetching music data:', error));
  }, []);

  return (
    <div className='container'>
      <div className='shape shape-1'></div>
      <div className='shape shape-2'></div>
      <div className='shape shape-3'></div>
      <main>
        <Card props={{ musicNumber, setMusicNumber, setOpen, musicData }} />
        <List props={{ open, setOpen, musicNumber, setMusicNumber, musicData }} />
      </main>
    </div>
  );
}

export default App;
