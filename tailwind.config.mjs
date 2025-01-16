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
              letterSpacing: '-0.1px',
              marginTop: '32px',
              marginBottom: '8px',
            },
            ul: {
              marginTop: '16px',
              marginBottom: '16px',
              li: {
                marginTop: '8px',
                marginBottom: '8px',
                paddingLeft: '20px',
                fontSize: '15px',
                lineHeight: '24px',
                '&::before': {
                  backgroundColor: '#425466',
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  marginTop: '10px',
                }
              }
            },
            a: {
              color: '#635bff',
              textDecoration: 'none',
              fontWeight: '400',
              '&:hover': {
                textDecoration: 'underline',
              }
            },
            code: {
              color: '#1a1f36',
              backgroundColor: '#f7fafc',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Liberation Mono, Courier New, monospace',
            },
            pre: {
              backgroundColor: '#f7fafc',
              color: '#1a1f36',
              padding: '16px',
              borderRadius: '8px',
              marginTop: '24px',
              marginBottom: '24px',
              code: {
                backgroundColor: 'transparent',
                padding: '0',
                color: 'inherit',
                fontSize: '14px',
                lineHeight: '20px',
              }
            },
            blockquote: {
              borderLeftColor: '#e5e5e5',
              borderLeftWidth: '4px',
              paddingLeft: '16px',
              marginTop: '24px',
              marginBottom: '24px',
              color: '#425466',
            },
            table: {
              width: '100%',
              borderCollapse: 'collapse',
              margin: '0',
              'thead th': {
                borderBottom: '2px solid #e5e5e5',
                padding: '12px 16px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#1a1f36',
              },
              'tbody td': {
                borderBottom: '1px solid #e5e5e5',
                padding: '12px 16px',
                verticalAlign: 'top',
              },
              'tbody tr:last-child td': {
                borderBottom: 'none',
              }
            }
          }
        }
      },
      keyframes: {
        check: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.8)',
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)',
          }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        check: 'check 0.3s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};