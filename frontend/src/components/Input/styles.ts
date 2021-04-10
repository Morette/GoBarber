import styled, { css } from 'styled-components';

import { colors } from '../../styles/colors';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${colors.dark};
  border-radius: 10px;
  border: 2px solid ${colors.dark};
  color: ${colors.gray};
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isFocused &&
    css`
      color: ${colors.orange};
      border-color: ${colors.orange};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: ${colors.orange};
    `}

  input {
    background: transparent;
    border: none;
    color: ${colors.white};

    &::placeholder {
      color: ${colors.gray};
    }
  }

  svg {
    margin-right: 16px;
  }
`;
