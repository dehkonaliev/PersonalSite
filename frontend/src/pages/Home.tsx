import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Skeleton from "../components/Skeleton";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { api, type HomeData } from "../lib/api";

export default function Home() {
  const [home, setHome] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .home()
      .then(setHome)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout active="Home">
      {/* Hero */}
      <section className="max-w-content mx-auto px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-24">
        {loading ? (
          <div className="max-w-3xl">
            <Skeleton className="h-4 w-48 mb-5" />
            <Skeleton className="h-10 w-full max-w-2xl mb-3" />
            <Skeleton className="h-10 w-3/4 max-w-xl mb-3" />
            <Skeleton className="h-5 w-full max-w-xl mt-8" />
            <Skeleton className="h-5 w-2/3 max-w-lg mt-2" />
          </div>
        ) : (
          <>
            {home?.job_title && (
              <p className="text-sm text-signal mb-5">{home.job_title}</p>
            )}
            {home?.heading_activity && (
              <h1 className="font-display text-4xl md:text-6xl leading-[1.1] max-w-3xl">
                {home.heading_activity}
              </h1>
            )}
            {home?.home_context && (
              <p className="mt-6 text-lg text-slate max-w-xl leading-relaxed">
                {home.home_context}
              </p>
            )}
          </>
        )}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 bg-ink text-paper text-sm px-5 py-3 hover:bg-signal transition-colors"
          >
            See my projects <ArrowUpRight size={15} />
          </Link>
          <Link
            to="/resume"
            className="inline-flex items-center gap-1.5 border border-line text-sm px-5 py-3 hover:border-ink transition-colors"
          >
            Read my resume
          </Link>
        </div>
      </section>

      {/* Focus areas */}
      {loading ? (
        <section className="max-w-content mx-auto px-6 md:px-10 py-16 border-t border-line">
          <div className="grid md:grid-cols-3 gap-10 md:gap-8 text-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="max-w-xs mx-auto space-y-3">
                <Skeleton className="h-6 w-40 mx-auto" />
                <Skeleton className="h-4 w-full mx-auto" />
                <Skeleton className="h-4 w-full mx-auto" />
                <Skeleton className="h-4 w-2/3 mx-auto" />
              </div>
            ))}
          </div>
        </section>
      ) : (
        home?.activities &&
        home.activities.length > 0 && (
          <section className="max-w-content mx-auto px-6 md:px-10 py-16 border-t border-line">
            <div className="grid md:grid-cols-3 gap-10 md:gap-8 text-center">
              {home.activities.map((area) => (
                <div key={area.title} className="max-w-xs mx-auto">
                  <h2 className="font-display text-xl mb-3">{area.title}</h2>
                  <p className="text-slate leading-relaxed text-sm">
                    {area.context}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )
      )}

      {/* Personal note */}
      {loading ? (
        <section className="max-w-content mx-auto px-6 md:px-10 py-16 border-t border-line text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <Skeleton className="h-8 w-40 mx-auto" />
            <Skeleton className="h-4 w-full mx-auto" />
            <Skeleton className="h-4 w-full mx-auto" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
          </div>
        </section>
      ) : (
        home?.off_board && (
          <section className="max-w-content mx-auto px-6 md:px-10 py-16 border-t border-line text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display text-2xl mb-4">Off the board</h2>
              <p className="text-slate leading-relaxed">{home.off_board}</p>
            </div>
          </section>
        )
      )}
    </Layout>
  );
}