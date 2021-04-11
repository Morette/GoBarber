import styled, { css } from 'styled-components';

import { colors } from '../../styles/colors';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  hasError: boolean;
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
    props.hasError &&
    css`
      border-color: ${colors.red};
    `}

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
    flex: 1;
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

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: ${colors.red};
    color: ${colors.white};

    &::before {
      border-color: ${colors.red} transparent;
    }
  }
`;
