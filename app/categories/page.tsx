import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/layout/page-frame";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { pluralize } from "@/lib/format";
import { categoryHref, coursesHref } from "@/lib/routes";
import { CACHE_TAGS, sanityFetch } from "@/sanity/lib/fetch";
import { CATEGORIES_LIST_QUERY } from "@/sanity/lib/queries";

type CategoryListItem = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  courseCount?: number | null;
};

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse Vertex courses by topic and specialty.",
};

export default async function CategoriesPage() {
  const categories = (await sanityFetch({
    query: CATEGORIES_LIST_QUERY,
    tags: [CACHE_TAGS.category],
  })) as CategoryListItem[];

  return (
    <PageFrame>
      <SiteHeader activeHref={coursesHref} />

      <main className="flex flex-1 flex-col px-6 pt-11 pb-16 sm:px-12 xl:px-18 xl:pb-20">
        <Breadcrumbs items={[{ label: "Categories" }]} />

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1 className="font-display text-[38px] leading-11 font-bold text-neutral-900">
            Categories
          </h1>
          {categories.length > 0 && (
            <p className="text-[13px] leading-5 text-neutral-500">
              {pluralize(categories.length, "topic")}
            </p>
          )}
        </div>

        {categories.length > 0 ? (
          <ul className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <li key={category._id} className="flex min-w-0">
                <Link
                  href={categoryHref(category.slug ?? "")}
                  className="flex min-w-0 flex-1 rounded-lg border border-canvas-line bg-white p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h2 className="font-display text-[24px] leading-8 font-bold text-neutral-900">
                      {category.title}
                    </h2>
                    <p className="mt-4 text-[15px] leading-6 text-neutral-500">
                      {category.description ?? "Browse courses in this area."}
                    </p>
                    <span className="mt-6 text-sm font-medium text-primary-500">
                      {pluralize(category.courseCount ?? 0, "course")}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-[17px] leading-7 text-neutral-500">
            No categories are published yet.
          </p>
        )}
      </main>
    </PageFrame>
  );
}
