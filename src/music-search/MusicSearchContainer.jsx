import React from 'react';

import Favourites from './components/Favourites.jsx';
import Form from './components/Form.jsx';
import MusicSearchApi from './MusicSearchApi';
import Results from './components/Results.jsx';

class MusicSearchContainer extends React.Component {

    constructor(props) {
        super(props);

        this.searchTypes = [
            { 'name': 'All' },
            { 'attribute': 'artistTerm', 'entity': 'musicArtist', 'name': 'Artist' },           
            { 'attribute': 'albumTerm', 'entity': 'album', 'name': 'Album' },            
            { 'attribute': 'songTerm', 'entity': 'song', 'name': 'Song' }
        ];

        this.api = new MusicSearchApi(this.apiCallback.bind(this));

        this.state = {
            favourites: {},
            results: null,            
            searchTerm: '',
            searchTypeIndex: '0'        
        };
    }

    handleAddFavourite(e, index) {
        // Copy from state
        const favourites = Object.assign({}, this.state.favourites);
        const results = this.state.results.slice();

        const result = results[index];
        result.isFavourite = e.target.checked;

        if (e.target.checked) {
            favourites[result.id] = result;
        }
        else {
            delete favourites[result.id];
        }

        this.setState({
            favourites: favourites,
            results: results
        });
    }

    handleChangeSearchType(e) {
        this.setState({
            searchTypeIndex: e.target.value
        });
    }

    handleChangeSearchTerm(e) {
        this.setState({
            searchTerm: e.target.value
        });
    }

    handleSearch(e) {
        e.preventDefault();
        this.api.get(this.state.searchTerm, this.searchTypes[+this.state.searchTypeIndex]);
    }

    apiCallback(response) {
        const results = this.formatApiResponse(response);

        this.setState({
            results: results
        });
    }

    formatApiResponse(response) {
        return response.map(x => {
            const { artistId, artistName, collectionId, collectionName, collectionType, wrapperType } = x;
            const id = `${artistId}-${collectionId || 'artist'}`;
            return {
                artistName,
                collectionName: collectionName || null,
                id,
                isFavourite: !!this.state.favourites[id],
                type: collectionType || wrapperType                
            };
        });
    }

    render() {
        const searchTypeNames = this.searchTypes.map(x => x.name);

        return (<div>
                    <Form
                        onChangeSearchTerm={this.handleChangeSearchTerm.bind(this)}
                        onChangeSearchType={this.handleChangeSearchType.bind(this)}
                        onSearch={this.handleSearch.bind(this)}
                        searchTerm={this.state.searchTerm}
                        searchTypeIndex={this.state.searchTypeIndex}
                        searchTypes={searchTypeNames} />
                    <Favourites
                        favourites={this.state.favourites} />
                    <Results
                        onAddFavourite={this.handleAddFavourite.bind(this)}
                        results={this.state.results} />
                </div>);
    }
}

export default MusicSearchContainer;