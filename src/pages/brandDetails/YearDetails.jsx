import { useParams } from 'react-router-dom';
import yearDetailsData from './yearDetailsData';  
import './yearDetails.css';

function YearDetails() {
    const { modelName, subModelName, year } = useParams();
    const modelYears = yearDetailsData[modelName]?.[subModelName] || [];
    const model = modelYears.find(item => item.year === year);  

    return (
        <div className="year">
            <h1>{modelName} - {subModelName} - {year}</h1>
            <div className="title-underline"></div>
            <div className="model-image-container">
                <img src={model?.img} alt={year} className="model-image" />
            </div>
        </div>
    );
}

export default YearDetails;