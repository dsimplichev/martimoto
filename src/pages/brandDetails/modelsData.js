import s1000r from "../../assets/BMW/s1000r.png";
import s1000rr from "../../assets/BMW/s1000rr.png";

import Streetfighter from "../../assets/Ducati/Streetfighter.png";
import Ducati from "../../assets/Ducati/Ducati.png";
import D999 from "../../assets/Ducati/D999.png";

import S600 from "../../assets/SUZUKI/S600.png";
import GSXR1000 from "../../assets/SUZUKI/GSXR1000.png";
import GSXR1100 from "../../assets/SUZUKI/GSXR1100.png";
import GSXS from "../../assets/SUZUKI/GSXS.png";
import GSXS750 from "../../assets/SUZUKI/GSXS750.png";


import HAYABUSA from "../../assets/SUZUKI/HAYABUSA.png";
import yamaha from "../../assets/Yamaha/yamaha.png";
import YZFR6 from "../../assets/Yamaha/YZFR6.png";
import YZFR125 from "../../assets/Yamaha/YZFR125.png";
import XJ6 from "../../assets/Yamaha/XJ6.png";
import KAWASAKIH2 from "../../assets/KAWASAKI/KAWASAKIH2.png";

import KAWASAKININJA from "../../assets/KAWASAKI/KAWASAKININJA.png";

import RSV4 from "../../assets/APRILIA/RSV4.png";
import RSV1000 from "../../assets/APRILIA/RSV1000.png";
import RSVTUONO from "../../assets/APRILIA/RSVTUONO.png";
import TUONOV4 from "../../assets/APRILIA/TUONOV4.png";
import RS600 from "../../assets/APRILIA/RS600.png";
import RS250 from "../../assets/APRILIA/RS250.png";
import RS125 from "../../assets/APRILIA/RS125.png";
import TUONO125 from "../../assets/APRILIA/TUONO125.png";
import SL1000FALCO from "../../assets/APRILIA/SL1000FALCO.png";
import PANIGALEV4 from "../../assets/Ducati/PANIGALEV4.png";
import PANIGALEV2 from "../../assets/Ducati/PANIGALEV2.png";
import PANIGALE1299 from "../../assets/Ducati/PANIGALE1299.png";
import PANIGALE959 from "../../assets/Ducati/PANIGALE959.png";
import PANIGALE1199 from "../../assets/Ducati/PANIGALE1199.png";
import PANIGALE899 from "../../assets/Ducati/PANIGALE899.png";

import KAWASAKIZ6R from "../../assets/KAWASAKI/KAWASAKIZ6R.png";
import KAWASAKIZ6R363 from "../../assets/KAWASAKI/KAWASAKIZ6R363.png";
import KAWASAKIZ7R from "../../assets/KAWASAKI/KAWASAKIZ7R.png";
import KAWASAKIZ9R from "../../assets/KAWASAKI/KAWASAKIZ9R.png";
import KAWASAKIZ10R from "../../assets/KAWASAKI/KAWASAKIZ10R.png";
import KAWASAKIZ12R from "../../assets/KAWASAKI/KAWASAKIZ12R.png";
import KAWASAKIZ14R from "../../assets/KAWASAKI/KAWASAKIZ14R.png";
import KAWASAKIZ1000 from "../../assets/KAWASAKI/KAWASAKIZ1000.png";
import KAWASAKIZ900 from "../../assets/KAWASAKI/KAWASAKIZ900.png";
import KAWASAKIZ800 from "../../assets/KAWASAKI/KAWASAKIZ800.png";
import KAWASAKIZ750 from "../../assets/KAWASAKI/KAWASAKIZ750.png";
import KAWASAKIZ650 from "../../assets/KAWASAKI/KAWASAKIZ650.png";
import KAWASAKIZ400 from "../../assets/KAWASAKI/KAWASAKIZ400.png";
import KAWASAKIZ300 from "../../assets/KAWASAKI/KAWASAKIZ300.png";

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

import gsx12002008 from "../../assets/SUZUKI/gsx12002008.png";
import gsx14002008 from "../../assets/SUZUKI/gsx14002008.png";

const modelsData = {
  BMW: [
    { name: "S1000R", img: s1000r },
    { name: "S1000RR", img: s1000rr },
  ],
  DUCATI: [
    { name: "PANIGALE V4", img: PANIGALEV4 },
    { name: "PANIGALE V2", img: PANIGALEV2 },
    { name: "PANIGALE 1299", img: PANIGALE1299 },
    { name: "PANIGALE 959", img: PANIGALE959 },
    { name: "PANIGALE 1199", img: PANIGALE1199 },
    { name: "PANIGALE 899", img: PANIGALE899 },
    { name: "STREETFIGHTER", img: Streetfighter },
    { name: "749 /999SBK", img: D999 },
  ],
  SUZUKI: [
    
    { name: "GSXR-600", img: S600 },
    { name: "GSXR-1000", img: GSXR1000 },
    { name: "GSXR-1100", img: GSXR1100 },
    { name: "GSX-750 ", img: S600 },
    { name: "GSX-1200 ", img: gsx12002008 },
    { name: "GSX-1400 ", img: gsx14002008 },
    { name: "GSXS-750", img: GSXS750 },
    { name: "GSXS-1000", img: GSXS },
    { name: "HAYABUSA", img: HAYABUSA },
  ],
  YAMAHA: [
    { name: "YZF R1", img: yamaha },
    { name: "YZF R6", img: YZFR6 },
    { name: "YZF R125", img: YZFR125 },
    { name: "XJ6", img: XJ6 },
    { name: "MT-07", img: MT07 },
    { name: "MT-09", img: MT09 },
    { name: "MT-09 TRACER", img: MT09T },
    { name: "MT-10", img: MT10 },
    { name: "MT-125", img: MT125 },
  ],
  HONDA: [
    { name: "CBR-1100XX", img: CBR1100 },
    { name: "CBR-1000F", img: CBRR1100 },
    { name: "CBR-1000RR", img: CBRRR },
    { name: "CBR-954", img: CBR954 },
    { name: "CBR-929", img: CBR929 },
    { name: "CBR-900", img: CBR900 },
    { name: "CBR-650", img: CBR650 },
    { name: "CBR-600", img: CBR600 },
    { name: "CBR-600FS", img: CBR600FS },
    { name: "CBR-500R", img: CBR500R },
    { name: "CBR-250R", img: CBR250R },
    { name: "CBR-125", img: CBR125 },
    { name: "CBF", img: YZFR6 },
    { name: "HORNET", img: XJ6 },
  ],
  KAWASAKI: [
    { name: "NINJA", img: KAWASAKININJA },
    { name: "ZX-6R", img: KAWASAKIZ6R },
    { name: "ZX-6R 636", img: KAWASAKIZ6R363 },
    { name: "ZX-7R", img: KAWASAKIZ7R },
    { name: "ZX-9R", img: KAWASAKIZ9R },
    { name: "ZX-10R", img: KAWASAKIZ10R },
    { name: "ZX-12R", img: KAWASAKIZ12R },
    { name: "ZX-14R", img: KAWASAKIZ14R },
    { name: "NINJA H2", img: KAWASAKIH2 },
    { name: "Z1000", img: KAWASAKIZ1000},
    { name: "Z900", img: KAWASAKIZ900 },
    { name: "Z800", img: KAWASAKIZ800 },
    { name: "Z750", img: KAWASAKIZ750 },
    { name: "Z650", img: KAWASAKIZ650 },
    { name: "Z400", img: KAWASAKIZ400 },
    { name: "Z300", img: KAWASAKIZ300 },
  ],
  APRILIA: [
    { name: "RSV 4", img: RSV4 },
    { name: "RSV 1000", img: RSV1000 },
    { name: "RSV TUONO", img: RSVTUONO },
    { name: "TUONO V4", img: TUONOV4 },
    { name: "RS 660", img: RS600 },
    { name: "RS 250", img: RS250 },
    { name: "RS 125", img: RS125 },
    { name: "TUONO 125", img: TUONO125 },
    { name: "SL 1000 FALCO", img: SL1000FALCO },
  ],
};

export default modelsData;
