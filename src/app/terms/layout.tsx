import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for All Calculator Tools. Read our terms and conditions for using our free calculators.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
