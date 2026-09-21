import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";
import Skeleton from "../components/Skeleton";
import { ArrowLeft } from "lucide-react";
import { api, formatDate, type PostDetail } from "../lib/api";

export default function PostDetailPage() {
  const { slug = "" } = useParams();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    api
      .post(slug)
      .then((post) => {
        if (active) {
          setError(false);
          setPost(post);
        }
      })
      .catch((err) => {
        console.error(err);
        if (active) {
          setPost(null);
          setError(true);
        }
      });
    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <Layout active="Blog">
      <section className="max-w-content mx-auto px-6 md:px-10 pt-12 pb-20">
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Blog", to: "/blog" },
            ...(post ? [{ label: post.title }] : []),
          ]}
        />

        {error && (
          <div className="mt-16 text-center">
            <p className="text-slate mb-4">Post not found.</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-signal hover:underline"
            >
              <ArrowLeft size={14} /> All posts
            </Link>
          </div>
        )}

        {!error && !post && (
          <article className="mt-10 max-w-3xl">
            <Skeleton className="h-4 w-32 mb-6" />
            <Skeleton className="h-10 w-2/3 mb-3" />
            <Skeleton className="h-4 w-40 mb-10" />
            <Skeleton className="h-5 w-full max-w-2xl" />
            <Skeleton className="h-5 w-full max-w-2xl mt-3" />
            <Skeleton className="h-5 w-full max-w-2xl mt-3" />
            <Skeleton className="h-5 w-3/4 max-w-xl mt-3" />
          </article>
        )}

        {!error && post && (
          <article className="mt-10 max-w-3xl">
            <p className="text-sm text-slate">{formatDate(post.created_at)}</p>
            <h1 className="font-display text-4xl md:text-5xl leading-[1.1] my-3">
              {post.title}
            </h1>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-signal hover:underline mb-10"
            >
              <ArrowLeft size={14} /> All posts
            </Link>
            {post.body && (
              <div
                className="rich-text max-w-2xl"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            )}
          </article>
        )}
      </section>
    </Layout>
  );
}