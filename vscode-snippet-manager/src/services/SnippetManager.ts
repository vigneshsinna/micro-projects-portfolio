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

    async initialize(): Promise<void> {
        // Initialize method for async setup
        this.loadSnippets();
    }

    async getSnippet(id: string): Promise<Snippet | undefined> {
        return this.snippets.find(s => s.id === id);
    }

    async getAllSnippets(): Promise<Snippet[]> {
        return this.getSnippets();
    }

    async createSnippet(snippet: Omit<Snippet, 'id' | 'created' | 'modified'>): Promise<Snippet> {
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

    async updateSnippet(id: string, updates: Partial<Snippet>): Promise<void> {
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

    async deleteSnippet(id: string): Promise<void> {
        this.snippets = this.snippets.filter(s => s.id !== id);
        this.saveSnippets();
    }

    async searchSnippets(query: string): Promise<Snippet[]> {
        const lowerQuery = query.toLowerCase();
        return this.snippets.filter(snippet =>
            snippet.name.toLowerCase().includes(lowerQuery) ||
            snippet.description.toLowerCase().includes(lowerQuery) ||
            snippet.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    }

    async importSnippets(filePath: string): Promise<void> {
        try {
            const fs = require('fs');
            const data = fs.readFileSync(filePath, 'utf8');
            const importedSnippets: Snippet[] = JSON.parse(data);
            
            for (const snippet of importedSnippets) {
                const newSnippet: Snippet = {
                    ...snippet,
                    id: this.generateId(),
                    created: new Date(),
                    modified: new Date()
                };
                this.snippets.push(newSnippet);
            }
            
            this.saveSnippets();
        } catch (error) {
            throw new Error(`Failed to import snippets: ${error}`);
        }
    }

    async exportSnippets(filePath: string): Promise<void> {
        try {
            const fs = require('fs');
            fs.writeFileSync(filePath, JSON.stringify(this.snippets, null, 2));
        } catch (error) {
            throw new Error(`Failed to export snippets: ${error}`);
        }
    }

    async syncWithRepository(repository: string): Promise<void> {
        // Mock implementation for team sync
        // In a real implementation, this would sync with a Git repository or cloud service
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async operation
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}
