import { render, screen } from "@testing-library/react";
import Page from "../app/(main)/page";
import React, { JSX, ReactNode } from "react";

jest.mock("../components/layout/header", () => {
  return function MockHeader({ title }: { title: string }): JSX.Element {
    return <div data-testid="mock-header">{title}</div>;
  };
});

jest.mock("../components/max-width-wrapper", () => {
  return function MockMaxWidthWrapper({
    children,
  }: {
    children: ReactNode;
  }): JSX.Element {
    return <div data-testid="mock-max-width-wrapper">{children}</div>;
  };
});

jest.mock("lucide-react", () => ({
  DollarSign: (): JSX.Element => <div data-testid="mock-dollar-sign" />,
  ShoppingCart: (): JSX.Element => <div data-testid="mock-shopping-cart" />,
  TrendingUp: (): JSX.Element => <div data-testid="mock-trending-up" />,
  Users: (): JSX.Element => <div data-testid="mock-users" />,
}));

jest.mock("../components/ui/card", () => ({
  Card: ({ children }: { children: ReactNode }): JSX.Element => (
    <div data-testid="mock-card">{children}</div>
  ),
  CardHeader: ({ children }: { children: ReactNode }): JSX.Element => (
    <div data-testid="mock-card-header">{children}</div>
  ),
  CardTitle: ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }): JSX.Element => (
    <div data-testid="mock-card-title" className={className}>
      {children}
    </div>
  ),
  CardContent: ({ children }: { children: ReactNode }): JSX.Element => (
    <div data-testid="mock-card-content">{children}</div>
  ),
}));

describe("Dashboard Page", () => {
  it("renders the header with correct title", () => {
    render(<Page />);
    const header = screen.getByTestId("mock-header");
    expect(header).toHaveTextContent("Dashboard");
  });

  it("renders the welcome message", () => {
    render(<Page />);
    const welcomeMessage = screen.getByText(/hello , this is your dashboard/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  it("renders all four metric cards", () => {
    render(<Page />);

    // Check for all card titles
    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("Active Users")).toBeInTheDocument();
    expect(screen.getByText("Growth Rate")).toBeInTheDocument();

    // Check for metric values
    expect(screen.getByText("$45,231.89")).toBeInTheDocument();
    expect(screen.getByText("+573")).toBeInTheDocument();
    expect(screen.getByText("2,834")).toBeInTheDocument();
    expect(screen.getByText("+24.5%")).toBeInTheDocument();
  });

  it("renders chart section with correct title", () => {
    render(<Page />);
    expect(screen.getByText("Revenue Overview")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Chart placeholder - Import your preferred charting library"
      )
    ).toBeInTheDocument();
  });

  it("renders recent orders section with table headers", () => {
    render(<Page />);
    expect(screen.getByText("Recent Orders")).toBeInTheDocument();

    // Check for table headers
    expect(screen.getByText("Order ID")).toBeInTheDocument();
    expect(screen.getByText("Customer")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
  });

  it("renders order data with correct statuses", () => {
    render(<Page />);

    // Check for order data
    expect(screen.getByText("#12345")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("$123.45")).toBeInTheDocument();

    expect(screen.getByText("#12346")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Processing")).toBeInTheDocument();
    expect(screen.getByText("$234.56")).toBeInTheDocument();
  });
});
