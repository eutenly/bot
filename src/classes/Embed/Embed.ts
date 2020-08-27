export interface EmbedData {
    title?: string;
    author?: ExtendedTextData;
    description?: string;
    color?: number;
    fields?: FieldData[];
    url?: string;
    thumbnail?: ImageEmbedData;
    image?: ImageEmbedData;
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

    // Data about the embed
    title?: string;
    author?: ExtendedTextData;
    description?: string;
    color?: number;
    fields: FieldData[];
    url?: string;
    thumbnail?: ImageEmbedData;
    image?: ImageEmbedData;
    footer?: ExtendedTextData;

    // Constructor
    constructor(data: EmbedData) {

        // Set data
        this.title = data.title;
        this.author = data.author;
        this.description = data.description;
        this.color = data.color;
        this.fields = data.fields ? data.fields.map((f: FieldData) => ({
            name: f.name || "\u200b",
            value: f.value || "\u200b",
            inline: f.inline || false
        })) : [];
        this.url = data.url;
        this.thumbnail = data.thumbnail;
        this.image = data.image;
        this.footer = data.footer;
    }

    // Set title
    setTitle = (title: string): Embed => {
        this.title = title;
        return this;
    };

    // Set author
    setAuthor = (name: string, iconURL: string, url: string): Embed => {
        this.author = {
            name,
            icon_url: iconURL,
            url
        };
        return this;
    };

    // Set description
    setDescription = (description: string): Embed => {
        this.description = description;
        return this;
    };

    // Set color
    setColor = (color: number): Embed => {
        this.color = color;
        return this;
    };

    // Add field
    addField = (name?: string | null, value?: string | null, inline: boolean = false): Embed => {
        this.fields.push({
            name: name || "\u200b",
            value: value || "\u200b",
            inline
        });
        return this;
    };

    // Set url
    setURL = (url: string): Embed => {
        this.url = url;
        return this;
    };

    // Set thumbnail
    setThumbnail = (thumbnail: string): Embed => {
        this.thumbnail = { url: thumbnail };
        return this;
    };

    // Set image
    setImage = (image: string): Embed => {
        this.image = { url: image };
        return this;
    };

    // Set footer
    setFooter = (text: string, iconURL: string): Embed => {
        this.footer = {
            text,
            icon_url: iconURL
        };
        return this;
    };
}
