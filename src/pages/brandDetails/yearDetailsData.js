import GSXR9600 from "../../assets/SUZUKI/GSXR9600.png";
import GSXR20012003 from "../../assets/SUZUKI/GSXR20012003.png";
import GSXR20042005 from "../../assets/SUZUKI/GSXR20042005.png";
import GSXR20062007 from "../../assets/SUZUKI/GSXR20062007.png";
import GSXR20082010 from "../../assets/SUZUKI/GSXR20082010.png";
import GSXR75019851987 from "../../assets/SUZUKI/GSXR75019851987.png";
import GSXR19881989 from "../../assets/SUZUKI/GSXR19881989.png";
import GSXR19941995 from "../../assets/SUZUKI/GSXR19941995.png";
import GSXR19961997 from "../../assets/SUZUKI/GSXR19961997.png";
import GSXR19982000 from "../../assets/SUZUKI/GSXR19982000.png";
import GSXR20002003 from "../../assets/SUZUKI/GSXR20002003.png";
import GSXR200420055 from "../../assets/SUZUKI/GSXR200420055.png";
import GSXR20112016  from "../../assets/SUZUKI/GSXR20112016.png"

import GSXR10002002  from "../../assets/SUZUKI/GSXR10002002.png"
import GSXR10002004  from "../../assets/SUZUKI/GSXR10002004.png"
import GSXR10002006  from "../../assets/SUZUKI/GSXR10002006.png"
import GSXR10002008  from "../../assets/SUZUKI/GSXR10002008.png"
import GSXR10002011  from "../../assets/SUZUKI/GSXR10002011.png"
import GSXR10002015  from "../../assets/SUZUKI/GSXR10002015.png"
import GSXR10002020  from "../../assets/SUZUKI/GSXR10002020.png"

import CBR1000RR2004 from "../../assets/HONDA/CBR1000RR2004.png"
import CBR1000RR2011 from "../../assets/HONDA/CBR1000RR2011.png"
import CBR1000RR2015 from "../../assets/HONDA/CBR1000RR2015.png"
import CBR1000RR2019 from "../../assets/HONDA/CBR1000RR2019.png"
import CBR1000RR2023 from "../../assets/HONDA/CBR1000RR2023.png"
import CBR9001999    from "../../assets/HONDA/CBR9001999.png"
import CBR6001987 from "../../assets/HONDA/CBR6001987.png"
import CBR6001994 from "../../assets/HONDA/CBR6001994.png"
import CBR6001997 from "../../assets/HONDA/CBR6001997.png"
import CBR6002002 from "../../assets/HONDA/CBR6002002.png"
import CBR6002006 from "../../assets/HONDA/CBR6002006.png"
import CBR6002015 from "../../assets/HONDA/CBR6002015.png"

import MT072018 from "../../assets/Yamaha/MT072018.png"
import MT072014 from "../../assets/Yamaha/MT072014.png"
import MT092016 from "../../assets/Yamaha/MT092016.png"
import MT092023 from "../../assets/Yamaha/MT092023.png"

import KAWASAKIZ61994 from "../../assets/KAWASAKI/KAWASAKIZ61994.png"
import KAWASAKIZ62000 from "../../assets/KAWASAKI/KAWASAKIZ62000.png"
import KAWASAKIZ62004 from "../../assets/KAWASAKI/KAWASAKIZ62004.png"
import KAWASAKIZ62005 from "../../assets/KAWASAKI/KAWASAKIZ62005.png"
import KAWASAKIZ62008 from "../../assets/KAWASAKI/KAWASAKIZ62008.png"
import KAWASAKIZ62012 from "../../assets/KAWASAKI/KAWASAKIZ62012.png"
import KAWASAKIZ62017 from "../../assets/KAWASAKI/KAWASAKIZ62017.png"
import KAWASAKIZ61998 from "../../assets/KAWASAKI/KAWASAKIZ61998.png"

const yearDetailsData = {
    "GSX-R": {
        "600": [
            { year: "1996-2000", img: GSXR9600 },
            { year: "2001-2003", img: GSXR20012003 },
            { year: "2004-2005", img: GSXR20042005 },
            { year: "2006-2007", img: GSXR20062007 },
            { year: "2008-2010", img: GSXR20082010 },
        ],
        "750": [
            { year: "1985-1987", img: GSXR75019851987 },
            { year: "1988-1989", img: GSXR19881989 },
            { year: "1994-1995", img: GSXR19941995 },
            { year: "1996-1997", img: GSXR19961997 },
            { year: "1998-2000", img: GSXR19982000 },
            { year: "2000-2003", img: GSXR20002003 },
            { year: "2004-2005", img: GSXR200420055 },
            { year: "2006-2007", img: GSXR20062007 },
            { year: "2011-2016", img: GSXR20112016 },
        ],
        "1000": [
            { year: "2001-2002", img: GSXR10002002 },
            { year: "2003-2004", img: GSXR10002004 },
            { year: "2005-2006", img: GSXR10002006 },
            { year: "2007-2008", img: GSXR10002008 },
            { year: "2009-2011", img: GSXR10002011 },
            { year: "2012-2015", img: GSXR10002015 },
            { year: "2018-2020", img: GSXR10002020 },     
        ],
    },
    "CBR": {
       "1000 RR":[
         { year: "2004-2007", img: CBR1000RR2004 },
         { year: "2008-2011", img: CBR1000RR2011 },
         { year: "2012-2015", img: CBR1000RR2015 },
         { year: "2017-2019", img: CBR1000RR2019 },
         { year: "2020-2023", img: CBR1000RR2023 }
       ],
       "900":[
        {year: "1998-1999", img: CBR9001999 },      
       ],
       "600":[
        { year: "1987-1989", img: CBR6001987 },
        { year: "1991-1994", img: CBR6001994 },
        { year: "1995-1997", img: CBR6001997 },
        { year: "1999-2002", img: CBR6002002 },
        { year: "2003-2006", img: CBR6002006 },
        { year: "2007-2015", img: CBR6002015 }
       ]
    },
    "MT": {
        "07": [
        { year: "2014-2017", img: MT072014 },
        { year: "2018-2020", img: MT072018 },
        ],
        "09": [
            { year: "2014-2016", img: MT092016 },
            { year: "2021-2023", img: MT092023 },
        ]
    },
    "ZX": {
        "6R": [
            { year: "1994-1997", img: KAWASAKIZ61994 },
            { year: "1998-1999", img: KAWASAKIZ61998 },
            { year: "2000-2002", img: KAWASAKIZ62000 },
            { year: "2003-2004", img: KAWASAKIZ62004 }, 
            { year: "2005-2006", img: KAWASAKIZ62005 },
            { year: "2007-2008", img: KAWASAKIZ62008 },
            { year: "2009-2012", img: KAWASAKIZ62012 },
            { year: "2013-2017", img: KAWASAKIZ62017 },
            
        ]
    }
    
    
};

export default yearDetailsData