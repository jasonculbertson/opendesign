/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#425466',
            '--tw-prose-headings': '#1a1f36',
            color: '#425466',
            fontSize: '15px',
            lineHeight: '24px',
            maxWidth: 'none',
            p: {
              marginTop: '16px',
              marginBottom: '16px',
              fontSize: '15px',
              lineHeight: '24px',
              color: '#425466',
            },
            strong: {
              color: '#1a1f36',
              fontWeight: '500',
            },
            h1: {
              color: '#1a1f36',
              fontWeight: '600',
              fontSize: '40px',
              lineHeight: '48px',
              letterSpacing: '-0.4px',
              marginBottom: '16px',
              marginTop: '0',
            },
            h2: {
              color: '#1a1f36',
              fontWeight: '600',
              fontSize: '24px',
              lineHeight: '32px',
              letterSpacing: '-0.2px',
              marginTop: '48px',
              marginBottom: '16px',
            },
            h3: {
              color: '#1a1f36',
              fontWeight: '600',
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '-0.2px',
              marginTop: '32px',
              marginBottom: '12px',
            },
            h4: {
              color: '#1a1f36',
              fontWeight: '600',
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '-0.2px',
              marginTop: '24px',
              marginBottom: '8px',
            },
            img: {
              marginTop: '24px',
              marginBottom: '24px',
            },
            code: {
              color: '#1a1f36',
              backgroundColor: '#f7fafc',
              borderRadius: '4px',
              padding: '2px 4px',
              fontSize: '14px',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#f7fafc',
              borderRadius: '8px',
              padding: '16px',
              marginTop: '24px',
              marginBottom: '24px',
              code: {
                backgroundColor: 'transparent',
                padding: '0',
                fontSize: '14px',
                lineHeight: '24px',
              },
            },
            ol: {
              marginTop: '16px',
              marginBottom: '16px',
              paddingLeft: '20px',
              li: {
                marginTop: '8px',
                marginBottom: '8px',
                paddingLeft: '8px',
              },
            },
            ul: {
              marginTop: '16px',
              marginBottom: '16px',
              paddingLeft: '20px',
              li: {
                marginTop: '8px',
                marginBottom: '8px',
                paddingLeft: '8px',
              },
            },
            a: {
              color: '#6366f1',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            blockquote: {
              fontStyle: 'normal',
              marginTop: '24px',
              marginBottom: '24px',
              paddingLeft: '20px',
              borderLeftWidth: '4px',
              borderLeftColor: '#e2e8f0',
              color: '#425466',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
}