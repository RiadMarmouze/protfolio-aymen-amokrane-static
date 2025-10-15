import { Project } from "../lib/schema";
import { ContentBlockRenderer } from "../_components/ContentBlockRendrer";

export function ContentBlocks({ project }: { project: Project }) {
  return (
    <article className="mx-auto max-w-4xl">
      <header className="mb-8 space-y-3 text-center sm:text-left">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {project.generalInfos.title}
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg max-w-2xl mx-auto sm:mx-0">
          {project.generalInfos.summary}
        </p>

        <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
          {project.generalInfos.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full border-2 text-xs uppercase tracking-[0.15em] border-black "
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* Content blocks */}
      <section className="space-y-4">
        {project.contentBlocksInfos
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((b) => (
            <ContentBlockRenderer key={`${b.type}-${b.order}`} block={b} />
          ))}
      </section>

      {/* Team section at the end */}
      {project.generalInfos.teamMembers?.length > 0 && (
        <>
          <hr className="my-8 border-gray-200" />
          <section aria-labelledby="credits-title" className="space-y-4">
            <h2
              id="credits-title"
              className="uppercase tracking-widem t-8 text-2xl font-bold"
            >
              Credits
            </h2>

            <div className="space-y-2">
              {project.generalInfos.teamMembers.map((m, idx) => (
                <div
                  key={`${m.name}-${idx}`}
                  className="flex flex-col sm:flex-row sm:items-baseline"
                >
                  <span className="font-semibold text-gray-800 sm:w-1/4">
                    {m.role} :
                  </span>
                  {m.profileUrl ? (
                    <a
                      href={m.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-black transition-colors sm:ml-2"
                    >
                      {m.name}
                    </a>
                  ) : (
                    <span className="text-gray-600 sm:ml-2">{m.name}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </article>
  );
}
