import { h } from 'preact';
import Heading from '../src/components/heading';
import { render, cleanup } from '@testing-library/preact';
import '@testing-library/jest-dom/extend-expect';

describe('Heading', () => {
  test('Heading renders with header tags Tag', () => {
    const appearances = [`H1`, `H2`, `H3`, `H4`, `H5`];

    appearances.forEach((appearance) => {
      const { getByText } = render(
        <Heading appearance={appearance}>Test</Heading>
      );
      expect(getByText('Test').textContent).toBe('Test');
      cleanup();
    });
  });
  test('should not render text when not valid appearance gets passed', () => {
    const appearance = `HFOO`;

    const { queryByText } = render(
      <Heading appearance={appearance}>Test</Heading>
    );
    expect(queryByText('Test')).toBeNull();
  });
});
