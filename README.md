# Portfolio

### Description

This is a professional portfolio built with Angular, focused on modern frontend, best practices, and performance. The project showcases professional experience, favorite technologies, development approach, and allows direct contact.

- **Developer:** Claudio Ríos
- **Focus:** Frontend development, modern UI, clean and scalable code.
- **Main stack:** Angular, TypeScript, RxJS, Docker.
- **Features:** 
  - Modern animations and visual effects.
  - Scalable architecture and reusable components.
  - Light/Dark theme support.
  - Custom preloading and performance strategies.
  - Unit testing with Jest.
  - Accessibility and CSS good practices.

### Component Architecture

The project uses a **mix of Container/Presentational (Smart/Dumb) pattern and layered architecture**:

- **Container components:** Handle business logic, state, and orchestrate presentational components. E.g., `HomeComponent`, `ExperienceComponent`, `ContactComponent`.
- **Presentational components:** Focus only on UI, receive data via inputs and emit events via outputs. E.g., `HeroComponent`, `ButtonComponent`, `ProfileImageComponent`.
- **Shared layer (`shared/`):** Reusable components, layouts, and utilities.
- **Core layer (`core/`):** Global services, models, and strategies.
- **Lazy loading:** Routes load components lazily, reinforcing modularity.

**Advantages:**
- Scalability and maintainability.
- Component reusability.
- Improved testability.

### Project Structure

```
src/
  app/
    core/           # Core services, models, and strategies
    features/       # Feature modules (home, experience, blog, contact, 404)
    shared/         # Reusable UI components and layouts (UI, header, footer, animations)
    testing/        # Utilities and mocks for testing
  public/           # Images, icons, and static assets
  styles/           # Global SCSS and utilities
```

### Best Practices & Architecture

- **Standalone Components:** Modularity and lazy loading.
- **Signals & Reactivity:** Efficient local state.
- **Dependency Injection:** Decoupled, global services.
- **Custom Preloading:** Network idle-based strategy.
- **Accessibility:** ARIA, theme and animation adaptation.
- **Testing:** Unit tests with Jest and custom mocks.
- **Conventions:** Modular SCSS, domain-based structure, strict TypeScript, and path aliases.

### Installation & Usage

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
   Visit `http://localhost:4200/`.

3. Run unit tests:
   ```bash
   npm test
   ```

4. Linting:
   ```bash
   npm run lint
   ```

5. Build for production:
   ```bash
   npm run build
   ```

### Useful Scripts

- `npm start` — Development server.
- `npm test` — Unit tests with Jest.
- `npm run lint` — Linting with ESLint.
- `npm run build` — Optimized production build.
- `npm run prerender` — Pre-rendering for SSR.

### Resources & References

- [Angular CLI](https://angular.dev/tools/cli)
- [Jest](https://jestjs.io/)
- [RxJS](https://rxjs.dev/)
