import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';
import {Coordinates, Bounds, Place} from '../../interfaces';

declare module 'react' {
  interface HTMLAttributes<T> {
    lat?: number;
    lng?: number;
  }
}

interface MapProps {
  setCoordinates: React.Dispatch<React.SetStateAction<Coordinates | undefined>>;
  setBounds: React.Dispatch<React.SetStateAction<Bounds | undefined>>;
  coordinates: Coordinates | undefined;
  places: Place[];
}

const Map = (props: MapProps) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  console.log('Rendering map with coords', props.coordinates);
  console.log();

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        // Don't commit this key
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? '',
        }}
        // bootstrapURLKeys={{key: 'YOUR GOOGLE MAPS API KEY'}}
        // defaultCenter={props.coordinates}
        center={props.coordinates}
        margin={[50, 50, 50, 50]}
        options={{}}
        onChange={(e) => {
          props.setCoordinates({lat: e.center.lat, lng: e.center.lng});
          props.setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
        }}
        onChildClick={(child) => {
          console.log(child);
        }}
        defaultZoom={14}>
        {props.places.map((place, i) => (
          <div
            key={i}
            lat={place.latitude}
            lng={place.longitude}
            className={classes.markerContainer}>
            {isDesktop ? (
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.small.url
                      : 'https://www.clipartmax.com/png/full/213-2131416_restaurant-lamb-clipart-placeholder-image-for-restaurant.png'
                  }
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            ) : (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
