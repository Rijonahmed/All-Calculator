import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mileage Calculator - Car & Bike Fuel Efficiency",
  description: "Calculate your vehicle's mileage (km/L, MPG, L/100km), estimate trip costs, and compare fuel efficiency for cars and motorcycles.",
  keywords: "mileage calculator, fuel efficiency, mpg calculator, km/l, trip cost estimator, car mileage, bike mileage",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
