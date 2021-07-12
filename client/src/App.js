import React, {useState,useEffect} from "react"
import Mapa from "./Mapa.js"
import "./App.css"

const App = () => {
  
  const [data,setData] = useState([])

  const handleFetch = (target) => {
    fetch('/api?filter='+target, {
      method: 'get',
      mode: 'cors',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        setData(data)
    })
  };

  const handleChange = (target) => {
    handleFetch(target);
  };

  useEffect(() => {

    fetch('/api?filter=', {
      method: 'get',
      mode: 'cors',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        setData(data)
    })

  },[]) 

  return (
    <div>
      <div className="div-select">
        <select onChange={(e) => handleChange(e.target.value)} name="select">
          <option value="" defaultValue>Seleccione</option>
          <option value="BANCOS">BANCOS</option>
          <option value="FARMACIAS">FARMACIAS</option>
          <option value="CAFETERIAS Y SALONES DE TE" >CAFETERIAS Y SALONES DE TE</option>
          <option value="ALMACENES">ALMACENES</option>
          <option value="SUPERMERCADOS">SUPERMERCADOS</option>
          <option value="RESTAURANTES">RESTAURANTES</option>
        </select>
      </div>
      <div>
        <Mapa data = {data}/>
      </div>
    </div>
  );
}

export default App
