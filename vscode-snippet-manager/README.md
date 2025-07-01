# VS Code Snippet Manager Extension 🔧

A powerful VS Code extension for managing, organizing, and sharing code snippets across teams and projects.

## Features

- 📁 **Snippet Organization**: Create folders and categories for better snippet management
- 🔍 **Smart Search**: Find snippets quickly with fuzzy search and tagging
- 👥 **Team Sharing**: Share snippet collections with your team via Git repositories
- 🎨 **Syntax Highlighting**: Full syntax highlighting for all supported languages
- ⚡ **Quick Insert**: Insert snippets with keyboard shortcuts or command palette
- 🏷️ **Tagging System**: Tag snippets for easy categorization and filtering
- 📝 **Variables Support**: Dynamic snippets with placeholder variables
- 🌓 **Theme Support**: Works seamlessly with all VS Code themes

## Installation

### From VS Code Marketplace

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Snippet Manager"
4. Click Install

### From VSIX Package

1. Download the `.vsix` file from releases
2. Run `code --install-extension snippet-manager.vsix`

### Manual Installation

1. Clone this repository
2. Run `npm install`
3. Run `npm run compile`
4. Press F5 to open a new VS Code window with the extension loaded

## Quick Start

1. **Open Snippet Manager**: Press `Ctrl+Shift+P` and type "Snippet Manager: Open"
2. **Create a snippet**: Click the "+" button or use `Ctrl+Alt+N`
3. **Insert a snippet**: Use `Ctrl+Alt+I` or select from the snippet panel
4. **Search snippets**: Use the search box or `Ctrl+Alt+S`

## Usage

### Creating Snippets

```typescript
// Example: React Functional Component snippet
import React from 'react';

interface ${1:ComponentName}Props {
  $2
}

const ${1:ComponentName}: React.FC<${1:ComponentName}Props> = ({ $3 }) => {
  return (
    <div>
      $0
    </div>
  );
};

export default ${1:ComponentName};
```

### Organizing with Folders

Create folders to organize your snippets:
- **React Components**
  - Functional Components
  - Class Components
  - Hooks
- **Node.js**
  - Express Routes
  - Middleware
  - Database Queries
- **CSS**
  - Flexbox Layouts
  - Animations
  - Responsive Design

### Tagging Snippets

Use tags to categorize snippets:
- `#react` `#component` `#typescript`
- `#nodejs` `#express` `#api`
- `#css` `#flexbox` `#responsive`

## Commands

| Command | Shortcut | Description |
|---------|----------|-------------|
| Open Snippet Manager | `Ctrl+Shift+Alt+S` | Opens the snippet manager panel |
| Create New Snippet | `Ctrl+Alt+N` | Creates a new snippet |
| Insert Snippet | `Ctrl+Alt+I` | Shows snippet picker |
| Search Snippets | `Ctrl+Alt+S` | Opens search dialog |
| Import Snippets | - | Import snippets from file |
| Export Snippets | - | Export snippets to file |
| Sync with Team | - | Sync with team repository |

## Configuration

Add these settings to your VS Code `settings.json`:

```json
{
  "snippetManager.defaultLanguage": "typescript",
  "snippetManager.autoSave": true,
  "snippetManager.syncRepository": "https://github.com/your-team/snippets",
  "snippetManager.showInExplorer": true,
  "snippetManager.enableTelemetry": false,
  "snippetManager.theme": "auto",
  "snippetManager.searchLimit": 50,
  "snippetManager.autoComplete": true
}
```

### Available Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `defaultLanguage` | string | "javascript" | Default language for new snippets |
| `autoSave` | boolean | true | Automatically save snippets |
| `syncRepository` | string | "" | Git repository for team sync |
| `showInExplorer` | boolean | true | Show snippets in explorer panel |
| `enableTelemetry` | boolean | false | Enable usage analytics |
| `theme` | string | "auto" | Theme preference (auto, light, dark) |
| `searchLimit` | number | 50 | Maximum search results |
| `autoComplete` | boolean | true | Enable snippet auto-completion |

## Team Collaboration

### Setting Up Team Sync

1. Create a Git repository for your team snippets
2. Configure the repository URL in settings
3. Use "Sync with Team" command to push/pull snippets

### Snippet Format

Snippets are stored in JSON format:

```json
{
  "id": "react-fc",
  "name": "React Functional Component",
  "description": "Creates a TypeScript React functional component",
  "language": "typescriptreact",
  "body": [
    "import React from 'react';",
    "",
    "interface ${1:ComponentName}Props {",
    "  $2",
    "}",
    "",
    "const ${1:ComponentName}: React.FC<${1:ComponentName}Props> = ({ $3 }) => {",
    "  return (",
    "    <div>",
    "      $0",
    "    </div>",
    "  );",
    "};",
    "",
    "export default ${1:ComponentName};"
  ],
  "tags": ["react", "component", "typescript"],
  "folder": "React/Components",
  "author": "John Doe",
  "created": "2023-12-01T10:00:00Z",
  "modified": "2023-12-01T10:00:00Z"
}
```

## API Reference

### Extension API

The extension provides an API for other extensions to interact with:

```typescript
import * as vscode from 'vscode';

// Get all snippets
const snippets = await vscode.commands.executeCommand('snippetManager.getSnippets');

// Create a new snippet
await vscode.commands.executeCommand('snippetManager.createSnippet', {
  name: 'My Snippet',
  body: 'console.log("Hello World");',
  language: 'javascript'
});

// Insert snippet at cursor
await vscode.commands.executeCommand('snippetManager.insertSnippet', 'snippet-id');
```

### Events

Subscribe to snippet events:

```typescript
// Listen for snippet creation
vscode.commands.registerCommand('snippetManager.onSnippetCreated', (snippet) => {
  console.log('New snippet created:', snippet.name);
});

// Listen for snippet updates
vscode.commands.registerCommand('snippetManager.onSnippetUpdated', (snippet) => {
  console.log('Snippet updated:', snippet.name);
});
```

## Development

### Prerequisites

- Node.js 16+
- VS Code 1.74+
- TypeScript 4.9+

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/vscode-snippet-manager.git
cd vscode-snippet-manager

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Run tests
npm test

# Package extension
npm run package
```

### Project Structure

```
src/
├── extension.ts          # Main extension entry point
├── commands/            # Command implementations
├── providers/           # Data providers and tree views
├── models/             # Data models and interfaces
├── services/           # Business logic services
├── utils/              # Utility functions
└── test/               # Test files

resources/              # Icons and static resources
package.json           # Extension manifest
tsconfig.json         # TypeScript configuration
webpack.config.js     # Webpack build configuration
```

### Available Scripts

- `npm run compile` - Compile TypeScript
- `npm run watch` - Watch for changes and compile
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run package` - Package extension as VSIX
- `npm run publish` - Publish to marketplace

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

```typescript
import * as assert from 'assert';
import * as vscode from 'vscode';
import { SnippetManager } from '../src/services/SnippetManager';

suite('Snippet Manager Tests', () => {
  test('Should create new snippet', async () => {
    const manager = new SnippetManager();
    const snippet = await manager.createSnippet({
      name: 'Test Snippet',
      body: 'console.log("test");',
      language: 'javascript'
    });
    
    assert.strictEqual(snippet.name, 'Test Snippet');
    assert.strictEqual(snippet.language, 'javascript');
  });
});
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Update documentation
- Follow conventional commit messages
- Ensure all tests pass

## Troubleshooting

### Common Issues

1. **Extension not loading**
   - Check VS Code version compatibility
   - Verify extension is enabled
   - Check developer console for errors

2. **Snippets not syncing**
   - Verify Git repository access
   - Check network connectivity
   - Validate repository URL

3. **Search not working**
   - Clear search index
   - Rebuild snippet database
   - Check snippet file integrity

### Debug Mode

Enable debug logging:

```json
{
  "snippetManager.debug": true,
  "snippetManager.logLevel": "verbose"
}
```

## Roadmap

- [ ] AI-powered snippet suggestions
- [ ] Snippet marketplace integration
- [ ] Code snippet execution
- [ ] Multi-workspace support
- [ ] Plugin system for custom providers
- [ ] Advanced search with regex
- [ ] Snippet analytics and usage tracking

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@snippetmanager.com
- 💬 Discord: [Join our community](https://discord.gg/snippetmanager)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/vscode-snippet-manager/issues)
- 📖 Documentation: [Full Documentation](https://docs.snippetmanager.com)
