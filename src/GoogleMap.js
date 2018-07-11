import React from "react";
import ReactDOM from "react-dom";
import { compose, withProps, withHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const silverMaps = require("./silver-maps.json");


const mapEnvironment = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyAgtQXYfDyRONqa7nTYp17el-soHpuQt0Q&v=3`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div id="googleMapContainer" style={{ height: `400px` }} />,
    mapElement: <div id="googleMap" style={{ height: `100%`, width: `85%` }} />
  }),
  withScriptjs,
  withGoogleMap
);


const MapLayout = props => (
  <GoogleMap defaultZoom={10} defaultCenter={{ lat: -33.865143, lng: 151.209900 }} defaultOptions={{ styles: silverMaps, disableDefaultUI: true }} >

	  	{props.theMarkers && props.theMarkers.map((markers, i) => { 
	  		return (
		      	<Marker 
		      		key={i}
		      		position={{ lat: markers.fields.location.lat, lng: markers.fields.location.lon }} 
		      		icon={{
				    	url: "/images/marker.png"
					}} 
				/>
	  		);
		})}
		{props.theMarker ?
	      		[
				<Marker 
				 		key={props.theMarker.lat}
			      		position={{ lat: props.theMarker.lat, lng: props.theMarker.lon }} 
			      		icon={{
					    	url: "/images/marker.png"
						}} 
					/>
			]
      	: null}
        
  </GoogleMap>
);

const MyMapComponent = mapEnvironment(MapLayout);


export default MyMapComponent;