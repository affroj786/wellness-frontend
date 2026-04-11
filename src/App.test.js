import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the wellness portal home page", () => {
  render(<App />);
  expect(
    screen.getByText(/Student support that looks and feels production ready/i)
  ).toBeInTheDocument();
});
