import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

/* 
C:\python_portfolio\shopresearch\server.pyにアクセス
*/

const SearchResult = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchData, setSearchData] = useState(null); // 検索結果のデータを格納するための状態
    const itemsPerPage = 10;


    useEffect(() => {
        console.log(location.state);
        console.log(location.state.API_KEY);
        console.log(location.state.Latitude);
        console.log(location.state.Longitude);
        console.log(location.state.range);
    
        const fetchSearchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/search', {
                    params: {
                        key: location.state.API_KEY,
                        //lat: 35.689481,
                        //lng: 139.691686,
                        lat: location.state.Latitude,
                        lng: location.state.Longitude,
                        range: location.state.range,
                    }
                });
                setSearchData(response.data); // データを取得して状態にセット
                console.log("response:",response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchSearchData(); // ページがロードされた際に検索データを取得
    }, [location.state]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchData && searchData.slice(indexOfFirstItem, indexOfLastItem);
  
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleShopClick = (id) => {
        navigate(`/shopinformation/${id}`);
    };


    const shopStyle = {
        display: "flex", // flexboxを使用して要素を横並びに
        alignItems: "center", // 垂直方向に中央揃え
        width: "90%",
        maxWidth: "1000px",
        border: "1px solid black",
        padding: "15px",
        marginBottom: "10px",
        backgroundColor: '#f9f9f9',
        borderRadius: "8px",
        boxShadow: "4px 8px 10px rgba(0, 0, 0, 0.5)",
        height: "150px",
        position: 'relative', // 要素を相対的な位置に配置する
        overflow: 'hidden', // 要素からはみ出す部分を隠す
    };
    
    const imageStyle = {
        marginRight: "20px", // テキストとの間隔を設定
        maxWidth: "120px", // 画像の最大幅を設定
    };
    
    const ulStyle = {
        marginTop: "20px", // ul要素間の間隔を調整
    };
    
    const shopNameStyle = {
        fontSize: "40px", // 店名の文字を大きくする
        fontWeight: "bold",
        margin: "0"
    };

    const otherInfoStyle = {
        margin: "5px 0", // 上下の余白を設定
    };

    const paginationStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        listStyleType: 'none',
      };
      
      const buttonStyle = {
        padding: '5px 10px',
        margin: '0 5px',
        border: '1px solid #ccc',
        cursor: 'pointer',
      };
      
      const genreStyle = {
        position: 'absolute',
        top: '5px',
        right: '5px',
        padding: '5px 10px',
        borderRadius: '50%', 
        backgroundColor: '#FFA500', 
        color: 'white',
        zIndex: '1',
      };
      

      return (
        <div>
          {currentItems && (
            <ul style={ulStyle}>
              {currentItems.map((item, index) => (
                <li key={index} style={shopStyle} onClick={() => handleShopClick(item.id)}>
                  <img src={item.photo} alt="Shop" style={imageStyle} />
                  <div>
                    <p style={shopNameStyle}>{item.name}</p>
                    <p style={otherInfoStyle}>Open: {item.open}</p>
                    <p style={otherInfoStyle}>Address: {item.address}</p>
                    <p style={otherInfoStyle}>Access: {item.access}</p>
                    <p style={{ ...otherInfoStyle, ...genreStyle, backgroundColor: item.genre === '居酒屋' ? 'red' : '#FFA500' }}>{item.genre}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
      
          {searchData && searchData.length > itemsPerPage && (
            <ul style={paginationStyle} className="pagination">
              {Array.from({ length: Math.ceil(searchData.length / itemsPerPage) }).map((_, index) => (
                <li key={index}>
                  <button style={buttonStyle} onClick={() => paginate(index + 1)}>{index + 1}</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
};

export default SearchResult;
