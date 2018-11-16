import React from 'react';
import './SearchResults.css';
import Result from '../Result/Result';
import NoResults from '../NoResults/NoResults';

const SearchResults = props => {
  let results;
  if (Array.isArray(props.results) && props.results.length > 0) {
    results = props.results.map((result, id) => {
      return (result.links && !result.links[0].href.endsWith('srt') && !result.links[0].href.endsWith('vtt')) 
              ? <Result data={result} key={result.href} {...props}/> 
              : null
    });
  }

	return (
    <ul className="searchResults">
      {results ? results : <NoResults />}
    </ul>
  );
};

export default SearchResults;