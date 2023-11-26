import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../../../components/Footer/Footer";

describe("Footer", () => {
  it("renders copyright text", () => {
    render(<Footer />);
    const copyrightElement = screen.getByText(/2023 by Yevhenii Orhanistyi/i);
    expect(copyrightElement).toBeInTheDocument();
  });

  it("renders GitHub link with correct URL", () => {
    render(<Footer />);
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/yevheniiorhanistyi",
    );
  });

  it("renders RS School link with correct URL", () => {
    render(<Footer />);
    const rsSchoolLink = screen.getByRole("link", { name: /rs.school/i });
    expect(rsSchoolLink).toBeInTheDocument();
    expect(rsSchoolLink).toHaveAttribute(
      "href",
      "https://rs.school/index.html",
    );
  });
});
