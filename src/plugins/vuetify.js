import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        remake: '#97D61B',
        remake_l: '#DCEDC8',
        remake_d: '#689F38',
        remake_bg: '#DCEDC8',
        text: '#212121',
        text_s: '#757575',
        accent: '#6CDEE3',
        divider: '#BDBDBD',
        // error: colors.red,
        // warning: colors.yellow,
        // info: colors.grey,
        success: '#795548',
        mycolor: '#e0e0e0'
      },
      dark: {
        primary: '#ff0000'
        // secondary: colors.green,
      }
    }
  }
})
