Here's the updated README with a section for using `nvm` if installation errors occur:

---

### README for Movie Search App

---

# **Movie Search App**

A React-based, Tailwind Styled, and Vite configuration movie search application that allows users to search for movies, view details, and group search results by categories. The app integrates with [The Movie Database (TMDb) API](https://developers.themoviedb.org/) to fetch movie data.

---

## **Setup Instructions**

### Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

#### **Using `nvm` for Node Version Management**
If you encounter errors during installation or while running the app, it's likely due to an incompatible Node.js version. Use [`nvm`](https://github.com/nvm-sh/nvm) to switch to the required Node.js version.

**Steps to Use `nvm`:**
1. Check if you have `nvm` installed:
   ```bash
   nvm --version
   ```
   If not installed, follow the [nvm installation guide](https://github.com/nvm-sh/nvm#installing-and-updating).

2. Use the recommended Node.js version:
   ```bash
   nvm use
   ```
   This will use the Node.js version specified in the `.nvmrc` file in the project. If you don't have this version installed, `nvm` will prompt you to install it.

3. Verify the Node.js version:
   ```bash
   node -v
   ```

4. Retry installation:
   ```bash
   npm install
   ```

---

### **1. Clone the Repository**
```bash
git clone git@github.com:torrelocascio/stepstone-movie-app.git
cd movie-search-app
```

### **2. Install Dependencies**
Install the required dependencies using npm or yarn:
```bash
npm install
```
or
```bash
yarn install
```

### **3. Set Up Environment Variables**
Create a `.env` file in the root directory of the project and add your TMDb API key:
```env
VITE_BEARER=your_tmdb_api_bearer_token
```
Replace `your_tmdb_api_bearer_token` with your TMDb API bearer token.

### **4. Run the Development Server**
Start the application locally:
```bash
npm run dev
```
or
```bash
yarn dev
```

The app will run at `http://localhost:5173/` by default.


## **Running Tests**

### **1. Test Setup**
This app uses [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/) for testing. Ensure you have installed all dependencies (`npm install`).

### **2. Running the Tests**
To run all tests:
```bash
npm test
```
or
```bash
yarn test
```

To run tests in watch mode:
```bash
npx vitest --watch
```

### **3. Viewing Test Coverage**
To view test coverage:
```bash
npx vitest --coverage
```

---

## **What the Tests Cover**

### **1. MovieSearch Component**
- **Search Functionality**:
  - Verifies that the search input works and fetches the correct results.
  - Ensures that the results display the correct total and movies in the UI.
- **Pagination**:
  - Tests that pagination works and changes the page of results correctly.
- **Error Handling**:
  - Tests how the app behaves when the API fails to fetch results.

### **2. MovieCard Component**
- Verifies that each movie card displays:
  - Movie title.
  - Release date.
  - Overview (truncated to fit).
- Ensures the card links to the movie details page.

### **3. Grouped View by Categories**
- Tests the "View By Categories" button:
  - Groups movies by genres.
  - Displays category headings and lists movies under each category.

### **4. MovieDetails Component**
- Verifies that movie details:
  - Fetches and displays the correct information from the API.
  - Handles loading and error states appropriately.

---

## **Contributing**

If you'd like to contribute to this project:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.

---