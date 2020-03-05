// Under test
import { testAttribute, testIdAttribute, testIdProp, testProp } from './selector';

type TestData = {
  args: Parameters<typeof testAttribute>;
  expected: undefined | string;
  name: string;
};

describe('Test Selector', () => {
  const testData: TestData[] = [
    {
      args: [undefined],
      expected: undefined,
      name: 'undefined',
    },
    {
      args: [undefined, t => t],
      expected: undefined,
      name: 'undefined through decorator',
    },
    {
      args: [{ testId: undefined }],
      expected: undefined,
      name: 'undefined from props',
    },
    {
      args: [{ testId: undefined }, t => t],
      expected: undefined,
      name: 'undefined from props through decorator',
    },
    {
      args: ['EXPECTED STRING'],
      expected: 'EXPECTED STRING',
      name: 'string',
    },
    {
      args: ['EXPECTED STRING', t => t],
      expected: 'EXPECTED STRING',
      name: 'from string through decorator',
    },
    {
      args: [{ testId: 'EXPECTED STRING FROM PROPS' }],
      expected: 'EXPECTED STRING FROM PROPS',
      name: 'from props',
    },
    {
      args: [{ testId: 'EXPECTED STRING FROM PROPS' }, () => 'EXPECTED STRING FROM DECORATOR'],
      expected: 'EXPECTED STRING FROM DECORATOR',
      name: 'from props through decorator',
    },
  ];

  describe('testAttribute ()', () => {
    describe('can handle', () => {
      testData.forEach(({ expected, args, name }) => {
        it(name, () => {
          expect(testAttribute(...args)).toEqual({ [testIdAttribute]: expected });
        });
      });

      describe('decorator ()', () => {
        const decorator = jest.fn();
        const decoratorResult = 'MOCKED_DECORATOR';
        const testId = 'EXPECTED CALLED WITH';
        let result: ReturnType<typeof testAttribute>;

        beforeEach(() => {
          decorator.mockImplementation(() => decoratorResult);
          decorator.mockClear();
          result = testAttribute(testId, decorator);
        });

        it('is called', () => {
          expect(decorator).toHaveBeenCalledWith(testId);
        });

        it('result is returned', () => {
          expect(result).toEqual({ [testIdAttribute]: decoratorResult });
        });
      });
    });
  });

  describe('testProp ()', () => {
    describe('can handle', () => {
      testData.forEach(({ expected, args, name }) => {
        it(name, () => {
          expect(testProp(...args)).toEqual({ [testIdProp]: expected });
        });
      });

      describe('decorator ()', () => {
        const decorator = jest.fn();
        const decoratorResult = 'MOCKED_DECORATOR';
        const testId = 'EXPECTED CALLED WITH';
        let result: ReturnType<typeof testProp>;

        beforeEach(() => {
          decorator.mockImplementation(() => decoratorResult);
          decorator.mockClear();
          result = testProp(testId, decorator);
        });

        it('is called', () => {
          expect(decorator).toHaveBeenCalledWith(testId);
        });

        it('result is returned', () => {
          expect(result).toEqual({ [testIdProp]: decoratorResult });
        });
      });
    });
  });
});
