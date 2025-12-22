# How to Run the Next.js Project

## Quick Start

### 1. Install Dependencies

First, install all required packages:

```bash
npm install
```

This will install Next.js and all other dependencies listed in `package.json`.

### 2. Environment Variables

The `.env.local` file has been created with the API base URL. If you need to modify it:

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://18.212.69.104/
```

**Note:** Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

### 3. Run Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at:

- **Local:** http://localhost:3000
- **Network:** http://[your-ip]:3000

### 4. Build for Production

To create an optimized production build:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

## Available Scripts

- `npm run dev` - Start development server (with hot reload)
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check for code issues

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, Next.js will automatically try the next available port (3001, 3002, etc.). You can also specify a port:

```bash
npm run dev -- -p 3001
```

### Module Not Found Errors

If you encounter module not found errors:

1. Delete `node_modules` and `package-lock.json`:

   ```bash
   rm -rf node_modules package-lock.json
   ```

2. Reinstall dependencies:
   ```bash
   npm install
   ```

### Environment Variables Not Working

- Ensure `.env.local` exists in the root directory
- Variables must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser
- Restart the dev server after changing environment variables

### SCSS Compilation Errors

If you see SCSS-related errors, ensure `sass` is installed:

```bash
npm install sass
```

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── layout.js           # Root layout
│   ├── page.js             # Home page (/)
│   ├── login/              # Login page (/login)
│   │   └── page.js
│   ├── product-search/     # Product listing (/product-search)
│   │   └── page.js
│   └── globals.scss        # Global styles
├── components/             # Shared components
│   └── Providers.jsx     # Redux Provider wrapper
├── public/                # Static assets
├── src/                   # Source files
│   ├── components/        # React components
│   ├── redux/            # Redux store and reducers
│   └── api/              # API configuration
├── next.config.js         # Next.js configuration
└── package.json          # Dependencies and scripts
```

## Next Steps

1. Open http://localhost:3000 in your browser
2. Test all routes:
   - Home page: http://localhost:3000
   - Login: http://localhost:3000/login
   - Product Search: http://localhost:3000/product-search
3. Check the browser console for any errors
4. Verify API calls are working correctly

## Need Help?

- Check the `MIGRATION_GUIDE.md` for detailed migration information
- Review Next.js documentation: https://nextjs.org/docs
- Check the browser console and terminal for error messages
