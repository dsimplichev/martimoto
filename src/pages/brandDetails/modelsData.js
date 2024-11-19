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
};

export default modelsData;