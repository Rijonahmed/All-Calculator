import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Calculator",
  description: "Check your Body Mass Index (BMI) and discover your ideal healthy weight range.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
