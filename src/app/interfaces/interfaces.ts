
export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface Article {
    source: Source;
    author?: string;
    title: string;
    description?: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    content?: string;
}

export interface Source {
    id?: string;
    name: string;
}

export interface Category {
    name: string;
    description: string;

}
export interface ArticlesByCategoryAndPage {
    [key: string]: {
        page: number,
        articles: Article[]
    }
}