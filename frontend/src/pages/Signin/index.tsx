import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import logo from '../../assets/logo.svg';
import { Container, Content, BackGround } from './style';

const Signin: React.FC = () => (
  <Container>
    <Content>
      <img src={logo} alt="GoBarber" />
      <form>
        <h1>Logon</h1>
        <input placeholder="Email" />
        <input placeholder="Password" type="password" />
        <button type="submit">Enter</button>
        <a href="forgot">Forgot Password</a>
      </form>
      <a href="create">
        <FiLogIn />
        Create Account
      </a>
    </Content>
    <BackGround />
  </Container>
);

export default Signin;
