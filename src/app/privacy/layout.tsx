import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for All Calculator Tools. Learn how we collect, use, and protect your information.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
