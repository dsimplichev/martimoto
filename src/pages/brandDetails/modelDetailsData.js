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

import KAWASAKIZ6R from "../../assets/KAWASAKI/KAWASAKIZ6R.png"
import KAWASAKIZ6R363 from "../../assets/KAWASAKI/KAWASAKIZ6R363.png"
import KAWASAKIZ7R from "../../assets/KAWASAKI/KAWASAKIZ7R.png"
import KAWASAKIZ9R from "../../assets/KAWASAKI/KAWASAKIZ9R.png"
import KAWASAKIZ10R from "../../assets/KAWASAKI/KAWASAKIZ10R.png"
import KAWASAKIZ12R from "../../assets/KAWASAKI/KAWASAKIZ12R.png"
import KAWASAKIZ14R from "../../assets/KAWASAKI/KAWASAKIZ14R.png"

import KAWASAKIZ1000 from "../../assets/KAWASAKI/KAWASAKIZ1000.png"
import KAWASAKIZ900 from "../../assets/KAWASAKI/KAWASAKIZ900.png"
import KAWASAKIZ800 from "../../assets/KAWASAKI/KAWASAKIZ800.png"
import KAWASAKIZ750 from "../../assets/KAWASAKI/KAWASAKIZ750.png"
import KAWASAKIZ650 from "../../assets/KAWASAKI/KAWASAKIZ650.png"
import KAWASAKIZ400 from "../../assets/KAWASAKI/KAWASAKIZ400.png"
import KAWASAKIZ300 from "../../assets/KAWASAKI/KAWASAKIZ300.png"
import KAWASAKIH22020 from "../../assets/KAWASAKI/KAWASAKIH22020.png"

import RSV42009 from "../../assets/APRILIA/RSV42009.png"
import RSV42020 from "../../assets/APRILIA/RSV42020.png"
import RSV10001998 from "../../assets/APRILIA/RSV10001998.png"
import RSV10002005 from "../../assets/APRILIA/RSV10002005.png"
import TUONOV42011 from "../../assets/APRILIA/TUONOV42011.png"
import TUONOV42020 from "../../assets/APRILIA/TUONOV42020.png"

import S1000R2014 from "../../assets/BMW/S1000R2014.png"
import S1000R2019 from "../../assets/BMW/S1000R2019.png"

import S1000RR2009 from "../../assets/BMW/S1000RR2009.png"
import S1000RR2016 from "../../assets/BMW/S1000RR2016.png"
import S1000RR2018 from "../../assets/BMW/S1000RR2018.png" 
import S1000RR2024 from "../../assets/BMW/S1000RR2024.png"

import YZFR62002 from "../../assets/Yamaha/YZFR62002.png"
import YZFR62055 from "../../assets/Yamaha/YZFR62055.png"
import YZFR62007 from "../../assets/Yamaha/YZFR62007.png"
import YZFR62016 from "../../assets/Yamaha/YZFR62016.png"
import YZFR62020 from "../../assets/Yamaha/YZFR62020.png"

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
    "YZF R6": [
        { name: "1999-2002", img: YZFR62002 },
        { name: "2003-2005", img: YZFR62055 },
        { name: "2006-2007", img: YZFR62007 },
        { name: "2008-2016", img: YZFR62016 }, 
        { name: "20017-2020", img: YZFR62020 },
       
    ],
    "MT": [
        { name: "10", img: MT10 },
        { name: "07", img: MT07 },
        { name: "09", img: MT09 },
        { name: "09 TRACER", img: MT09T }, 
        { name: "125", img: MT125 },
       
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
        { name: "6R", img: KAWASAKIZ6R },
        { name: "6R 636", img: KAWASAKIZ6R363 },
        { name: "7R", img: KAWASAKIZ7R },
        { name: "9R", img: KAWASAKIZ9R },
        { name: "10R", img: KAWASAKIZ10R },
        { name: "12R", img: KAWASAKIZ12R },
        { name: "14R", img: KAWASAKIZ14R },
    ],
    "Z": [
        { name: "1000", img: KAWASAKIZ1000 },
        { name: "900", img: KAWASAKIZ900 },
        { name: "800", img: KAWASAKIZ800 },
        { name: "750", img: KAWASAKIZ750 },
        { name: "650", img: KAWASAKIZ650 },
        { name: "400", img: KAWASAKIZ400 },
        { name: "300", img: KAWASAKIZ300 },
    ],
    "RSV 4": [
        { name: "2009-2015", img: RSV42009 },
        { name: "2015-2020", img: RSV42020 },
   
    ],
    "RSV 1000": [
        { name: "1998-2002", img: RSV10001998 },
        { name: "2003-2005", img: RSV10002005 },
   
    ],
    "TUONO V4": [
        { name: "2011-2013", img: TUONOV42011 },
        { name: "2014-2020", img: TUONOV42020 },
   
    ],
    "S1000R": [
        { name: "2014-2016", img: S1000R2014 },
        { name: "2017-2019", img: S1000R2019 },
   
    ],
    "S1000RR": [
        { name: "2009-2014", img: S1000RR2009 },
        { name: "2015-2016", img: S1000RR2016 },
        { name: "2017-2018", img: S1000RR2018 },
        { name: "2023-2024", img: S1000RR2024 }, 
    ],
    "NINJA H2": [
        { name: "2018-2020", img: KAWASAKIH22020 },
    ],
    
};

export default modelDetailsData;