export interface EmbedData {
    title?: string;
    description?: string;
    fields?: FieldData[];
    color?: string;
    author?: ExtendedTextData;
    url?: string;
    image?: ImageEmbedData;
    thumbnail?: ImageEmbedData;
    footer?: ExtendedTextData;
}

export interface FieldData {
    name?: string;
    value?: string;
    inline?: boolean;
}

export interface ExtendedTextData {
    name?: string;
    text?: string;
    url?: string;
    icon_url?: string;
}

export interface ImageEmbedData {
    url?: string;
}

export default class Embed {
    title?: string;
    description?: string;
    fields?: FieldData[];
    color?: string;
    author?: ExtendedTextData;
    url?: string;
    image?: ImageEmbedData;
    thumbnail?: ImageEmbedData;
    footer?: ExtendedTextData;

    constructor(data: EmbedData) {
        this.title = data.title;
        this.description = data.description;
        this.fields = data.fields;
        this.color = data.color;
        this.author = data.author;
        this.url = data.url;
        this.image = data.image;
        this.thumbnail = data.thumbnail;
        this.footer = data.footer;
    }
}
