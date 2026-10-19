// Precios en USD. Los textos de cada plan (nombre, descripcion, items y boton)
// estan en es.json / en.json bajo pricing.plans.<id>.
//
// Los packs no se publican: el diseño aprobado los resuelve con un boton
// "Consultar por precio de los packs" que abre WhatsApp (ver Pricing.jsx).

export const plans = [
  { id: 'light', price: 6, featured: false },
  { id: 'omni', price: 8, featured: true },
]
