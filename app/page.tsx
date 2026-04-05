import Link from "next/link";
import { getPublishedArticles } from "@/lib/api";

export default async function HomePage() {
  const articles = await getPublishedArticles();

  return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Affiliate Content Site</h1>
          <p className="text-gray-700">
            Simple MVP for bilingual affiliate articles.
          </p>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Published articles</h2>

            {articles.length === 0 ? (
              <p className="text-gray-600">No published articles found.</p>
            ) : (
              <ul className="space-y-2">
                {articles.map((article) => (
                  <li key={article.id}>
                    <Link
                        href={`/${article.language}/${article.slug}`}
                        className="block rounded-lg border px-4 py-3 hover:bg-gray-50"
                    >
                      <span className="font-medium">{article.title}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        {article.language.toUpperCase()}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
  );
}
