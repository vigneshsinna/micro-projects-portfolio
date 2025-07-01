import * as vscode from 'vscode';
import { SnippetManager, Snippet } from '../services/SnippetManager';

export class SnippetCompletionProvider implements vscode.CompletionItemProvider {
    constructor(private snippetManager: SnippetManager) {}

    provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
    ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        const snippets = this.snippetManager.getSnippets();
        const language = document.languageId;
        
        const items = snippets
            .filter(snippet => snippet.language === language || snippet.language === 'plaintext')
            .map(snippet => {
                const item = new vscode.CompletionItem(snippet.name, vscode.CompletionItemKind.Snippet);
                item.detail = snippet.description;
                item.documentation = new vscode.MarkdownString(snippet.body.join('\n'));
                item.insertText = new vscode.SnippetString(snippet.body.join('\n'));
                return item;
            });

        return items;
    }
}
