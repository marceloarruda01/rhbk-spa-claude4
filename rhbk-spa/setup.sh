#!/bin/bash

# RHBK SPA Demo Setup Script

echo "🚀 RHBK SPA Demo Setup"
echo "======================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Start Keycloak
echo "🐳 Starting Keycloak with Docker Compose..."
docker-compose up -d

# Wait for Keycloak to be ready
echo "⏳ Waiting for Keycloak to start (this may take a few minutes)..."
sleep 30

# Check if Keycloak is running
echo "🔍 Checking Keycloak status..."
if curl -f http://localhost:8080/health > /dev/null 2>&1; then
    echo "✅ Keycloak is running!"
else
    echo "⚠️  Keycloak might still be starting. Please wait a bit more and check manually."
fi

echo ""
echo "📋 Next Steps:"
echo "1. Open Keycloak Admin Console: http://localhost:8080"
echo "2. Login with: admin / admin"
echo "3. Follow the setup instructions in SETUP.md to configure:"
echo "   - Create realm: 'demo'"
echo "   - Create client: 'rhbk-spa-client'"
echo "   - Create test user"
echo "4. Start the Angular app: npm start"
echo "5. Open the app: http://localhost:4200"
echo ""
echo "📚 For detailed setup instructions, see SETUP.md"
echo ""

# Check if Angular dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Angular dependencies..."
    npm install
fi

echo "🎉 Setup complete! You can now configure Keycloak and test the application."
