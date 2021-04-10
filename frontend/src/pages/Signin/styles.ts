import styled from 'styled-components';
import { shade } from 'polished';

import { colors } from '../../styles/colors';

import SigninBackGround from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;
  width: 100%;
  max-width: 700px;

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
  background: url(${SigninBackGround}) no-repeat center;
  background-size: cover;
`;
