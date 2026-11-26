import type { MetadataRoute } from "next";

const siteUrl = "https://altra-restaurant.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/menu`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/help`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/delivery`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/accessibility`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
