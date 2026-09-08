import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { blogPosts, getBlogPost } from "@/data/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Blog | AbilityX" };
  }

  return {
    title: `${post.title} | AbilityX`,
    description: post.excerpt,
  };
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function getPostUrl(slug: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://abilityx.projectenable.africa";
  return `${siteUrl.replace(/\/$/, "")}/blog/${slug}`;
}

function ShareIcon({ type }: { type: "x" | "linkedin" | "facebook" | "whatsapp" }) {
  if (type === "x") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path fill="currentColor" d="M18.24 2H21.7l-7.56 8.64L23 22h-6.94l-5.43-7.1L4.41 22H.95l8.08-9.23L.54 2h7.12l4.91 6.49L18.24 2Zm-1.21 18h1.92L6.62 3.9H4.56L17.03 20Z" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path fill="currentColor" d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.68H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
      </svg>
    );
  }

  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path fill="currentColor" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.27h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="currentColor" d="M20.52 3.49A11.78 11.78 0 0 0 12.13 0C5.57 0 .23 5.34.23 11.9c0 2.1.55 4.15 1.6 5.95L.13 24l6.3-1.65a11.9 11.9 0 0 0 5.7 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.52-8.41Zm-8.38 18.3h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.85 9.85 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 7c0 5.44-4.44 9.88-9.9 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.39-1.47a8.94 8.94 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.3.18-1.42-.08-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const postUrl = getPostUrl(post.slug);
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(post.title);
  const shareLinks = [
    {
      label: "Share on X",
      icon: "x" as const,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Share on LinkedIn",
      icon: "linkedin" as const,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Share on Facebook",
      icon: "facebook" as const,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "Share on WhatsApp",
      icon: "whatsapp" as const,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  return (
    <main className="bg-white">
      <SiteNav active="blog" />

      <article>
        <section className="relative overflow-hidden bg-brand-black pt-[108px] text-white md:pt-[128px]">
          {post.heroImage && (
            <Image
              src={post.heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-30"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/70 to-brand-black" />
          <Container className="relative px-5 pb-14 pt-16 md:px-8 md:pb-16 lg:px-20">
            <Link href="/blog" className="text-sm font-semibold text-white/70 hover:text-white">
              &larr; Back to blog
            </Link>
            <div className="mt-8 max-w-4xl">
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-brand-red">
                {post.category}
              </p>
              <h1 className="mt-4 font-display text-[34px] font-black tracking-[-0.03em] md:text-[56px]">
                {post.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 md:text-xl">
                {post.excerpt}
              </p>
              <p className="mt-6 text-sm text-white/60">
                {formatDate(post.date)} by {post.author} / {post.readTime}
              </p>
            </div>
          </Container>
        </section>

        <section className="section-shell bg-white">
          <Container>
            <div className="mx-auto max-w-3xl space-y-6 text-[18px] leading-9 text-brand-surface">
              {post.heroImage && (
                <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-[16px] bg-brand-subtle shadow-card">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
              )}
              {post.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <div className="mt-12 border-t border-brand-border pt-6">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-muted">
                  Share this post
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {shareLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-border-strong text-brand-black transition-colors hover:border-brand-red hover:bg-brand-red-soft hover:text-brand-red"
                    >
                      <ShareIcon type={link.icon} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
