# saras-finance
# DocSearch - Vue.js Search Compnoent

A premium, modular search tool built with **Vue.js 3** and **Vite**. This project demonstrates component-based architecture, proper state management, and smooth user interactions.

## Features
- **Real-time Search**: Debounced input fetching results dynamically.
- **Mock API Simulation**: Uses **Postman Echo** to simulate network latency, while strictly filtering a local dataset to provide meaningful results.
- **Interactive UI**: Expandable results with smooth CSS/Vue transitions.
- **Modular Components**: Clean separation of concerns (`SearchBar`, `SearchResultList`, `SearchResultItem`).
- **Responsive Design**: Mobile-first approach using native CSS variables.
- **Feedback States**: Visual loading indicators and empty states.

## Setup Instructions

1. **Prerequisites**: Node.js installed (v16+ recommended).
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run Development Server**:
   ```bash
   npm run dev
   ```
4. **Build for Production**:
   ```bash
   npm run build
   ```

## Architecture Decisions
- **Service Layer**: All API logic is encapsulated in `src/services/searchService.js`.
  - **Proxy**: A Vite proxy (`/api/mock` -> `https://postman-echo.com`) is configured to avoid CORS issues during effective development and testing.
  - **Data Merging**: The service calls Postman Echo to simulate network latency, then filters a rich local dataset to populate the UI. This satisfies the requirement for "rich attributes" (title, snippet) which Postman Echo alone cannot provide.
- **Component Design**:
  - `SearchBar`: Handles input with 300ms debounce and full 2-way binding support.
  - `SearchResultList`: Manages list layout and transition groups.
  - `SearchResultItem`: Self-contained component managing its active/expanded state.
- **Styling**: Uses CSS Variables for theming and scoped styles.

## Scaling & Performance Strategy
To scale this solution for a large production application (e.g., millions of records), I would implement the following:

### 1. Performance Optimization
- **Virtual Scrolling**: Instead of rendering all results, use `vue-virtual-scroller` to render only items in the viewport. This is critical for lists > 100 items.
- **Server-Side Pagination/Cursor**: Implement an "Infinite Scroll" or "Load More" button to fetch data in chunks (e.g., 20 items at a time) rather than fetching all matches.
- **Caching**: Use **TanStack Query (Vue Query)** or **Pinia** to cache search results. If a user types "Vue" then "Vue.js" and back to "Vue", the data should be instant without a network request.

### 2. Robust API Handling
- **AbortController**: Cancel pending API requests if the user keeps typing. Currently, we debounce, but a slow network could still lead to race conditions (though usually handled by taking the latest). AbortController guarantees only the latest request processes.
- **Error Boundaries**: Implement global error handling to show toast notifications or fallback UI when the API fails.

### 3. Advanced Features
- **Keyboard Navigation**: Implement `ArrowUp/Down` to select results and `Enter` to expand/visit.
- **Deep Linking**: Sync the search query with the URL (e.g., `?q=vue`) so users can share search results.

## Project Structure
```
src/
├── components/        # Reusable UI components
├── services/          # API handling (Mocked)
├── App.vue            # Main layout
├── style.css          # Global styles & variables
└── main.ts            # Entry point
```
