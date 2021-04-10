import styled from 'styled-components';
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

  place-content: center;
  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      font-size: 24px;
      margin-bottom: 24px;
    }
  }

  > a {
    color: ${colors.white};
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color linear 200ms;

    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, colors.white)};
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
