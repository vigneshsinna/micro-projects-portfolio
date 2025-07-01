# Micro-Projects Portfolio Setup Guide

This guide will help you set up and run each micro-project in your portfolio.

## Prerequisites

- Node.js 16+ (for React and VS Code extension projects)
- Python 3.8+ (for API doc generator)
- Git (for version control and CI/CD workflows)
- VS Code (for testing the VS Code extension)

## Quick Setup for All Projects

Run the following commands to set up all projects:

```bash
# Navigate to your portfolio directory
cd micro-projects-portfolio

# Setup Todo App
cd todo-app-ai
npm install
cp .env.example .env.local
# Edit .env.local with your OpenAI API key (optional for demo)
npm run dev
# Open http://localhost:5173

# Setup Component Library (new terminal)
cd ../component-library
npm install
npm run storybook
# Open http://localhost:6006

# Setup VS Code Extension (new terminal)
cd ../vscode-snippet-manager
npm install
npm run compile
# Open project in VS Code and press F5 to test

# Setup API Doc Generator (new terminal)
cd ../api-doc-generator
pip install -r requirements.txt
python api_doc_gen.py --input sample_app.py --output ./docs --serve
# Open http://localhost:8080

# CI/CD workflows are ready to use - copy to your projects as needed
```

## Individual Project Setup

### 1. AI-Powered Todo App

```bash
cd todo-app-ai
npm install
cp .env.example .env.local
# Add your OpenAI API key to .env.local (optional - app works without it)
npm run dev
```

**Features to demo:**
- Create tasks with natural language
- AI categorization (mock implementation included)
- Smart insights dashboard
- Responsive design
- Modern React patterns

**URLs:**
- Development: http://localhost:5173

**Note:** The app includes mock AI services that work without an API key for demonstration purposes.

### 2. CI/CD Workflow Templates

```bash
cd cicd-workflows
# Copy workflows to your projects:
cp .github/workflows/nodejs.yml /path/to/your/project/.github/workflows/
```

**Features to demo:**
- Multi-environment deployment
- Security scanning
- Automated testing
- Slack notifications

**Setup for your projects:**
1. Copy workflow files to your repository
2. Configure secrets in GitHub repository settings
3. Customize environment variables
4. Test with a push to your repository

### 3. VS Code Snippet Manager Extension

```bash
cd vscode-snippet-manager
npm install
npm run compile
```

**Test the extension:**
1. Open the project in VS Code
2. Press F5 to launch Extension Development Host
3. Test commands with Ctrl+Shift+P

**Features to demo:**
- Snippet creation and management
- Search functionality
- Team synchronization
- Multiple language support

### 4. API Documentation Generator

```bash
cd api-doc-generator
pip install -r requirements.txt
python api_doc_gen.py --help
```

**Test with included sample app:**
```bash
# Generate documentation from the sample FastAPI app
python api_doc_gen.py --input sample_app.py --output ./docs --serve

# Or generate different formats
python api_doc_gen.py --input sample_app.py --output ./docs --format both
```

**Features to demo:**
- FastAPI endpoint parsing
- Interactive HTML documentation
- Markdown generation
- Live API testing interface
- Multiple output formats

**URLs:**
- Documentation: http://localhost:8080 (when using --serve)
- Sample API: Run `python sample_app.py` then visit http://localhost:8000/docs

### 5. React Component Library

```bash
cd component-library
npm install
npm run storybook
```

**Features to demo:**
- Interactive Storybook documentation
- Accessible components
- TypeScript support
- Multiple themes

**URLs:**
- Storybook: http://localhost:6006
- Development: npm run dev

## Deployment Recommendations

### GitHub Pages Deployment

Each project can be deployed to GitHub Pages:

1. **Todo App**: Build with `npm run build`, deploy `dist/` folder
2. **Component Library**: Build Storybook with `npm run build:storybook`, deploy `storybook-static/` folder
3. **API Doc Generator**: Generate HTML docs, deploy output folder
4. **CI/CD Workflows**: Include deployment step in workflows

### Example GitHub Actions for deployment:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install and Build
        run: |
          npm install
          npm run build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Portfolio Presentation Tips

### 1. Live Demos
- Todo App: Show AI categorization in action
- Component Library: Navigate through Storybook
- VS Code Extension: Record a demo video
- API Generator: Generate docs from a real API

### 2. Technical Highlights
- **TypeScript**: All projects use TypeScript for type safety
- **Testing**: Unit tests, integration tests, accessibility tests
- **CI/CD**: Automated workflows for quality and deployment
- **Accessibility**: WCAG compliance in UI components
- **Performance**: Optimized builds and bundle analysis

### 3. Code Quality
- ESLint and Prettier configuration
- Husky pre-commit hooks
- Comprehensive test coverage
- Documentation with examples

## Troubleshooting

### Common Issues

1. **Node modules not found**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **TypeScript errors**
   ```bash
   npm run type-check
   ```

3. **Port conflicts**
   - Todo App: Change port in vite.config.ts
   - Storybook: Use `npm run storybook -- --port 6007`

4. **Python dependencies**
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

### Getting Help

- Check individual project READMEs for detailed setup
- Review package.json scripts for available commands
- Use `--help` flag for CLI tools
- Check browser console for runtime errors

## Next Steps

1. **Customize**: Update branding, colors, and content
2. **Deploy**: Set up GitHub Pages or Netlify deployment
3. **Document**: Add your own examples and use cases
4. **Extend**: Add new features or components
5. **Share**: Include in your portfolio and job applications

Happy coding! 🚀
