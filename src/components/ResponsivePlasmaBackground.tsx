'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import PlasmaBackground from './ui/shadcn-io/plasma-background';

interface ResponsivePlasmaBackgroundProps {
  color?: string;
  speed?: number;
  direction?: "forward" | "reverse" | "pingpong";
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
  className?: string;
}

export function ResponsivePlasmaBackground(props: ResponsivePlasmaBackgroundProps) {
  const isMobile = useIsMobile();

  // На мобильных устройствах показываем статичный кадр анимации
  if (isMobile) {
    return (
      <PlasmaBackground 
        {...props} 
        speed={0} // Останавливаем анимацию
        mouseInteractive={false} // Отключаем интерактивность
      />
    );
  }

  return <PlasmaBackground {...props} />;
}
