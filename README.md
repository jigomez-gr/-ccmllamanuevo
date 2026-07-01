# CCMFALLA — Copia Local
## Ciclo de Conciertos Manuel de Falla

Copia local funcional del sitio web **https://www.ccmfalla.com/**

Descargada el: **28/06/2026**

---

## Cómo abrir la copia local

### Opción A — Live Server (recomendado en VS Code)

1. Abre VS Code.
2. Abre la carpeta `NUEVO_PROYECTO`.
3. Instala la extensión **Live Server** (ritwickdey.liveserver) si no la tienes.
4. Haz clic derecho en `index.html` → **Open with Live Server**.
5. Se abrirá en el navegador en `http://127.0.0.1:5500/index.html`.

### Opción B — Directamente desde el navegador

1. Arrastra `NUEVO_PROYECTO/index.html` a Chrome, Firefox o Edge.
2. Navega por las páginas usando el menú superior.

> **Nota:** Con Live Server la experiencia es más fiel (mejor carga de recursos, sin restricciones CORS).

---

## Estructura del proyecto

```
NUEVO_PROYECTO/
├── index.html                  ← Página de inicio
├── pages/
│   ├── quienes-somos.html      ← Quiénes somos
│   ├── temporada.html          ← Temporada 2021/2022
│   ├── interpretes.html        ← Intérpretes
│   ├── contacto.html           ← Contacto
│   ├── entradas.html           ← Entradas y abonos
│   ├── ateneo.html             ← Ateneo de Madrid
│   ├── beethoven.html          ← L. van Beethoven
│   ├── flamenco.html           ← Flamenco
│   └── galeria.html            ← Galería
├── assets/
│   ├── css/
│   │   ├── runtime.min.css     ← CSS runtime IONOS
│   │   ├── site-global.min.css ← CSS global del sitio (~262 KB)
│   │   ├── home.min.css        ← CSS específico de inicio
│   │   ├── widget_*.css        ← CSS específico por página
│   │   └── 1and1-runtime.css   ← Placeholder (bloqueado externamente)
│   ├── js/
│   │   ├── jquery.min.js       ← jQuery 2.2.4
│   │   └── runtime.min.js      ← JavaScript runtime IONOS (~339 KB)
│   └── img/
│       └── [~90 imágenes]      ← Todas las imágenes del sitio
└── README.md
```

---

## Páginas disponibles

| Página | Archivo |
|--------|---------|
| Inicio | `index.html` |
| Quiénes somos | `pages/quienes-somos.html` |
| Temporada 2021/2022 | `pages/temporada.html` |
| Intérpretes | `pages/interpretes.html` |
| Contacto | `pages/contacto.html` |
| Entradas y abonos | `pages/entradas.html` |
| Ateneo de Madrid | `pages/ateneo.html` |
| L. van Beethoven | `pages/beethoven.html` |
| Flamenco | `pages/flamenco.html` |
| Galería | `pages/galeria.html` |

---

## Qué funciona

- ✅ Visualización completa de todas las páginas
- ✅ Navegación entre páginas mediante el menú
- ✅ Imágenes locales (~90 imágenes descargadas)
- ✅ CSS locales (runtime, global, por página)
- ✅ JavaScript runtime localizado
- ✅ Tipografías (cargadas desde CDN de fuentes con CORS habilitado)
- ✅ Diseño responsive
- ✅ Animaciones y efectos de scroll
- ✅ Galería de imágenes

## Qué no funciona (limitaciones)

- ❌ **Formulario de contacto** — requiere servidor backend
- ❌ **Registro de newsletter** — redirige a la página de contacto
- ❌ **Service Worker** — desactivado (no aplica en local)
- ❌ Páginas internas no descargadas:
  - `/lamenti` — El nacimiento de la ópera
  - `/tango-y-música-folklórica-argentina` — Tango y música folklórica
  - `/60-años-del-festival-de-cante-jondo`
  - `/blanco`
- ❌ **1and1-runtime.css** — CSS propietario bloqueado; sustituido por placeholder vacío (impacto visual mínimo)

---

## Recursos aún externos

Las siguientes fuentes tipográficas se siguen cargando desde CDN (requieren conexión a internet para correcta visualización):
- Roboto, Montserrat, Cabin, Fjalla One, Crete Round, Oswald, Source Sans Pro, Alegreya
- FontAwesome (iconos)

> Estas fuentes usan headers CORS correctos y no requieren servidor local para funcionar.

---

## Notas técnicas

- Sitio original construido con **IONOS Website Builder** (DUDA/MultiScreenSite)
- CSS principales descargados desde CDN con URLs firmadas (expiran ~junio 2027)
- Imágenes descargadas desde `le-cdn.website-editor.net` con limpieza de nombres
- Navegación adaptada de URLs relativas del servidor a rutas de fichero locales
- La página original usa `AllowAjax: false`, lo que facilita la navegación estática
