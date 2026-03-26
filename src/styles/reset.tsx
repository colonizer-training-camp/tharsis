import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';

const gloablStyle = css`
  ${emotionReset}
  small {
    font-size: 80%;
  }
  sup {
    font-size: 80%;
    vertical-align: super;
  }
  sub {
    font-size: 80%;
    vertical-align: sub;
  }
  input {
    all: unset;
    box-sizing: border-box;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Geist', 'Pretendard Variable', Pretendard, sans-serif;
    font-weight: 700;
  }
  button {
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;
    font: inherit;
  }
`;

export default gloablStyle;
