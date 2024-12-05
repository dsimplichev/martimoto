import s1000r from "../../assets/BMW/s1000r.png";
import s1000rr from "../../assets/BMW/s1000rr.png";
import Panigale from "../../assets/Ducati/Panigale.png";
import Streetfighter from "../../assets/Ducati/Streetfighter.png";
import Ducati from "../../assets/Ducati/Ducati.png";
import D999 from "../../assets/Ducati/D999.png";
import GSXR from "../../assets/SUZUKI/GSXR.png";
import GSX from "../../assets/SUZUKI/GSX.png";
import GSXS from "../../assets/SUZUKI/GSXS.png";
import GSXS750 from "../../assets/SUZUKI/GSXS750.png";
import HAYABUSA from "../../assets/SUZUKI/HAYABUSA.png";
import yamaha from "../../assets/Yamaha/yamaha.png"
import YZFR6 from "../../assets/Yamaha/YZFR6.png"
import YZFR125 from "../../assets/Yamaha/YZFR125.png"
import XJ6 from "../../assets/Yamaha/XJ6.png"
import MT from "../../assets/Yamaha/MT.png"

import KAWASAKIZ from "../../assets/KAWASAKI/KAWASAKIZ.png"
import KAWASAKIH2 from "../../assets/KAWASAKI/KAWASAKIH2.png"
import KAWASAKIZX from "../../assets/KAWASAKI/KAWASAKIZX.png"
import KAWASAKININJA from "../../assets/KAWASAKI/KAWASAKININJA.png"

import RSV4 from "../../assets/APRILIA/RSV4.png"
import RSV1000 from "../../assets/APRILIA/RSV1000.png"
import RSVTUONO from "../../assets/APRILIA/RSVTUONO.png"
import TUONOV4 from "../../assets/APRILIA/TUONOV4.png"
import RS600 from "../../assets/APRILIA/RS600.png"
import RS250 from "../../assets/APRILIA/RS250.png"
import RS125 from "../../assets/APRILIA/RS125.png"
import TUONO125 from "../../assets/APRILIA/TUONO125.png"
import SL1000FALCO from "../../assets/APRILIA/SL1000FALCO.png"


const modelsData = {
    BMW: [
        { name: "S1000R", img: s1000r },
        { name: "S1000RR", img: s1000rr },
    ],
    DUCATI: [
        { name: "PANIGALE", img: Panigale },
        { name: "STREETFIGHTER", img: Streetfighter },
        { name: "848 /1098 /1198", img: Ducati },
        { name: "749 /999SBK", img: D999 },
    ],
    SUZUKI: [
        { name: "GSX-R", img: GSXR },
        { name: "GSX", img: GSX },
        { name: "GSX-S", img: GSXS },
        { name: "HAYABUSA", img: HAYABUSA },
    ],
    YAMAHA: [
        { name: "YZF R1", img: yamaha },
        { name: "YZF R6", img: YZFR6 },
        { name: "YZF R125", img: YZFR125 },
        { name: "XJ6", img: XJ6 },
        { name: "MT", img: MT },
    ],
    HONDA: [
        { name: "CBR", img: yamaha },
        { name: "CBF", img: YZFR6 },
        { name: "CB", img: YZFR125 },
        { name: "HORNET", img: XJ6 },
        { name: "VFR", img: MT },
    ],
    KAWASAKI: [
        { name: "NINJA", img: KAWASAKININJA },
        { name: "ZX", img: KAWASAKIZX },
        { name: "NINJA H2", img: KAWASAKIH2 },
        { name: "Z", img: KAWASAKIZ },
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