import classNames from 'classnames';

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classNames(classes);
}

export function createComponentClass(
  baseClass: string,
  variants: Record<string, Record<string, string>> = {},
  defaultVariant?: string
): (props: Record<string, any>) => string {
  return (props: Record<string, any>) => {
    const classes = [baseClass];
    
    // Add variant classes
    Object.entries(variants).forEach(([variantKey, variantClasses]) => {
      const propValue = props[variantKey];
      if (propValue && variantClasses[propValue]) {
        classes.push(variantClasses[propValue]);
      } else if (defaultVariant && variantClasses[defaultVariant]) {
        classes.push(variantClasses[defaultVariant]);
      }
    });
    
    // Add custom className
    if (props.className) {
      classes.push(props.className);
    }
    
    return cn(...classes);
  };
}

export function createResponsiveClass(
  baseClass: string,
  responsiveVariants: Record<string, Record<string, string>>
): (props: Record<string, any>) => string {
  return (props: Record<string, any>) => {
    const classes = [baseClass];
    
    Object.entries(responsiveVariants).forEach(([breakpoint, variants]) => {
      Object.entries(variants).forEach(([variant, className]) => {
        if (props[`${breakpoint}${variant.charAt(0).toUpperCase()}${variant.slice(1)}`]) {
          classes.push(className);
        }
      });
    });
    
    if (props.className) {
      classes.push(props.className);
    }
    
    return cn(...classes);
  };
}