import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CourseGrid } from "@/components/cards/course-grid";
import { LessonNotes } from "@/components/lesson/lesson-notes";
import { PageFrame } from "@/components/layout/page-frame";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { coursesHref, instructorsHref } from "@/lib/routes";
import { CACHE_TAGS, sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { INSTRUCTORS_LIST_QUERY, INSTRUCTOR_BY_SLUG_QUERY } from "@/sanity/lib/queries";

async function getInstructor(slug: string) {
  return sanityFetch({
    query: INSTRUCTOR_BY_SLUG_QUERY,
    params: { slug },
    tags: [CACHE_TAGS.instructor, CACHE_TAGS.course],
  });
}

export async function generateStaticParams() {
  const instructors = await sanityFetch({
    query: INSTRUCTORS_LIST_QUERY,
    tags: [CACHE_TAGS.instructor],
  });

  return instructors
    .filter((instructor) => instructor.slug !== null)
    .map((instructor) => ({ slug: instructor.slug as string }));
}

export async function generateMetadata({
  params,
}: PageProps<"/instructors/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const instructor = await getInstructor(slug);

  if (!instructor) return {};

  return {
    title: instructor.name ?? "Instructor",
    description: instructor.expertise?.join(", ") ?? undefined,
  };
}

export default async function InstructorPage({ params }: PageProps<"/instructors/[slug]">) {
  const { slug } = await params;
  const instructor = await getInstructor(slug);

  if (!instructor) notFound();

  const courses = instructor.courses ?? [];
  const expertise = instructor.expertise ?? [];

  return (
    <PageFrame>
      <SiteHeader activeHref={coursesHref} />

      <main className="flex flex-1 flex-col px-6 pt-11 pb-16 sm:px-12 xl:px-18 xl:pb-20">
        <Breadcrumbs
          items={[
            { label: "Instructors", href: instructorsHref },
            { label: instructor.name ?? "Instructor" },
          ]}
        />

        <section className="mt-10 rounded-2xl border border-canvas-line bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {instructor.photo?.asset ? (
              <Image
                src={urlFor(instructor.photo).width(220).height(220).fit("crop").url()}
                alt={instructor.photo.alt ?? instructor.name ?? "Instructor portrait"}
                width={220}
                height={220}
                className="size-28 rounded-full object-cover shadow-sm"
              />
            ) : (
              <div className="flex size-28 items-center justify-center rounded-full bg-neutral-900 font-display text-[36px] font-bold text-white">
                {(instructor.name ?? "I").charAt(0)}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-primary-500">
                Instructor
              </p>
              <h1 className="mt-3 font-display text-[38px] leading-11 font-bold text-neutral-900">
                {instructor.name}
              </h1>

              {expertise.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {expertise.map((tag) => (
                    <span
                      key={`${instructor._id}-${tag}`}
                      className="rounded-full bg-primary-50 px-2.5 py-1 text-[11px] font-medium text-primary-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {instructor.bio && (
            <div className="mt-8 max-w-3xl">
              <LessonNotes notes={instructor.bio} />
            </div>
          )}
        </section>

        {courses.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-[30px] leading-9 font-bold text-neutral-900">
              Courses by {instructor.name}
            </h2>
            <div className="mt-8">
              <CourseGrid courses={courses} />
            </div>
          </section>
        )}
      </main>
    </PageFrame>
  );
}
