# GitHub Setup Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository with the name: `micro-projects-portfolio`
3. Make it public (recommended for portfolio visibility)
4. Do NOT initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Setup GitHub Authentication (REQUIRED)

GitHub requires Personal Access Token authentication. Follow these steps:

### Create Personal Access Token:
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name like "micro-projects-portfolio"
4. Set expiration (recommend 90 days or no expiration)
5. Select scopes: **repo** (full control of private repositories)
6. Click "Generate token"
7. **COPY THE TOKEN** (you won't see it again!)

## Step 3: Connect Local Repository to GitHub

Run these commands in your terminal:

```bash
cd "v:\pers\Freelance\micro-projects-portfolio"

# Add GitHub remote origin (replace vigneshsinna with your username)
git remote add origin https://github.com/vigneshsinna/micro-projects-portfolio.git

# Rename branch to main (GitHub default)
git branch -M main

# Push to GitHub (will prompt for credentials)
git push -u origin main
```

**When prompted for credentials:**
- Username: `vigneshsinna` (your GitHub username)
- Password: `paste_your_personal_access_token_here`

### Alternative: Use GitHub CLI (Recommended)
```bash
# Install GitHub CLI from https://cli.github.com/
gh auth login
git push -u origin main
```

## Step 4: Verify Upload

After pushing, your GitHub repository should contain:
- ✅ AI Todo App (fully functional)
- ✅ Component Library (structure ready)
- ✅ VS Code Extension (basic setup)
- ✅ API Doc Generator (Python implementation)
- ✅ CI/CD Workflows (GitHub Actions)
- ✅ Documentation (README, SETUP, VALIDATION guides)

## Repository Structure on GitHub

```
micro-projects-portfolio/
├── README.md                 # Main portfolio overview
├── SETUP.md                  # Setup instructions
├── VALIDATION.md             # Validation guide
├── todo-app-ai/             # ✅ COMPLETED & FUNCTIONAL
├── component-library/        # Structure ready
├── vscode-snippet-manager/   # Basic setup
├── api-doc-generator/        # Python implementation
└── cicd-workflows/          # GitHub Actions ready
```

## Alternative: Using GitHub Desktop

If you prefer a GUI:
1. Download GitHub Desktop
2. Sign in with your GitHub account
3. Add existing repository: "v:\pers\Freelance\micro-projects-portfolio"
4. Publish repository to GitHub

## Updating Git User Information

Before pushing, update your git configuration:

```bash
git config user.name "Your Actual Name"
git config user.email "your.github.email@example.com"
```

## Future Updates

To commit future changes:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## Portfolio Benefits

Having this on GitHub will showcase:
- ✅ Full-stack development skills (React, TypeScript, Python)
- ✅ AI integration capabilities (OpenAI API)
- ✅ DevOps knowledge (CI/CD, workflows)
- ✅ VS Code extension development
- ✅ Modern tooling (Vite, Tailwind, Zustand)
- ✅ Clean code and documentation practices

## Troubleshooting Authentication

### If you get "Authentication failed" error:

1. **Generate Personal Access Token** (see Step 2 above)
2. **Use token as password** when prompted
3. **Check token permissions** - ensure "repo" scope is selected

### Alternative Authentication Methods:

#### Option 1: GitHub Desktop (Easiest)
1. Download GitHub Desktop from https://desktop.github.com/
2. Sign in with your GitHub account
3. Add existing repository: `v:\pers\Freelance\micro-projects-portfolio`
4. Publish repository to GitHub

#### Option 2: SSH Key Authentication
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Add to SSH agent
ssh-add ~/.ssh/id_ed25519

# Copy public key and add to GitHub
cat ~/.ssh/id_ed25519.pub

# Use SSH remote instead
git remote set-url origin git@github.com:vigneshsinna/micro-projects-portfolio.git
git push -u origin main
```

#### Option 3: Store Credentials (Windows)
```bash
# Configure Git to store credentials
git config --global credential.helper manager-core

# Push (will prompt once and remember)
git push -u origin main
```
