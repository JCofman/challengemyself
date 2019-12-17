import { h } from 'preact';
import Heading from '../src/components/heading';
import { render } from '@testing-library/preact';
import '@testing-library/jest-dom/extend-expect';

describe('Heading', () => {
  test('Heading renders H1 Tag', () => {
    const { getByText } = render(<Heading appearance={`H1`}>Test</Heading>);

    expect(getByText('Test').textContent).toBe('Test');
  });
});
