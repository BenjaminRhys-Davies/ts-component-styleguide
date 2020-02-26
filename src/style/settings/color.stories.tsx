import * as React from 'react';
import styled from 'styled-components';
import { readableColor } from 'polished';
import { color, colorRamp } from './color';

const rampOrder = ['lightest', 'lighter', 'light', 'default', 'dark', 'darker'];

const ListStyled = styled.dl`
  overflow-y: hidden;
`;

const ColorRampStyled = styled.dd`
  display: flex;
`;

const ColorStyled = styled.dt`
  border-top-left-radius: 2rem;
  display: block;
  line-height: 1.4;
  overflow: hidden;
  padding: 0.5rem;
  text-align: right;
`;

const RampStyled = styled.button`
  align-items: center;
  border: 0;
  display: inline-flex;
  flex-grow: 1;
  font-size: 75%;
  height: 6rem;
  justify-content: center;
  line-height: 1.4;
  overflow: hidden;
  padding: 0.25rem 0;
  position: relative;
  text-align: center;
  transition: width 0.5s, transform 0.5s;
  width: ${100/rampOrder.length}vw;
  z-index: 1;

  &:focus, &:hover {
    outline: 0;
    transform: scale(1.1);
    width: ${100/rampOrder.length * 2}vw;
    z-index: 2;
  }
`;

export const Color = () => (
  <>
    <ListStyled>
      {Object.keys(color).map(c =>
        <>
          <ColorStyled style={{
            backgroundColor: color[c],
            color: readableColor(color[c]),
            textShadow: `0 0 0.25rem ${readableColor(color[c], color.white, color.black)}`,
          }}>
            {c}
          </ColorStyled>
          <ColorRampStyled>
            {rampOrder.map(o => (
              <RampStyled style={{
                backgroundColor: colorRamp[c][o],
                color: readableColor(colorRamp[c][o]),
                textShadow: `0 0 0.2rem ${readableColor(colorRamp[c][o], color.white, color.black)}`,
              }}>
                {o}
              </RampStyled>
            ))}
          </ColorRampStyled>
        </>
      )}
    </ListStyled>
  </>
);

Color.story = {
  parameters: {
    jest: ['color.test.ts'],
    knobs: { disabled: true },
  },
};

export default {
  component: Color,
  title: 'Settings',
};
