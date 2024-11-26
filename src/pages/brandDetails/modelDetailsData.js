import S600 from "../../assets/SUZUKI/S600.png";
import GSXR750 from "../../assets/SUZUKI/GSXR750.png";
import GSXR1000 from "../../assets/SUZUKI/GSXR1000.png";
import GSXR1100 from "../../assets/SUZUKI/GSXR1100.png";
import GSXS750 from "../../assets/SUZUKI/GSXS750.png";
import GSXS from "../../assets/SUZUKI/GSXS.png";
import yamaha from "../../assets/Yamaha/yamaha.png";
import YZFR120022003 from "../../assets/Yamaha/YZFR120022003.png";
import YZFR120042006 from "../../assets/Yamaha/YZFR120042006.png";
import YZFR120092014 from "../../assets/Yamaha/YZFR120092014.png";
import YZFR120072008 from "../../assets/Yamaha/YZFR120072008.png";
import YZFR120072008 from "../../assets/Yamaha/YZFR120072008.png";

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
    "YZF R1": [
        { name: "1998-2001", img: yamaha },
        { name: "2002-2003", img: YZFR120022003 },
        { name: "2004-2006", img: YZFR120042006 },
        { name: "2007-2008", img: YZFR120072008 }, 
        { name: "2009-2014", img: YZFR120092014 },
        { name: "2015-2017", img: GSXS750 }, 
        { name: "2020-2021", img: GSXS },

    ],
    
};

export default modelDetailsData;