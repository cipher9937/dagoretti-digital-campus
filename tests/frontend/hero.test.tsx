import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/sections/hero';

describe('HeroSection', () => {
  it('renders school name', () => {
    render(<HeroSection />);
    expect(screen.getByText('Dagoretti')).toBeInTheDocument();
    expect(screen.getByText('High School')).toBeInTheDocument();
  });
});
