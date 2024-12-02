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
import YZFR120152017 from "../../assets/Yamaha/YZFR120152017.png";
import YZFR120202021 from "../../assets/Yamaha/YZFR120202021.png";
import MT10 from "../../assets/Yamaha/MT10.png";
import MT07 from "../../assets/Yamaha/MT07.png";
import MT09 from "../../assets/Yamaha/MT09.png";
import MT09T from "../../assets/Yamaha/MT09T.png";
import MT125 from "../../assets/Yamaha/MT125.png";

import CBR1100 from "../../assets/HONDA/CBR1100.png";
import CBRR1100 from "../../assets/HONDA/CBRR1100.png";
import CBRRR from "../../assets/HONDA/CBRRR.png";
import CBR954 from "../../assets/HONDA/CBR954.png";
import CBR929 from "../../assets/HONDA/CBR929.png";
import CBR900 from "../../assets/HONDA/CBR900.png";
import CBR650 from "../../assets/HONDA/CBR650.png";
import CBR600 from "../../assets/HONDA/CBR600.png";
import CBR600FS from "../../assets/HONDA/CBR600FS.png";
import CBR500R from "../../assets/HONDA/CBR500R.png";
import CBR250R from "../../assets/HONDA/CBR250R.png";
import CBR125 from "../../assets/HONDA/CBR125.png";

import NINJA250 from "../../assets/KAWASAKI/NINJA250.png";
import KAWASAKININJA from "../../assets/KAWASAKI/KAWASAKININJA.png"

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
        { name: "2015-2017", img: YZFR120152017 }, 
        { name: "2020-2021", img: YZFR120202021 },

    ],
    "MT": [
        { name: "MT 10", img: MT10 },
        { name: "MT 07", img: MT07 },
        { name: "MT 09", img: MT09 },
        { name: "MT 09 TRACER", img: MT09T }, 
        { name: "MT 125", img: MT125 },
       
    ],
    "CBR": [
        { name: "1100 XX", img: CBR1100 },
        { name: "1100", img: CBR1100 },
        { name: "1000 F", img: CBRR1100 },
        { name: "1000 RR", img: CBRRR }, 
        { name: "954", img: CBR954 },
        { name: "929", img: CBR929 },
        { name: "900", img: CBR900 }, 
        { name: "650", img: CBR650 },
        { name: "600", img: CBR600 }, 
        { name: "600 FS", img: CBR600FS },
        { name: "500 R", img: CBR500R },
        { name: "250 R", img: CBR250R }, 
        { name: "125", img: CBR125 },
       
    ],
    "NINJA": [
        { name: "NINJA 400", img: KAWASAKININJA },
        { name: "NINJA 250", img: NINJA250 },
   
    ],
    "ZX": [
        { name: "ZX-6R", img: KAWASAKININJA },
        { name: "ZX-6R 636", img: NINJA250 },
        { name: "ZX-7R", img: KAWASAKININJA },
        { name: "ZX-9R", img: NINJA250 },
        { name: "ZX-10R", img: KAWASAKININJA },
        { name: "ZX-12R", img: NINJA250 },
        { name: "ZX-14R", img: NINJA250 },
    ],
    
};

export default modelDetailsData;