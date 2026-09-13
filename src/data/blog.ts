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
  {
    slug: "why-we-built-abilityx",
    title: "Why We Built AbilityX: From a Forum to a Movement",
    excerpt:
      "There comes a point when you realise that the conversation you started is no longer big enough for the problem you are trying to solve.",
    date: "2026-09-10",
    author: "AbilityX Team",
    category: "Movement",
    readTime: "3 min read",
    heroImage: "/abilityx/why we built ability x.jpeg",
    content: [
      "There comes a point when you realise that the conversation you started is no longer big enough for the problem you are trying to solve.",
      "For us, that moment was the evolution from DIAL (Disability Inclusion and Leadersship) Forum to AbilityX.",

      "DIAL Forum was born from an important need: to bring people together to talk about disability inclusion, share experiences, challenge assumptions and put disability on the agenda.",

      "And it did exactly that.",
"But as the conversations grew, something became increasingly clear.",
"We didn't just need another forum. We needed a platform.",
"A platform where inclusion could move beyond conversation.",
"Because disability inclusion is not only a social issue.",
"It is an employment issue.",
"A business issue.",
"A technology issue.",
"An education issue.",
"A healthcare issue.",
"And increasingly, an economic issue.",
"We began asking ourselves harder questions.",
"What happens after the panel discussion?",
"Where does a young person with a disability go to find opportunities?",
"Where does an employer go to understand how to build a truly inclusive workplace?",
"Where does an entrepreneur with a disability find access to markets, networks, capital and customers?",
"Where do organisations that genuinely want to become more inclusive find the knowledge, partnerships and people to help them do it?",
"A single event cannot answer all of those questions.",
"A platform can.",
"That thinking became the foundation for AbilityX.",
"From conversation to connection.",
"From awareness to action.",
"From visibility to opportunity.",
"AbilityX was created to bring together the different pieces of the inclusion ecosystem, persons with disabilities, businesses, employers, policymakers, development organisations, innovators, investors, media and other stakeholders, and create a space where they can do more than talk.",
"They can connect.",
"They can collaborate.",
"They can create opportunities.",
"They can build solutions.",
"And they can challenge the systems that continue to keep millions of people at the margins of economic and social participation.",
"This evolution does not mean we are leaving the DIAL (Disability Inclusion and Leadership) Forum behind.",
"Quite the opposite.",
"DIAL Forum was the beginning. AbilityX is the expansion.",

"DIAL Forum was the beginning. AbilityX is the expansion.",
"It is our response to what we have learned, what we have seen, and what we believe is possible when the right people are brought into the same room, and given the opportunity to build together.",
"And that is why AbilityX 2026 carries a theme that captures where we believe the conversation needs to go next:",                                                                                                                                                                    


"FROM MARGINS TO MARKETS.",
"Because inclusion should not stop at being seen.",
"It should mean being hired.",
"Being funded.",
"Being a customer.",
"Being a founder.",
"Being a decision-maker.",
"Being able to create value and access the value that already exists.",
"The journey from DIAL Forum to AbilityX is therefore more than a change of name.",
"It is a change in ambition.",
"We are building for a future where persons with disabilities are not simply included in conversations about the economy.",
"They are active participants in it.",
"And we invite organisations, leaders, innovators and changemakers who share that vision to build that future with us.",
"The next chapter is AbilityX.",
"And we are only getting started.",
    
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
