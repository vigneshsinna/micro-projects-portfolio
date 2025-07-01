import * as vscode from 'vscode';
import { SnippetProvider } from './providers/SnippetProvider';
import { SnippetManager } from './services/SnippetManager';
// import { SnippetCompletionProvider } from './providers/CompletionProvider';

let snippetManager: SnippetManager;
let snippetProvider: SnippetProvider;

export function activate(context: vscode.ExtensionContext) {
    console.log('Snippet Manager extension is now active!');

    // Initialize services
    snippetManager = new SnippetManager(context);
    snippetProvider = new SnippetProvider(snippetManager);

    // Register tree data provider
    vscode.window.createTreeView('snippetManager.snippetsView', {
        treeDataProvider: snippetProvider,
        showCollapseAll: true
    });

    // Register completion provider for all languages
    // const completionProvider = new SnippetCompletionProvider(snippetManager);
    // vscode.languages.registerCompletionItemProvider(
    //     { scheme: 'file' },
    //     completionProvider,
    //     '.'
    // );

    // Register commands
    const commands = [
        vscode.commands.registerCommand('snippetManager.openPanel', () => {
            SnippetManagerPanel.createOrShow(context.extensionUri, snippetManager);
        }),

        vscode.commands.registerCommand('snippetManager.createSnippet', async () => {
            await createNewSnippet();
        }),

        vscode.commands.registerCommand('snippetManager.insertSnippet', async (snippetId?: string) => {
            await insertSnippet(snippetId);
        }),

        vscode.commands.registerCommand('snippetManager.searchSnippets', async () => {
            await searchSnippets();
        }),

        vscode.commands.registerCommand('snippetManager.editSnippet', async (snippetId: string) => {
            await editSnippet(snippetId);
        }),

        vscode.commands.registerCommand('snippetManager.deleteSnippet', async (snippetId: string) => {
            await deleteSnippet(snippetId);
        }),

        vscode.commands.registerCommand('snippetManager.duplicateSnippet', async (snippetId: string) => {
            await duplicateSnippet(snippetId);
        }),

        vscode.commands.registerCommand('snippetManager.importSnippets', async () => {
            await importSnippets();
        }),

        vscode.commands.registerCommand('snippetManager.exportSnippets', async () => {
            await exportSnippets();
        }),

        vscode.commands.registerCommand('snippetManager.syncWithTeam', async () => {
            await syncWithTeam();
        })
    ];

    context.subscriptions.push(...commands);

    // Initialize snippet manager
    snippetManager.initialize();
}

async function createNewSnippet() {
    const editor = vscode.window.activeTextEditor;
    const selectedText = editor?.document.getText(editor.selection);
    
    const name = await vscode.window.showInputBox({
        prompt: 'Enter snippet name',
        validateInput: (value) => {
            if (!value || value.trim().length === 0) {
                return 'Snippet name is required';
            }
            return null;
        }
    });

    if (!name) return;

    const description = await vscode.window.showInputBox({
        prompt: 'Enter snippet description (optional)',
    });

    const language = await vscode.window.showQuickPick(
        getLanguageOptions(),
        { 
            placeHolder: 'Select language',
            matchOnDescription: true
        }
    );

    if (!language) return;

    const snippet = {
        name: name.trim(),
        description: description || '',
        language: language.id,
        body: selectedText ? selectedText.split('\n') : [''],
        tags: [],
        folder: 'Default'
    };

    try {
        await snippetManager.createSnippet(snippet);
        snippetProvider.refresh();
        vscode.window.showInformationMessage(`Snippet "${name}" created successfully!`);
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to create snippet: ${error}`);
    }
}

async function insertSnippet(snippetId?: string) {
    if (!snippetId) {
        const snippets = await snippetManager.getSnippets();
        const items = snippets.map((snippet: any) => ({
            label: snippet.name,
            description: snippet.description,
            detail: `${snippet.language} | ${snippet.folder}`,
            snippetData: snippet
        }));

        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select snippet to insert',
            matchOnDescription: true
        });

        if (!selected) return;
        snippetId = selected.snippetData.id;
    }

    if (!snippetId) {
        vscode.window.showWarningMessage('No snippet selected');
        return;
    }

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('No active editor found');
        return;
    }

    try {
        const snippet = await snippetManager.getSnippet(snippetId);
        if (!snippet) {
            vscode.window.showErrorMessage('Snippet not found');
            return;
        }

        const snippetString = new vscode.SnippetString(snippet.body.join('\n'));
        await editor.insertSnippet(snippetString);
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to insert snippet: ${error}`);
    }
}

async function searchSnippets() {
    const query = await vscode.window.showInputBox({
        prompt: 'Enter search query',
        placeHolder: 'Search snippets by name, description, or tags...'
    });

    if (!query) return;

    try {
        const results = await snippetManager.searchSnippets(query);
        const items = results.map((snippet: any) => ({
            label: snippet.name,
            description: snippet.description,
            detail: `${snippet.language} | ${snippet.folder}`,
            snippetData: snippet
        }));

        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: `Found ${results.length} snippets`,
            matchOnDescription: true
        });

        if (selected) {
            await insertSnippet(selected.snippetData.id);
        }
    } catch (error) {
        vscode.window.showErrorMessage(`Search failed: ${error}`);
    }
}

async function editSnippet(snippetId: string) {
    try {
        const snippet = await snippetManager.getSnippet(snippetId);
        if (!snippet) {
            vscode.window.showErrorMessage('Snippet not found');
            return;
        }

        // Open snippet in editor for editing
        const doc = await vscode.workspace.openTextDocument({
            content: snippet.body.join('\n'),
            language: snippet.language
        });

        await vscode.window.showTextDocument(doc);
        
        // Save changes back to snippet (simplified implementation)
        vscode.workspace.onDidSaveTextDocument(async (savedDoc) => {
            if (savedDoc === doc) {
                const updatedBody = savedDoc.getText().split('\n');
                await snippetManager.updateSnippet(snippetId, { body: updatedBody });
                snippetProvider.refresh();
            }
        });
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to edit snippet: ${error}`);
    }
}

async function deleteSnippet(snippetId: string) {
    const snippet = await snippetManager.getSnippet(snippetId);
    if (!snippet) return;

    const confirmed = await vscode.window.showWarningMessage(
        `Are you sure you want to delete "${snippet.name}"?`,
        { modal: true },
        'Delete'
    );

    if (confirmed === 'Delete') {
        try {
            await snippetManager.deleteSnippet(snippetId);
            snippetProvider.refresh();
            vscode.window.showInformationMessage(`Snippet "${snippet.name}" deleted`);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to delete snippet: ${error}`);
        }
    }
}

async function duplicateSnippet(snippetId: string) {
    try {
        const original = await snippetManager.getSnippet(snippetId);
        if (!original) return;

        const copy = {
            ...original,
            name: `${original.name} (Copy)`,
            id: undefined
        };

        await snippetManager.createSnippet(copy);
        snippetProvider.refresh();
        vscode.window.showInformationMessage(`Snippet duplicated as "${copy.name}"`);
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to duplicate snippet: ${error}`);
    }
}

async function importSnippets() {
    const options: vscode.OpenDialogOptions = {
        canSelectMany: false,
        openLabel: 'Import',
        filters: {
            'JSON files': ['json'],
            'All files': ['*']
        }
    };

    const fileUri = await vscode.window.showOpenDialog(options);
    if (!fileUri || fileUri.length === 0) return;

    try {
        await snippetManager.importSnippets(fileUri[0].fsPath);
        snippetProvider.refresh();
        vscode.window.showInformationMessage('Snippets imported successfully!');
    } catch (error) {
        vscode.window.showErrorMessage(`Import failed: ${error}`);
    }
}

async function exportSnippets() {
    const options: vscode.SaveDialogOptions = {
        saveLabel: 'Export',
        filters: {
            'JSON files': ['json']
        }
    };

    const fileUri = await vscode.window.showSaveDialog(options);
    if (!fileUri) return;

    try {
        await snippetManager.exportSnippets(fileUri.fsPath);
        vscode.window.showInformationMessage('Snippets exported successfully!');
    } catch (error) {
        vscode.window.showErrorMessage(`Export failed: ${error}`);
    }
}

async function syncWithTeam() {
    const config = vscode.workspace.getConfiguration('snippetManager');
    const repository = config.get<string>('syncRepository');

    if (!repository) {
        const result = await vscode.window.showInformationMessage(
            'No team repository configured. Would you like to set it up?',
            'Configure'
        );
        
        if (result === 'Configure') {
            vscode.commands.executeCommand('workbench.action.openSettings', 'snippetManager.syncRepository');
        }
        return;
    }

    try {
        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: 'Syncing with team repository...',
                cancellable: false
            },
            async () => {
                await snippetManager.syncWithRepository(repository);
            }
        );
        
        snippetProvider.refresh();
        vscode.window.showInformationMessage('Successfully synced with team repository!');
    } catch (error) {
        vscode.window.showErrorMessage(`Sync failed: ${error}`);
    }
}

function getLanguageOptions() {
    return [
        { label: 'JavaScript', id: 'javascript' },
        { label: 'TypeScript', id: 'typescript' },
        { label: 'Python', id: 'python' },
        { label: 'Java', id: 'java' },
        { label: 'C#', id: 'csharp' },
        { label: 'C++', id: 'cpp' },
        { label: 'Go', id: 'go' },
        { label: 'Rust', id: 'rust' },
        { label: 'PHP', id: 'php' },
        { label: 'HTML', id: 'html' },
        { label: 'CSS', id: 'css' },
        { label: 'SCSS', id: 'scss' },
        { label: 'JSON', id: 'json' },
        { label: 'YAML', id: 'yaml' },
        { label: 'Markdown', id: 'markdown' },
        { label: 'Shell', id: 'shellscript' },
        { label: 'SQL', id: 'sql' },
        { label: 'Plain Text', id: 'plaintext' }
    ];
}

// Webview panel for the main snippet manager interface
class SnippetManagerPanel {
    public static currentPanel: SnippetManagerPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];

    public static createOrShow(extensionUri: vscode.Uri, snippetManager: SnippetManager) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (SnippetManagerPanel.currentPanel) {
            SnippetManagerPanel.currentPanel._panel.reveal(column);
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            'snippetManager',
            'Snippet Manager',
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'resources')]
            }
        );

        SnippetManagerPanel.currentPanel = new SnippetManagerPanel(panel, extensionUri, snippetManager);
    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, snippetManager: SnippetManager) {
        this._panel = panel;
        this._panel.webview.html = this._getHtmlForWebview();
        
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }

    private _getHtmlForWebview(): string {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Snippet Manager</title>
                <style>
                    body { font-family: var(--vscode-font-family); }
                    .container { padding: 20px; }
                    .search-box { width: 100%; padding: 10px; margin-bottom: 20px; }
                    .snippet-item { padding: 10px; border: 1px solid var(--vscode-panel-border); margin-bottom: 10px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Snippet Manager</h1>
                    <input type="text" class="search-box" placeholder="Search snippets...">
                    <div id="snippets-list">
                        <!-- Snippets will be loaded here -->
                    </div>
                </div>
            </body>
            </html>
        `;
    }

    public dispose() {
        SnippetManagerPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
}

export function deactivate() {
    console.log('Snippet Manager extension is now deactivated');
}
