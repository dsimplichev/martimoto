import './brand.css'
import BrandCard from '../../Card/BrandCard'
import bmw from "../../assets/bmw.png"
import ducati from "../../assets/ducati.png"
import suzuki from "../../assets/suzuki.png"
import honda from "../../assets/honda.png"
import kawasaki from "../../assets/kawasaki.png"
import yamaha from "../../assets/yamaha.png"


const brands = [
    { img: bmw, brandName: "BMW" },
    { img: ducati, brandName: "DUCATI" },
    { img: suzuki, brandName: "SUZUKI" },
    { img: honda, brandName: "HONDA" },
    { img: kawasaki, brandName: "KAWASAKI" },
    { img: yamaha, brandName: "YAMAHA" },
];

function Brand() {
    return (
       
        <div className="container">
        <div className="header-section">
            <h2 className="title">SHOP BY BRANDS</h2>
            <a href="#" className="btn-all-categories">All Brands</a>
        </div>

        <div className="divider"></div>

        <div className="categories-grid">
            {brands.map((brand, index) => (
                <BrandCard key={index} img={brand.img} brandName={brand.brandName} />
            ))}
        </div>
    </div>
    )
}
export default Brand;