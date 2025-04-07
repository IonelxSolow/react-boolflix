import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

function StarRating({ vote }) {
    const normalizedRating = Math.ceil(vote / 2);
    
    return (
        <div className="star-rating">
            {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon 
                    key={index}
                    icon={index < normalizedRating ? faStarSolid : faStarRegular}
                    className="text-warning"
                />
            ))}
        </div>
    );
}

export default StarRating;
