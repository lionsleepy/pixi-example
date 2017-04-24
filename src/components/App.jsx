import pify from 'pify';
import {loader, Application, Graphics} from 'pixi.js';
import React, {Component} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

class App extends Component {
  state = {
    width: 0,
    height: 0,
  };

  componentDidMount() {
    const app = new Application(this.state.width, this.state.height, {view: this.el});
    this.app = app;

    // 나중에 DOM에 박을땐: document.body.appendChild(app.view);

    this.handleResize();
    window.addEventListener('resize', this.handleResize);

    this.draw();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  draw() {
    const graphics = new Graphics();

    graphics.beginFill(0xFF3300);
    graphics.lineStyle(4, 0xffd900, 1);

    graphics.moveTo(50, 50);
    graphics.lineTo(250, 50);
    graphics.lineTo(100, 100);
    graphics.lineTo(50, 50);
    graphics.endFill();

    this.app.stage.addChild(graphics);
  }

  handleResize = () => {
    const {innerWidth: width, innerHeight: height} = window;
    this.setState({width, height});

    if (this.app) {
      this.app.renderer.resize(width, height);
    }
  };

  render() {
    return (
      <Wrapper>
        <canvas
          ref={(el) => (this.el = el)}
          width={this.state.width}
          height={this.state.height}
        />
      </Wrapper>
    );
  }
}

export {
  App as default,
};
