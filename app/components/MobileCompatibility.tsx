import React, { useState, useEffect } from 'react';

interface MobileCompatibilityProps {
    children: React.ReactNode;
}

const MobileCompatibility: React.FC<MobileCompatibilityProps> = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
            const mobile = Boolean(userAgent.match(
                /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
            ));
            setIsMobile(mobile);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className={isMobile ? 'mobile-view' : 'desktop-view'}>
            {children}
        </div>
    );
};

export default MobileCompatibility;