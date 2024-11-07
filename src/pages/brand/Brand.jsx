import './brand.css'
import BrandCard from '../../Card/BrandCard'
import bmw from "../../assets/bmw.jpg"
import ducati from "../../assets/ducati.jpg"
import suzuki from "../../assets/suzuki.jpg"
import honda from "../../assets/honda.jpg"
import kawasaki from "../../assets/kawasaki.jpg"
import yamaha from "../../assets/yamaha.jpg"
import aprilia from "../../assets/aprilia.jpg"


const brands = [
    { img: bmw, brandName: "BMW" },
    { img: ducati, brandName: "DUCATI" },
    { img: suzuki, brandName: "SUZUKI" },
    { img: honda, brandName: "HONDA" },
    { img: kawasaki, brandName: "KAWASAKI" },
    { img: yamaha, brandName: "YAMAHA" },
    { img: aprilia, brandName: "APRILIA" },
];

function Brand() {
    return (
       
        <div className="container">
        <div className="header-section">
            <h2 className="title">SHOP BY BRANDS</h2>    
        </div>

        <div className="divider-brand"></div>

        <div className="categories-grid">
            {brands.map((brand, index) => (
                <BrandCard key={index} img={brand.img} brandName={brand.brandName} />
            ))}
        </div>
    </div>
    )
}
export default Brand;