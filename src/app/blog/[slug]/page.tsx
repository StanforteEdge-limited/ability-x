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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

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
            </div>
          </Container>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
