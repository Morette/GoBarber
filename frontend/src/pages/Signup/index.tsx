import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, AnimationContainer, BackGround } from './styles';
import getValidationErrors from '../../utils/getValidationErros';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

const Signup: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string().required('Email is required').email('Type a valid email'),
          password: Yup.string().min(6, '6 digits minimum'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('sessions', data);
        addToast({ type: 'success', title: 'User created', description: 'You can login now.' });
        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Authentication error',
          description: 'An error occur during register. Try again',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <BackGround />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Make your Registration</h1>
            <Input name="name" placeholder="Name" icon={FiUser} />
            <Input name="email" placeholder="Email" type="email" icon={FiMail} />
            <Input name="password" placeholder="Password" type="password" icon={FiLock} />
            <Button type="submit">Register</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Back to Login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Signup;
