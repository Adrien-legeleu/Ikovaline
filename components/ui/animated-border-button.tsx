import { cn } from '@/lib/utils';
import { ElementType, ComponentPropsWithoutRef } from 'react';
import { BorderBeam } from '@/components/ui/border-beam';

interface ButtonBorderProps<T extends ElementType> {
  as?: T;
  className?: string;
  children: React.ReactNode;
}

export function AnimatedBorderButton<T extends ElementType = 'div'>({
  as,
  className,

  children,
  ...props
}: ButtonBorderProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonBorderProps<T>>) {
  const Component = as || 'div';

  return (
    <Component
      className={cn('relative inline-block py-[1px] rounded-full', className)}
      {...props}
    >
      <BorderBeam duration={8} size={100} className="lg:block hidden" />
      <div
        className={cn(
          'relative z-1 border  text-foreground  text-center md:text-base text-sm py-4 px-6 rounded-full',
          'bg-gradient-to-b from-[#f4fafbc9] to-[#d2eaf3d8] border-border/40',
          'dark:from-[#090d11e2] dark:to-[#17212bdd] dark:border-border'
        )}
      >
        {children}
      </div>
    </Component>
  );
}
