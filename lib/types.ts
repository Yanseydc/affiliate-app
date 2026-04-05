export type ArticleTranslation = {
    language: string;
    slug: string;
};

export type ArticleListItem = {
    id: string;
    title: string;
    slug: string;
    language: string;
};

export type ArticleProduct = {
    id: string;
    title: string;
    imageUrl: string;
    affiliateUrl: string;
    price?: number | null;
    rating?: number | null;
    position: number;
    customSummary?: string | null;
};

export type ArticleResponse = {
    id: string;
    title: string;
    slug: string;
    intro: string;
    language: string;
    products: ArticleProduct[];
    translations: ArticleTranslation[];
};

export type ProductClickStat = {
    id: string;
    title: string;
    clicks: number;
};

export type StatsResponse = {
    totalClicks: number;
    topProducts: ProductClickStat[];
};
