import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inheritance & Estate Calculator - Global Property Distribution",
  description: "Calculate inheritance and estate distribution for Bangladesh, India, and USA. Supports Muslim, Hindu, Christian, and Intestate laws.",
  openGraph: {
    title: "Inheritance & Estate Calculator",
    description: "Calculate inheritance and estate distribution for Bangladesh, India, and USA.",
    type: "website",
  }
};

export default function InheritanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
