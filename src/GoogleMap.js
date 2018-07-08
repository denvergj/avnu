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

const MyMapComponent = compose(
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAgtQXYfDyRONqa7nTYp17el-soHpuQt0Q&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div id="googleMapContainer" style={{ height: `400px` }} />,
    mapElement: <div id="googleMap" style={{ height: `100%`, width: `85%` }} />
  }),
  withHandlers({
    onMarkerClick: () => (marker) => {
	    var properties = document.getElementsByClassName("mapHouseProperty");
	    var i;
		for (i = 0; i < properties.length; i++) {
		    properties[i].style.display = 'none';
		}
	    document.getElementById('property-'+marker.latLng.lng()).style.display = "block";
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={10} defaultCenter={{ lat: -33.865143, lng: 151.209900 }} defaultOptions={{ styles: silverMaps, disableDefaultUI: true }} >

	  	{props.theMarkers && props.theMarkers.map((markers, i) => { 
	  		return (
		      	<Marker 
		      		key={i}
		      		position={{ lat: markers.fields.location.lat, lng: markers.fields.location.lon }} 
		      		icon={{
				    	url: "/images/marker.png"
					}} 
					propertyId={markers.mapIconId}
					onClick={props.onMarkerClick.bind(this.marker)}
				/>
	  		);
		})}
		{props.theMarker ?
	      		[
				<Marker 
			      		position={{ lat: props.theMarker.lat, lng: props.theMarker.lon }} 
			      		icon={{
					    	url: "/images/marker.png"
						}} 
					/>
			]
      	: null}
        
  </GoogleMap>
));


export default MyMapComponent;