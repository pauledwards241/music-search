## How to run ##
- git clone https://github.com/pauledwards241/music-search.git
- cd music-search
- npm install
- npm start
- In a browser, navigate to http://localhost:3000

## Limitations ##
Due to trying to enforce a time limit, there are a few limitations:
- There is no localisation. User is assumed to be English speaking and living in the United Kingdom. These are the details sent to iTunes.
- There is no form validation.
- There is no method of removing favourites from the favourites list, only by unchecking the favourite in the result list.
- There is no React required property validation. There is property type validation though.
- There are very few code comments.
- There is no script minification.
- There is no error tracking if the iTunes API is down or returns an invalid response.
- The results returned from the API are not great. If a user selects 'All' as their filter type, there is a chance, they may have additional data types outside of artists, albums and tracks returned e.g. music videos.
- There are no unit tests to verify the code.
- No thought has been given to a solution catering for a user who has turned off JavaScript in their browser.
- The styling uses Bootstrap and is very basic.

## Other notes/improvements ##

### React structure ###
- For the layout, the app uses a container component, handling all state manipulation, and then three presentational, stateless components.
- In my opinion, this works for a small/demo application with a limited number of components. For anything larger, a framework like Redux would provide a more robust and scalable solution.

### API call ###
- The iTunes API is pretty horrendous. For this exercise, I've fudged a solution which dynamically adds and removes a script element (as suggested by iTunes) to get around the CORS exception.
- To tidy this up, I would create an API endpoint in the server side code. This endpoint would then make the call to the iTunes API from the server, rather than the client. This would remove the CORS exception and allow developers to use promises rather than callbacks.   
- I would also cache calls to the API. If the same parameters are passed more than once, then a cached response should be returned.

### Result structure ###
- Currently the app dumps the results from the iTunes API to the page. It will adjust the API call based on the filter type, but in general, it doesn't provide the best results.
- I would have preferred to break the results down into three sections, artists, albums and tracks. The problem with this is that it doesn't sit too well with the scroll to load more functionality. It could be confusing to add to each section when a user scrolls depending on the results returned.

### Language and locale ###
- As mentioned above, no consideration is given to language and locale.
- In order to provide the most relevant search results, the language and locale should be picked up from the users' initial page request. Alternatively, in this app, the user could select their language and iTunes store.
- A client side localisation framework should also be in place to adjust the language of the application.

### Additional requirement (load on scroll) ###
- I did not complete this optional requirement due to time constraints.
- In theory, this is how I would solve it:
    - I would add a page number to the application state in MusicSearchContainer. This would default to 1 and be set to 1 every time a search is performed.
    - I would either throttle the browser scroll event or use requestAnimationFrame to monitor the current scroll Y position.
    - Once the user has scrolled to the bottom of the results, the page number would be increased and a request would be made to the iTunes API.
    - The API request would pass a 'limit' parameter of 10 * page number.
    - The returned results would then be rendered.

### Favourites ###
- I placed this module above the search results, so that a user can see the list changing when they select a favourite.
- This might be better positioned in a less obtrusive place. For mobile, it could be place in a collapsed state somewhere and desktop, it could be placed to the side. Currently, it's a little jarring when the search results jump down every time you add a favourite.
- I would also add the ability to remove a favourite from this list.