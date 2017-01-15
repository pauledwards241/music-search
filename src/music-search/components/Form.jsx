import React, { PropTypes } from 'react';

const Form = ({    
    onChangeSearchTerm,
    onChangeSearchType,
    onSearch,    
    searchTerm,
    searchTypeIndex,
    searchTypes
}) => {
    const searchTypeOptions = searchTypes.map((x, i) => <option key={`type-option-${i}`} value={i}>{x}</option>);

    return (
        <form onSubmit={onSearch}>
            <fieldset>
                <legend>Search criteria</legend>
                <div className="form-group">
                    <label htmlFor="search-input">Please enter either an artist, album, or track: </label>
                    <input className="form-control"
                            id="search-input"
                            onChange={onChangeSearchTerm} value={searchTerm}
                            placeholder="Artist, album or track"
                            type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="search-type">Filter by: </label>
                    <select className="form-control"
                            onChange={onChangeSearchType}
                            value={searchTypeIndex}>
                        {searchTypeOptions}
                    </select>
                </div>
                <div className="form-group">
                    <input className="btn btn-primary" type="submit" value="Search" />
                </div>
            </fieldset>
        </form>);
};

Form.propTypes = {    
    onChangeSearchTerm: PropTypes.func,
    onChangeSearchType: PropTypes.func,
    onSearch: PropTypes.func,    
    searchTerm: PropTypes.string,
    searchTypeIndex: PropTypes.string,
    searchTypes: PropTypes.arrayOf(PropTypes.string)
};

export default Form;