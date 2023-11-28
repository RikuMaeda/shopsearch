import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';
import API_KEY from "../API.js"

const GeolocationExample = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [accuracy, setAccuracy] = useState(3); // デフォルトの範囲
  const navigate = useNavigate();

  const handleAccuracyChange = (event) => {
    setAccuracy(Number(event.target.value));
  };

  const getLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
          reject(new Error('Geolocation is not supported'));
        }
      });

      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setError(null);
      


    navigate("/searchresult", {
      state: {
        Latitude: position.coords.latitude,
        Longitude: position.coords.longitude,
        range: accuracy,
        API_KEY: API_KEY
      }
    });
    
    } catch (error) {
      setError(error.message);
    }
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    margin: '10px',
    borderRadius: '5px',
    backgroundColor: '#afeeee',
    border: 'none',
    cursor: 'pointer',
  };
  
  const selectStyle = {
    padding: '8px',
    fontSize: '16px',
  };
  
  const errorStyle = {
    color: 'red',
    marginTop: '20px',
    fontSize: '18px',
  };
  
  const successStyle = {
    marginTop: '20px',
    fontSize: '18px',
  };
  

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button onClick={getLocation} style={buttonStyle}>
        現在地を取得
      </button>
      <div style={{ marginTop: '20px' }}>
        <label htmlFor="accuracySelect" style={{ marginRight: '10px', fontSize: '16px' }}>検索する半径:</label>
        <select id="accuracySelect" value={accuracy} onChange={handleAccuracyChange} style={selectStyle}>
          <option value={1}>300m</option>
          <option value={2}>500m</option>
          <option value={3}>1000m</option>
          <option value={4}>2000m</option>
          <option value={5}>3000m</option>
        </select>
      </div>
      {error ? (
        <p style={errorStyle}>Error: {error}</p>
      ) : (
        latitude && longitude && (
          <p style={successStyle}>
            Latitude: {latitude}, Longitude: {longitude}, range: {accuracy}
          </p>
        )
      )}
    </div>
  );
};

export default GeolocationExample;
