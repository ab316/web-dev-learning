import axios from 'axios';
import {Coordinates} from '../interfaces';

const url =
  'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlacesData = async (sw: Coordinates, ne: Coordinates) => {
  try {
    const {
      data: {data},
    } = await axios.get(url, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_latitude: ne.lat,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY ?? '',
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
