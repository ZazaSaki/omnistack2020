import React, {useState, useEffect} from 'react';
import './style.css';

function DevForm({onSubmit}){
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
    
    async function handleSubmit(e){
        e.preventDefault();

        
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });
        
        //reset dos campos preenchidos
        setGithubUsername('');
        setTechs('');

    }

    return(
        <form onSubmit = {handleSubmit}>

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
    );
}

export default DevForm;