import React from 'react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { color, ColorName } from '../../style/settings/color/color';
import { Button } from './Button';

export const properties = (): JSX.Element => (
  <Button
    colorName={select('Colour', Object.keys(color), 'electricBlue') as ColorName}
    isBusy={boolean('Busy', false)}
    isDisabled={boolean('Disabled', false)}
    isSmall={boolean('Small', false)}
  >
    {text('Label', 'Hello button')}
  </Button>
);

properties.story = {
  parameters: {
    jest: ['Button.test.tsx'],
  },
};

export default {
  component: Button,
  title: 'Button',
};
