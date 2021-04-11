import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const Container = styled.div`
  position: relative;

  span {
    width: 150px;
    background: ${colors.orange};
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    color: ${colors.dark_grey};

    &::before {
      position: absolute;
      border-style: solid;
      border-color: ${colors.orange} transparent;
      border-width: 6px 6px 0 6px;
      bottom: 20px;
      content: '';
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
