import React, {useState, useEffect} from 'react';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

//Componente Chamado App
function App() {
  const [latutide, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  
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
  
  async function handleAddDev(e){
    e.preventDefault();
    
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
            required value = {latutide} 
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
          <li className = "dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/59056168?s=460&v=4" alt = "ZazaSaki"></img>
              <div className = "user-info">
                <strong>ZazaSaki</strong>
                <span>C#, Java</span>
              </div>
            </header>
            <p>Aqui fica a bio</p>
            <a href = "https://github.com/ZazaSaki">Github</a>
          </li>

          <li className = "dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/59056168?s=460&v=4" alt = "ZazaSaki"></img>
              <div className = "user-info">
                <strong>ZazaSaki</strong>
                <span>C#, Java</span>
              </div>
            </header>
            <p>Aqui fica a bio</p>
            <a href = "https://github.com/ZazaSaki">Github</a>
          </li>

          <li className = "dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/59056168?s=460&v=4" alt = "ZazaSaki"></img>
              <div className = "user-info">
                <strong>ZazaSaki</strong>
                <span>C#, Java</span>
              </div>
            </header>
            <p>Aqui fica a bio, tipo memo bueda texto bro para dar tipo duas linhas À MACHO ALPHA</p>
            <a href = "https://github.com/ZazaSaki">Github</a>
          </li>

          <li className = "dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/59056168?s=460&v=4" alt = "ZazaSaki"></img>
              <div className = "user-info">
                <strong>ZazaSaki</strong>
                <span>C#, Java</span>
              </div>
            </header>
            <p>Aqui fica a bio</p>
            <a href = "https://github.com/ZazaSaki">Github</a>
          </li>
        </ul>
        
      </main>
    </div>
  );
}

export default App;
