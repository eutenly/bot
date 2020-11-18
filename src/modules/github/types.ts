export interface HomeRepo {
    name: string;
    ownerName: string;
    description: string;
}

export interface HomeNotification {
    repoName: string;
    repoOwnerName: string;
    type: string;
}

export interface Home {
    username: string;
    watchedRepos: HomeRepo[];
    starredRepos: HomeRepo[];
    notifications: HomeNotification[];
}

export interface ListedRepo {
    name: string;
    ownerName: string;
    description?: string;
    stars: number;
    forks: number;
}

export interface Repo {
    name: string;
    ownerName: string;
    description?: string;
    stars: number;
    watchers: number;
    forks: number;
    license?: string;
    language?: string;
    website?: string;
    hasIssues: boolean;
    createdOn: string;
}

export interface Languages {
    [index: string]: number;
}

export interface ListedIssue {
    title: string;
    number: number;
    text: string;
}

export interface Issue {
    title: string;
    number: number;
    text: string;
    state: string;
    user: string;
    locked: boolean;
    labels: string[];
    createdOn: string;
}

export interface ListedPR {
    title: string;
    number: number;
    text: string;
}

export interface PR {
    title: string;
    number: number;
    text: string;
    state: string;
    user: string;
    locked: boolean;
    labels: string[];
    createdOn: string;
}

export interface ListedRelease {
    id: number;
    name?: string;
    tag: string;
    text: string;
}

export interface Release {
    name: string;
    tag: string;
    text: string;
    zipball: string;
    tarball: string;
    user: string;
    createdOn: string;
}

export interface ListedFile {
    name: string;
    type: string;
    path: string;
    size: number;
}

export interface File {
    name: string;
    content: string;
    path: string;
    size: number;
}

export interface User {
    name: string;
    bio?: string;
    repos: number;
    followers: number;
    gists: number;
    location?: string;
    website?: string;
    company?: string;
    createdOn: string;
}

interface EventUser {
    id: string;
    name: string;
}

interface EventRepo {
    id: string;
    name: string;
}

export interface Event {
    type: string;
    data: any;
    user: EventUser;
    repo: EventRepo;
    timestamp: string;
}

export interface ListedGist {
    id: number;
    name: string;
    description?: string;
}

export interface Gist {
    id: number;
    description?: string;
    comments: number;
    files: string[];
    forks: number;
    createdOn: string;
}