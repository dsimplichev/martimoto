import img from "../../assets/img_hme_11.jpg"
import "./search.css"
import { useNavigate } from "react-router-dom";



function Search() {

    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate("/partssearch");
    };


    return (
        <>
            <div className="page-content">
                <div className="image-container">
                    <img className="img" src={img} alt='search-moto' />
                    <div className="search-container">

                        <p className="shop-text">МАГАЗИН</p>
                        <p className="search-text">Части втора употреба</p>
                        <button className="search-btn" onClick={handleSearchClick}>ТЪРСИ</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;