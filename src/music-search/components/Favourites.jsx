import React, { PropTypes } from 'react';

const Favourites = ({ favourites }) => {
    const listItems = Object.keys(favourites).map((x, i) => {
        const favourite = favourites[x];
        const key = `favourite-${i}`;

        return favourite.collectionName ?
                <li key={key}>{favourite.artistName} - {favourite.collectionName}</li> :
                <li key={key}>{favourite.artistName}</li>;
    });

    if (listItems.length === 0) return null;

    return (<section className="favourites">
                <header>Favourites</header>
                <ul>{listItems}</ul>
            </section>);
};

Favourites.propTypes = {
    favourites: PropTypes.object
};

export default Favourites;