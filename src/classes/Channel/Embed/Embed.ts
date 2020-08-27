export interface EmbedData {
    title?: string;
    description?: string;
    fields?: FieldData[];
}

export interface FieldData {
    name?: string;
    value?: string;
    inline?: boolean;
}
