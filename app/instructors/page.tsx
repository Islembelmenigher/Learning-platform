import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageFrame } from "@/components/layout/page-frame";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { pluralize } from "@/lib/format";
import { coursesHref, instructorHref } from "@/lib/routes";
import { CACHE_TAGS, sanityFetch } from "@/sanity/lib/fetch";
import { INSTRUCTORS_LIST_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Instructors",
  description: "Meet the instructors behind Vertex's courses.",
};

export default async function InstructorsPage() {
  const instructors = await sanityFetch({
    query: INSTRUCTORS_LIST_QUERY,
    tags: [CACHE_TAGS.instructor],
  });

  return (
    <PageFrame>
      <SiteHeader activeHref={coursesHref} />

      <main className="flex flex-1 flex-col px-6 pt-11 pb-16 sm:px-12 xl:px-18 xl:pb-20">
        <Breadcrumbs items={[{ label: "Instructors" }]} />

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1 className="font-display text-[38px] leading-11 font-bold text-neutral-900">
            Instructors
          </h1>
          {instructors.length > 0 && (
            <p className="text-[13px] leading-5 text-neutral-500">
              {pluralize(instructors.length, "instructor")}
            </p>
          )}
        </div>

        {instructors.length > 0 ? (
          <ul className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {instructors.map((instructor) => {
              const slug = instructor.slug ?? "";
              const expertise = instructor.expertise ?? [];
              const photo = instructor.photo?.asset ? (
                <Image
                  src={urlFor(instructor.photo).width(220).height(220).fit("crop").url()}
                  alt={instructor.photo.alt ?? instructor.name ?? "Instructor portrait"}
                  width={220}
                  height={220}
                  className="size-16 rounded-full object-cover"
                />
              ) : (
                <div className="flex size-16 items-center justify-center rounded-full bg-neutral-900 font-display text-[22px] font-bold text-white">
                  {(instructor.name ?? "I").charAt(0)}
                </div>
              );

              return (
                <li key={instructor._id} className="flex min-w-0">
                  <Link
                    href={instructorHref(slug)}
                    className="flex min-w-0 flex-1 rounded-lg border border-canvas-line bg-white p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  >
                    <div className="flex w-full items-start gap-4">
                      {photo}

                      <div className="min-w-0 flex-1">
                        <h2 className="font-display text-[24px] leading-8 font-bold text-neutral-900">
                          {instructor.name}
                        </h2>
                        <p className="mt-2 text-sm text-neutral-500">
                          {pluralize(instructor.courseCount ?? 0, "course")}
                        </p>

                        {expertise.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {expertise.slice(0, 3).map((tag) => (
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
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-8 text-[17px] leading-7 text-neutral-500">No instructors are published yet.</p>
        )}
      </main>
    </PageFrame>
  );
}
