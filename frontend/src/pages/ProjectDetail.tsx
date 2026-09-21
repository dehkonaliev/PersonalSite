import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";
import Skeleton from "../components/Skeleton";
import { ArrowLeft } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { api, type ProjectDetail } from "../lib/api";

const projectYear = (iso: string) => new Date(iso).getFullYear();

export default function ProjectDetailPage() {
  const { slug = "" } = useParams();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    api
      .project(slug)
      .then((project) => {
        if (active) {
          setError(false);
          setProject(project);
        }
      })
      .catch((err) => {
        console.error(err);
        if (active) {
          setProject(null);
          setError(true);
        }
      });
    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <Layout active="Projects">
      <section className="max-w-content mx-auto px-6 md:px-10 pt-12 pb-20">
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Projects", to: "/projects" },
            ...(project ? [{ label: project.title }] : []),
          ]}
        />

        {error && (
          <div className="mt-16 text-center">
            <p className="text-slate mb-4">Project not found.</p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-signal hover:underline"
            >
              <ArrowLeft size={14} /> All projects
            </Link>
          </div>
        )}

        {!error && !project && (
          <article className="mt-10 max-w-3xl">
            <Skeleton className="h-4 w-40 mb-8" />
            <Skeleton className="h-10 w-2/3 mb-3" />
            <Skeleton className="h-10 w-1/2 mb-8" />
            <Skeleton className="h-5 w-full max-w-2xl" />
            <Skeleton className="h-5 w-full max-w-2xl mt-3" />
            <Skeleton className="h-5 w-2/3 max-w-xl mt-3" />
          </article>
        )}

        {!error && project && (
          <article className="mt-10 max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl leading-[1.1] mb-3">
              {project.title}
            </h1>
            <p className="text-sm text-slate">{projectYear(project.created_at)}</p>
            <p className="text-lg text-slate leading-relaxed mt-4">
              {project.summary}
            </p>

            {project.technologies.filter(
              (tech): tech is NonNullable<typeof tech> & { name: string } =>
                typeof tech === "object" && tech !== null && "name" in tech,
            ).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {project.technologies
                  .filter(
                    (tech) =>
                      typeof tech === "object" && tech !== null && "name" in tech,
                  )
                  .map((tech) => (
                    <span
                      key={tech.name}
                      className="text-xs border border-line px-2.5 py-1 text-slate"
                    >
                      {tech.name}
                    </span>
                  ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-5 mt-6">
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
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 text-sm text-signal hover:underline"
              >
                <ArrowLeft size={14} /> All projects
              </Link>
            </div>

            {project.context && (
              <div
                className="rich-text mt-10 pt-8 border-t border-line max-w-2xl"
                dangerouslySetInnerHTML={{ __html: project.context }}
              />
            )}
          </article>
        )}
      </section>
    </Layout>
  );
}