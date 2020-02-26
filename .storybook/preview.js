import React from 'react';
import { createGlobalStyle } from "styled-components";
import { addDecorator } from '@storybook/react';
import { base, defaultFonts } from '../src/style/base';

const GlobalStyle = createGlobalStyle`
  ${base}
  ${defaultFonts()}
`;

addDecorator(storyFn => <><GlobalStyle />{storyFn()}</>);
