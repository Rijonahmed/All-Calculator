import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact All Calculator Tools. Get in touch with us for questions, feedback, or support.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
