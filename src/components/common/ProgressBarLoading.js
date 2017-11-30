import React, { Component } from 'react';
import { number } from 'prop-types';
import ProgressBar from 'progressbar.js';

class ProgressBarLoading extends Component {
  componentDidMount() {
    const { estimatedTime } = this.props;
    const bar = new ProgressBar.Line(this.progressBar, {
      strokeWidth: 4,
      easing: 'easeInOut',
      duration: estimatedTime,
      color: '#ff9aa6',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: { width: '100%', height: '100%' },
      text: {
        style: {
          color: '#999',
          position: 'absolute',
          right: '0',
          top: '30px',
          padding: 0,
          margin: 0,
          transform: null
        },
        autoStyleContainer: false
      },
      from: { color: '#FFEA82' },
      to: { color: '#ED6A5A' },
      step: (state, bar) => {
        bar.setText(`${Math.round(bar.value() * 100)} %`);
      }
    });

    bar.animate(1.0);
  }

  render() {
    return (
      <div
        className="progress-bar"
        ref={(progressBar) => { this.progressBar = progressBar; }}
      />
    );
  }
}

ProgressBarLoading.propTypes = {
  estimatedTime: number.isRequired
};

export default ProgressBarLoading;
