import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    // Burada React projeniz için özel bir setupFiles ve framework'ü belirtmeniz gerekir.
    devServer: {
      framework: 'react', // Hangi framework'ü kullandığımızı belirtiriz.
      bundler: 'vite',    // Hangi paketleyiciyi kullandığımızı belirtiriz (Sizin dosyalarınızda 'vite').
    },
    // Component test dosyalarının nerede olduğunu belirtiriz.
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
  },
});
