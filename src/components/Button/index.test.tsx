import React from 'react'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import { testProp } from '../test-selector';
import { Button } from './';

describe('Button', () => {
  const testId = 'EXPECTED TEST ID';
  const text = 'EXPECTED LABEL';
  let result: RenderResult;

  describe('should', () => {
    describe('have', () => {
      beforeEach(() => {
        result = render(<Button>{text}</Button>);
      });

      it('text', () => {
        expect(result.queryByText(text)).not.toBeNull();
      });
    });

    describe('not', () => {
      beforeEach(() => {
        result = render(<Button {...testProp(testId)}>{text}</Button>);
      });

      it('be busy', () => {
        expect(result.getByTestId(testId)['aria-busy']).toBeUndefined();
      });

      it('be disabled', () => {
        expect(result.getByTestId(testId)['aria-disabled']).toBeUndefined();
      });
    });
  });

  describe('can', () => {
    describe('have', () => {
      const testId = 'EXPETED TEST ID';

      beforeAll(() => {
        result = render(
          <Button {...testProp(testId)}>{text}</Button>
        );
      });

      it('testId', () => {
        expect(result.getByTestId(testId)).not.toBeNull();
      });
    });
    describe('be', () => {
      let onClick: jest.Mock<unknown>;

      beforeAll(() => {
        onClick = jest.fn();
      });

      afterEach(() => {
        onClick.mockClear();
      });

      it('clicked', () => {
        result = render(
          <Button {...testProp(testId)} onClick={onClick}>{text}</Button>
        );
        fireEvent.click(result.getByTestId(testId));
        expect(onClick).toHaveBeenCalled();
      });
    });

    describe('be', () => {
      it('busy', () => {
        result = render(
          <Button {...testProp(testId)} isBusy={true}>{text}</Button>
        );
        expect(result.getByTestId(testId)).toHaveAttribute('aria-busy', 'true');
      });

      it('disabled', () => {
        result = render(
          <Button {...testProp(testId)} isDisabled={true}>{text}</Button>
        );
        expect(result.getByTestId(testId)).toHaveAttribute('aria-disabled', 'true');
      });
    });
  });
});
