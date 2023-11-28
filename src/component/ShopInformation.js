import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, MarkerF  } from '@react-google-maps/api';
import axios from 'axios';
import Map from './GoogleMap';

const ShopInformation = () => {
    const params = useParams();
    const [researchshopId, setResearchShopId] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [shopData, setShopData] = useState(null);
    //const [center, setCenter] = useState(null);

    useEffect(() => {
        const shopId = params.id; 
        setResearchShopId(shopId)
        const fetchSearchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/shopinformation', {
                    params: {
                        id: shopId
                    }
                });
                setShopData(response.data[0]); // データを取得して状態にセット
                setIsLoading(false);
                console.log("response:",response.data[0]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchSearchData(); // ページがロードされた際に検索データを取得
    }, [params]);

    console.log("shopData",shopData);

    const containerStyle = {
        textAlign: 'center',
        maxWidth: '600px',
        margin: 'auto'
      };
      
      const shopDataStyle = {
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        background: '#f9f9f9'
      };
      
      const headingStyle = {
        color: 'navy'
      };
      
      const imageStyle = {
        maxWidth: '100%',
        height: 'auto',
        marginTop: '10px',
        borderRadius: '5px'
      };
      
      const linkStyle = {
        display: 'block',
        marginTop: '10px',
        textDecoration: 'none',
        color: 'blue'
      };
      
      const mapStyles = {
        height: '400px',
        width: '90%', // 幅を90%に変更
        margin: '20px auto', // 上下左右に余白を設定
      };
    
      const secondPartyInfoStyle = {
        marginTop: '20px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        textAlign: 'left',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)'
      };

      return (
        <div style={containerStyle}>
          { isLoading ?(
            <p>Loading...</p>
                  ) : (
            shopData && (
            <div style={shopDataStyle}>
              <h2 style={headingStyle}>{shopData.name}</h2>
              <p><strong>住所:</strong> {shopData.address}</p>
              <p><strong>Open:</strong> {shopData.open}</p>
              <p><strong>Access:</strong> {shopData.access}</p>
              <img src={shopData.photo} alt="Shop" style={imageStyle} />
              <div style={secondPartyInfoStyle}>
                <h3>二次会情報:</h3>
                <p><strong>23時以降の営業:</strong> {shopData.midnight}</p>
                <p><strong>カラオケ:</strong> {shopData.karaoke}</p>
                {/* 以下に二次会の情報を追加してください */}
              </div>
              <a href={shopData.urls} target="_blank" rel="noopener noreferrer" style={linkStyle}>お店の情報を見る</a>
              <div style={{ marginTop: '30px' }}>
                <Map lat={shopData.lat} lng={shopData.lng} name={shopData.name}/>
              </div>
            </div>
          )
          )}
        </div>
      );
      
};


export default ShopInformation;
