import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
} from "react-leaflet";
import { useState } from "react";
import "./App.css";
function App() {
  const [files, setFiles] = useState("");

  const handleChange = (e) => {
    const fileReader = new FileReader();
    
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setFiles(JSON.parse(e.target.result));
    };
  };

  const clickHandler = (e) => {
    let h2 = document.getElementById(e.target.id);
    let h2Text = h2.innerText.substring(11);
    h2.innerHTML = "<input type='text' id='input' value='" + h2Text + "'/>";
    let input = document.getElementById("input");
    input.focus();

    input.addEventListener("blur", function () {
      let newText = "Subregion: " + input.value;
      h2.textContent = newText;
      h2.innerHTML = newText;
    });
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        let newText = "Subregion: " + input.value;
        h2.textContent = newText;
        h2.innerHTML = newText;
      }
    });
  };

  if (files === "") {
    return (
      <div>
        <h1>Welcome to GeoJSON Viewer, please upload your file</h1>
        <input type="file" onChange={handleChange} />
      </div>
    );
  } else {
    console.log(files.features[0].properties.subregion);
    var features = files.features;

    return (
      <MapContainer
        center={[
          features[0].properties.label_y,
          features[0].properties.label_x,
        ]}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {features.map((feature) => (
          
          <Marker
            position={[feature.properties.label_y, feature.properties.label_x]}
          >
            <GeoJSON key={feature.properties.id} data={feature}>
              <Popup
                position={[
                  feature.properties.label_y,
                  feature.properties.label_x,
                ]}
              >
                <div>
                  <h2
                    id={feature.properties.pop_rank}
                    onDoubleClick={clickHandler}
                  >
                    {"Subregion: " + feature.properties.subregion}
                  </h2>
                  <p>{"Continent: " + feature.properties.continent}</p>
                  <p>{"Name: " + feature.properties.name}</p>
                </div>
              </Popup>
            </GeoJSON>
          </Marker>
        ))}
      </MapContainer>
    );
  }
}

export default App;
