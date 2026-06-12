import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Currency Calculator",
  description: "Check live exchange rates and convert between global currencies.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
