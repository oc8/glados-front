/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
				dark: false,
        colors: {
          primary: '#0017C4',
          secondary: '#2D73FF',
					trinary: '#fff',
					background: '#f9f9f9',
					text: '#000',
					white: '#fff',
					black: '#050B3B'
        },
      },
      dark: {
				dark: true,
        colors: {
          primary: '#2D73FF',
          secondary: '#0017C4',
					background: "0017C4",
					text: '#fff',
					white: '#ffffff',
					black: '#050B3B'
        },
      },
    },
  },
})
