import React from 'react';
import { withKnobs, select, boolean, text } from "@storybook/addon-knobs";
import { color, ColorName } from '../../style/settings/color';
import { Button } from '.';

export default {
  component: Button,
  title: 'Button',
  decorators: [withKnobs],
};

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
