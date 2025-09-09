# Etheral Shadows Component

Компонент Etheral Shadows предоставляет красивые анимированные тени с эффектами турбулентности и шума, созданные с помощью SVG фильтров и Framer Motion.

## Возможности

- 🎨 **Анимированные тени** с эффектами турбулентности
- 🎛️ **Интерактивные элементы управления** для настройки в реальном времени
- 🎭 **Предустановленные пресеты** для быстрого старта
- 🎯 **Гибкая настройка** цвета, анимации и шума
- 📱 **Адаптивный дизайн** с поддержкой различных размеров
- 🌙 **Поддержка темной темы** через CSS переменные

## Установка

Компонент уже интегрирован в проект. Убедитесь, что установлены необходимые зависимости:

```bash
npm install framer-motion
```

## Использование

### Базовый компонент

```tsx
import { Component as EtheralShadow } from '@/components/etheral-shadow';

function MyComponent() {
  return (
    <EtheralShadow
      color="rgba(128, 128, 128, 1)"
      animation={{ scale: 100, speed: 90 }}
      noise={{ opacity: 1, scale: 1.2 }}
      sizing="fill"
    />
  );
}
```

### Продвинутый компонент с элементами управления

```tsx
import { EtheralShadowAdvanced } from '@/components/ui/etheral-shadow-advanced';

function MyComponent() {
  return (
    <EtheralShadowAdvanced
      color="rgba(147, 51, 234, 0.8)"
      animation={{ scale: 75, speed: 60 }}
      noise={{ opacity: 0.8, scale: 1.5 }}
      sizing="fill"
      showControls={true}
    >
      <h1>Ваш контент здесь</h1>
    </EtheralShadowAdvanced>
  );
}
```

### Компонент с пресетами

```tsx
import { EtheralShadowPresets } from '@/components/ui/etheral-shadow-presets';

function MyComponent() {
  return (
    <EtheralShadowPresets>
      <h1>Ваш контент здесь</h1>
    </EtheralShadowPresets>
  );
}
```

## API

### EtheralShadowAdvanced Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `color` | `string` | `'rgba(128, 128, 128, 1)'` | Цвет тени |
| `animation` | `AnimationConfig` | - | Конфигурация анимации |
| `noise` | `NoiseConfig` | - | Конфигурация шума |
| `sizing` | `'fill' \| 'stretch'` | `'fill'` | Размер маски |
| `maskImage` | `string` | - | URL изображения маски |
| `showControls` | `boolean` | `false` | Показать элементы управления |
| `children` | `React.ReactNode` | - | Контент для отображения поверх тени |
| `className` | `string` | - | CSS классы |
| `style` | `CSSProperties` | - | Инлайн стили |

### AnimationConfig

```tsx
interface AnimationConfig {
  scale: number;  // 1-100, интенсивность анимации
  speed: number;  // 1-100, скорость анимации
}
```

### NoiseConfig

```tsx
interface NoiseConfig {
  opacity: number;  // 0-1, прозрачность шума
  scale: number;    // 0-2, масштаб шума
}
```

## Демо-страницы

Проект включает несколько демо-страниц для изучения возможностей:

- `/demo/etheral-shadow` - Базовое демо
- `/demo/etheral-shadow-advanced` - Продвинутое демо с элементами управления
- `/demo/etheral-shadow-presets` - Демо с предустановленными стилями
- `/demo/etheral-shadow-showcase` - Обзор всех возможностей

## Технические детали

### Зависимости

- **React 19+** - Основной фреймворк
- **Framer Motion 12+** - Анимации
- **Tailwind CSS 4** - Стилизация
- **TypeScript** - Типизация

### SVG Фильтры

Компонент использует сложные SVG фильтры для создания эффектов:

- `feTurbulence` - Создает турбулентность
- `feColorMatrix` - Управляет цветами и вращением оттенка
- `feDisplacementMap` - Применяет искажения

### Производительность

- Анимации оптимизированы с помощью `useMotionValue`
- SVG фильтры кэшируются по ID экземпляра
- Анимации останавливаются при размонтировании компонента

## Кастомизация

### Собственные маски

Вы можете использовать собственные изображения для масок:

```tsx
<EtheralShadowAdvanced
  maskImage="https://your-domain.com/your-mask.png"
  // ... другие props
/>
```

### CSS переменные

Компонент использует CSS переменные для цветов, которые можно переопределить:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... другие переменные */
}
```

## Примеры использования

### Hero секция

```tsx
<EtheralShadowAdvanced
  color="rgba(147, 51, 234, 0.8)"
  animation={{ scale: 75, speed: 60 }}
  noise={{ opacity: 0.8, scale: 1.5 }}
  className="h-screen"
>
  <div className="text-center">
    <h1 className="text-6xl font-bold text-white mb-4">
      Добро пожаловать
    </h1>
    <p className="text-xl text-white/80">
      Красивые анимированные тени
    </p>
  </div>
</EtheralShadowAdvanced>
```

### Карточка продукта

```tsx
<div className="relative w-80 h-60">
  <EtheralShadowAdvanced
    color="rgba(59, 130, 246, 0.6)"
    animation={{ scale: 40, speed: 30 }}
    noise={{ opacity: 0.4, scale: 0.8 }}
  >
    <div className="p-6">
      <h3 className="text-xl font-bold text-white">Название продукта</h3>
      <p className="text-white/80">Описание продукта</p>
    </div>
  </EtheralShadowAdvanced>
</div>
```

## Поддержка браузеров

Компонент использует современные веб-технологии и поддерживает:

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Лицензия

Компонент является частью проекта club-site и следует его лицензии.
