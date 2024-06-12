import React, { lazy, Suspense, ReactElement } from 'react';

interface LazyComponentProps {
    [key: string]: unknown; // Use an index signature for props of unknown types
}

export function LazyLoadComponent(importFunc: () => Promise<{ default: React.ComponentType<LazyComponentProps> }>): React.FC<LazyComponentProps> {
    const LazyComponent = lazy(importFunc);
    return (props: LazyComponentProps): ReactElement => (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyComponent {...props} />
        </Suspense>
    );
}

