import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab';
import useStyles from './styles';

const Map = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width:600px)');
  const coordinates = {lat: 57.7089, lng: 11.9746};

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        // Don't commit this key
        bootstrapURLKeys={{key: 'YOUR GOOGLE MAPS API KEY'}}
        defaultCenter={coordinates}
        center={coordinates}
        margin={[50, 50, 50, 50]}
        options={{}}
        onChange={() => {}}
        onChildClick={() => {}}
        defaultZoom={14}></GoogleMapReact>
    </div>
  );
};

export default Map;
