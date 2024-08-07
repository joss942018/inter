import { render, screen } from '@testing-library/react';
import Button from '@/app/components/generic/Button';

const onClick = jest.fn();
describe('Button', () => {
  it('should render label', () => {
    render(<Button onClick={onClick} label='Welcome' />);

    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    render(<Button onClick={onClick} label='Welcome' />);

    screen.getByText('Welcome').click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
