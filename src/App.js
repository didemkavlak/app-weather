import { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from '../src/assets/background.jpg'

function App() {
  
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  
  const key = process.env.REACT_APP_WEATHER_API_KEY

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${key}`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      event.preventDefault();
      setLocation('')
    }
  }
  
  return (
       <div className="App" style={{backgroundImage:  `url(${logo})`}}>


<div class="m-3 rounded-3 border border-5 py-2 px-3 text-light" style={{backgroundColor : "#"}}>

 <h2 class="mx-5 py-3 text-center">Weather App</h2>
  <div class="card text-light p-3 bg-transparent border-0" style={{width: "100%", backgroundColor : "#"}}>

   <div class="row mb-4">
      <div class="col">
      <form class="mx-5">
      <div class="mb-3">
      <div class="input-group mb-3">
        
      <input

            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}

           type="text" class="form-control" placeholder="City" aria-label="City" aria-describedby="button-addon2"/>
        </div>
      </div>
      </form>
      </div>
   </div>
   

   {data.name !== undefined &&
        <div class="row my-3">
        <div class="col">
            <div class="card" style={{backgroundColor : "#76BA99"}}>
            <div class="card-body d-flex justify-content-between align-items-center" >
                <div style={{width: "50%"}} class="">
                  <h5 class="card-text">{new Date(data.dt * 1000).toLocaleDateString()}</h5>
                  <p class="card-title">{data.name}</p>
                  <h5 class="card-title"> {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null} </h5>
                  <div>
                    {data.weather ? <p>{data.weather[0].description}</p> : null}
                  </div>
                </div>
                <div>
                  <div class="d-flex justify-content-center align-items-center">
                    {data.weather ? <img src={'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png'} style={{width: "50%"}} class="card-img-top d-flex align-items-center" alt="..."/> : null}
                  </div>
                </div>
            </div>
        </div>
        </div>
        </div>
}

{data.name !== undefined &&
  <div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
      <div class="card " style={{backgroundColor : "#76BA99"}}>
      <div class="card-body">
          <h5 class="card-title title-size">Feels Like</h5>
          <h5 class="title-size">{data.main ? `${data.main.feels_like.toFixed()} °C` : null}</h5>
      </div>
      </div>
  </div>
  <div class="col">
      <div class="card " style={{backgroundColor : "#76BA99"}}>
      <div class="card-body">
          <h5 class="card-title title-size">Sunrise</h5>
          <h5 class="card-title title-size">{new Date(data.sys.sunrise * 1000).toTimeString().split(" ")[0]}</h5>
      </div>
      </div>
      </div>
    <div class="col">
      <div class="card" style={{backgroundColor : "#76BA99",}}>
      <div class="card-body">
          <h5 class="card-title title-size">Sunset</h5>
          <h5 class="card-title title-size">{new Date(data.sys.sunset * 1000).toTimeString().split(" ")[0]}</h5>
          
      </div>
      </div>
    </div>
  </div>
}

</div>
</div>
</div> 
  );
}

export default App;

