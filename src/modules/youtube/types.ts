interface BasicChannel {
    id: string;
    name: string;
}

export interface SearchResult {
    id: string;
    title: string;
    type: string;
    description: string;
    channel: BasicChannel;
    createdAt: string;
}

export interface Channel {
    id: string;
    name: string;
    description: string;
    subscribers: number;
    subscribersHidden: boolean;
    views: number;
    videos: number;
    avatar?: string;
    createdOn: string;
}

export interface Playlist {
    id: string;
    name: string;
    description: string;
    videos: number;
    channel: BasicChannel;
    thumbnail?: string;
    createdOn: string;
}

export interface ListedVideo {
    id: string;
    title: string;
    description: string;
    uploadedOn: string;
}

export interface Video {
    id: string;
    title: string;
    description: string;
    views: number;
    length: string;
    likes: number;
    dislikes: number;
    comments: number;
    captions: boolean;
    channel: BasicChannel;
    thumbnail?: string;
    uploadedOn: string;
}
