export interface HomeTweet {
    id: string;
    text: string;
    user: TweetUser;
}

export interface Home {
    tweets: HomeTweet[];
    timeline: HomeTweet[];
}

interface TweetUser {
    id: string;
    name: string;
    handle: string;
    bio: string;
}

export interface ListedTweet {
    id: string;
    text: string;
    likes: number;
    retweets: number;
    user: TweetUser;
}

interface QuotedTweet {
    id: string;
    user: TweetUser;
}

export interface Tweet {
    id: string;
    text: string;
    likes: number;
    retweets: number;
    user: TweetUser;
    quotedTweet?: QuotedTweet;
    image?: string;
    sentOn: string;
}

export interface User {
    id: string;
    name: string;
    handle: string;
    bio: string;
    followers: number;
    following: number;
    tweets: number;
    likes: number;
    location?: string;
    url?: string;
    banner?: string;
    createdOn: string;
}