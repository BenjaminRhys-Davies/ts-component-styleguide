import * as React from 'react';
import { ButtonStyled, LabelStyled, BusyStyled } from './styled/index.styled';
import { color } from '../../style/settings/color';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  readonly isDisabled?: boolean;
  readonly isBusy?: boolean;
}

export const Button = ({ children, isBusy, isDisabled, onClick }: ButtonProps): JSX.Element => (
  <ButtonStyled
    disabled={!!isDisabled || !!isBusy}
    isBusy={!!isBusy}
    isDisabled={!!isDisabled}
    onClick={onClick}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        background: color.electricBlue,
        position: 'absolute',
        borderRadius: 24,
        top: 0,
        left: 0,
      }}
    />
    <BusyStyled isBusy={!!isBusy} isDisabled={!!isDisabled} />
    <LabelStyled>{children}</LabelStyled>
  </ButtonStyled>
);
