import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Standard Calculator",
  description: "A basic calculator for quick and easy everyday math calculations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
