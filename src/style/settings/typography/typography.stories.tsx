import * as React from 'react';
import styled from 'styled-components';
import { select } from '@storybook/addon-knobs';
import { color, space } from '@settings';
import { base, fontSize, weight } from './typography';

const ParagraphStyled = styled.p`
  background-color: ${color.electricBlue.lightest};
  border: 1px solid ${color.black.lightest};
  color: ${color.black};
  margin: ${space.default.rem};
  padding: ${space.default.rem};
`;

export const Typography = (): JSX.Element => (
  <ParagraphStyled
    style={{
      fontSize: fontSize[select('FontSize', Object.keys(fontSize), 'default')].rem,
      fontWeight: weight[select('Weight', Object.keys(weight), 'default')],
    }}
  >
    This is a block of text (with {base}px base)
  </ParagraphStyled>
);

Typography.story = {
  parameters: {
    jest: ['typography.test.ts'],
  },
};

export default {
  component: Typography,
  title: 'Settings',
};
