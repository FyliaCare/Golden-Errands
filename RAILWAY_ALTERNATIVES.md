# Railway Alternative Configuration
# If the main railway.json doesn't work, try this approach

# Method 1: Simple monorepo detection
# Railway will automatically detect the backend folder structure

# Method 2: Use root-level scripts
# The package.json already has railway-specific scripts

# Method 3: Environment variable approach
# Set these in Railway dashboard:
# - NODE_ENV=production
# - DATABASE_URL=your_postgresql_url
# - JWT_SECRET=your_jwt_secret
# - RAILWAY_STATIC_URL=your_domain

# Method 4: Use Procfile instead of railway.json
# Create a Procfile with: web: npm run start:railway

# Method 5: Force specific Node.js version
# Add to railway.json or use this nixpacks.toml configuration