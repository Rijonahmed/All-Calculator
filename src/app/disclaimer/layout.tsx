import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer for All Calculator Tools. Important information about the use and limitations of our calculators.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
