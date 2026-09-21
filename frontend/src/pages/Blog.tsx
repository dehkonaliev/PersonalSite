import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Skeleton from "../components/Skeleton";
import { ArrowUpRight } from "lucide-react";
import { api, formatDate, type Post } from "../lib/api";

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .posts()
      .then(setPosts)
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

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
        {loading && (
          <div className="py-10">
            {[0, 1, 2].map((i) => (
              <div key={i} className="py-10 border-b border-line">
                <div className="flex items-start justify-between gap-6">
                  <div className="max-w-2xl space-y-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-7 w-72" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <Skeleton className="h-5 w-5 mt-1 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && error && (
          <p className="py-10 text-slate">Could not load posts.</p>
        )}
        {!loading && !error && posts.length === 0 && (
          <p className="py-10 text-slate">No posts yet — check back soon.</p>
        )}
        {!loading && posts.map((post, i) => (
          <Link
            key={post.slug + i}
            to={`/blog/${post.slug}`}
            className="group block py-10 border-b border-line"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-sm text-slate mb-2">
                  {formatDate(post.created_at)}
                </p>
                <h2 className="font-display text-2xl mb-3 group-hover:text-signal transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate leading-relaxed">{post.summary}</p>
              </div>
              <ArrowUpRight
                size={20}
                className="mt-1 shrink-0 text-slate group-hover:text-signal transition-colors"
              />
            </div>
          </Link>
        ))}
      </section>
    </Layout>
  );
}