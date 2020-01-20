import React, {useState, useEffect} from 'react';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import './services/api';
import api from './services/api';

//Componente Chamado App
function App() {
  //lista de devs
  const [devs, setDevs] =useState([]);

  //variaveis de registro
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  

  //localização do utilizador atravez da api do google
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        const {latitude,longitude} = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },

      (err)=>{
        console.log(err);
      },
      {
        timeout : 30000,
      }
  )}, []);

  useEffect(()=>{
    async function loadDevs(){
      const res = await api.get('/devs');
      setDevs(res.data);
    }
    
    loadDevs();
  },[]);
  
  async function handleAddDev(e){
    e.preventDefault();
    
    //post do dev no servidor
    const res = await api.post('/devs',{
      github_username,
      techs,
      latitude,
      longitude
    })

    //reset dos campos preenchidos
    setGithubUsername('');
    setTechs('');

    setDevs([...devs, res.data]);

    console.log(res.data);
  }
  
  return (
    <div id="app">
      <aside>
        <strong>Sign in</strong>
        <form onSubmit = {handleAddDev}>

        <div className="input-block">
          <label htmlFor="username_github">Github Username</label>
          <input 
          name="username_github" 
          id="username_github" 
          required
          value = {github_username}
          onChange = {e => setGithubUsername(e.target.value)} />
        </div>
        
        <div className="input-block">
          <label htmlFor="Techs">Tecnologies</label>
          <input name="techs" 
          id="techs" 
          required
          value = {techs}
          onChange = {e => setTechs(e.target.value)} />
        </div>
        

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="Latitude">Latitude</label>
            <input 
            type = "number" 
            name="Latitude" 
            id="Latitude" 
            required value = {latitude} 
            onChange = {e => setLatitude(e.target.value)} />
          </div>
          
          <div className="input-block">
            <label htmlFor="Longitude">Longitude</label>
            <input 
            type = "number" 
            name="Longitude" 
            id="Longitude" 
            required value = {longitude}
            onChange = {e => setLongitude(e.target.value)} />
          </div>
        </div>

        <button type ="submit">Save</button>
        

        </form>
      </aside>
      <main>
        <ul>
          {devs.map(dev =>(
            <li key={dev._id} className = "dev-item">
              <header>
                <img src= {dev.avatar_url} alt = {dev.name}></img>
                <div className = "user-info">
                  <strong>{dev.name}</strong>
                  <span>{dev.techs.join(',')}</span>
                </div>
              </header>
              <p> {dev.bio} </p>
              <a href = {`https://github.com/${dev.github_username}`}>Github</a>
            </li>))}

          
        </ul>
        
      </main>
    </div>
  );
}

export default App;
