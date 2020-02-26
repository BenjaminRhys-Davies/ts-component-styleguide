export const testIdAttribute = 'data-testid';
export const testIdProp = 'testId';

export interface TestProps {
  [testIdProp]?: string;
}

export interface DataTestId {
  [testIdAttribute]?: string;
}

const parseTestId = (tId?: string | TestProps): undefined | string =>
  typeof tId === 'object' ? tId[testIdProp] : tId;

export const testProp = (
  testId?: string | TestProps,
  decorator: (testId?: string) => undefined | string = str => str,
): TestProps => ({ [testIdProp]: decorator(parseTestId(testId)) });

export const testAttribute = (
  testId?: string | TestProps,
  decorator: (testId?: string) => undefined | string = str => str,
): DataTestId => ({ [testIdAttribute]: decorator(parseTestId(testId)) });
