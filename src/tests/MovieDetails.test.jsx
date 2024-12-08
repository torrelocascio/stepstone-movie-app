import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MovieDetails from "../components/MovieDetails";
import axios from "axios";
import { vi } from "vitest";

// Mock Axios
vi.mock("axios");

describe("MovieDetails Component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        id: 1,
        title: "Inception",
        poster_path: "/path/to/poster.jpg",
        release_date: "2010-07-16",
        overview: "A mind-bending thriller about dream heists.",
        vote_average: 8.8,
        runtime: 148,
        genres: [
          { id: 1, name: "Sci-Fi" },
          { id: 2, name: "Action" },
        ],
      },
    });
  });

  it("renders movie details", async () => {
    render(
      <MemoryRouter initialEntries={["/movie/1"]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the text to appear
    expect(await screen.findByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("2010-07-16")).toBeInTheDocument();
    expect(
      screen.getByText("A mind-bending thriller about dream heists.")
    ).toBeInTheDocument();
  });
});
