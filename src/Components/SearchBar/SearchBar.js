import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchFavorites = this.searchFavorites.bind(this);
  }

  handleChange(event) {
    this.setState({input: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSearch(this.state.input);
    this.setState({input: ""});
  }
  searchFavorites() {
    this.props.onSearch();
  }

  render() {
	return (
    <section className="searchBar">
        <span className="appTitle">NASA Image Search</span>
  	    <div className="searchField">
          <form onSubmit={this.handleSubmit}>
    	      <input value={this.state.input} onChange={this.handleChange} className="searchForm"/>
    	      <button type='submit'>SUBMIT</button>
            <button onClick={this.searchFavorites} className="favoritesButton">FAVORITE IMAGES</button>
    	    </form>
        </div>
    </section>
    );
  }
};

export default SearchBar;