# Deploying Preact App to 11ty Site Subdirectory

## Configuration Changes Made

### 1. Vite Configuration
- Added `base: '/pdf-audit/'` for production builds
- Assets will be correctly prefixed with subdirectory path

### 2. API Configuration  
- Created `src/config.js` for environment-specific API URLs
- Development uses `http://localhost:3333` 
- Production uses relative URLs or configured domain

### 3. Environment Variables
- Uses `NODE_ENV` to determine which API config to use
- Development: local endpoints
- Production: deployed endpoints

## Deployment Steps

### Step 1: Build the Preact App
```bash
npm run build
```

### Step 2: Copy Built Files to static Site
Copy contents of `dist/` folder to your static site's subdirectory:
