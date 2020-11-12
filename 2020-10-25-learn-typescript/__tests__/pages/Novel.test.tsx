import { render, fireEvent, screen } from '@testing-library/react';

import Novel from '@/pages/Novel/Novel.tsx';

test('novel item should not exist after deletion', () => {
  const novelName = '一号小说';
  render(<Novel />);

  expect(screen.queryByText(novelName)).toBeTruthy();

  fireEvent.click(screen.queryByText(novelName));

  expect(screen.queryByText(novelName)).toBeNull();
});
