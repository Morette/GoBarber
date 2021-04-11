import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErros';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, BackGround } from './styles';
import { useAuth } from '../../hooks/AuthContext';
import { SignIn } from '../../InterfaceModels/SignIn';

const Signin: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignIn) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().required('Email is required').email('Type a valid email'),
          password: Yup.string().required('Password is required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Logon</h1>
          <Input name="email" placeholder="Email" type="email" icon={FiMail} />
          <Input name="password" placeholder="Password" type="password" icon={FiLock} />
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
