import Layout from "../components/Layout";
import { ArrowUpRight } from "lucide-react";

// Swap this for a fetch to your Django endpoint, e.g. GET /api/posts/
const POSTS = [
  {
    title: "Post title",
    date: "Sept 2026",
    excerpt:
      "A short excerpt — one or two sentences that make the argument of the post, not just describe its topic.",
    slug: "#",
  },
  {
    title: "Post title",
    date: "Aug 2026",
    excerpt:
      "A short excerpt — one or two sentences that make the argument of the post, not just describe its topic.",
    slug: "#",
  },
  {
    title: "Post title",
    date: "Aug 2026",
    excerpt:
      "A short excerpt — one or two sentences that make the argument of the post, not just describe its topic.",
    slug: "#",
  },
];

export default function Blog() {
  return (
    <Layout active="Blog">
      <section className="max-w-content mx-auto px-6 md:px-10 pt-16 pb-10 border-b border-line">
        <h1 className="font-display text-4xl mb-3">Blog</h1>
        <p className="text-slate max-w-xl">
          Notes on backend engineering, the move into machine learning, and
          whatever else is worth writing down along the way.
        </p>
      </section>

      <section className="max-w-content mx-auto px-6 md:px-10">
        {POSTS.map((post, i) => (
          <a
            key={post.title + i}
            href={post.slug}
            className="group block py-10 border-b border-line"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-sm text-slate mb-2">{post.date}</p>
                <h2 className="font-display text-2xl mb-3 group-hover:text-signal transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate leading-relaxed">{post.excerpt}</p>
              </div>
              <ArrowUpRight
                size={20}
                className="mt-1 shrink-0 text-slate group-hover:text-signal transition-colors"
              />
            </div>
          </a>
        ))}
      </section>
    </Layout>
  );
}