import GoogleMapReact from 'google-map-react';

export interface Place {
  name: string;
  latitude: number;
  longitude: number;
  address?: string;
  phone?: string;
  website: string;
  web_url: string;
  price_level: string;
  rating: string;
  ranking: string;
  num_reviews: string;
  photo?: {
    images: {
      large: {
        url: string;
      };
      small: {
        url: string;
      };
    };
  };
  awards?: {
    award_type: string;
    year: string;
    display_name: string;
    images: {small: string};
  }[];
  cuisine?: {key: string; name: string}[];
}

export interface Coordinates extends GoogleMapReact.Coords {}

export interface Bounds {
  ne: Coordinates;
  sw: Coordinates;
}
