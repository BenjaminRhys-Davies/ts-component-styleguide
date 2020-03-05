import '@testing-library/jest-dom';
import 'jest-extended';
import { configure } from '@testing-library/react';
import { testIdAttribute } from './helper/test/test-selector';

configure({ testIdAttribute });
