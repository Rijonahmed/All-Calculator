import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "House & Room Area Calculator – Calculate Square Feet Online",
  description: "Calculate room and house area instantly. Find square feet and square meters for rooms, apartments, and homes with our free online area calculator.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
