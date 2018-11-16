import React from 'react';
import Popup from 'react-popup';
import './Popup.css';

Popup.registerPlugin('displayImage', function({url, data}, closePopup) {
    this.create({
        title: data.title,
        content: <div><img className="popupImage" src={url}></img>{(data.title != data.description) ? <div className="popupDesc" style={{fontSize: dynFontSize(data.description)}} dangerouslySetInnerHTML={{__html: data.description}}></div> : null}</div>,
        buttons: {
            left: [{
                text: 'Close',
                key: 'esc',
                className: 'success',
                action: function () {
                    closePopup();
                    Popup.close();
                }
            }]
        }
    });
});


const dynFontSize = text => {
    
        const numWords = text.split(' ').length; 
		
		if (numWords < 20) return '1.5em';
        else if (numWords < 38) return '1.3em';
        else if (numWords < 60) return '1.1em';
        else if (numWords < 100) return '0.9em';
        else if (numWords < 150) return '0.8em';
        else if (numWords < 190) return '0.7em';
        else return '.6em';
}

export default Popup;