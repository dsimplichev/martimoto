import img from "../../assets/img_hme_11.jpg"
import "./search.css"

function Search() {
    return (
        <>
            <div className="page-content">
                <div className="image-container">
                    <img className="img" src={img} alt='search-moto' />
                    <div className="search-container">
                        
                        <p className="shop-text">SHOP</p>
                        <p className="search-text">Find what you need</p>
                        <button className="search-btn">Search</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;