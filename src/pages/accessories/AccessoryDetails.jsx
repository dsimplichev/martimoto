import { useParams } from "react-router-dom";
import "./accessoryDetails.css";

function AccessoryDetails() {
    const { accessoryName } = useParams();

    return (
        <div className="accessories-page">
            <div className="header-section-acc">
                <h1>{accessoryName}</h1>
            </div>
            <div className="divider-acc"></div>
            <p></p>
        </div>
    );
}

export default AccessoryDetails;