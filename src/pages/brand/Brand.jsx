import './brand.css'
import bmw from "../../assets/bmw.png"

function Brand() {
    return (
        <div className="container">

            <div className="header-section">
                <h2 className="title">SHOP BY BRANDS</h2>
                <a href="#" class="btn-all-categories">All Brands</a>
            </div>


            <div className="divider"></div>


            <div className="categories-grid">

                <div className="category-one">
                    <img src={bmw} alt="Category 1" />
                </div>
                <div className="category-two">
                    <img src="" alt="Category 2" />
                </div>

                <div className="category-three">
                    <img src="" alt="Category 3" />
                </div>
                <div className="category-four">
                    <img src="" alt="Category 4" />
                </div>
                <div className="category-five">
                    <img src="" alt="Category 5" />
                </div>
                <div className="category-six">
                    <img src="" alt="Category 6" />
                </div>
            </div>
        </div>
    )
}
export default Brand;