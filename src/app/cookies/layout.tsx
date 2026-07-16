import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for All Calculator Tools. Learn about how we use cookies and similar technologies.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
