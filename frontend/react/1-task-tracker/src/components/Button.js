import PropTypes from 'prop-types';

export const Button = ({color, text, onClick}) => {
  return (
    <button className="btn" style={{backgroundColor: color}} onClick={onClick}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: 'steelBlue',
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
};
