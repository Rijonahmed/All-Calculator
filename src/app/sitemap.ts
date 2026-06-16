import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://allcalculator.top' // TODO: Replace with your actual domain

  const routes = [
    '',
    '/about',
    '/age-calculator',
    '/area-calculator',
    '/bmi-calculator',
    '/currency-calculator',
    '/inheritance-calculator',
    '/mileage-calculator',
    '/standard-calculator',
    '/truck-calculator',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
