#!/usr/bin/env python3
"""
API Documentation Generator
A tool for generating beautiful API documentation from code annotations and OpenAPI specs.
"""

import os
import sys
import argparse
import yaml
import json
from pathlib import Path
from typing import List, Dict, Any, Optional
import asyncio

try:
    from fastapi import FastAPI
    FASTAPI_AVAILABLE = True
except ImportError:
    FASTAPI_AVAILABLE = False

try:
    from flask import Flask
    FLASK_AVAILABLE = True
except ImportError:
    FLASK_AVAILABLE = False


class APIDocumentationGenerator:
    """Main class for generating API documentation."""
    
    def __init__(self, config: Optional[Dict[str, Any]] = None):
        self.config = config or {}
        self.endpoints = []
        self.schemas = {}
        self.metadata = {
            'title': 'API Documentation',
            'version': '1.0.0',
            'description': 'API Documentation generated automatically'
        }
    
    def parse_fastapi_app(self, app_path: str) -> None:
        """Parse FastAPI application for endpoints and schemas."""
        if not FASTAPI_AVAILABLE:
            raise ImportError("FastAPI not available. Install with: pip install fastapi")
        
        # Import the FastAPI app
        sys.path.insert(0, os.path.dirname(app_path))
        module_name = os.path.basename(app_path).replace('.py', '')
        
        try:
            module = __import__(module_name)
            app = None
            
            # Find FastAPI app instance
            for attr_name in dir(module):
                attr = getattr(module, attr_name)
                if isinstance(attr, FastAPI):
                    app = attr
                    break
            
            if not app:
                raise ValueError("No FastAPI app instance found")
            
            # Extract metadata
            self.metadata.update({
                'title': app.title,
                'version': app.version,
                'description': app.description or ''
            })
            
            # Parse routes
            for route in app.routes:
                if hasattr(route, 'methods') and hasattr(route, 'path'):
                    endpoint = self._parse_fastapi_route(route)
                    if endpoint:
                        self.endpoints.append(endpoint)
            
            print(f"✅ Parsed {len(self.endpoints)} endpoints from FastAPI app")
            
        except Exception as e:
            raise Exception(f"Failed to parse FastAPI app: {e}")
    
    def _parse_fastapi_route(self, route) -> Optional[Dict[str, Any]]:
        """Parse individual FastAPI route."""
        try:
            endpoint_data = {
                'path': route.path,
                'methods': list(route.methods),
                'name': getattr(route, 'name', ''),
                'summary': '',
                'description': '',
                'parameters': [],
                'responses': {},
                'tags': getattr(route, 'tags', [])
            }
            
            # Get function details
            if hasattr(route, 'endpoint') and route.endpoint:
                func = route.endpoint
                endpoint_data['summary'] = func.__name__.replace('_', ' ').title()
                endpoint_data['description'] = func.__doc__ or ''
                
                # Parse function signature for parameters
                import inspect
                signature = inspect.signature(func)
                for param_name, param in signature.parameters.items():
                    if param_name not in ['request', 'response']:
                        param_info = {
                            'name': param_name,
                            'type': str(param.annotation) if param.annotation != param.empty else 'string',
                            'required': param.default == param.empty,
                            'default': param.default if param.default != param.empty else None
                        }
                        endpoint_data['parameters'].append(param_info)
            
            return endpoint_data
            
        except Exception as e:
            print(f"⚠️  Warning: Failed to parse route {route.path}: {e}")
            return None
    
    def parse_openapi_spec(self, spec_path: str) -> None:
        """Parse OpenAPI specification file."""
        try:
            with open(spec_path, 'r') as f:
                if spec_path.endswith('.yaml') or spec_path.endswith('.yml'):
                    spec = yaml.safe_load(f)
                else:
                    spec = json.load(f)
            
            # Extract metadata
            info = spec.get('info', {})
            self.metadata.update({
                'title': info.get('title', 'API Documentation'),
                'version': info.get('version', '1.0.0'),
                'description': info.get('description', '')
            })
            
            # Parse paths
            paths = spec.get('paths', {})
            for path, path_data in paths.items():
                for method, operation in path_data.items():
                    if method.upper() in ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']:
                        endpoint = self._parse_openapi_operation(path, method.upper(), operation)
                        self.endpoints.append(endpoint)
            
            # Parse schemas
            components = spec.get('components', {})
            self.schemas = components.get('schemas', {})
            
            print(f"✅ Parsed {len(self.endpoints)} endpoints from OpenAPI spec")
            
        except Exception as e:
            raise Exception(f"Failed to parse OpenAPI spec: {e}")
    
    def _parse_openapi_operation(self, path: str, method: str, operation: Dict[str, Any]) -> Dict[str, Any]:
        """Parse individual OpenAPI operation."""
        return {
            'path': path,
            'methods': [method],
            'summary': operation.get('summary', ''),
            'description': operation.get('description', ''),
            'parameters': operation.get('parameters', []),
            'responses': operation.get('responses', {}),
            'tags': operation.get('tags', [])
        }
    
    def generate_html_documentation(self, output_dir: str) -> None:
        """Generate HTML documentation."""
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
        
        # Generate main HTML file
        html_content = self._generate_html_template()
        
        with open(output_path / 'index.html', 'w') as f:
            f.write(html_content)
        
        # Generate CSS file
        css_content = self._generate_css()
        with open(output_path / 'styles.css', 'w') as f:
            f.write(css_content)
        
        # Generate JavaScript file
        js_content = self._generate_javascript()
        with open(output_path / 'script.js', 'w') as f:
            f.write(js_content)
        
        print(f"✅ Generated HTML documentation in {output_dir}")
    
    def generate_markdown_documentation(self, output_dir: str) -> None:
        """Generate Markdown documentation."""
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
        
        markdown_content = self._generate_markdown_template()
        
        with open(output_path / 'README.md', 'w') as f:
            f.write(markdown_content)
        
        print(f"✅ Generated Markdown documentation in {output_dir}")
    
    def _generate_html_template(self) -> str:
        """Generate HTML template for documentation."""
        endpoints_html = ""
        for endpoint in self.endpoints:
            methods_badges = " ".join([
                f'<span class="method-badge method-{method.lower()}">{method}</span>'
                for method in endpoint['methods']
            ])
            
            parameters_html = ""
            if endpoint['parameters']:
                parameters_html = "<h4>Parameters</h4><ul>"
                for param in endpoint['parameters']:
                    param_type = param.get('type', 'string')
                    required = "required" if param.get('required', False) else "optional"
                    parameters_html += f"<li><code>{param['name']}</code> ({param_type}) - {required}</li>"
                parameters_html += "</ul>"
            
            endpoints_html += f"""
            <div class="endpoint">
                <div class="endpoint-header">
                    <h3>{endpoint['path']}</h3>
                    <div class="methods">{methods_badges}</div>
                </div>
                <div class="endpoint-content">
                    <p class="summary">{endpoint['summary']}</p>
                    <p class="description">{endpoint['description']}</p>
                    {parameters_html}
                </div>
            </div>
            """
        
        return f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>{self.metadata['title']}</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <header>
                <h1>{self.metadata['title']}</h1>
                <p class="version">Version {self.metadata['version']}</p>
                <p class="description">{self.metadata['description']}</p>
            </header>
            
            <nav>
                <input type="text" id="search" placeholder="Search endpoints...">
                <div id="endpoint-list">
                    {self._generate_nav_items()}
                </div>
            </nav>
            
            <main>
                <div id="endpoints">
                    {endpoints_html}
                </div>
            </main>
            
            <script src="script.js"></script>
        </body>
        </html>
        """
    
    def _generate_nav_items(self) -> str:
        """Generate navigation items for endpoints."""
        nav_items = ""
        for i, endpoint in enumerate(self.endpoints):
            methods = ", ".join(endpoint['methods'])
            nav_items += f"""
            <div class="nav-item" onclick="scrollToEndpoint({i})">
                <span class="nav-path">{endpoint['path']}</span>
                <span class="nav-methods">{methods}</span>
            </div>
            """
        return nav_items
    
    def _generate_css(self) -> str:
        """Generate CSS styles for documentation."""
        return """
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }
        
        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            text-align: center;
        }
        
        header h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }
        
        .version {
            font-size: 1.1rem;
            opacity: 0.9;
            margin-bottom: 0.5rem;
        }
        
        .description {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        nav {
            width: 300px;
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            background: white;
            border-right: 1px solid #e9ecef;
            padding: 1rem;
            overflow-y: auto;
            margin-top: 200px;
        }
        
        #search {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-bottom: 1rem;
            font-size: 14px;
        }
        
        .nav-item {
            padding: 0.75rem;
            margin-bottom: 0.5rem;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .nav-item:hover {
            background-color: #f8f9fa;
        }
        
        .nav-path {
            display: block;
            font-weight: 600;
            margin-bottom: 0.25rem;
        }
        
        .nav-methods {
            font-size: 12px;
            color: #6c757d;
        }
        
        main {
            margin-left: 300px;
            padding: 2rem;
            margin-top: 200px;
        }
        
        .endpoint {
            background: white;
            border-radius: 8px;
            margin-bottom: 2rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .endpoint-header {
            padding: 1.5rem;
            background-color: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .endpoint-header h3 {
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 1.2rem;
            color: #495057;
        }
        
        .methods {
            display: flex;
            gap: 0.5rem;
        }
        
        .method-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .method-get { background-color: #28a745; color: white; }
        .method-post { background-color: #007bff; color: white; }
        .method-put { background-color: #ffc107; color: black; }
        .method-delete { background-color: #dc3545; color: white; }
        .method-patch { background-color: #6f42c1; color: white; }
        
        .endpoint-content {
            padding: 1.5rem;
        }
        
        .summary {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #495057;
        }
        
        .description {
            color: #6c757d;
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        
        .endpoint-content h4 {
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            color: #495057;
        }
        
        .endpoint-content ul {
            margin-left: 1rem;
        }
        
        .endpoint-content li {
            margin-bottom: 0.25rem;
        }
        
        code {
            background-color: #f8f9fa;
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            nav {
                display: none;
            }
            
            main {
                margin-left: 0;
                margin-top: 0;
            }
        }
        """
    
    def _generate_javascript(self) -> str:
        """Generate JavaScript for interactive features."""
        return """
        // Search functionality
        document.getElementById('search').addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            const navItems = document.querySelectorAll('.nav-item');
            const endpoints = document.querySelectorAll('.endpoint');
            
            navItems.forEach((item, index) => {
                const path = item.querySelector('.nav-path').textContent.toLowerCase();
                const methods = item.querySelector('.nav-methods').textContent.toLowerCase();
                
                if (path.includes(query) || methods.includes(query)) {
                    item.style.display = 'block';
                    endpoints[index].style.display = 'block';
                } else {
                    item.style.display = 'none';
                    endpoints[index].style.display = 'none';
                }
            });
        });
        
        // Scroll to endpoint
        function scrollToEndpoint(index) {
            const endpoints = document.querySelectorAll('.endpoint');
            if (endpoints[index]) {
                endpoints[index].scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Highlight active nav item
        window.addEventListener('scroll', function() {
            const endpoints = document.querySelectorAll('.endpoint');
            const navItems = document.querySelectorAll('.nav-item');
            
            let current = 0;
            endpoints.forEach((endpoint, index) => {
                if (endpoint.getBoundingClientRect().top <= 100) {
                    current = index;
                }
            });
            
            navItems.forEach(item => item.classList.remove('active'));
            if (navItems[current]) {
                navItems[current].classList.add('active');
            }
        });
        """
    
    def _generate_markdown_template(self) -> str:
        """Generate Markdown template for documentation."""
        content = f"""# {self.metadata['title']}

Version: {self.metadata['version']}

{self.metadata['description']}

## Endpoints

"""
        
        for endpoint in self.endpoints:
            methods = ", ".join(endpoint['methods'])
            content += f"""### {endpoint['path']}

**Methods:** {methods}

**Summary:** {endpoint['summary']}

**Description:** {endpoint['description']}

"""
            
            if endpoint['parameters']:
                content += "**Parameters:**\n\n"
                for param in endpoint['parameters']:
                    param_type = param.get('type', 'string')
                    required = "✅ Required" if param.get('required', False) else "❌ Optional"
                    content += f"- `{param['name']}` ({param_type}) - {required}\n"
                content += "\n"
            
            content += "---\n\n"
        
        return content


def load_config(config_path: str) -> Dict[str, Any]:
    """Load configuration from YAML file."""
    try:
        with open(config_path, 'r') as f:
            return yaml.safe_load(f)
    except Exception as e:
        print(f"⚠️  Warning: Failed to load config file: {e}")
        return {}


def main():
    """Main CLI function."""
    parser = argparse.ArgumentParser(description='Generate API documentation from code annotations')
    parser.add_argument('--input', '-i', required=True, help='Input file or directory')
    parser.add_argument('--output', '-o', default='./docs', help='Output directory')
    parser.add_argument('--source', '-s', choices=['fastapi', 'flask', 'openapi'], default='fastapi', help='Source type')
    parser.add_argument('--format', '-f', choices=['html', 'markdown', 'both'], default='html', help='Output format')
    parser.add_argument('--config', '-c', help='Configuration file path')
    parser.add_argument('--title', help='API title')
    parser.add_argument('--version', help='API version')
    parser.add_argument('--description', help='API description')
    parser.add_argument('--serve', action='store_true', help='Serve documentation locally')
    parser.add_argument('--port', type=int, default=8080, help='Server port')
    
    args = parser.parse_args()
    
    # Load configuration
    config = {}
    if args.config:
        config = load_config(args.config)
    
    # Override config with CLI arguments
    if args.title:
        config['title'] = args.title
    if args.version:
        config['version'] = args.version
    if args.description:
        config['description'] = args.description
    
    # Initialize generator
    generator = APIDocumentationGenerator(config)
    
    # Override metadata if provided
    if args.title:
        generator.metadata['title'] = args.title
    if args.version:
        generator.metadata['version'] = args.version
    if args.description:
        generator.metadata['description'] = args.description
    
    print(f"🚀 Generating documentation from {args.source} source...")
    
    try:
        # Parse source
        if args.source == 'fastapi':
            generator.parse_fastapi_app(args.input)
        elif args.source == 'openapi':
            generator.parse_openapi_spec(args.input)
        elif args.source == 'flask':
            print("Flask support coming soon!")
            return
        
        # Generate output
        if args.format in ['html', 'both']:
            generator.generate_html_documentation(args.output)
        
        if args.format in ['markdown', 'both']:
            generator.generate_markdown_documentation(args.output)
        
        # Serve documentation
        if args.serve:
            import http.server
            import socketserver
            import webbrowser
            import os
            
            os.chdir(args.output)
            
            Handler = http.server.SimpleHTTPRequestHandler
            with socketserver.TCPServer(("", args.port), Handler) as httpd:
                url = f"http://localhost:{args.port}"
                print(f"🌐 Serving documentation at {url}")
                webbrowser.open(url)
                httpd.serve_forever()
    
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
