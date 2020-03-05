import * as React from 'react';
import { color } from '@settings/color';
import { testAttribute, TestProps } from '@helpers/test';
import { ButtonStyled, LabelStyled, BusyStyled, MotionStyled } from './styled/index.styled';

export interface ButtonProps extends TestProps, React.HTMLProps<HTMLButtonElement> {
  readonly ariaLabel?: string;
  readonly ariaLabelledBy?: string;
  readonly colorName?: keyof typeof color;
  readonly isBusy?: boolean;
  readonly isDisabled?: boolean;
  readonly isSmall?: boolean;
}

export const Button = ({
  ariaLabel,
  ariaLabelledBy,
  children,
  isDisabled,
  onClick,
  isBusy,
  isSmall,
  colorName = 'electricBlue',
  ...rest
}: ButtonProps): JSX.Element => (
  <ButtonStyled
    {...testAttribute(rest)}
    aria-busy={isBusy}
    aria-disabled={isDisabled}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy}
    colorName={colorName}
    disabled={!!isDisabled || !!isBusy}
    isBusy={!!isBusy}
    isDisabled={!!isDisabled}
    isSmall={isSmall}
    onClick={onClick}
    whileHover="hover"
    whileTap={!isBusy && !isDisabled ? 'tapped' : undefined}
  >
    <MotionStyled
      colorName={colorName}
      initial="initial"
      variants={{
        hover: { backgroundColor: color[colorName].light },
        initial: { scale: 1 },
        tapped: { scale: 0.9 },
      }}
    />
    <BusyStyled isBusy={!!isBusy} />
    <LabelStyled>{children}</LabelStyled>
  </ButtonStyled>
);
