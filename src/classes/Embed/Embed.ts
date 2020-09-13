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
    timestamp?: string;
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
    timestamp?: string;

    // Constructor
    constructor(data: EmbedData = {}) {

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
        this.timestamp = data.timestamp;
    }

    // Set title
    setTitle = (title?: string | null): Embed => {

        // Remove title
        if ((title === undefined) || (title === null) || (title.length === 0)) {
            delete this.title;
            return this;
        }

        // Validate data
        if (title.length > 256) throw new Error("Embed titles can't be more than 256 characters");

        // Set data
        this.title = title;
        return this;
    };

    // Set author
    setAuthor = (name?: string | null, iconURL?: string, url?: string): Embed => {

        // Remove author
        if ((name === undefined) || (name === null) || (name.length === 0)) {
            delete this.author;
            return this;
        }

        // Validate data
        if (name.length > 256) throw new Error("Embed author names can't be more than 256 characters");

        // Set data
        this.author = {
            name,
            icon_url: iconURL,
            url
        };
        return this;
    };

    // Set description
    setDescription = (description?: string | null): Embed => {

        // Remove description
        if ((description === undefined) || (description === null) || (description.length === 0)) {
            delete this.description;
            return this;
        }

        // Validate data
        if (description.length > 2048) throw new Error("Embed descriptions can't be more than 2048 characters");

        // Set data
        this.description = description;
        return this;
    };

    // Set color
    setColor = (color?: string | number | null): Embed => {

        // Remove color
        if ((color === undefined) || (color === null)) {
            delete this.color;
            return this;
        }

        // Parse color
        if (typeof color === "string") color = parseInt(color, 16);

        // Set data
        this.color = color;
        return this;
    };

    // Add field
    addField = (name?: string | null, value?: string | null, inline: boolean = false): Embed => {

        // Parse data
        if ((name === undefined) || (name === null)) name = "\u200b";
        if ((value === undefined) || (value === null)) value = "\u200b";

        // Validate data
        if (name.length > 256) throw new Error("Embed field names can't be more than 256 characters");
        if (value.length > 1024) throw new Error("Embed field values can't be more than 1024 characters");

        // Set data
        this.fields.push({
            name,
            value,
            inline
        });
        return this;
    };

    // Set url
    setURL = (url?: string | null): Embed => {

        // Remove url
        if ((url === undefined) || (url === null) || (url.length === 0)) {
            delete this.url;
            return this;
        }

        // Set data
        this.url = url;
        return this;
    };

    // Set thumbnail
    setThumbnail = (thumbnail?: string | null): Embed => {

        // Remove thumbnail
        if ((thumbnail === undefined) || (thumbnail === null) || (thumbnail.length === 0)) {
            delete this.thumbnail;
            return this;
        }

        // Set data
        this.thumbnail = { url: thumbnail };
        return this;
    };

    // Set image
    setImage = (image?: string | null): Embed => {

        // Remove image
        if ((image === undefined) || (image === null) || (image.length === 0)) {
            delete this.image;
            return this;
        }

        // Set data
        this.image = { url: image };
        return this;
    };

    // Set footer
    setFooter = (text?: string | null, iconURL?: string): Embed => {

        // Remove text
        if ((text === undefined) || (text === null) || (text.length === 0)) {
            delete this.footer;
            return this;
        }

        // Validate data
        if (text.length > 2048) throw new Error("Embed footers can't be more than 2048 characters");

        // Set data
        this.footer = {
            text,
            icon_url: iconURL
        };
        return this;
    };

    // Set branding
    setBranding = (): Embed => {

        // Set footer
        this.setFooter("Eutenly.com", "https://eutenly.com/assets/avatar.png");
        return this;
    };

    // Set timestamp
    setTimestamp = (timestamp?: Date): Embed => {

        // No timestamp
        if (!timestamp) timestamp = new Date();

        // Set data
        this.timestamp = timestamp.toISOString();
        return this;
    };
}
