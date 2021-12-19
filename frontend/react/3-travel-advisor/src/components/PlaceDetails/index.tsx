import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import {Place} from '../../interfaces';
import useStyles from './styles';

const PlaceDetails = (props: {place: Place}) => {
  const classes = useStyles();
  const place = props.place;

  return (
    <Card elevation={6}>
      <CardMedia
        style={{height: 350}}
        title={place.name}
        image={
          place.photo
            ? place.photo.images.large.url
            : 'https://www.clipartmax.com/png/full/213-2131416_restaurant-lamb-clipart-placeholder-image-for-restaurant.png'
        }
      />

      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>

        <Box display="flex" justifyContent="space-between">
          <Rating size="small" value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            out of {place.num_reviews} reviews
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>

        {place.awards?.map((award, i) => (
          <Box key={i} display="flex" justifyContent="space-between" my={1}>
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}

        {place.cuisine?.map((cuisine) => (
          <Chip
            key={cuisine.key}
            size="small"
            label={cuisine.name}
            className={classes.chip}
          />
        ))}

        {place.address && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}>
            <LocationOnIcon />
            {place.address}
          </Typography>
        )}

        {place.phone && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}>
            <PhoneIcon />
            {place.phone}
          </Typography>
        )}

        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={(e) => window.open(place.web_url, '_blank')}>
            Trip Advisor
          </Button>

          <Button
            size="small"
            color="primary"
            onClick={(e) => window.open(place.website, '_blank')}>
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
