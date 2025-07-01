import * as vscode from 'vscode';
import { SnippetManager, Snippet } from '../services/SnippetManager';

export class SnippetProvider implements vscode.TreeDataProvider<Snippet> {
    private _onDidChangeTreeData: vscode.EventEmitter<Snippet | undefined | null | void> = new vscode.EventEmitter<Snippet | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<Snippet | undefined | null | void> = this._onDidChangeTreeData.event;

    constructor(private snippetManager: SnippetManager) {}

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: Snippet): vscode.TreeItem {
        const item = new vscode.TreeItem(element.name, vscode.TreeItemCollapsibleState.None);
        item.description = element.description;
        item.tooltip = `${element.name}\n${element.description}`;
        item.contextValue = 'snippet';
        item.command = {
            command: 'snippetManager.insertSnippet',
            title: 'Insert Snippet',
            arguments: [element]
        };
        return item;
    }

    getChildren(element?: Snippet): Thenable<Snippet[]> {
        if (!element) {
            return Promise.resolve(this.snippetManager.getSnippets());
        }
        return Promise.resolve([]);
    }
}
