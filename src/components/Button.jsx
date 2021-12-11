import PropTypes from 'prop-types';

export default function Button({ color, text, onClick }) {
  return (
    <button
      style={headingStyle('white', color)}
      className='btn'
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: 'steelBlue',
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

function headingStyle(color, backGroundColor) {
  return {
    color: color,
    backgroundColor: backGroundColor,
  }
};