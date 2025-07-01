# API Documentation Generator 📚

An intelligent API documentation generator that creates beautiful, interactive documentation from code annotations, OpenAPI specifications, and live API endpoints.

## Features

- 🔍 **Multi-Source Analysis**: Parse FastAPI, Flask, Express.js, and other framework annotations
- 📖 **OpenAPI Integration**: Import and enhance existing OpenAPI/Swagger specifications
- 🎨 **Multiple Output Formats**: Generate HTML, Markdown, PDF, and interactive documentation
- 🔄 **Live API Testing**: Built-in API testing interface with request/response examples
- 📝 **Code Examples**: Auto-generated code samples in multiple programming languages
- 🌐 **Multi-Language Support**: Python, JavaScript, Java, C#, and more
- 🔧 **Customizable Templates**: Brandable themes and custom styling options
- ⚡ **CLI & Programmatic API**: Use as command-line tool or integrate into build pipelines

## Quick Start

### Installation

```bash
# Install via pip
pip install api-doc-generator

# Or install from source
git clone https://github.com/your-username/api-doc-generator.git
cd api-doc-generator
pip install -e .
```

### Basic Usage

```bash
# Generate docs from FastAPI application
api-doc-gen --source fastapi --input app.py --output ./docs

# Generate from OpenAPI spec
api-doc-gen --source openapi --input api-spec.yaml --output ./docs --format html

# Generate with custom template
api-doc-gen --input app.py --output ./docs --template custom-theme --live-testing
```

## Supported Frameworks

### Python
- **FastAPI**: Complete support for all decorators and type hints
- **Flask**: Flask-RESTful, Flask-RESTX, and standard Flask routes
- **Django REST Framework**: Serializers, viewsets, and API views
- **Starlette**: Native Starlette applications

### JavaScript/TypeScript
- **Express.js**: Route definitions and middleware documentation
- **Nest.js**: Decorators and DTOs
- **Koa.js**: Router and middleware support

### Other Languages
- **Spring Boot** (Java): REST controllers and Spring annotations
- **ASP.NET Core** (C#): Web API controllers and attributes
- **Go**: Gin, Echo, and standard net/http handlers

## Command Line Interface

### Basic Commands

```bash
# Show help
api-doc-gen --help

# Generate from directory
api-doc-gen --input ./src --output ./docs --recursive

# Generate with specific config
api-doc-gen --config api-doc.yaml

# Serve documentation locally
api-doc-gen --serve --port 8080 --watch

# Generate multiple formats
api-doc-gen --input app.py --output ./docs --format html,markdown,pdf
```

### Advanced Options

```bash
# Custom OpenAPI metadata
api-doc-gen \
  --input app.py \
  --output ./docs \
  --title "My API" \
  --version "1.0.0" \
  --description "API for my application" \
  --contact-email "support@example.com"

# Include/exclude specific endpoints
api-doc-gen \
  --input app.py \
  --output ./docs \
  --include "/api/v1/*" \
  --exclude "/internal/*"

# Generate with authentication examples
api-doc-gen \
  --input app.py \
  --output ./docs \
  --auth-type bearer \
  --auth-examples token,api-key
```

## Configuration File

Create `api-doc.yaml` for project-specific settings:

```yaml
# api-doc.yaml
input:
  source: fastapi
  path: ./app
  files:
    - main.py
    - routers/*.py
  exclude:
    - "**/test_*.py"
    - "**/internal/**"

output:
  path: ./docs
  formats:
    - html
    - markdown
  clean: true

api:
  title: "My Awesome API"
  version: "2.1.0"
  description: "Comprehensive API for awesome features"
  contact:
    name: "API Support Team"
    email: "api-support@example.com"
    url: "https://example.com/support"
  license:
    name: "MIT"
    url: "https://opensource.org/licenses/MIT"

generation:
  include_examples: true
  include_schemas: true
  generate_client_code: true
  languages:
    - python
    - javascript
    - curl
    - java
  
theme:
  name: "modern"
  primary_color: "#007bff"
  logo: "./assets/logo.png"
  favicon: "./assets/favicon.ico"

features:
  live_testing: true
  search: true
  dark_mode: true
  responsive: true
  code_highlighting: true

server:
  host: "localhost"
  port: 8080
  auto_reload: true
  cors: true
```

## Programmatic Usage

### Python API

```python
from api_doc_generator import DocumentationGenerator, Config

# Basic usage
generator = DocumentationGenerator()
docs = generator.generate_from_fastapi_app("app.py")
docs.save_html("./docs")

# Advanced configuration
config = Config(
    title="My API",
    version="1.0.0",
    output_formats=["html", "markdown"],
    include_examples=True,
    theme="modern"
)

generator = DocumentationGenerator(config)
docs = generator.generate_from_source("./src", recursive=True)
docs.save("./docs")

# Custom processing
def custom_processor(endpoint):
    # Add custom metadata to endpoints
    endpoint.metadata["custom_field"] = "value"
    return endpoint

generator.add_processor(custom_processor)
docs = generator.generate()
```

### Integration with Build Tools

#### GitHub Actions

```yaml
name: Generate API Documentation

on:
  push:
    branches: [main]
    paths: ['src/**/*.py']

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Python
        uses: actions/setup-python@v3
        with:
          python-version: '3.9'
      
      - name: Install dependencies
        run: |
          pip install api-doc-generator
      
      - name: Generate documentation
        run: |
          api-doc-gen \
            --input ./src \
            --output ./docs \
            --format html \
            --live-testing
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs
```

#### Docker Integration

```dockerfile
FROM python:3.9-slim

RUN pip install api-doc-generator

WORKDIR /app
COPY . .

# Generate documentation
RUN api-doc-gen --input . --output /docs --format html

# Serve documentation
EXPOSE 8080
CMD ["api-doc-gen", "--serve", "--port", "8080", "--host", "0.0.0.0"]
```

## Templates and Themes

### Built-in Themes

- **modern**: Clean, responsive design with dark mode support
- **classic**: Traditional documentation layout
- **minimal**: Simplified interface for small APIs
- **enterprise**: Professional theme with advanced features

### Custom Themes

Create custom themes by extending base templates:

```python
# custom_theme.py
from api_doc_generator.themes import BaseTheme

class CustomTheme(BaseTheme):
    name = "custom"
    
    def __init__(self):
        super().__init__()
        self.primary_color = "#ff6b6b"
        self.font_family = "Inter, sans-serif"
    
    def render_endpoint(self, endpoint):
        # Custom endpoint rendering
        return self.template_env.get_template('custom_endpoint.html').render(
            endpoint=endpoint
        )

# Register theme
from api_doc_generator import register_theme
register_theme(CustomTheme())
```

### Template Structure

```
themes/
├── custom/
│   ├── templates/
│   │   ├── base.html
│   │   ├── endpoint.html
│   │   ├── schema.html
│   │   └── index.html
│   ├── static/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   └── config.yaml
```

## Live API Testing

The generated documentation includes an interactive testing interface:

### Features

- **Request Builder**: Visual request construction with parameter validation
- **Authentication**: Support for API keys, Bearer tokens, OAuth flows
- **Response Inspection**: Formatted JSON responses with schema validation
- **History**: Save and replay previous requests
- **Export**: Generate code samples from test requests

### Configuration

```yaml
live_testing:
  enabled: true
  default_server: "https://api.example.com"
  auth_flows:
    - type: "bearer"
      name: "JWT Token"
    - type: "api_key"
      name: "API Key"
      location: "header"
      parameter: "X-API-Key"
  
  features:
    save_requests: true
    export_code: true
    response_validation: true
```

## Code Generation

Generate client SDKs and code examples:

### Supported Languages

```python
# Generate Python client
generator.generate_client_code("python", output_dir="./clients/python")

# Generate JavaScript client
generator.generate_client_code("javascript", output_dir="./clients/js")

# Generate multiple clients
for lang in ["python", "javascript", "java", "csharp"]:
    generator.generate_client_code(lang, f"./clients/{lang}")
```

### Example Generated Code

#### Python Client

```python
# Generated Python client example
import requests
from typing import Optional, Dict, Any

class APIClient:
    def __init__(self, base_url: str, api_key: Optional[str] = None):
        self.base_url = base_url
        self.session = requests.Session()
        if api_key:
            self.session.headers.update({"Authorization": f"Bearer {api_key}"})
    
    def get_users(self, limit: int = 10, offset: int = 0) -> Dict[str, Any]:
        """
        Get list of users
        
        Args:
            limit: Number of users to return (default: 10)
            offset: Number of users to skip (default: 0)
            
        Returns:
            Dictionary containing user data
        """
        response = self.session.get(
            f"{self.base_url}/users",
            params={"limit": limit, "offset": offset}
        )
        response.raise_for_status()
        return response.json()
```

#### JavaScript Client

```javascript
// Generated JavaScript client example
class APIClient {
    constructor(baseUrl, apiKey = null) {
        this.baseUrl = baseUrl;
        this.headers = {
            'Content-Type': 'application/json'
        };
        if (apiKey) {
            this.headers['Authorization'] = `Bearer ${apiKey}`;
        }
    }
    
    async getUsers(limit = 10, offset = 0) {
        const url = new URL(`${this.baseUrl}/users`);
        url.searchParams.append('limit', limit);
        url.searchParams.append('offset', offset);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: this.headers
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }
}
```

## Plugin System

Extend functionality with custom plugins:

```python
# plugin_example.py
from api_doc_generator.plugins import BasePlugin

class CustomValidationPlugin(BasePlugin):
    name = "custom_validation"
    
    def process_endpoint(self, endpoint):
        # Add custom validation logic
        if not endpoint.description:
            endpoint.warnings.append("Missing description")
        
        # Add custom metadata
        endpoint.metadata["validation_score"] = self.calculate_score(endpoint)
        
        return endpoint
    
    def calculate_score(self, endpoint):
        score = 100
        if not endpoint.description:
            score -= 20
        if not endpoint.examples:
            score -= 15
        return score

# Register plugin
from api_doc_generator import register_plugin
register_plugin(CustomValidationPlugin())
```

## Testing

Run the test suite:

```bash
# Install test dependencies
pip install -e .[test]

# Run all tests
pytest

# Run with coverage
pytest --cov=api_doc_generator --cov-report=html

# Run specific test category
pytest tests/test_parsers.py -v

# Run integration tests
pytest tests/integration/ -v
```

## Examples

### FastAPI Application

```python
# app.py - Example FastAPI application
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="Example API",
    description="This is an example API for demonstration",
    version="1.0.0"
)

class User(BaseModel):
    """User model with basic information"""
    id: int
    name: str
    email: str
    age: Optional[int] = None

class UserCreate(BaseModel):
    """Model for creating new users"""
    name: str
    email: str
    age: Optional[int] = None

@app.get("/users", response_model=List[User], tags=["users"])
async def get_users(
    limit: int = 10, 
    offset: int = 0
) -> List[User]:
    """
    Retrieve a list of users
    
    - **limit**: Number of users to return (max 100)
    - **offset**: Number of users to skip for pagination
    
    Returns a list of user objects with their basic information.
    """
    # Implementation here
    pass

@app.post("/users", response_model=User, tags=["users"])
async def create_user(user: UserCreate) -> User:
    """
    Create a new user
    
    Creates a new user with the provided information.
    Email must be unique across all users.
    """
    # Implementation here
    pass
```

Generate documentation:

```bash
api-doc-gen --input app.py --output ./docs --live-testing
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Run tests (`pytest`)
6. Commit changes (`git commit -m 'Add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Setup

```bash
# Clone repository
git clone https://github.com/your-username/api-doc-generator.git
cd api-doc-generator

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install in development mode
pip install -e .[dev]

# Install pre-commit hooks
pre-commit install

# Run tests
pytest
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@apidocgen.com
- 💬 Discord: [Join our community](https://discord.gg/apidocgen)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/api-doc-generator/issues)
- 📖 Documentation: [Full Documentation](https://docs.apidocgen.com)

## Roadmap

- [ ] GraphQL schema support
- [ ] AsyncAPI documentation generation
- [ ] Real-time API monitoring integration
- [ ] Advanced authentication flows (OAuth2, SAML)
- [ ] API versioning and changelog generation
- [ ] Integration with API gateways
- [ ] Performance testing integration
- [ ] Multi-language documentation generation
