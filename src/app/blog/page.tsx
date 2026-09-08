import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { PageBanner } from "@/components/ui/page-banner";
import { blogPosts } from "@/data/blog";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function BlogPage() {
  return (
    <main className="bg-white">
      <SiteNav active="blog" />

      <PageBanner
        kicker="Blog"
        title="Ideas, Updates, and Stories from AbilityX"
        description="Follow the movement as we document the people, ideas, partnerships, and insights shaping disability inclusion in Africa."
        imageAlt="Abstract AbilityX blog banner"
      />

      <section className="section-shell bg-white">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="flex min-h-[300px] flex-col rounded-[16px] border border-brand-border bg-brand-subtle p-6 shadow-card transition-shadow duration-200 hover:shadow-raised"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-red">
                  <span>{post.category}</span>
                  <span aria-hidden="true">/</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="mt-4 font-display text-[24px] font-black tracking-[-0.02em] text-brand-black">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-3 text-sm text-brand-muted">
                  {formatDate(post.date)} by {post.author}
                </p>
                <p className="mt-4 flex-1 text-[15px] leading-7 text-brand-surface">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-6 inline-flex text-sm font-semibold text-brand-red"
                >
                  Read article &rarr;
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}
