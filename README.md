# 🎧 Connecting Senses

Una aplicación web interactiva para el entrenamiento auditivo y la localización espacial del sonido, diseñada para mejorar las habilidades de percepción auditiva mediante juegos educativos.

## 📋 Descripción

Connecting Senses es una plataforma educativa que combina tecnología web moderna con principios de entrenamiento auditivo. La aplicación utiliza audio binaural para crear experiencias inmersivas que ayudan a los usuarios a desarrollar sus habilidades de localización espacial del sonido.

## ✨ Características Principales

### 🎵 Módulo de Entrenamiento
- **Reproducción de sonidos interactiva**: 4 sonidos diferentes para familiarización
- **Control de audio avanzado**: Gestión inteligente de reproducción con detención automática
- **Interfaz intuitiva**: Imágenes clicables con feedback visual y auditivo

### 🎮 Módulo de Juego
- **Audio binaural**: Sonidos dirigidos específicamente al oído izquierdo o derecho
- **Sistema de puntuación**: Seguimiento del progreso con estadísticas en tiempo real
- **6 rondas de juego**: 5 rondas con sonidos aleatorios + 1 ronda final especial
- **Algoritmo balanceado**: Distribución equitativa de sonidos (3 izquierda, 3 derecha)
- **Feedback visual**: Colores dinámicos para indicar aciertos y errores

### 📱 Experiencia de Usuario
- **Responsive design**: Optimizado para diferentes tamaños de pantalla
- **Orientación forzada**: Requiere orientación horizontal en dispositivos móviles
- **Navegación fluida**: Transiciones suaves entre secciones
- **Accesibilidad**: Diseño intuitivo con iconos y textos claros

## 🛠️ Tecnologías Utilizadas

- **[Next.js 15](https://nextjs.org/)** - Framework de React para aplicaciones web
- **[React](https://reactjs.org/)** - Biblioteca de JavaScript para interfaces de usuario
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS para diseño rápido
- **[Web Audio API](https://developer.mozilla.org/es/docs/Web/API/Web_Audio_API)** - API nativa para control de audio binaural
- **Google Fonts** - Tipografía personalizada (Bungee, Geist)

## 📁 Estructura del Proyecto

```
connecting-senses/
├── src/
│   ├── app/
│   │   ├── game/
│   │   │   └── page.jsx          # Página del juego principal
│   │   ├── train/
│   │   │   └── page.jsx          # Página de entrenamiento
│   │   ├── layout.jsx            # Layout principal con OrientationGuard
│   │   └── page.jsx              # Página de inicio
│   ├── components/
│   │   ├── button.jsx            # Componente de botón reutilizable
│   │   ├── header.jsx            # Componente de cabecera
│   │   └── orientation-guard.jsx # Control de orientación móvil
│   └── styles/
│       └── globals.css           # Estilos globales
├── public/
│   ├── sounds/                   # Archivos de audio (.mp3)
│   │   ├── sound1.mp3
│   │   ├── sound2.mp3
│   │   ├── sound3.mp3
│   │   └── sound4.mp3
│   └── images/                   # Recursos visuales
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm, yarn, pnpm o bun

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/StexRoles/connecting-senses.git
cd connecting-senses
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Agregar archivos de audio**
   - Coloca tus archivos de sonido en `public/sounds/`
   - Nombra los archivos: `sound1.mp3`, `sound2.mp3`, `sound3.mp3`, `sound4.mp3`

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

5. **Abrir en el navegador**
   - Visita [http://localhost:3000](http://localhost:3000)

## 🎯 Cómo Usar la Aplicación

### Módulo de Entrenamiento (`/train`)
1. Haz clic en cualquier imagen para escuchar su sonido asociado
2. Familiarízate con los diferentes tipos de sonidos
3. Cuando estés listo, haz clic en "Iniciar" para ir al juego

### Módulo de Juego (`/game`)
1. **Primera ronda**: Haz clic en "Reproducir Primer Sonido"
2. **Escucha atentamente**: El sonido saldrá por el oído izquierdo o derecho
3. **Haz tu elección**: Toca "IZQUIERDA" o "DERECHA" según donde escuchaste el sonido
4. **Recibe feedback**: Verde para correcto, rojo para incorrecto
5. **Rondas automáticas**: Las siguientes rondas se reproducen automáticamente
6. **Resultados finales**: Ve tu puntuación al completar las 6 rondas

## 🎧 Requisitos de Hardware

- **Audífonos o auriculares estéreo** (obligatorio para la experiencia binaural)
- Dispositivo con soporte para Web Audio API
- Navegador moderno (Chrome, Firefox, Safari, Edge)

## 🌐 Compatibilidad

- ✅ **Escritorio**: Windows, macOS, Linux
- ✅ **Móvil**: iOS Safari, Android Chrome (orientación horizontal)
- ✅ **Navegadores**: Chrome 66+, Firefox 60+, Safari 14+, Edge 79+

## 🔧 Algoritmos Principales

### Sistema de Audio Binaural
```javascript
// Control de panning para localización espacial
const panner = audioContext.createStereoPanner();
panner.pan.value = side === 'left' ? -1 : 1; // -1 = izquierda, 1 = derecha
```

### Generación de Secuencias Balanceadas
- Distribución equitativa: 3 sonidos izquierda + 3 derecha
- Prevención de patrones: Máximo 2 sonidos consecutivos del mismo lado
- Aleatorización controlada: Algoritmo Fisher-Yates con validación

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Steven** - [@StexRoles](https://github.com/StexRoles)

## 🙏 Agradecimientos

- Comunidad de Next.js por la excelente documentación
- MDN Web Docs por las referencias de Web Audio API
- Contribuidores de Tailwind CSS por el framework de diseño

---

⭐ **¡Dale una estrella al proyecto si te ha sido útil!**
