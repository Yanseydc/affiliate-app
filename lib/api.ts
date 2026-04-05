import { ArticleListItem, ArticleResponse, StatsResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5165";

type RawArticleListItem = ArticleListItem & {
    published?: boolean;
    isPublished?: boolean;
    status?: string;
};

type RawStatsProduct = {
    id?: string;
    productId?: string;
    title?: string;
    productTitle?: string;
    clicks?: number;
    clickCount?: number;
};

type RawStatsResponse = {
    totalClicks?: number;
    total_clicks?: number;
    topProducts?: RawStatsProduct[];
    top_products?: RawStatsProduct[];
};

export async function getArticle(slug: string): Promise<ArticleResponse | null> {
    const response = await fetch(`${API_BASE_URL}/api/articles/${slug}`, {
        next: { revalidate: 60 },
    });

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch article: ${response.status}`);
    }

    return response.json();
}

export async function getPublishedArticles(): Promise<ArticleListItem[]> {
    const response = await fetch(`${API_BASE_URL}/api/articles`, {
        next: { revalidate: 60 },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch articles: ${response.status}`);
    }

    const articles = (await response.json()) as RawArticleListItem[];

    return articles
        .filter((article) => {
            if (typeof article.published === "boolean") {
                return article.published;
            }

            if (typeof article.isPublished === "boolean") {
                return article.isPublished;
            }

            if (typeof article.status === "string") {
                return article.status.toLowerCase() === "published";
            }

            return true;
        })
        .map(({ id, title, slug, language }) => ({
            id,
            title,
            slug,
            language,
        }));
}

export async function getStats(): Promise<StatsResponse> {
    const response = await fetch(`${API_BASE_URL}/api/stats`, {
        next: { revalidate: 60 },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch stats: ${response.status}`);
    }

    const stats = (await response.json()) as RawStatsResponse;
    const topProducts = stats.topProducts ?? stats.top_products ?? [];

    return {
        totalClicks: stats.totalClicks ?? stats.total_clicks ?? 0,
        topProducts: topProducts.map((product) => ({
            id: product.id ?? product.productId ?? "",
            title: product.title ?? product.productTitle ?? "",
            clicks: product.clicks ?? product.clickCount ?? 0,
        })),
    };
}
