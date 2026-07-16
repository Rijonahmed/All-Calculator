import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Calculator Guides & Tips",
  description: "Read guides, tips, and tutorials about our free online calculators. Learn how to use age, BMI, currency, area, truck, mileage, and inheritance calculators.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
