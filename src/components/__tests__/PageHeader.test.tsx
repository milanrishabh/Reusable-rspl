import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { PageHeader } from "../PageHeader";

describe("PageHeader", () => {
  it("renders title", () => {
    render(<PageHeader title="Test Page" showUserMenu={false} />);
    expect(screen.getByText("Test Page")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <PageHeader title="Test Page" description="Page description" showUserMenu={false} />,
    );
    expect(screen.getByText("Page description")).toBeInTheDocument();
  });

  it("does not render description slot when description is omitted", () => {
    const { container } = render(<PageHeader title="Test Page" showUserMenu={false} />);
    expect(
      container.querySelector("#page-header-test-page-description"),
    ).not.toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    render(
      <PageHeader
        title="Test Page"
        actions={<button type="button">Action Button</button>}
        showUserMenu={false}
      />,
    );
    expect(screen.getByText("Action Button")).toBeInTheDocument();
  });

  it("renders leftAction when provided", () => {
    render(
      <PageHeader
        title="Test Page"
        leftAction={<span>Breadcrumb</span>}
        showUserMenu={false}
      />,
    );
    expect(screen.getByText("Breadcrumb")).toBeInTheDocument();
  });

  it("renders custom logo when logo prop is set", () => {
    render(
      <PageHeader title="Test Page" logo={<span data-testid="custom-logo">Logo</span>} showUserMenu={false} />,
    );
    expect(screen.getByTestId("custom-logo")).toBeInTheDocument();
  });

  it("renders default logo mark when logo is omitted", () => {
    render(<PageHeader title="Test Page" showUserMenu={false} />);
    expect(screen.getByText("RS")).toBeInTheDocument();
  });

  it("generates id from title", () => {
    const { container } = render(<PageHeader title="Test Page" showUserMenu={false} />);
    const header = container.querySelector("#page-header-test-page");
    expect(header).toBeInTheDocument();
  });

  it("handles title with spaces in generated id", () => {
    const { container } = render(<PageHeader title="My Test Page" showUserMenu={false} />);
    const header = container.querySelector("#page-header-my-test-page");
    expect(header).toBeInTheDocument();
  });

  it("renders sidebar toggle when onSidebarToggle is provided", () => {
    const onToggle = vi.fn();
    render(
      <PageHeader title="App" onSidebarToggle={onToggle} showUserMenu={false} />,
    );
    expect(screen.getByRole("button", { name: "Collapse sidebar" })).toBeInTheDocument();
  });

  it("calls onSidebarToggle when sidebar control is activated", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<PageHeader title="App" onSidebarToggle={onToggle} showUserMenu={false} />);
    await user.click(screen.getByRole("button", { name: "Collapse sidebar" }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("uses expand label when sidebar is collapsed", () => {
    render(
      <PageHeader
        title="App"
        onSidebarToggle={() => {}}
        sidebarCollapsed
        showUserMenu={false}
      />,
    );
    expect(screen.getByRole("button", { name: "Expand sidebar" })).toBeInTheDocument();
  });

  it("does not render user menu when showUserMenu is false", () => {
    render(<PageHeader title="Test Page" showUserMenu={false} />);
    expect(screen.queryByRole("button", { name: "Account menu" })).not.toBeInTheDocument();
  });

  it("opens account menu and lists demo items", async () => {
    const user = userEvent.setup();
    render(<PageHeader title="Test Page" showUserMenu />);
    await user.click(screen.getByRole("button", { name: "Account menu" }));
    const menu = await screen.findByRole("menu");
    expect(within(menu).getByRole("menuitem", { name: /My profile/i })).toBeInTheDocument();
    expect(within(menu).getByRole("menuitem", { name: /Settings/i })).toBeInTheDocument();
    expect(within(menu).getByRole("menuitem", { name: /Log out/i })).toBeInTheDocument();
  });

  it("applies className to root header", () => {
    const { container } = render(
      <PageHeader title="T" className="extra-class" showUserMenu={false} />,
    );
    expect(container.querySelector("header.extra-class")).toBeInTheDocument();
  });
});
