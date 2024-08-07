import Home from '@/app/[locale]/(landing)/page';
import { screen } from '@testing-library/react';
import { renderWithNextIntl } from '../../helpers/renderWithNextIntl';

describe('Landing Page', () => {
  it('should render title and subtitle', () => {
    renderWithNextIntl(<Home params={{ locale: 'en' }} />);

    expect(
      screen.getByText('We are the future of surveys')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'We revolutionize the way you listen to your customers with AI-based feedback and voice interface.'
      )
    ).toBeInTheDocument();
  });
});
