import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Truck Calculator",
  description: "Calculate exactly how much sand or soil your dump truck can carry.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
