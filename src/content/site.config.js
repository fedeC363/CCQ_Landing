// Datos de marca. Es el unico lugar donde se escriben el nombre, el telefono y
// el eslogan: si alguno cambia, se cambia aca y se actualiza toda la pagina.
// Los textos de es.json / en.json los usan con {name}, {shortName}, {phone} y {year}.

export const site = {
  name: 'CCQ Studio',
  longName: 'CCQ Creative Studio',
  // Nombre corto usado en el mensaje precargado de WhatsApp ("Hola CCQ, ...").
  shortName: 'CCQ',

  // Logo (PNG con fondo transparente, en public/). width y height son los del
  // archivo chico: el navegador los usa para reservar el espacio.
  logo: {
    src: '/logo-480.png',
    srcSet: '/logo-480.png 480w, /logo.png 1200w',
    width: 480,
    height: 186,
  },

  // Eslogan: va debajo del logo en la barra superior y en el pie.
  slogan: {
    es: 'Si lo podés imaginar, lo producimos.',
    en: 'If you can imagine it, we produce it.',
  },

  whatsapp: {
    // Formato internacional sin "+" ni espacios, como lo pide wa.me.
    number: '5491131775300',
    display: '+54 9 11 3177-5300',
  },

  // Mail de contacto, partido en usuario y dominio para que la direccion
  // completa no quede escrita en ningun lado y los bots que juntan mails no la
  // encuentren. Se arma en tiempo de ejecucion con src/lib/email.js.
  // Aparece SOLO en el cierre (seccion 11) y en el pie.
  email: {
    user: 'ccqstudiook',
    domain: 'gmail.com',
  },

  year: 2026,

  // [PENDIENTE] Dominio definitivo. Cuando exista, poner la direccion
  // completa sin barra final, por ejemplo 'https://ccqstudio.com'.
  // Con el campo vacio, og:image y og:url quedan como rutas relativas y
  // la vista previa al compartir puede no mostrar la imagen.
  siteUrl: '',

  // Color de la barra del navegador en mobile. Debe coincidir con --color-bg
  // de tokens.css (aca no se pueden leer variables CSS).
  themeColor: '#151617',

  // [PENDIENTE] Redes sociales: todavia no existen. Cuando existan, agregar
  // objetos { id: 'instagram', label: 'Instagram', url: 'https://...' } y el
  // pie las muestra.
  social: [],
}

export const templateVars = {
  name: site.name,
  longName: site.longName,
  shortName: site.shortName,
  phone: site.whatsapp.display,
  year: site.year,
}
