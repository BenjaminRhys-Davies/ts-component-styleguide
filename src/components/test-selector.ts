export interface TestProps {
  testId?: string;
}

export interface DataTestId {
  'data-testid'?: string;
}

const parseTestId = (tId?: string | TestProps): undefined | string =>
  typeof tId === 'object' ? tId.testId : tId;

export const testProp = (
  testId?: string | TestProps,
  decorator: (testId?: string) => undefined | string = str => str,
): TestProps => ({ testId: decorator(parseTestId(testId)) });

export const testAttribute = (
  testId?: string | TestProps,
  decorator: (testId?: string) => undefined | string = str => str,
): DataTestId => ({ 'data-testid': decorator(parseTestId(testId)) });
