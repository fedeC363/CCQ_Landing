// Datos de marca. Es el unico lugar donde se escriben el nombre, el telefono y
// el eslogan: si alguno cambia, se cambia aca y se actualiza toda la pagina.
// Los textos de es.json / en.json los usan con {name}, {shortName}, {phone} y {year}.

export const site = {
  name: 'CCQ Studio',
  longName: 'CCQ Creative Studio',
  // Nombre corto usado en el mensaje precargado de WhatsApp ("Hola CCQ, ...").
  shortName: 'CCQ',

  // [PENDIENTE] Eslogan definitivo. Se usa la opcion 1, recomendada en el copy.
  slogan: {
    es: 'Creativos que rinden, en 24 horas.',
    en: 'Creatives that perform, in 24 hours.',
  },

  whatsapp: {
    // Formato internacional sin "+" ni espacios, como lo pide wa.me.
    number: '5491131775300',
    display: '+54 9 11 3177-5300',
  },

  year: 2026,

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
