export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  heroImage?: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-abilityx-exists",
    title: "Why AbilityX Exists",
    excerpt:
      "AbilityX is building a practical platform for disability inclusion, innovation, leadership, and measurable change across Africa.",
    date: "2026-07-29",
    author: "AbilityX Team",
    category: "Movement",
    readTime: "3 min read",
    heroImage: "/abilityx/Extra Pictures/AbilityX-4.jpg",
    content: [
      "AbilityX exists because disability inclusion in Africa needs more than awareness. It needs infrastructure, leadership, capital, data, policy action, and platforms where persons with disabilities are positioned as builders of the future.",
      "The convening brings together innovators, policymakers, startups, civil society, donors, private sector leaders, and the disability community to move from conversation to execution.",
      "AbilityX 1.0 proved that there is demand for a more ambitious disability inclusion ecosystem. AbilityX 2.0 builds on that momentum with deeper partnerships, stronger programming, and a clearer focus on measurable outcomes.",
      "This blog will share updates, ideas, stories, and practical lessons from the AbilityX community as the movement grows.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
