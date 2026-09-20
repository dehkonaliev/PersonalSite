import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const FOCUS_AREAS = [
  {
    title: "Backend engineering",
    body: "Python, Django REST Framework, and PostgreSQL — building APIs that are simple to reason about and hard to break.",
  },
  {
    title: "Machine learning, next",
    body: "Coming from a strong math background, I'm moving from serving data to modeling it.",
  },
  {
    title: "Software for Uzbekistan",
    body: "The long-term aim: practical tools that solve real problems for people at home, not just portfolio pieces.",
  },
];

export default function Home() {
  return (
    <Layout active="Home">
      {/* Hero */}
      <section className="max-w-content mx-auto px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-24">
        <p className="text-sm text-signal mb-5">Backend developer, Tashkent</p>
        <h1 className="font-display text-4xl md:text-6xl leading-[1.1] max-w-3xl">
          I build backend systems, and I'm learning to make them think.
        </h1>
        <p className="mt-6 text-lg text-slate max-w-xl leading-relaxed">
          I'm Maksudbek — a Python backend developer from Namangan, now based
          in Tashkent. I trained as a road engineer before switching into
          software, and I'm currently deepening into Django and preparing
          for a move into machine learning.
        </p>
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
      <section className="max-w-content mx-auto px-6 md:px-10 py-16 border-t border-line">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8 text-center">
          {FOCUS_AREAS.map((area) => (
            <div key={area.title} className="max-w-xs mx-auto">
              <h2 className="font-display text-xl mb-3">{area.title}</h2>
              <p className="text-slate leading-relaxed text-sm">
                {area.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Personal note */}
      <section className="max-w-content mx-auto px-6 md:px-10 py-16 border-t border-line text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl mb-4">Off the board</h2>
          <p className="text-slate leading-relaxed">
            Outside of code, I teach chess to children — it's where I first
            got hooked on the idea that good systems are the ones with the
            fewest surprising moves. I also spend a fair amount of time on
            my English; I'm working toward Band 8+ on IELTS, currently at 7.
          </p>
        </div>
      </section>
    </Layout>
  );
}