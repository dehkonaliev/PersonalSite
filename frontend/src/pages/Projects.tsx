import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Skeleton from "../components/Skeleton";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { api, type Project } from "../lib/api";

const projectYear = (iso: string) => new Date(iso).getFullYear();

function techNames(techs: Project["technologies"]): string[] {
  const names: string[] = [];
  for (const tech of techs) {
    if (typeof tech === "string") {
      if (tech) names.push(tech);
    } else if (tech && typeof tech.name === "string") {
      names.push(tech.name);
    }
  }
  return names;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .projects()
      .then(setProjects)
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout active="Projects">
      <section className="max-w-content mx-auto px-6 md:px-10 pt-16 pb-10 border-b border-line">
        <h1 className="font-display text-4xl mb-3">Projects</h1>
        <p className="text-slate max-w-xl">
          A working record, not a highlight reel — things I built end to
          end, including the parts that went wrong first.
        </p>
      </section>

      <section className="max-w-content mx-auto px-6 md:px-10">
        {loading && (
          <div className="py-10">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="py-10 border-b border-line grid md:grid-cols-[1fr_2fr] gap-4 md:gap-10"
              >
                <div className="space-y-3">
                  <Skeleton className="h-7 w-44" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full max-w-xl" />
                  <Skeleton className="h-4 w-3/4 max-w-lg" />
                  <Skeleton className="h-4 w-1/2 max-w-md" />
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && error && (
          <p className="py-10 text-slate">Could not load projects.</p>
        )}
        {!loading && !error && projects.length === 0 && (
          <p className="py-10 text-slate">
            Nothing published yet — check back soon.
          </p>
        )}
        {!loading && projects.map((project, i) => (
          <div
            key={project.slug + i}
            className="py-10 border-b border-line grid md:grid-cols-[1fr_2fr] gap-4 md:gap-10"
          >
            <div>
              <h2 className="font-display text-2xl mb-1">{project.title}</h2>
              <p className="text-sm text-slate">
                {projectYear(project.created_at)}
              </p>
            </div>

            <div>
              <p className="text-slate leading-relaxed mb-4 max-w-xl">
                {project.summary}
              </p>

              {techNames(project.technologies).length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {techNames(project.technologies).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs border border-line px-2.5 py-1 text-slate"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-5">
                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 border border-line text-sm px-4 py-2 hover:border-ink transition-colors"
                >
                  View details <ArrowUpRight size={15} />
                </Link>
                {project.github_link && (
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-signal hover:underline"
                  >
                    <FaGithub size={15} /> Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </Layout>
  );
}