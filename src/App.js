import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from "react-leaflet";
import { useState } from "react";
import * as L from "leaflet";
import "./App.css";
import teslaData from "./data/tesla-sites.json";
import geoData from "./data/geo.json"

function App() {

  const [files, setFiles] = useState("");
  const filteredStations = teslaData.filter(
    (tesla) => tesla.address.country === "Italy"
  );
  

  const handleChange = e => {
    const fileReader = new FileReader();
  //   fileReader.onloadend = ()=>{
  //     setFiles(JSON.parse(fileReader.result));
  //  }
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      //console.log("e.target.result", e.target.result);
      setFiles(JSON.parse(e.target.result));
    };
  };

  const clickHandler = e => {

  }


  if(files === ""){
    return (
      <div>
        <h1>Welcome to GeoJSON Viewer, please upload your file</h1>
        <input type="file" onChange={handleChange} />
      </div>
    );
  }
  else {
    console.log(files.features[0].properties.subregion)
    var features = files.features;
    return (
    
      <MapContainer
        center={[features[0].properties.label_y, features[0].properties.label_x]}
        zoom={6}
        scrollWheelZoom={true}
      >
        
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <GeoJSON data = {geoData}/> */}
        {features.map((feature) => (
          <Marker
            
            position={[feature.properties.label_y, feature.properties.label_x]}
          >
            <Popup position={[feature.properties.label_y, feature.properties.label_x]}>
              <div>
                <h2 onDoubleClick={clickHandler()}>{"Subregion: " + feature.properties.subregion}</h2>
                <p>{"Continent :" + feature.properties.continent}</p>
                <p>{"Name: "+ feature.properties.name}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  }
}

export default App;
