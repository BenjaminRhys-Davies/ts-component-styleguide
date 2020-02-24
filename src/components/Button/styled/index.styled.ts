import styled from 'styled-components';
import { color } from '../../../style/settings/color';

interface ButtonProps {
  isBusy?: boolean;
  isDisabled: boolean;
}

export const LabelStyled = styled('span')`
  position: relative;
  z-index: 1;
`;

export const ButtonStyled = styled('button')(
  ({ isBusy, isDisabled }: ButtonProps) => `
    display: inline-block;
    position: relative;

    width: auto;
    padding: 12px 24px
    overflow: hidden;

    background-color: ${color.electricBlue};
    border: none;
    border-radius: 50px;
    color: ${color.black};
    cursor: ${isDisabled ? 'not-allowed' : isBusy ? 'wait' : 'pointer'};
    font-family: "GT Walsheim Pro";
    font-size: 16px;
    font-weight: 500;
    margin: 0;
    box-sizing: border-box;
    transition: background-color 0.25s ease, box-shadow 0.25s ease;

    &:active,
    &:focus {
      outline: none;
    }
  `,
);

export const BusyStyled = styled.div(
  ({ isBusy }: ButtonProps) => `
  position: absolute;
  overflow: hidden;

  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;

  border-radius: 24px;

  @keyframes animate {
    0% {
    transform: translateX(-50%)
    }
    100% {
      transform: translateX(0%);
    }
  }

  &:after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: url('data:image/png;base64,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');
    background-size: 25% 100%;
    background-repeat: repeat-x;
    box-sizing: border-box;
    opacity: ${isBusy ? 1 : 0};
    transition: opacity 0.5s ease;
    z-index: 1;
    animation: animate 1s linear infinite forwards;
    animation-play-state: play;
  }
`,
);
