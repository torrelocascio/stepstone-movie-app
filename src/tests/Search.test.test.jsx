import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App'; // Adjust this import based on your structure
import { vi } from 'vitest';
import axios from 'axios';

// Mock Axios
vi.mock('axios');

describe('Search Functionality', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        results: [
          { id: 1, title: 'Inception', poster_path: '', release_date: '2010', overview: '' },
          { id: 2, title: 'Interstellar', poster_path: '', release_date: '2014', overview: '' },
        ],
      },
    });
  });

  it('movie appears based on search text', async () => {
    render(<App />);

    // Simulate typing in the search bar
    const searchInput = screen.getByPlaceholderText(/Search for a movie.../i);
    fireEvent.change(searchInput, { target: { value: 'Inception' } });

    // Simulate clicking the search button
    const searchButton = document.getElementById('search-movies-button');
    // screen.getByTestId(/search-movies-button/i);
    fireEvent.click(searchButton);

    // Assert that the filtered result appears
    expect(await screen.findByText('Inception')).toBeInTheDocument();
    // expect(await screen.queryByText('Interstellar')).not.toBeInTheDocument();
  });
});
