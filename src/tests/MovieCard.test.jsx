import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import MovieCard from '../components/MovieCard';

describe('MovieCard Component', () => {
  const mockMovie = {
    id: 1,
    title: 'Inception',
    poster_path: '/path/to/poster.jpg',
    release_date: '2010-07-16',
    overview: 'A mind-bending thriller about dream heists.',
  };

  it('renders the movie title', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );
    expect(screen.getByText('Inception')).toBeInTheDocument();
  });

  it('renders the movie overview', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );
    expect(screen.getByText(/A mind-bending thriller/i)).toBeInTheDocument();
  });

  it('renders the release date', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );
    expect(screen.getByText('2010-07-16')).toBeInTheDocument();
  });
});
