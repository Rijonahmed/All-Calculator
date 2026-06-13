import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | All Calculator",
  description: "Learn more about our comprehensive suite of free online calculators including age, BMI, currency, truck capacity, and area measurements.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
