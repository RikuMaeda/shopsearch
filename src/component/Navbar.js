import React from "react";
import { Link } from "react-router-dom"

const navbarStyle = {
    backgroundColor: '#afeeee',
    padding: '10px 20px',  // 上下左右の余白を調整
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',  // より自然な影を追加
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
};

const testTitleStyle = {
    fontWeight: 'bold',  // テキストの太字化
    fontSize: '24px',    // フォントサイズを大きく
    color: '#333',       // テキストカラーを変更
    textDecoration: 'none',  // 下線を削除
};

const Navbar = () => {
    return (
        <nav style={navbarStyle}>
            <Link to="/" style={{ textDecoration: 'none' }}> {/* リンクの下線を削除 */}
                <p style={testTitleStyle}>二次会検索アプリ</p> 
            </Link>
        </nav>
    )
};

export default Navbar;
