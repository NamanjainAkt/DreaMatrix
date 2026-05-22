# Serverless Migration + Frontend Revamp

## Goal
Migrate the Express/MongoDB backend to Netlify Functions (serverless Node.js) and revamp all pages with a modern clean design.

## Architecture Analysis

### Current
```
React SPA  ──HTTP──>  Express Server (Node.js)  ──> MongoDB Atlas
(vite, MUI,              localhost:8080              Cloudinary
styled-components)        Gemini AI                  File system (temp)
```

### Target
```
React SPA ──HTTP──> Netlify Functions (serverless Node.js) ──> MongoDB Atlas
(vite, MUI,             netlify/functions/                    Cloudinary
styled-components)       Gemini AI (in-memory, no fs)
```

### Why Netlify Functions (not Edge Functions)
Edge Functions use Deno runtime — Mongoose, Cloudinary SDK, and Google GenAI SDK all require Node.js. Netlify Functions use Node.js (AWS Lambda) and support all existing dependencies. They still run on Netlify's edge network with global distribution.

## Tasks

### Phase 1: Netlify Foundation
- [ ] Create `netlify.toml` with build config, SPA redirect, function settings
- [ ] Create `netlify/functions/` directory
- [ ] Update `.gitignore` for netlify artifacts
- [ ] Add `@netlify/functions` to server dependencies

### Phase 2: Serverless Function Conversion
- [ ] Create `netlify/functions/generate.js` - POST handler for Gemini image gen (no fs)
- [ ] Create `netlify/functions/posts.js` - GET/POST handlers with MongoDB serverless connection caching
- [ ] Eliminate `server/generateImage.js` file system operations - upload base64 directly to Cloudinary
- [ ] Add connection caching pattern for MongoDB in serverless (warm lambda)

### Phase 3: Client API Update
- [ ] Update `client/src/api/index.js` to use relative or deployed Netlify function URL
- [ ] Update `vite.config.js` dev proxy for local function development

### Phase 4: UI Revamp - Theme & Global Styles
- [ ] Redesign `utils/Theme.js` - cleaner indigo/slate palette, refined tokens
- [ ] Update `index.css` - modern background, better typography

### Phase 5: UI Revamp - Components
- [ ] Redesign `Navbar.jsx` - modern clean nav with glassmorphism
- [ ] Redesign `ImageCard.jsx` - cleaner cards, better hover effects
- [ ] Redesign `SearchBar.jsx` - modern search with icon
- [ ] Redesign `GenerateImageForm.jsx` - cleaner form layout
- [ ] Redesign `GeneratedImageCard.jsx` - better image preview
- [ ] Redesign `TextInput.jsx` - cleaner inputs
- [ ] Redesign `Loader.jsx` - simpler modern loader

### Phase 6: UI Revamp - Pages
- [ ] Redesign `Home.jsx` - modern gallery layout, better empty states
- [ ] Redesign `CreatePost.jsx` - cleaner two-column layout
- [ ] Redesign `App.jsx` - page transitions, layout polish

### Phase 7: Build Verification
- [ ] Run `npm run build` on client to confirm no errors
- [ ] Review all changes for consistency

## Done When
- [ ] All Express server code migrated to Netlify Functions
- [ ] No file system operations in serverless functions
- [ ] MongoDB connection caching works in serverless context
- [ ] Client API points to Netlify Functions
- [ ] All pages have modern, clean, consistent design
- [ ] Frontend builds without errors
