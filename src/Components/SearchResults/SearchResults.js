import React from 'react';
import './SearchResults.css';
import Result from '../Result/Result';
import NoResults from '../NoResults/NoResults';

const SearchResults = props => {
  const results = mapResultsToJSX(props);
	
  return (
    <ul className="searchResults">
      {results ? results : <NoResults />}
    </ul>
  );
};

const mapResultsToJSX = props => {
  if (Array.isArray(props.results) && props.results.length > 0) {
    return props.results.map((result, id) => {
      return (result.links && !result.links[0].href.endsWith('srt') && !result.links[0].href.endsWith('vtt')) 
              ? <Result data={result} key={result.href} {...props}/> 
              : null
    });
  }
  return false;
}

export default SearchResults;
