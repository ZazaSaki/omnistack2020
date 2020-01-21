import React, {useState, useEffect} from 'react';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import './services/api';
import api from './services/api';


import DevItem from './components/DevItem';
import DevForm from './components/DevFrom';

//Componente Chamado App
function App() {
  //lista de devs
  const [devs, setDevs] =useState([]);
  

  useEffect(()=>{
    async function loadDevs(){
      const res = await api.get('/devs');
      setDevs(res.data);
    }
    
    loadDevs();
  },[]);
  
  async function handleAddDev(data){

    //post do dev no servidor
    const res = await api.post('/devs',data)

    //adição do na lista offline
    setDevs([...devs, res.data]);

    console.log(res.data);
  }
  
  return (
    <div id="app">
      <aside>
        <strong>Sign in</strong>
        <DevForm onSubmit ={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev =>(
            <DevItem key={dev._id} dev = {dev}/>))}
        </ul>
        
      </main>
    </div>
  );
}

export default App;
