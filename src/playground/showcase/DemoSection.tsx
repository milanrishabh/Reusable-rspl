import type { ReactElement, ReactNode } from "react";

export interface PropRow {
  name: string;
  description: string;
}

interface DemoSectionProps {
  id: string;
  title: string;
  description?: string;
  props?: PropRow[];
  children: ReactNode;
}

export function DemoSection({
  id,
  title,
  description,
  props: propRows,
  children,
}: DemoSectionProps): ReactElement {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-b border-rspl-neutral-100 pb-10 last:border-0 dark:border-rspl-neutral-800"
    >
      <h2 className="text-lg font-semibold text-rspl-neutral-900 dark:text-white">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-rspl-neutral-600 dark:text-rspl-neutral-400">
          {description}
        </p>
      ) : null}
      {propRows && propRows.length > 0 ? (
        <dl className="mt-4 grid gap-2 text-sm">
          {propRows.map((p) => (
            <div
              key={p.name}
              className="grid grid-cols-1 gap-1 sm:grid-cols-[minmax(10rem,auto)_1fr] sm:gap-4"
            >
              <dt className="font-mono text-xs text-rspl-primary-700 dark:text-rspl-primary-400">
                {p.name}
              </dt>
              <dd className="text-rspl-neutral-600 dark:text-rspl-neutral-400">
                {p.description}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
      <div className="mt-6 rounded-lg border border-rspl-neutral-100 bg-white p-6 shadow-sm dark:border-rspl-neutral-700 dark:bg-rspl-neutral-900/40">
        {children}
      </div>
    </section>
  );
}
