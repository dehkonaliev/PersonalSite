import Layout from "../components/Layout";
import { Download } from "lucide-react";

const SKILLS = {
  Backend: ["Python", "Django", "Django REST Framework", "PostgreSQL"],
  Frontend: ["React", "Tailwind CSS", "HTML/CSS"],
  Tools: ["Git & GitHub", "Docker", "Postman", "Cloudflare"],
  Other: ["Telegram Bot API", "Deployment & domain management"],
};

export default function Resume() {
  return (
    <Layout active="Resume">
      <section className="max-w-content mx-auto px-6 md:px-10 pt-16 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-line">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
          {/* Portrait frame — hairline border + offset signal-colored edge,
              echoing the site's frame language. Swap the placeholder for
              a real photo: <img src="/portrait.jpg" alt="Maksudbek Dehqonaliyev" className="w-full h-full object-cover" /> */}
          <div className="relative shrink-0">
            <div className="absolute -inset-2 border border-signal/40" />
            <div className="relative w-32 h-32 md:w-36 md:h-36 border border-line bg-paper flex items-center justify-center overflow-hidden">
              {/* <img src="/portrait.jpg" alt="Maksudbek Dehqonaliyev" className="w-full h-full object-cover" /> */}
              <span className="font-display text-3xl text-slate/50">MD</span>
            </div>
          </div>
          <div>
            <h1 className="font-display text-4xl mb-2">Resume</h1>
            <p className="text-slate">Tashkent, Uzbekistan · you@example.com</p>
          </div>
        </div>
        {/* Wire this up to a static PDF in /public, or generate one server-side */}
        <a
          href="/resume.pdf"
          className="inline-flex items-center gap-1.5 border border-line text-sm px-5 py-3 hover:border-ink transition-colors self-start"
        >
          <Download size={15} /> Download PDF
        </a>
      </section>

      {/* Summary */}
      <section className="max-w-content mx-auto px-6 md:px-10 py-12 border-b border-line">
        <h2 className="font-display text-xl mb-4">Summary</h2>
        <p className="text-slate leading-relaxed max-w-2xl">
          Python backend developer with a strong mathematics foundation,
          currently completing intensive backend training at Najot Ta'lim.
          Background in road engineering gave me a habit of designing for
          load and failure modes before writing the first line — now
          applied to APIs instead of bridges. Working toward a transition
          into machine learning.
        </p>
      </section>

      {/* Education */}
      <section className="max-w-content mx-auto px-6 md:px-10 py-12 border-b border-line">
        <h2 className="font-display text-xl mb-6">Education</h2>
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1">
            <div>
              <h3 className="font-medium">Python Backend Development</h3>
              <p className="text-slate text-sm">Najot Ta'lim</p>
            </div>
            <p className="text-sm text-slate whitespace-nowrap">In progress</p>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1">
            <div>
              <h3 className="font-medium">B.Sc. in Road Engineering</h3>
              <p className="text-slate text-sm">
                Namangan Engineering-Construction Institute
              </p>
            </div>
            <p className="text-sm text-slate whitespace-nowrap">
              Graduated 2024
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-content mx-auto px-6 md:px-10 py-12 border-b border-line">
        <h2 className="font-display text-xl mb-6">Skills</h2>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
          {Object.entries(SKILLS).map(([group, items]) => (
            <div key={group}>
              <h3 className="text-sm text-signal mb-2">{group}</h3>
              <p className="text-slate text-sm leading-relaxed">
                {items.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Additional */}
      <section className="max-w-content mx-auto px-6 md:px-10 py-12">
        <h2 className="font-display text-xl mb-6">Additional</h2>
        <ul className="space-y-3 text-slate text-sm">
          <li>IELTS — Band 7 overall</li>
          <li>Chess instructor for children</li>
          <li>
            See the{" "}
            <a href="/projects" className="text-signal hover:underline">
              projects page
            </a>{" "}
            for applied work
          </li>
        </ul>
      </section>
    </Layout>
  );
}