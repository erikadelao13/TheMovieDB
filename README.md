# Project Readme

## 1. Single Responsibility Principle (SRP)

**Definition**  
The Single Responsibility Principle states that **every module, class, or function should have exactly one reason to change**. Each unit of code should focus on a single responsibility or behavior. By confining each component to one cohesive task, I reduce coupling, simplify testing, and make future changes safer and easier.

**Purpose**  
- **Maintainability**: When a component has a single responsibility, I know precisely where to look (and what to update) if requirements evolve.  
- **Testability**: With only one concern per unit, writing focused unit tests becomes straightforward. I avoid mocking unrelated behaviors.  
- **Readability**: It’s easier for anyone (including future me) to grasp what each class or function does without wading through unrelated logic.  
- **Reusability**: A module that does one thing can be imported and reused in multiple contexts without dragging in extra code.

> **Example**:  
> - My `MovieCard` component’s sole responsibility is to display poster, title, and rating. It does **not** fetch data, manage state, or handle navigation.  
> - My `useFetchMovies` hook’s single responsibility is to call the API and return `{ data, loading, error }`—nothing more.

---

## 2. Characteristics of “Good” (Clean) Code in React & React Native

Writing clean code in a React or React Native project goes beyond formatting. It’s about architecture, naming, component structure, and state management. Below are key characteristics and why I chose a **feature‐based architecture**—which I consider outstanding—for this project.

### 2.1 Clarity & Readability

- **Descriptive Names**  
  - Components: `<MovieList />`, `<MovieDetail />`, `<Header />` instead of `<Comp1 />`, `<Comp2 />`.  
  - Variables: `selectedMovieId` vs. `id1`.

- **Concise Functions/Components**  
  - Each component or function does one thing, following SRP. If a function grows beyond ~20–30 lines, I split it.

- **Consistent Formatting**  
  - I use ESLint + Prettier to enforce consistent indentation, quotes, and trailing commas.  
  - I maintain a uniform folder structure, import ordering, and file extension conventions.

### 2.2 Modularity & Reusability

- **Split by Feature (Domain) Instead of Type**  
  - This “feature architecture” ensures that all files needed for “movies” live together. I can navigate quickly, and new developers see everything related to a feature in one place.

- **Component Splitting**  
  - **Presentational vs. Container**:  
    - *Presentational Components* (pure UI): Accept props, render JSX, and have minimal or no side effects (e.g. `<MovieCard />`, `<Header />`).  
    - *Container Components* (logic): Fetch data, manage state, and orchestrate child components (e.g. `<MovieListContainer />` that calls a hook, then passes data to `<MovieList />`).  
  - **Small, Focused Components**  
    - A component’s responsibility is to render a single “visual concern”—a row, a card, a button group.  
    - I avoid giant “page‐level” components that do API calls, state management, and complex JSX. Instead, I break them into smaller subcomponents (e.g. `<SearchBar />`, `<MovieGrid />`, `<Loader />`, `<ErrorMessage />`).

### 2.3 Feature Architecture: Why It’s Outstanding for React & React Native

1. **Encapsulation**  
   - Each feature folder—`/features/movies`, `/features/watchlist`—contains everything it needs: types, API calls, components, styles, and tests. No other feature imports internal implementation details.

2. **Ease of Onboarding**  
   - To work on “watchlist,” I open `features/watchlist` and see store logic, screens, and components immediately. There’s no hunting through a monolithic components directory.

3. **Scoped State & Context**  
   - Feature folders can define their own React Context or Zustand store. That localizes state, avoids global conflicts, and makes it easier to refactor or remove features entirely.

4. **Incremental Scaling**  
   - As the codebase grows, adding new features simply means creating a new top‐level folder under `features/`. Core dependencies (shared UI components, utilities, theme) live in `shared/`, but feature code remains isolated.

5. **Test Organization**  
   - Tests for a feature live under that feature’s folder. For example, `features/movies/__tests__/MovieList.test.tsx`. There’s no confusion about which tests cover which code.

### 2.4 State Management & Data Flow

- **Use Hooks & Context Sparingly**  
  - For data that truly needs to be global (e.g. authentication token, user preferences), I use React Context or a small store.  
  - For per‐component state (text inputs, local toggles), I rely on `useState` or `useReducer`.

- **Zustand for Local Persistence**  
  - When only a slice of state (like “watchlist”) needs to be shared and persisted, I use a lightweight Zustand store with `persist` middleware. It keeps code simple, tests easy to write, and avoids over‐engineering with Redux.

### 2.5 Side‐Effect Management

- **Encapsulate API Calls in Hooks**  
  - I create hooks (`useFetchMovies`, `useMovieDetails`) that internally call `react-query` or `fetch()`. Components don’t need to know implementation details and remain free from side effects.

- **React Query (TanStack Query)**  
  - For remote data fetching (movies, details, search results), React Query handles caching, background revalidation, loading states, and errors. This drastically reduces boilerplate and centralizes data logic.

---

## 3. Incomplete Features: Watchlist, and unit tests

Below is a concise explanation of how I would have implemented the Watchlist feature, along with brief pseudocode. I didn’t have enough time to fully build it, but this shows the exact approach I would have taken.
## 1. Dependencies

# Zustand for state management, AsyncStorage for persistence
yarn add zustand
yarn add @react-native-async-storage/async-storage

      store/
        useWatchlistStore.ts   ← Zustand store with persist
      components/
        WatchlistScreen.tsx    ← Screen to render saved watchlist

##2. Steps I Would Follow

    Create a Zustand store

        Use persist middleware to save the watchlist array in AsyncStorage.

        Expose methods:

            addToWatchlist(movie: Movie)

            removeFromWatchlist(id: number)

            isInWatchlist(id: number): boolean

    Add “Add/Remove” button in Movie Detail

        Import useWatchlistStore.

        Check if the movie’s id is already in watchlist.

        On button press, call addToWatchlist(movie) or removeFromWatchlist(id).

    Build the Watchlist screen

        Import useWatchlistStore() to get the saved array.

        If empty, show “Your watchlist is empty.”

        Otherwise, render a FlatList of saved movies, each with its poster, title, and a “Remove” button that calls removeFromWatchlist(id).

    Hook it up to navigation

        Add WatchlistScreen to the bottom‐tab navigator under the “Watchlist” tab.

# Jest and the React Native library for unit test
- I would write **unit tests** using **Jest** and **React Native Testing Library** to cover:
  - Component rendering and button interactions.
  - Custom hooks that fetch data via React Query.
- By mocking AsyncStorage and service calls, I ensure tests run quickly and deterministically.
