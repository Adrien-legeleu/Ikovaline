// components/ClientWrapper.tsx
'use client';

import { useState } from 'react';

export function ClientWrapper({ children }: React.PropsWithChildren) {
  const [mounted] = useState(true);
  return mounted ? <>{children}</> : null;
}
