import React, { PropTypes } from 'react';

const Results = ({ onAddFavourite, results }) => {
    if (!results) return null;

    if (results.length === 0) {
        return <div>Sorry, no results matched your query.</div>;
    }

    const resultRows = results.map((x, i) => {
            return (<tr key={`search-result-${i}`}>
                        <td className="text-center">
                            <input
                                checked={x.isFavourite}
                                onChange={e => onAddFavourite(e, i)}
                                type="checkbox" />
                        </td>
                        <td className="text-capitalize">{x.type}</td>
                        <td>{x.artistName}</td>
                        <td>{x.collectionName}</td>
                    </tr>);
        });

    return (<table className="table table-striped table-bordered">
                <caption>Results from your music search</caption>
                <thead>
                    <tr>
                        <th className="text-center" scope="col">Favourite</th>
                        <th scope="col">Result type</th>
                        <th scope="col">Artist</th>
                        <th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {resultRows}
                </tbody>
            </table>);
};

Results.propTypes = {
    onAddFavourite: PropTypes.func,
    results: PropTypes.arrayOf(PropTypes.object),
};

export default Results;