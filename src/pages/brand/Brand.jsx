import './brand.css'
import bmw from "../../assets/bmw.png"
import ducati from "../../assets/ducati.png"
import suzuki from "../../assets/suzuki.png"
import honda from "../../assets/honda.png"
import kawasaki from "../../assets/kawasaki.png"

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
                    <p>BMW</p>
                </div>
                <div className="category-two">
                    <img src={ducati} alt="Category 2" />
                    <p>DUCATI</p>
                </div>

                <div className="category-three">
                    <img  src={suzuki} alt="Category 3" />
                    <p>SUZUKI</p>
                </div>
                <div className="category-four">
                    <img src={honda} alt="Category 4" />
                    <p>HONDA</p>
                </div>
                <div className="category-five">
                    <img src={kawasaki} alt="Category 5" />
                    <p>KAWASAKI</p>
                </div>
                <div className="category-six">
                    <img src="" alt="Category 6" />
                    <p></p>
                </div>
            </div>
        </div>
    )
}
export default Brand;