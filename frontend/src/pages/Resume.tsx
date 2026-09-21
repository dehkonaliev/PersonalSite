import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Skeleton from "../components/Skeleton";
import { Download, ExternalLink } from "lucide-react";
import {
  api,
  formatDate,
  type Certificate,
  type Education,
  type Experience,
  type Resume as ResumeData,
  type SkillGroup,
} from "../lib/api";

const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  });

const isPresent = (iso: string) =>
  new Date(iso).getTime() > Date.now() + 1000 * 60 * 60 * 24;

const dateRange = (from: string, to: string) =>
  `${shortDate(from)} — ${isPresent(to) ? "Present" : shortDate(to)}`;

interface TimelineEntry {
  id: number;
  dates: string;
  title: string;
  subtitle?: string;
  description?: string;
  location?: string;
  extra?: string | null;
}

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  if (entries.length === 0) return null;
  return (
    <div className="relative border-l border-line pl-8 ml-1 space-y-10">
      {entries.map((entry) => (
        <div key={entry.id} className="relative">
          <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-signal" />
          <p className="text-sm text-slate">{entry.dates}</p>
          <h3 className="font-medium mt-1">{entry.title}</h3>
          {entry.subtitle && (
            <p className="text-slate text-sm">{entry.subtitle}</p>
          )}
          {entry.location && (
            <p className="text-xs text-slate mt-0.5">{entry.location}</p>
          )}
          {entry.description && (
            <p className="text-slate text-sm mt-2 leading-relaxed">
              {entry.description}
            </p>
          )}
          {entry.extra && (
            <a
              href={entry.extra}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-signal hover:underline mt-2"
            >
              Diploma <ExternalLink size={13} />
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Resume() {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [educations, setEducations] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([
      api.resume().catch(() => null),
      api.educations().catch(() => [] as Education[]),
      api.experiences().catch(() => [] as Experience[]),
      api.skills().catch(() => [] as SkillGroup[]),
      api.certificates().catch(() => [] as Certificate[]),
    ])
      .then(([r, e, x, s, c]) => {
        if (active) {
          setResume(r);
          setEducations(e);
          setExperiences(x);
          setSkillGroups(s);
          setCertificates(c);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const experienceEntries: TimelineEntry[] = experiences.map((exp) => ({
    id: exp.id,
    dates: dateRange(exp.from_date, exp.to_date),
    title: exp.job,
    subtitle: exp.company,
    location: exp.location ?? undefined,
    description: exp.activity ?? undefined,
  }));

  const educationEntries: TimelineEntry[] = educations.map((edu) => ({
    id: edu.id,
    dates: dateRange(edu.from_date, edu.to_date),
    title: edu.field,
    subtitle: edu.edu_place,
    description: edu.what_learnt,
    extra: edu.certification,
  }));

  return (
    <Layout active="Resume">
      <section className="max-w-content mx-auto px-6 md:px-10 pt-16 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-line">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
          {/* Portrait — prefers the photo from the resume API, falls back
              to a monogram while none is set. */}
          <div className="relative shrink-0">
            <div className="absolute -inset-2 border border-signal/40" />
            <div className="relative w-32 h-32 md:w-36 md:h-36 border border-line bg-paper flex items-center justify-center overflow-hidden">
              {resume?.image ? (
                <img
                  src={resume.image}
                  alt="Maksudbek Dehqonaliyev"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-display text-3xl text-slate/50">MD</span>
              )}
            </div>
          </div>
          <div>
            <h1 className="font-display text-4xl mb-2">Resume</h1>
            {resume && (resume.location || resume.email) && (
              <p className="text-slate">
                {[resume.location, resume.email].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        </div>
        {resume?.resume_file && (
          <a
            href={resume.resume_file}
            className="inline-flex items-center gap-1.5 border border-line text-sm px-5 py-3 hover:border-ink transition-colors self-start"
          >
            <Download size={15} /> Download PDF
          </a>
        )}
      </section>

      {loading ? (
        <div className="max-w-content mx-auto px-6 md:px-10 py-12 space-y-14">
          <div className="space-y-3">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-full max-w-2xl" />
            <Skeleton className="h-4 w-full max-w-2xl" />
            <Skeleton className="h-4 w-2/3 max-w-xl" />
          </div>
          <div className="space-y-8">
            <Skeleton className="h-6 w-44" />
            {[1, 2].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-5 w-64" />
                <Skeleton className="h-4 w-full max-w-xl" />
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <Skeleton className="h-6 w-32" />
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {resume?.summary && (
            <section className="max-w-content mx-auto px-6 md:px-10 py-12 border-b border-line">
              <h2 className="font-display text-xl mb-4">Summary</h2>
              <p className="text-slate leading-relaxed max-w-2xl">
                {resume.summary}
              </p>
            </section>
          )}

          {experiences.length > 0 && (
            <section className="max-w-content mx-auto px-6 md:px-10 py-12 border-b border-line">
              <h2 className="font-display text-xl mb-6">Experience</h2>
              <Timeline entries={experienceEntries} />
            </section>
          )}

          {educations.length > 0 && (
            <section className="max-w-content mx-auto px-6 md:px-10 py-12 border-b border-line">
              <h2 className="font-display text-xl mb-6">Education</h2>
              <Timeline entries={educationEntries} />
            </section>
          )}

          {skillGroups.length > 0 && (
            <section className="max-w-content mx-auto px-6 md:px-10 py-12 border-b border-line">
              <h2 className="font-display text-xl mb-6">Skills</h2>
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
                {skillGroups.map((group) => (
                  <div key={group.name}>
                    <h3 className="text-sm text-signal mb-2">{group.name}</h3>
                    <p className="text-slate text-sm leading-relaxed">
                      {group.skills.map((skill) => skill.name).join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certificates.length > 0 && (
            <section className="max-w-content mx-auto px-6 md:px-10 py-12">
              <h2 className="font-display text-xl mb-6">Certificates</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="border border-line p-6 flex flex-col gap-3"
                  >
                    <div className="flex items-start gap-5">
                      {cert.photo_overview && (
                        <img
                          src={cert.photo_overview}
                          alt={cert.name}
                          width={100}
                          height={100}
                          className="w-[100px] h-[100px] object-cover border border-line shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="text-sm text-slate">
                          {formatDate(cert.created_at)}
                        </p>
                        <h3 className="font-medium text-lg leading-snug">
                          {cert.name}
                        </h3>
                        {cert.issued_by && (
                          <p className="text-slate text-sm">{cert.issued_by}</p>
                        )}
                      </div>
                    </div>
                    <p className="text-slate text-sm leading-relaxed">
                      {cert.what_learnt}
                    </p>
                    {cert.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {cert.technologies.map((tech) => (
                          <span
                            key={tech.id}
                            className="text-xs border border-line px-2.5 py-1 text-slate"
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap items-center gap-5 mt-auto pt-2">
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-signal hover:underline"
                        >
                          View credential <ExternalLink size={13} />
                        </a>
                      )}
                      {cert.file && (
                        <a
                          href={cert.file}
                          download
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-signal hover:underline"
                        >
                          <Download size={14} /> Download
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </Layout>
  );
}