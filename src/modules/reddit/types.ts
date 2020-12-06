export interface BasicPost {
    id: string;
    title: string;
    subredditName: string;
    score: number;
}

export interface Home {
    name: string;
    totalKarma: number;
    postKarma: number;
    commentKarma: number;
    awardeeKarma: number;
    awarderKarma: number;
    posts: BasicPost[];
    feed: BasicPost[];
}

export interface ListedPost {
    id: string;
    title: string;
    text: string;
    subredditName: string;
    score: number;
    comments: number;
    awards: number;
    nsfw: boolean;
    spoiler: boolean;
    user: string;
}

export interface Post {
    id: string;
    title: string;
    text: string;
    subredditName: string;
    score: number;
    comments: number;
    awards: number;
    nsfw: boolean;
    spoiler: boolean;
    linkPath: string;
    user: string;
    image?: string;
    postedAt: number;
}

export interface Subreddit {
    name: string;
    description: string;
    subscribers: number;
    onlineUsers: number;
    nsfw: boolean;
    hotPosts: BasicPost[];
    createdAt: number;
}

export interface User {
    name: string;
    bio: string;
    hasPremium: boolean;
    totalKarma: number;
    postKarma: number;
    commentKarma: number;
    awardeeKarma: number;
    awarderKarma: number;
    posts: BasicPost[];
    createdAt: number;
}