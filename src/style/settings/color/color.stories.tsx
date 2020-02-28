import * as React from 'react';
import styled from 'styled-components';
import { readableColor } from 'polished';
import { color, Ramp } from './color';

const rampOrder: Ramp[] = ['lightest', 'lighter', 'light', 'dark', 'darker'];

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
  width: ${100 / rampOrder.length}vw;
  z-index: 1;

  &:focus,
  &:hover {
    outline: 0;
    transform: scale(1.1);
    width: ${(100 / rampOrder.length) * 2}vw;
    z-index: 2;
  }
`;

export const Color = (): JSX.Element => (
  <>
    <ListStyled>
      {Object.keys(color).map(c => (
        <>
          <ColorStyled
            style={{
              backgroundColor: color[c].default,
              color: readableColor(color[c].default),
              textShadow: `0 0 0.25rem ${readableColor(color[c].default, color.white.default, color.black.default)}`,
            }}
          >
            {c}
          </ColorStyled>
          <ColorRampStyled>
            {rampOrder.map(o => (
              <RampStyled
                key={`${c}.${o}`}
                style={{
                  backgroundColor: color[c][o],
                  color: readableColor(color[c][o]),
                  textShadow: `0 0 0.2rem ${readableColor(color[c][o], color.white.default, color.black.default)}`,
                }}
              >
                {o}
              </RampStyled>
            ))}
          </ColorRampStyled>
        </>
      ))}
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
