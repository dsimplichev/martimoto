import S600 from "../../assets/SUZUKI/S600.png";
import GSXR750 from "../../assets/SUZUKI/GSXR750.png";
import GSXR1000 from "../../assets/SUZUKI/GSXR1000.png";
import GSXR1100 from "../../assets/SUZUKI/GSXR1100.png";
import GSXS750 from "../../assets/SUZUKI/GSXS750.png";
import GSXS from "../../assets/SUZUKI/GSXS.png";

const modelDetailsData = {
    "GSX-R": [
        { name: "600", img: S600 },
        { name: "750", img: GSXR750 },
        { name: "1000", img: GSXR1000 },
        { name: "1100", img: GSXR1100 }
    ],
    "GSX": [
        { name: "750 GSX", img: S600 },
        { name: "1200 GSX", img: GSXR1000 },
        { name: "1400 GSX", img: GSXR1100 }
    ],
    "GSX-S": [
        { name: "750", img: GSXS750 },
        { name: "1000", img: GSXS },
    ],
    
};

export default modelDetailsData;