export interface Snippet {
    id: string;
    name: string;
    description: string;
    language: string;
    body: string[];
    tags: string[];
    folder: string;
    created: Date;
    modified: Date;
}

export interface SnippetFolder {
    name: string;
    snippets: Snippet[];
}

export type CreateSnippetInput = Omit<Snippet, 'id' | 'created' | 'modified'>;
export type UpdateSnippetInput = Partial<Omit<Snippet, 'id' | 'created'>>;
