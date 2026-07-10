import { useWindowDimensions } from 'react-native';

export type ScreenSize = 'mobile' | 'tablet' | 'desktop';

interface ResponsiveValues {
  screenSize: ScreenSize;
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  /** Number of columns for grid layouts */
  gridCols: number;
  /** Horizontal padding for content */
  contentPadding: number;
  /** Maximum content width (for centering on large screens) */
  maxContentWidth: number;
  /** Card width fraction (e.g., 0.47 for 2-col, 0.31 for 3-col) */
  cardWidthPercent: string;
  /** Font scale multiplier */
  fontScale: number;
}

export function useResponsive(): ResponsiveValues {
  const { width, height } = useWindowDimensions();

  const screenSize: ScreenSize = 
    width >= 1024 ? 'desktop' : 
    width >= 600 ? 'tablet' : 
    'mobile';

  const isMobile = screenSize === 'mobile';
  const isTablet = screenSize === 'tablet';
  const isDesktop = screenSize === 'desktop';

  const gridCols = isDesktop ? 4 : isTablet ? 3 : 2;
  const contentPadding = isDesktop ? 48 : isTablet ? 32 : 24;
  const maxContentWidth = isDesktop ? 900 : isTablet ? 720 : width;
  
  const cardWidthPercent = isDesktop ? '23%' : isTablet ? '31%' : '47%';
  const fontScale = isDesktop ? 1.1 : isTablet ? 1.05 : 1;

  return {
    screenSize,
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    gridCols,
    contentPadding,
    maxContentWidth,
    cardWidthPercent,
    fontScale,
  };
}
