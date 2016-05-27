import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

import Header from '../Header'
import Menu from '../Menu'
import Chat from '../Chat'
import './Maps.css'

export default class Maps extends Component {
  render() {
    const position = [51.505, -0.09]
    const map = (
      <Map center={position} zoom={13}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
          </Popup>
        </Marker>
      </Map>
    )

    return (
      <div className='row'>
        <div className='col-xs'>
          <Header />
          <div className='row'>
            <div className='col-xs'>
              <div className='box'>
                {map}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
