import {useState} from 'react';
import {
  CircularProgress,
  Grid,
  Typography,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@material-ui/core';
import useStyles from './styles';
import PlaceDetails from '../PlaceDetails';
import {Place} from '../../interfaces';

interface ListProps {
  places: Place[];
}

const List = (props: ListProps) => {
  const classes = useStyles();
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const handleTypeChange = (e: React.ChangeEvent<{value: unknown}>) => {
    setType(e.target.value as string);
  };

  const handleRatingChange = (e: React.ChangeEvent<{value: unknown}>) => {
    setRating(e.target.value as string);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>

      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={handleTypeChange}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={handleRatingChange}>
          <MenuItem value="0">All</MenuItem>
          <MenuItem value="3">Above 3.0</MenuItem>
          <MenuItem value="4">Above 4.0</MenuItem>
          <MenuItem value="4.5">Above 4.5</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={3} className={classes.list}>
        {props.places.map((place, i) => (
          <Grid item key={i} xs={12}>
            <PlaceDetails place={place} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default List;
