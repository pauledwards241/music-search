class MusicSearchApi {
    constructor(apiCallback) {
        this.apiScriptElement = null;
        this.apiCallback = apiCallback;

        window.apiCallback = this.callback.bind(this);
    }

    get(term, typeMetadata) {
        const { attribute, entity } = typeMetadata;

        const entityQueryParams = entity && attribute
                                    ? `&entity=${entity}&attribute=${attribute}`
                                    : '';

        const url = [`https://itunes.apple.com/search?term=${term}`,
                        '&country=GB',
                        '&media=music',
                        entityQueryParams,
                        '&limit=10',
                        '&lang=en_gb',
                        '&callback=apiCallback'
                    ].join('');

        this.apiScriptElement = document.createElement('script');
        this.apiScriptElement.setAttribute('src', url);

        document.body.appendChild(this.apiScriptElement);
    }

    callback(response) {
        document.body.removeChild(this.apiScriptElement);
        this.apiCallback(response.results);
    }
}

export default MusicSearchApi;