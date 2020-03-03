import styled from 'styled-components';
import { motion } from 'framer-motion';
import { readableColor } from 'polished';
import { color, ColorName } from '../../../style/settings/color/color';
import { space } from '../../../style/settings/space';
import { fontSize, weight } from '../../../style/settings/typography';

interface MotionProps {
  colorName: ColorName;
}

interface BusyProps {
  isBusy: boolean;
}

interface ButtonProps extends Partial<BusyProps>, MotionProps {
  isDisabled: boolean;
  isSmall?: boolean;
}

export const LabelStyled = styled(motion.span)`
  position: relative;
  z-index: 1;
`;

export const ButtonStyled = styled(motion.button)(
  ({ colorName, isBusy, isDisabled, isSmall }: ButtonProps) => `
    background-color: transparent;
    border: none;
    border-radius: ${space.large.number * 2 + space.xxxSmall.number}rem;
    color: ${readableColor(color[colorName].default)};
    cursor: ${isDisabled ? 'not-allowed' : isBusy ? 'wait' : 'pointer'};
    display: inline-block;
    font-size: ${isSmall ? fontSize.labelLarge.rem : fontSize.default.rem};
    font-weight: ${weight.medium};
    margin: 0;
    overflow: hidden;
    padding: ${isSmall ? `${space.xSmall.rem} ${space.default.rem}` : `${space.small.rem} ${space.large.rem}`};
    position: relative;
    transition: background-color,
      box-shadow;
    transition-duration: 0.25s;
    transition-timing-function: ease;
    width: auto;

    &:active,
    &:focus {
      outline: none;
    }
  `,
);

export const BusyStyled = styled.div(
  ({ isBusy }: BusyProps) => `
    border-radius: ${space.large.rem};
    height: 100%;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;

    @keyframes animate {
      0% {
        transform: translateX(-50%)
      }
      100% {
        transform: translateX(0%);
      }
    }

    &:after {
      animation: animate 1s linear infinite forwards;
      animation-play-state: play;
      background: url('data:image/png;base64,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');
      background-repeat: repeat-x;
      background-size: 25% 100%;
      box-sizing: border-box;
      content: '';
      height: 100%;
      left: 0;
      opacity: ${isBusy ? 1 : 0};
      position: absolute;
      top: 0;
      transition: opacity 0.5s ease;
      width: 200%;
      z-index: 1;
    }
  `,
);

export const MotionStyled = styled(motion.div)(
  ({ colorName }: MotionProps) => `
    background-color: ${color[colorName].default};
    border-radius: ${space.large.rem};
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  `,
);
