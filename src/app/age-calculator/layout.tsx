import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator",
  description: "Calculate your exact age in years, months, days, hours, and more. Free online age calculator tool.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
