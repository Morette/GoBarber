import React from 'react';
import { Form } from '@unform/web';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, BackGround } from './styles';

const Signin: React.FC = () => {
  const handleSubmit = (data: Record<string, unknown>): void => console.log(data);

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />
        <Form onSubmit={handleSubmit}>
          <h1>Logon</h1>
          <Input name="Email" placeholder="Email" icon={FiMail} />
          <Input name="Password" placeholder="Password" type="password" icon={FiLock} />
          <Button type="submit">Enter</Button>
          <a href="forgot">Forgot Password</a>
        </Form>
        <a href="create">
          <FiLogIn />
          Create Account
        </a>
      </Content>
      <BackGround />
    </Container>
  );
};

export default Signin;
