# 🚀 Setup Rápido - 5 Minutos

## 1. Reemplazar Información de Contacto

En `index.html`, buscar y cambiar:
- `soporte@inventarioapp.com` → TU_EMAIL
- Enlaces de redes sociales (líneas 520-535)
- Enlace de Google Play (línea 82)

## 2. Imágenes Temporales (Funciona Inmediatamente)

Reemplaza estas líneas en `index.html`:

```html
<!-- Línea 103: Screenshot de la app -->
<img src="assets/app-screenshot.png" alt="Inventario App Screenshot" class="app-screenshot">
<!-- CAMBIAR POR: -->
<img src="https://via.placeholder.com/300x600/F5F5F5/666666?text=App+Screenshot" alt="Inventario App Screenshot" class="app-screenshot">

<!-- Líneas 245-247: Avatares -->
<img src="assets/avatar-1.jpg" alt="Lucía" class="avatar">
<img src="assets/avatar-2.jpg" alt="Carlos" class="avatar">  
<img src="assets/avatar-3.jpg" alt="Ana" class="avatar">
<!-- CAMBIAR POR: -->
<img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Lucía" class="avatar">
<img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Carlos" class="avatar">
<img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Ana" class="avatar">
```

## 3. Probar Inmediatamente

```bash
cd C:\InventarioAppWeb
start index.html
```

¡Listo! Tu sitio funciona perfectamente con imágenes temporales.