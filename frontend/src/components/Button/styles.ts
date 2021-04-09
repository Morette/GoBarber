import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  height: 56px;
  background: #ff9000;
  border-radius: 10px;
  border: none;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background linear 200ms;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
