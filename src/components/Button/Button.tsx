import * as React from 'react';
import { ButtonStyled, LabelStyled, BusyStyled, MotionStyled } from './styled/index.styled';
import { colorRamp, ColorName } from '../../style/settings/color';
import { testAttribute, TestProps } from '../test-selector';

export interface ButtonProps extends TestProps, React.HTMLProps<HTMLButtonElement> {
  readonly ariaLabel?: string;
  readonly ariaLabelledBy?: string;
  readonly colorName?: ColorName;
  readonly isBusy?: boolean;
  readonly isDisabled?: boolean;
  readonly isSmall?: boolean;
}

export const Button = (props: ButtonProps): JSX.Element => {
  const {
    ariaLabel,
    ariaLabelledBy,
    children,
    isDisabled,
    onClick,
    isBusy,
    isSmall,
    colorName = 'electricBlue',
  } = props;

  return (
    <ButtonStyled
      {...testAttribute(props)}
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
          hover: { backgroundColor: colorRamp[colorName].light },
          initial: { scale: 1 },
          tapped: { scale: 0.9 },
        }}
      />
      <BusyStyled isBusy={!!isBusy} />
      <LabelStyled>{children}</LabelStyled>
    </ButtonStyled>
  );
};
