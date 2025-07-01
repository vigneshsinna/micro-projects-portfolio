import * as vscode from 'vscode';

export interface Snippet {
    id: string;
    name: string;
    description: string;
    body: string[];
    language: string;
    tags: string[];
    folder?: string;
    author?: string;
    created: Date;
    modified: Date;
}

export class SnippetManager {
    private snippets: Snippet[] = [];
    private context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.loadSnippets();
    }

    private loadSnippets(): void {
        const saved = this.context.globalState.get<Snippet[]>('snippets', []);
        this.snippets = saved;
    }

    private saveSnippets(): void {
        this.context.globalState.update('snippets', this.snippets);
    }

    getSnippets(): Snippet[] {
        return this.snippets;
    }

    createSnippet(snippet: Omit<Snippet, 'id' | 'created' | 'modified'>): Snippet {
        const newSnippet: Snippet = {
            ...snippet,
            id: this.generateId(),
            created: new Date(),
            modified: new Date()
        };
        
        this.snippets.push(newSnippet);
        this.saveSnippets();
        return newSnippet;
    }

    updateSnippet(id: string, updates: Partial<Snippet>): void {
        const index = this.snippets.findIndex(s => s.id === id);
        if (index !== -1) {
            this.snippets[index] = { 
                ...this.snippets[index], 
                ...updates, 
                modified: new Date() 
            };
            this.saveSnippets();
        }
    }

    deleteSnippet(id: string): void {
        this.snippets = this.snippets.filter(s => s.id !== id);
        this.saveSnippets();
    }

    searchSnippets(query: string): Snippet[] {
        const lowerQuery = query.toLowerCase();
        return this.snippets.filter(snippet =>
            snippet.name.toLowerCase().includes(lowerQuery) ||
            snippet.description.toLowerCase().includes(lowerQuery) ||
            snippet.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}
