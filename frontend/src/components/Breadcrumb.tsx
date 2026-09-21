import { Link } from "react-router-dom";

interface Crumb {
  label: string;
  to?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-line">/</span>}
              {item.to && !last ? (
                <Link
                  to={item.to}
                  className="hover:text-ink transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={last ? "text-ink" : ""}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}