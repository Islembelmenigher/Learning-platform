import type { Metadata } from "next";
import { LessonCard } from "@/components/cards/lesson-card";
import { PageFrame } from "@/components/layout/page-frame";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { pluralize } from "@/lib/format";
import { coursesHref, lessonHref } from "@/lib/routes";
import { CACHE_TAGS, sanityFetch } from "@/sanity/lib/fetch";
import { LESSONS_LIST_QUERY } from "@/sanity/lib/queries";

type LessonListItem = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  course?: {
    title?: string | null;
    slug?: string | null;
  } | null;
};

export const metadata: Metadata = {
  title: "Lessons",
  description: "Browse the lessons taught across Vertex courses.",
};

export default async function LessonsPage() {
  const lessons = (await sanityFetch({
    query: LESSONS_LIST_QUERY,
    tags: [CACHE_TAGS.lesson, CACHE_TAGS.course],
  })) as LessonListItem[];

  return (
    <PageFrame>
      <SiteHeader activeHref={coursesHref} />

      <main className="flex flex-1 flex-col px-6 pt-11 pb-16 sm:px-12 xl:px-18 xl:pb-20">
        <Breadcrumbs items={[{ label: "Lessons" }]} />

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1 className="font-display text-[38px] leading-11 font-bold text-neutral-900">
            Lessons
          </h1>
          {lessons.length > 0 && (
            <p className="text-[13px] leading-5 text-neutral-500">
              {pluralize(lessons.length, "lesson")}
            </p>
          )}
        </div>

        {lessons.length > 0 ? (
          <ul className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {lessons.map((lesson) => {
              const courseTitle = lesson.course?.title ?? "Course lesson";
              const slug = lesson.slug ?? "";

              return (
                <li key={lesson._id} className="flex min-w-0">
                  <LessonCard
                    title={lesson.title ?? "Untitled lesson"}
                    description={courseTitle ? `Part of ${courseTitle}` : "Course lesson"}
                    moduleLabel={courseTitle}
                    href={lessonHref(slug)}
                    className="flex min-w-0 flex-1"
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-8 text-[17px] leading-7 text-neutral-500">No lessons are published yet.</p>
        )}
      </main>
    </PageFrame>
  );
}
