import React, { Component } from 'react';
import { number, string, func, bool } from 'prop-types';
import { connect } from 'react-redux';

import ThumbUp from './icons/ThumbUp';
import ThumbDown from './icons/ThumbDown';
import { voteMovie } from '../actions/movieActions';

class Movie extends Component {
  constructor() {
    super();

    this.state = { isHover: false };
  }

  render() {
    const { id, name, poster, ranking, voteMovie, votesEnable } = this.props;
    const { isHover } = this.state;
    const backgroundStyle = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, ${isHover ? '.75' : '.25'}), rgba(0, 0, 0, ${isHover ? '.75' : '.25'})), url(${poster})`
    };
    const positive = ranking === 5;
    const negative = ranking === 1;
    let continerStyle = 'movie-container';
    if (positive) {
      continerStyle += ' positive-movie';
    } else if (negative) {
      continerStyle += ' negative-movie';
    }

    return (
      <div
        className={continerStyle}
        style={backgroundStyle}
        onMouseEnter={() => this.setState({ isHover: true })}
        onMouseLeave={() => this.setState({ isHover: false })}
      >
        <div className="movie-name">
          <div
            className="thumb-icon"
            onClick={() => voteMovie(id, false)}
          >
            {votesEnable &&
              <ThumbDown
                strokeColor={ranking ? 'wheat' : '#9e0909'}
                fillColor={negative ? '#9e0909' : 'none'}
              />
            }
          </div>
          <h5>{name}</h5>
          <div
            className="thumb-icon"
            onClick={() => voteMovie(id, true)}
          >
            {votesEnable &&
              <ThumbUp
                strokeColor={ranking ? 'wheat' : '#06582b'}
                fillColor={positive ? '#06582b' : 'none'}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

Movie.propTypes = {
  id: string,
  name: string.isRequired,
  poster: string.isRequired,
  voteMovie: func.isRequired,
  ranking: number,
  votesEnable: bool
};

Movie.defaultProps = {
  votesEnable: true
};

const mapDispatch = dispatch => ({
  voteMovie: (id, vote) => dispatch(voteMovie(id, vote))
});

export default connect(null, mapDispatch)(Movie);
