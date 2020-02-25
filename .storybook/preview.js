import React from 'react';
import { createGlobalStyle } from "styled-components";
import { addDecorator } from '@storybook/react';
import { base } from '../src/style/base';
import { fonts } from '../src/style/font';

const GlobalStyle = createGlobalStyle`
  ${base}
  ${fonts()}
`;

addDecorator(storyFn => <><GlobalStyle />{storyFn()}</>);
