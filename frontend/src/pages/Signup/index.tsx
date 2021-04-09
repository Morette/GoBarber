import React from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, BackGround } from './styles';

const Signup: React.FC = () => (
  <Container>
    <BackGround />

    <Content>
      <img src={logo} alt="GoBarber" />
      <form>
        <h1>Make your Registration</h1>
        <Input name="name" placeholder="Name" icon={FiUser} />
        <Input name="email" placeholder="Email" type="email" icon={FiMail} />
        <Input name="password" placeholder="Password" type="password" icon={FiLock} />
        <Button type="submit">Register</Button>
      </form>
      <a href="create">
        <FiArrowLeft />
        Back to Login
      </a>
    </Content>
  </Container>
);

export default Signup;
