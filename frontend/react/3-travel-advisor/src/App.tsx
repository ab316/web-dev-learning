import {useState, useEffect} from 'react';
import {CssBaseline, Grid} from '@material-ui/core';

import Header from './components/Header';
import List from './components/List';
import Map from './components/Map';

import {getPlacesData} from './api';
import {Coordinates, Bounds} from './interfaces';

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState<Coordinates | undefined>();
  const [bounds, setBounds] = useState<Bounds | undefined>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        console.log('Setting coordinates from browser');
        setCoordinates({lat: latitude, lng: longitude});
      },
    );
  }, []);

  useEffect(() => {
    (async () => {
      if (!bounds) return;
      console.log('coords', coordinates);
      console.log('bounds', bounds);
      const data = await getPlacesData(bounds.sw, bounds.ne);
      // const data: any = [];
      setPlaces(data);
      console.log(data);
    })();
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{width: '100%'}}>
        <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
