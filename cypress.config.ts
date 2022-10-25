import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    video: false,
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 30000,
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
