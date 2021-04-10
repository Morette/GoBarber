import { shade } from 'polished';
import styled from 'styled-components';

import { colors } from '../../styles/colors';

export const Container = styled.button`
  height: 56px;
  background: ${colors.orange};
  border-radius: 10px;
  border: none;
  padding: 0 16px;
  color: ${colors.dark};
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background linear 200ms;

  &:hover {
    background: ${shade(0.2, colors.orange)};
  }
`;
