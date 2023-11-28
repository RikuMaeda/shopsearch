import React from 'react';
import { GoogleMap, LoadScript, Marker, MarkerF } from '@react-google-maps/api';
import API from '../GeoAPI';

const MapComponent = ({ lat, lng, name }) => {
  const mapStyles = {
    height: '400px',
    width: '90%', // 幅を90%に変更
    margin: '20px auto', // 上下左右に余白を設定
  };

  const center = {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  };

  return (
    <LoadScript googleMapsApiKey={API}>
      <GoogleMap mapContainerStyle={mapStyles} center={center} zoom={14}>
        <MarkerF position={center} title={name} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
