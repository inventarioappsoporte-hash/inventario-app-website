# 📧 Hacer el Formulario Funcional

## 🚀 Opción 1: Formspree (Recomendado)

### Pasos:
1. Ve a https://formspree.io
2. Crea cuenta gratuita
3. Crea un nuevo form
4. Copia tu FORM_ID
5. En `index.html` línea 463, cambia:
   ```html
   <form id="contactForm" action="https://formspree.io/f/TU_FORM_ID" method="POST">
   ```

### Resultado:
- ✅ Emails llegan a tu bandeja
- ✅ 50 envíos gratis/mes
- ✅ Sin código backend

## 🌐 Opción 2: Netlify Forms

### Si deployeas en Netlify:
1. Agrega `netlify` al form:
   ```html
   <form netlify name="contact" id="contactForm">
   ```
2. Deploy en Netlify
3. ✅ Formularios automáticos

## 📱 Opción 3: EmailJS

### Para mantener JavaScript:
1. Cuenta en https://emailjs.com
2. Configura servicio de email
3. Reemplaza función en `js/main.js`

## ⚡ Más Rápido: Solo Email

Cambia el botón por un mailto:
```html
<a href="mailto:tu-email@gmail.com?subject=Contacto desde web" class="btn btn-primary">
    Enviar Email
</a>
```

## 🎯 Recomendación

**Usa Formspree** - 5 minutos y funciona perfectamente.