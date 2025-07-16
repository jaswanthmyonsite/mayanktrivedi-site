// package.json
{
  "name": "mayank-trivedi-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next export",
    "lint": "next lint",
    "analyze": "ANALYZE=true next build"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.88.0",
    "three": "^0.158.0",
    "framer-motion": "^10.16.0",
    "react-intersection-observer": "^9.5.0",
    "@headlessui/react": "^1.7.0",
    "react-hook-form": "^7.47.0",
    "clsx": "^2.0.0",
    "date-fns": "^2.30.0",
    "react-icons": "^4.11.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "eslint": "^8.53.0",
    "eslint-config-next": "^14.0.0",
    "@next/bundle-analyzer": "^14.0.0"
  }
}

// next.config.js
/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
      },
    })
    return config
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = withBundleAnalyzer(nextConfig)

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A2540',
          'navy-light': '#1E3A5F',
          teal: '#0891B2',
          'teal-light': '#06B6D4',
          walnut: '#6B4423',
          'walnut-light': '#92603A',
          orange: '#EA580C',
          'orange-light': '#FB923C',
          cream: '#FAFAF9',
          'gray-soft': '#F5F5F4',
        },
      },
      fontFamily: {
        sans: ['Lato', 'system-ui', 'sans-serif'],
        serif: ['EB Garamond', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

// jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"],
      "@/context/*": ["context/*"],
      "@/styles/*": ["styles/*"],
      "@/utils/*": ["utils/*"],
      "@/public/*": ["public/*"]
    }
  }
}

// .eslintrc.json
{
  "extends": ["next", "next/core-web-vitals"],
  "rules": {
    "react/prop-types": "off",
    "jsx-a11y/anchor-is-valid": "off"
  }
}

// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}