import Layout from "../components/Layout";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

interface Project {
  slug: string;
  title: string;
  year: string;
  stack: string[];
  description: string;
  repo?: string;
  demo?: string;
}

// Replace with your real projects. Each one gets equal weight — resist
// the urge to pad this with more than you can speak to in an interview.
// `slug` will route to /projects/:slug once the detail page exists.
const PROJECTS: Project[] = [
  {
    slug: "project-one",
    title: "Project title",
    year: "2026",
    stack: ["Django REST", "PostgreSQL", "React"],
    description:
      "One or two sentences on the problem this solved and the decision you're proudest of.",
    repo: "https://github.com/dehkonaliev/test",
    demo: "",
  },
  {
    slug: "project-two",
    title: "Project title",
    year: "2025",
    stack: ["Python", "Telegram Bot API"],
    description:
      "One or two sentences on the problem this solved and the decision you're proudest of.",
    repo: "",
    demo: "",
  },
];

export default function Projects() {
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
        {PROJECTS.map((project, i) => (
          <div
            key={project.title + i}
            className="py-10 border-b border-line grid md:grid-cols-[1fr_2fr] gap-4 md:gap-10"
          >
            <div>
              <h2 className="font-display text-2xl mb-1">{project.title}</h2>
              <p className="text-sm text-slate">{project.year}</p>
            </div>

            <div>
              <p className="text-slate leading-relaxed mb-4 max-w-xl">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs border border-line px-2.5 py-1 text-slate"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <a
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 border border-line text-sm px-4 py-2 hover:border-ink transition-colors"
                >
                  View details <ArrowUpRight size={15} />
                </a>
                {project.repo && (
                  <a
                    href={project.repo}
                    className="inline-flex items-center gap-1.5 text-sm text-signal hover:underline"
                  >
                    <FaGithub size={15} /> Code
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    className="inline-flex items-center gap-1.5 text-sm text-signal hover:underline"
                  >
                    Live demo <ArrowUpRight size={15} />
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