import * as React from 'react';
import styled from 'styled-components';
import { select } from '@storybook/addon-knobs';
import { color } from '../color';
import { space } from './space';

type Space = keyof typeof space;

interface DivProps {
  marginSpace: Space;
  paddingSpace: Space;
}

const ParaStyled = styled.div(
  ({ marginSpace, paddingSpace }: DivProps) => `
  background-color: ${color.electricBlue.lightest};
  border: 1px solid #CCC;
  margin: ${space[marginSpace].rem};
  padding: ${space[paddingSpace].rem};

  &:before,
  &:after {
    display: flex;
    align-items: center;
    padding: 0 0.125rem;
    font-size: 50%;
    position: absolute;
  }

  &:before {
    content: '${space[marginSpace].number}';
    top: 0;
    left: 70%;
    height: ${space[marginSpace].rem};
    border-left: 1px solid red;
  }

  &:after {
    content: '${space[paddingSpace].number}';
    top: ${space[marginSpace].rem};
    left: 80%;
    height: ${space[paddingSpace].rem};
    border-left: 1px solid blue;
  }

  span {
    background-color: ${color.white.default};
    display: block;
  }
`,
);

export const Space = (): JSX.Element => (
  <ParaStyled
    marginSpace={select('Margin', Object.keys(space), 'large') as Space}
    paddingSpace={select('Padding', Object.keys(space), 'default') as Space}
  >
    <span>This is a block</span>
  </ParaStyled>
);

Space.story = {
  parameters: {
    jest: ['space.test.ts'],
  },
};

export default {
  component: Space,
  title: 'Settings',
};
