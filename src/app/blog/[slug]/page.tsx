import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import { marked } from "marked";

export async function generateStaticParams() {
  const { getAllSlugs } = await import("@/lib/blog");
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const htmlContent = await marked(post.content);

  return (
    <div className="flex-1 bg-zinc-50 dark:bg-[#0f1525] p-4 sm:p-8 md:p-12">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          All Posts
        </Link>

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
            {post.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-zinc-400 dark:text-zinc-500 pb-6 border-b border-zinc-200 dark:border-zinc-800">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>

        {post.image && (
          <div className="mb-8 -mx-4 sm:mx-0 overflow-hidden rounded-none sm:rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <Image
              src={post.image}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-52 sm:h-72 object-cover"
              priority
            />
          </div>
        )}

        <article
          className="prose prose-zinc dark:prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-zinc-900 dark:prose-headings:text-white
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-relaxed
            prose-strong:text-zinc-800 dark:prose-strong:text-zinc-200
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-li:text-zinc-600 dark:prose-li:text-zinc-400
            prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm
            prose-table:text-sm prose-th:text-left prose-th:font-semibold prose-th:text-zinc-700 dark:prose-th:text-zinc-300
            prose-td:text-zinc-600 dark:prose-td:text-zinc-400
            [&_table]:w-full [&_table]:border-collapse
            [&_th]:border-b [&_th]:border-zinc-200 dark:[&_th]:border-zinc-700 [&_th]:py-3 [&_th]:px-3
            [&_td]:border-b [&_td]:border-zinc-100 dark:[&_td]:border-zinc-800/50 [&_td]:py-3 [&_td]:px-3
            [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
            [&_li]:mb-1
          "
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm text-center">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
            Found this helpful?
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            Try our free calculator tools — no sign-up required.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-sm hover:-translate-y-0.5 transition-transform shadow-md">
            Explore All Calculators
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-sm hover:-translate-y-0.5 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
