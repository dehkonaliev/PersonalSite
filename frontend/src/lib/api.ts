const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`GET ${path} failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

async function getPaginated<T>(path: string): Promise<T[]> {
  const data = await getJson<Paginated<T>>(path);
  return data.results;
}

export interface Activity {
  title: string;
  context: string;
}

export interface HomeData {
  first_name: string;
  last_name: string;
  job_title: string;
  heading_activity: string;
  home_context: string;
  off_board: string;
  photo: string | null;
  activities: Activity[];
}

export interface Education {
  id: number;
  field: string;
  edu_place: string;
  from_date: string;
  to_date: string;
  what_learnt: string;
  certification: string | null;
}

export interface Experience {
  id: number;
  job: string;
  company: string;
  activity: string | null;
  from_date: string;
  to_date: string;
  location: string | null;
}

export interface Resume {
  location: string;
  summary: string;
  email: string;
  resume_file: string | null;
  website_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  telegram_url: string | null;
  image: string | null;
}

export interface SkillGroup {
  name: string;
  skills: { name: string }[];
}

export interface Technology {
  id: number;
  name: string;
}

export interface Certificate {
  id: number;
  name: string;
  issued_by: string | null;
  what_learnt: string;
  created_at: string;
  link: string | null;
  file: string | null;
  photo_overview: string | null;
  technologies: Technology[];
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  technologies: string[] | Technology[];
  github_link: string | null;
  created_at: string;
}

export interface ProjectDetail extends Project {
  context: string;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  summary: string;
  created_at: string;
}

export interface PostDetail extends Post {
  is_published: boolean;
  body: string;
}

export const api = {
  home: () => getJson<HomeData>("/main/homedata"),
  resume: () => getJson<Resume>("/main/resume/"),
  educations: () => getPaginated<Education>("/main/educations/"),
  experiences: () => getPaginated<Experience>("/main/experiences/"),
  skills: () => getPaginated<SkillGroup>("/main/skills/"),
  certificates: () => getPaginated<Certificate>("/main/certificates/"),
  projects: () => getPaginated<Project>("/projects/"),
  project: (slug: string) => getJson<ProjectDetail>(`/projects/${slug}/`),
  posts: () => getPaginated<Post>("/posts/"),
  post: (slug: string) => getJson<PostDetail>(`/posts/${slug}/`),
};

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}