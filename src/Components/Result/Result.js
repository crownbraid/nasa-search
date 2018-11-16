import React, { Component } from 'react';
import './Result.css';
import unirest from 'unirest';

class Result extends Component {
	constructor(props) {
		super(props);
		this.state = {url: "", data: this.props.data, popUp: false}; 
	}

    componentDidMount() {
    	unirest.get(this.state.data.href)
    	.end( res => {
			const index = res.body.findIndex(url => url.endsWith('orig.jpg') || url.endsWith('orig.mp4'));
			
			if (res.body[index]) this.setState({url: res.body[index]});
			else this.setState({url: this.state.data.links[0].href});
		});
    }

    render() {
    	const add = <span style={{color: 'white'}} className="favoriteHandler" onClick={() => this.props.addFavorite(this.state.data)}>+</span>
    	const remove = <span style={{color: 'white'}} className="favoriteHandler" onClick={() => this.props.removeFavorite(this.state.data)}>-</span>

		return (
			<li>
				<img src={this.state.data.links[0].href} onClick={() => this.props.handlePopup({url: this.state.url, data: this.state.data.data[0]})}/>
				<div className="addRemove">
					{(this.props.favorites.some(el => el.links[0].href == this.props.data.links[0].href)) ? remove : add}
				</div>
			</li>
		);
	}
}

export default Result;