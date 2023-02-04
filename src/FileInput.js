import React, { useState } from "react";

function FileInput() {
  const [file, setFile] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    setFile(event.dataTransfer.files[0]);
  };

  const handleClick = (event) => {
    event.preventDefault();
    document.getElementById("hiddenFileInput").click();
  };

  const handleFileInput = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div
      onDrop={handleDrop}
      onClick={handleClick}
      style={{
        width: "300px",
        height: "200px",
        border: "1px solid black",
        textAlign: "center",
      }}
    >
      <p>Drag and drop a file here or click to open file browser</p>
      <input
        id="hiddenFileInput"
        type="file"
        onChange={handleFileInput}
        style={{ display: "none" }}
      />
      {file && <p>{file.name}</p>}
    </div>
  );
}

export default FileInput;
