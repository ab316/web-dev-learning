const PlaceDetails = (props: {place: {name: string}}) => {
  return <h1>{props.place.name}</h1>;
};

export default PlaceDetails;
