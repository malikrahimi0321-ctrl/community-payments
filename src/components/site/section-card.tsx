import { ReactNode } from "react";

export default function SectionCard({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          {subtitle && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}