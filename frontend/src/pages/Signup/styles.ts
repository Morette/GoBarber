import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import { colors } from '../../styles/colors';

import SignUpBackGround from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 2s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: ${colors.white};
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color linear 200ms;

      &:hover {
        color: ${shade(0.2, colors.white)};
      }
    }
  }

  > a {
    color: ${colors.orange};
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color linear 200ms;

    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, colors.orange)};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const BackGround = styled.div`
  flex: 1;
  background: url(${SignUpBackGround}) no-repeat center;
  background-size: cover;
`;
