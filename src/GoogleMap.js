import React from "react";
import ReactDOM from "react-dom";
import { compose, withProps } from "recompose";
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
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }} defaultOptions={{ styles: silverMaps, disableDefaultUI: true }} >
    {props.isMarkerShown && (
      <Marker 
      	position={{ lat: -34.397, lng: 150.644 }} 
      	icon={{
		    url: "/images/marker.png"
		}}
      />
    )}
    <Marker position={{ lat: -34.300, lng: 150.644 }} icon={{
		    url: "/images/marker.png"
		}} />
  </GoogleMap>
));


export default MyMapComponent;