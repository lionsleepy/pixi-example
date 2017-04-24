import {extras, Application, Texture} from 'pixi.js';
import React, {Component} from 'react';
import styled from 'styled-components';

const {AnimatedSprite} = extras;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Image = styled.img`
  width: 100vw;
  height: 100vh;
`;

class App extends Component {
  state = {
    width: 0,
    height: 0,
    currentImage: 0,
  };

  componentDidMount() {
    const {state: {width, height}} = this;

    const app = new Application(width, height, {view: this.el});
    this.app = app;

    // 나중에 DOM에 박을땐 `view` 옵션 빼고: document.body.appendChild(app.view);

    this.handleResize();
    window.addEventListener('resize', this.handleResize);

    this.draw();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  draw() {
    const frames = [
      'sprites/',
    ].map((elem) => Texture.fromImage(elem));

    const anim = new AnimatedSprite(frames);

    anim.animationSpeed = 0.5;
    anim.play();

    this.app.stage.addChild(anim);
  }

  handleResize = () => {
    const {innerWidth: width, innerHeight: height} = window;

    this.setState({width, height});

    if (this.app) {
      this.app.renderer.resize(width, height);
    }
  };

  render() {
    const {state: {currentImage}} = this;
    const images = [
      'p-0.jpg',
      'p-1.jpg',
    ];

    return (
      <Wrapper>
        <Image src={images[currentImage]} />
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
