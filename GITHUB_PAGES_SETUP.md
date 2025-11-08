# 🚀 GitHub Pages + Formulario Funcional

## ✅ Lo que SÍ funciona en GitHub Pages:

### 1. **Formspree** (Recomendado)
```html
<!-- Ya configurado en tu HTML -->
<form action="https://formspree.io/f/TU_ID" method="POST">
```

**Pasos:**
1. Ve a https://formspree.io
2. Crea cuenta con tu email
3. Crea nuevo form
4. Copia tu ID único
5. Reemplaza `TU_ID` en el HTML
6. ¡Listo! Los emails llegan a tu bandeja

### 2. **EmailJS** (Alternativa)
- 100% JavaScript
- 200 emails gratis/mes
- Más complejo de configurar

### 3. **Mailto Simple** (Inmediato)
```html
<a href="mailto:tu-email@gmail.com?subject=Contacto%20desde%20web&body=Hola,%20me%20interesa%20Inventario%20App" 
   class="btn btn-primary">
   Enviar Email
</a>
```

## 🚀 Deploy en GitHub Pages:

1. **Crear repositorio** en GitHub
2. **Subir archivos** de `C:\InventarioAppWeb\`
3. **Activar Pages** en Settings > Pages
4. **¡Listo!** Tu sitio estará en `usuario.github.io/repo`

## 📧 Resultado:
- ✅ Sitio web público y gratuito
- ✅ Formulario que envía emails reales
- ✅ Sin servidor ni backend necesario