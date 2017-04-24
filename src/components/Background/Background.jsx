import React, {Component} from 'react';

class Background extends Component {
  state = {
    width: 0,
    height: 0,
  };

  componentWillMount() {
    this.handleResize();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  render() {
    return (
      <canvas
        width={this.state.width}
        height={this.state.height}
      />
    );
  }
}

export {
  Background as default,
};
