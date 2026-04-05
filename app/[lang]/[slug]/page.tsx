import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import TranslationSwitcher from "@/components/TranslationSwitcher";

type Props = {
    params: {
        lang: string;
        slug: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params;
    const article = await getArticle(slug);

    if (!article) {
        return {};
    }

    return {
        title: article.title,
        description: article.intro,
    };
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#0b0b0b] text-white">
            <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 space-y-12 lg:space-y-14">

                {/* 🌍 Language Switch */}
                <div className="flex justify-end pt-1">
                    <TranslationSwitcher
                        currentLanguage={article.language}
                        translations={article.translations}
                    />
                </div>

                {/* 🧠 Header */}
                <header className="max-w-3xl space-y-5">
                    <h1 className="text-4xl font-bold tracking-tight leading-tight sm:text-5xl lg:text-6xl">
                        {article.title}
                    </h1>

                    <p className="text-base leading-8 text-gray-300 sm:text-lg sm:leading-9">
                        {article.intro}
                    </p>
                </header>

                {/* 🛒 Products */}
                <section className="space-y-8">
                    {article.products.map((product) => (
                        <ProductCard
                            key={product.id}
                            articleId={article.id}
                            product={product}
                        />
                    ))}
                </section>

            </div>
        </main>
    );
}
