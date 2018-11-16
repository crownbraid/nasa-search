import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import unirest from 'unirest';
import SearchResults from './Components/SearchResults/SearchResults';
import SearchBar from './Components/SearchBar/SearchBar';
import Popup from './Components/Popup/Popup';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      favorites: [],
      favToggle: false,
      popUp: false
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
    this.handlePopup = this.handlePopup.bind(this);
  }

  handleSearch(term = "") {
    if (term = term.replace(/ +/g, "")) {
      unirest.get(`https://images-api.nasa.gov/search?q=${term}`)
      .end(res => {
        const results = res.body.collection.items;
        this.setState({results: (results.length > 0) ? res.body.collection.items : "No results", favToggle: false});
      });
    } else {
      this.setState({results: this.state.favorites, favToggle: true});
    }
  }

  addFavorite(item) {
    if (!this.state.favorites.includes(item)) this.setState({favorites: [...this.state.favorites, item]});
  }

  async removeFavorite(item) {
    if (window.confirm(`Are you sure you want to remove \"${item.data[0].title}\" from your favorites?`)) {
      const newState = await this.state.favorites.filter(el => el !== item);
      this.setState({favorites: newState, results: this.state.favToggle ? newState : this.state.results});
    }
  }

  handlePopup(data) {
    this.setState({popUp: (data) ? data : false});
  }

  render() {
    return (
      <div className="App">
        <div className={(this.state.popUp) ? "hideBackground" : "showBackground"}>
          <SearchBar onSearch={this.handleSearch} />
          <SearchResults results={this.state.results} addFavorite={this.addFavorite} removeFavorite={this.removeFavorite} favorites={this.state.favorites} handlePopup={this.handlePopup} />
        </div>
        <Popup closeBtn={false} escToClose={false}/>
        {(this.state.popUp) ? Popup.plugins().displayImage(this.state.popUp, this.handlePopup) : null}
      </div>
    );
  }
}

/*

  handleKeyDown(e) {
    const { results, popUpIndex } = this.state
    
    if (popUpIndex > 0 && (e.keyCode === 37 ||  e.keyCode === 38)) {
      this.setState( prevState => ({
        popUpIndex: prevState.popUpIndex - 1,
        popUp: prevState.results[popUpIndex - 1]
      }))
    } else if (popUpIndex < results.length  && (e.keyCode === 39 ||  e.keyCode === 40)) {
      this.setState( prevState => ({
        popUpIndex: prevState.popUpIndex + 1,
        popUp: prevState.results[popUpIndex + 1]
      }))
    }
  }

render => <div className="App" onKeyDown={(this.state.popUp != false) ? this.handleKeyDown : null}>
*/

export default App;