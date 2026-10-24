import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseGrid } from "@/components/cards/course-grid";
import { PageFrame } from "@/components/layout/page-frame";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { pluralize } from "@/lib/format";
import { categoriesHref, coursesHref } from "@/lib/routes";
import { CACHE_TAGS, sanityFetch } from "@/sanity/lib/fetch";
import { CATEGORIES_LIST_QUERY, CATEGORY_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { COURSES_LIST_QUERY_RESULT } from "@/sanity.types";

type CategoryDetail = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  courses?: COURSES_LIST_QUERY_RESULT;
};

async function getCategory(slug: string) {
  return sanityFetch({
    query: CATEGORY_BY_SLUG_QUERY,
    params: { slug },
    tags: [CACHE_TAGS.category, CACHE_TAGS.course],
  }) as Promise<CategoryDetail | null>;
}

export async function generateStaticParams() {
  const categories = await sanityFetch({
    query: CATEGORIES_LIST_QUERY,
    tags: [CACHE_TAGS.category],
  });

  return categories
    .filter((category) => category.slug !== null)
    .map((category) => ({ slug: category.slug as string }));
}

export async function generateMetadata({
  params,
}: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) return {};

  return {
    title: category.title ?? "Category",
    description: category.description ?? undefined,
  };
}

export default async function CategoryPage({ params }: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) notFound();

  const courses = category.courses ?? [];

  return (
    <PageFrame>
      <SiteHeader activeHref={coursesHref} />

      <main className="flex flex-1 flex-col px-6 pt-11 pb-16 sm:px-12 xl:px-18 xl:pb-20">
        <Breadcrumbs
          items={[
            { label: "Categories", href: categoriesHref },
            { label: category.title ?? "Category" },
          ]}
        />

        <section className="mt-10">
          <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-primary-500">
            Category
          </p>
          <h1 className="mt-3 font-display text-[38px] leading-11 font-bold text-neutral-900">
            {category.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-7 text-neutral-600">
            {category.description ?? "Browse courses in this area."}
          </p>
          <p className="mt-4 text-sm text-neutral-500">
            {pluralize(courses.length, "course")}
          </p>
        </section>

        {courses.length > 0 && (
          <div className="mt-10">
            <CourseGrid courses={courses} />
          </div>
        )}
      </main>
    </PageFrame>
  );
}
