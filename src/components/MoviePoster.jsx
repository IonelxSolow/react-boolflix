const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

export const IMAGE_SIZES = {
    poster: {
        small: 'w185',
        medium: 'w342',
        large: 'w500',
        original: 'original'
    }
};

function MoviePoster({ path, size = 'medium', title }) {
    if (!path) return null;

    const imageUrl = `${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES.poster[size]}${path}`;

    return (
        <img
            src={imageUrl}
            className="card-img-top"
            alt={title}
            style={{ objectFit: 'cover', height: size === 'small' ? '280px' : '400px' }}
        />
    );
}

export default MoviePoster;
