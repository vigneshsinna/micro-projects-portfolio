# CI/CD Workflow Templates 🔄

A comprehensive collection of production-ready CI/CD pipeline templates for various platforms, frameworks, and deployment scenarios.

## Overview

This repository provides battle-tested CI/CD workflows that can be easily adapted for different project types and deployment targets. Each workflow includes best practices for testing, security, and deployment automation.

## Available Workflows

### GitHub Actions

#### 1. Node.js Application Pipeline
- **File**: `.github/workflows/nodejs.yml`
- **Features**: Testing, linting, building, security scanning, multi-environment deployment
- **Deployment**: Heroku, Vercel, AWS

#### 2. React Application Pipeline
- **File**: `.github/workflows/react.yml`
- **Features**: Build optimization, testing, Lighthouse CI, automated deployment
- **Deployment**: Netlify, Vercel, S3 + CloudFront

#### 3. Python Application Pipeline
- **File**: `.github/workflows/python.yml`
- **Features**: Multiple Python versions, testing, linting, security checks
- **Deployment**: Heroku, AWS Lambda, Docker

#### 4. Docker Multi-Stage Pipeline
- **File**: `.github/workflows/docker.yml`
- **Features**: Multi-arch builds, security scanning, registry push
- **Deployment**: Docker Hub, AWS ECR, Google Container Registry

### Azure DevOps

#### 5. .NET Core Pipeline
- **File**: `azure-pipelines/dotnet.yml`
- **Features**: Multi-stage builds, testing, deployment to Azure App Service

#### 6. Angular Pipeline
- **File**: `azure-pipelines/angular.yml`
- **Features**: Build optimization, testing, Azure Static Web Apps deployment

## Quick Start

1. **Choose your workflow template**
   ```bash
   # Copy the appropriate workflow to your project
   cp .github/workflows/nodejs.yml your-project/.github/workflows/
   ```

2. **Configure environment variables**
   - Update repository secrets
   - Configure deployment targets
   - Set up environment-specific variables

3. **Customize for your project**
   - Update Node.js/Python/etc. versions
   - Modify test commands
   - Configure deployment settings

## Workflow Features

### 🔒 Security
- Dependency vulnerability scanning
- SAST (Static Application Security Testing)
- Secret detection
- Container image scanning

### 🧪 Testing
- Unit tests
- Integration tests
- End-to-end tests
- Performance testing
- Accessibility testing

### 📦 Build & Deploy
- Multi-environment support (dev, staging, prod)
- Automated semantic versioning
- Blue-green deployments
- Rollback capabilities

### 📊 Quality Gates
- Code coverage thresholds
- Linting and formatting checks
- Security vulnerability limits
- Performance budgets

## Environment Configuration

### Required Secrets

For GitHub Actions workflows, configure these repository secrets:

```bash
# Deployment
HEROKU_API_KEY=your_heroku_api_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
VERCEL_TOKEN=your_vercel_token

# Notifications
SLACK_WEBHOOK_URL=your_slack_webhook
DISCORD_WEBHOOK_URL=your_discord_webhook

# Security Scanning
SNYK_TOKEN=your_snyk_token
SONAR_TOKEN=your_sonar_token
```

### Environment Variables

```yaml
env:
  NODE_VERSION: '18.x'
  PYTHON_VERSION: '3.11'
  DOCKER_REGISTRY: 'your-registry.com'
  APP_NAME: 'your-app-name'
```

## Workflow Examples

### Basic Node.js Workflow

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18.x'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

### Advanced Multi-Environment Deployment

```yaml
jobs:
  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/develop'
    environment: staging
    steps:
      - name: Deploy to Staging
        run: |
          # Staging deployment commands
  
  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - name: Deploy to Production
        run: |
          # Production deployment commands
```

## Best Practices

### 1. Pipeline Structure
- **Fast Feedback**: Run quick tests first
- **Parallel Execution**: Run independent jobs in parallel
- **Fail Fast**: Stop pipeline on critical failures
- **Caching**: Cache dependencies and build artifacts

### 2. Security
- **Least Privilege**: Use minimal required permissions
- **Secret Management**: Never hardcode secrets
- **Vulnerability Scanning**: Scan all dependencies
- **Audit Trails**: Log all deployment activities

### 3. Testing Strategy
- **Test Pyramid**: Unit → Integration → E2E
- **Parallel Testing**: Split tests across multiple runners
- **Flaky Test Handling**: Retry and quarantine unstable tests
- **Coverage Gates**: Maintain minimum coverage thresholds

### 4. Deployment
- **Blue-Green**: Zero-downtime deployments
- **Feature Flags**: Gradual feature rollouts
- **Monitoring**: Health checks and alerts
- **Rollback**: Automated rollback on failure

## Monitoring and Notifications

### Slack Integration

```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### Email Notifications

```yaml
- name: Send Email
  if: failure()
  uses: dawidd6/action-send-mail@v3
  with:
    server_address: smtp.gmail.com
    server_port: 465
    username: ${{ secrets.EMAIL_USERNAME }}
    password: ${{ secrets.EMAIL_PASSWORD }}
    subject: "Pipeline Failed: ${{ github.repository }}"
    body: "Build failed on ${{ github.ref }}"
```

## Customization Guide

### 1. Adding New Environments

1. Create environment in repository settings
2. Configure environment-specific secrets
3. Add deployment job in workflow
4. Set up approval rules if needed

### 2. Adding New Test Types

```yaml
accessibility-tests:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    - name: Run Lighthouse CI
      uses: treosh/lighthouse-ci-action@v9
      with:
        configPath: '.lighthouserc.json'
```

### 3. Custom Security Scans

```yaml
security-scan:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    - name: Run Snyk
      uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check dependency versions
   - Verify environment variables
   - Review test failures

2. **Deployment Issues**
   - Validate deployment credentials
   - Check target environment status
   - Review deployment logs

3. **Performance Issues**
   - Optimize caching strategy
   - Parallelize independent jobs
   - Use matrix builds for multiple versions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Test your workflow changes
4. Submit a pull request with examples

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Azure DevOps Pipelines](https://docs.microsoft.com/en-us/azure/devops/pipelines/)
- [CI/CD Best Practices](https://docs.github.com/en/actions/guides)
- [Security Hardening](https://docs.github.com/en/actions/security-guides)
