import React from 'react';

export const CartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={['h-6 w-6', className].filter(Boolean).join(' ')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const MenuIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

export const XIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const InstagramIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth="2"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" strokeLinecap="round"></line>
    </svg>
);

interface GlyphProps {
    className?: string;
    style?: React.CSSProperties;
}

export const GlyphOneIcon: React.FC<GlyphProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1">
        <circle cx="50" cy="50" r="40" />
        <circle cx="50" cy="50" r="20" />
        <path d="M50,10 L50,90" />
        <path d="M10,50 L90,50" />
    </svg>
);

export const GlyphTwoIcon: React.FC<GlyphProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1">
        <path d="M50 15 V 85 M15 50 H 85" />
        <path d="M32.322 32.322 L 67.678 67.678 M 32.322 67.678 L 67.678 32.322" />
    </svg>
);

export const SankofaBirdIcon: React.FC<GlyphProps> = ({ className, style }) => (
    <svg 
        className={className} 
        style={style} 
        viewBox="0 0 256 256" 
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"></path>
        <path d="M172.44,72.44a44,44,0,0,0-61.42,2.5L97,89a12,12,0,0,0,17,17l14-14.05a20,20,0,1,1,28.28,28.28L128,148.48,99.72,120.2a12,12,0,0,0-17,17l32.44,32.43a12,12,0,0,0,17,0l48-48A44,44,0,0,0,172.44,72.44Z"></path>
    </svg>
);

export const ArrowLeftIcon: React.FC<GlyphProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

export const BookOpenIcon: React.FC<GlyphProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

export const CheckmarkIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

export const CandleIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 21.75h4.5m-4.5 0a2.25 2.25 0 01-2.25-2.25V12a2.25 2.25 0 012.25-2.25h4.5a2.25 2.25 0 012.25 2.25V19.5a2.25 2.25 0 01-2.25 2.25h-4.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75V3.75m0 0a1.5 1.5 0 011.5 1.5v.75m-3 0v-.75a1.5 1.5 0 011.5-1.5M12 3.75a1.5 1.5 0 00-1.5 1.5v.75m3 0v-.75a1.5 1.5 0 00-1.5-1.5" />
    </svg>
);

export const RootIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg className={className || "h-8 w-8"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 20v-8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12L9 15" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12L15 15" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 15L7 18" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 15L17 18" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12L12 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const AlchemyIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg className={className || "h-8 w-8"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 4V2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 22V20" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 12H2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 12H20" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const PathIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg className={className || "h-8 w-8"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 20C4 20 7 4 12 4C17 4 20 20 20 20" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);


/* ===== NEW ICONS ===== */
export const UserIcon: React.FC<GlyphProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

export const PackageIcon: React.FC<GlyphProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);

export const DownloadIcon: React.FC<GlyphProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const KeyIcon: React.FC<GlyphProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
  </svg>
);

export const WhatsappIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.452-4.433-9.888-9.888-9.888-5.452 0-9.888 4.436-9.888 9.888 0 2.044.594 3.862 1.634 5.579l-1.564 5.723 5.862-1.543zM12.051 6.809c-.271 0-.523.106-.714.298l-.715.714c-.187.188-.346.42-.48.669-.134.249-.21.522-.202.802.008.28.09.545.248.792.158.247.368.477.616.693.248.216.52.418.811.603.29.185.594.345.908.472.313.127.637.227.966.299.33.072.665.109.999.109.606 0 1.16-.195 1.623-.558.462-.363.766-.85.836-1.403.071-.553-.02-1.127-.272-1.635-.252-.508-.687-.905-1.229-1.122-.542-.217-1.166-.213-1.748.018l-.582.434c-.118.088-.258.12-.396.102-.138-.018-.266-.089-.364-.195-.1-.105-.164-.24-.179-.382s.003-.284.07-.41l.147-.294.146-.295c.07-.127.088-.267.052-.403-.036-.136-.125-.254-.252-.338l-.83-.553c-.147-.1-.31-.15-.476-.15z" />
    </svg>
);

export const TrashIcon: React.FC<GlyphProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

// Simplified icons for contact intentions
export const GrowthIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg className={className || "h-6 w-6"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.6.11.82-.26.82-.58v-2.04c-2.8.61-3.38-1.35-3.38-1.35-0.55-1.39-1.34-1.76-1.34-1.76-1.08-0.74,0.08-0.73,0.08-0.73,1.2,0.08,1.83,1.23,1.83,1.23,1.07,1.83,2.81,1.3,3.5,1.01,0.11-0.78,0.42-1.3,0.76-1.6-2.67-0.3-5.46-1.33-5.46-5.93,0-1.31,0.47-2.38,1.23-3.22-0.12-0.3-0.54-1.52,0.12-3.17,0,0,1-0.32,3.3,1.23a11.5,11.5,0,0,1,6,0c2.28-1.55,3.29-1.23,3.29-1.23,0.66,1.65,0.24,2.87,0.12,3.17,0.77,0.84,1.23,1.91,1.23,3.22,0,4.61-2.8,5.63-5.48,5.92,0.43,0.37,0.82,1.1,0.82,2.22v3.29c0,0.32,0.22,0.69,0.83,0.58,3.96-1.33,6.83-5.08,6.83-9.5a10,10,0,0,0-10-10Z" />
    </svg>
);
export const ProtectionIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg className={className || "h-6 w-6"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" />
    </svg>
);
export const VisionIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg className={className || "h-6 w-6"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    </svg>
);


/* ===== ADMIN PANEL ICONS ===== */

export const EyeIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const CouponIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-1.5h5.25m-5.25 0h3m-3 0h-1.5m3 0H9m6.75 0H21m-2.25 0h.25m-2.5 0h.25m-2.5 0h.25M6.75 12h-1.5m-2.25 0h.25m2.25 0h.25m2.25 0h.25M4.5 6v12m0-12h15" />
    </svg>
);

export const RewardIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1014.625 7.5H12v-2.625z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.875A2.625 2.625 0 109.375 7.5H12v-2.625z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.875a2.625 2.625 0 10-2.625-2.625v2.625z" />
    </svg>
);

// Ritual icons for coupon creation
export const FireIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);
export const FlowerIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h10a3 3 0 013 3v4.293zM10 6a1 1 0 100-2 1 1 0 000 2zM6 7a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
);
export const VeilIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1 4a1 1 0 100 2h3a1 1 0 100-2H8z" clipRule="evenodd" />
    </svg>
);

export const LeafIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-8 w-8"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.983 2.522a1.5 1.5 0 00-1.966 0L2.522 10.983a1.5 1.5 0 000 1.966l8.462 8.462a1.5 1.5 0 001.966 0l8.462-8.462a1.5 1.5 0 000-1.966L12.983 2.522z" />
         <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12.75a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
         <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12.75c0 1.03-.424 1.956-.975 2.625" />
    </svg>
);

export const SpiralIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-8 w-8"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 010 18V3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
);

export const PlusIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export const ArchiveIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
);

export const JarIcon: React.FC<GlyphProps> = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2h-1V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

export const StarIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.35 7.18h7.55l-6.1 4.44 2.35 7.18-6.1-4.44-6.1 4.44 2.35-7.18-6.1-4.44h7.55L12 2z" />
    </svg>
);

export const CrystalIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
);

export const LogoutIcon: React.FC<GlyphProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-3H9m6 0l-3-3m3 3l-3 3" />
  </svg>
);

export const ChatIcon: React.FC<GlyphProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.455.09-.934.018-1.402a8.956 8.956 0 01-1.16-5.462c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
);