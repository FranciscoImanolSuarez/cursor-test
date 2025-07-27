import { ReactNode, HTMLAttributes } from 'react';

export interface BaseComponentProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  fullWidth?: boolean;
}

export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export interface SelectProps extends BaseComponentProps {
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  fullWidth?: boolean;
}

export interface CheckboxProps extends BaseComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  helperText?: string;
}

export interface RadioProps extends BaseComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  helperText?: string;
  name?: string;
}

export interface SwitchProps extends BaseComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  helperText?: string;
}

export interface BadgeProps extends BaseComponentProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

export interface AvatarProps extends BaseComponentProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

export interface TooltipProps extends BaseComponentProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
}

export interface DropdownProps extends BaseComponentProps {
  trigger: ReactNode;
  items: Array<{
    label: string;
    onClick: () => void;
    disabled?: boolean;
    icon?: ReactNode;
  }>;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export interface TabsProps extends BaseComponentProps {
  tabs: Array<{
    id: string;
    label: string;
    content: ReactNode;
    disabled?: boolean;
  }>;
  defaultActiveTab?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export interface AccordionProps extends BaseComponentProps {
  items: Array<{
    id: string;
    title: string;
    content: ReactNode;
    disabled?: boolean;
  }>;
  allowMultiple?: boolean;
  defaultOpenItems?: string[];
  openItems?: string[];
  onItemToggle?: (itemId: string, isOpen: boolean) => void;
}

export interface PaginationProps extends BaseComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  siblingCount?: number;
}

export interface TableProps extends BaseComponentProps {
  columns: Array<{
    key: string;
    header: string;
    sortable?: boolean;
    width?: string;
  }>;
  data: Record<string, any>[];
  sortable?: boolean;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  loading?: boolean;
  emptyState?: ReactNode;
}

export interface FormProps extends BaseComponentProps {
  onSubmit: (data: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  validationSchema?: any;
}

export interface FieldProps extends BaseComponentProps {
  name: string;
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
}

export interface ThemeProviderProps extends BaseComponentProps {
  theme?: 'light' | 'dark' | 'auto';
  locale?: string;
  direction?: 'ltr' | 'rtl';
}

export interface IslandProps extends BaseComponentProps {
  id: string;
  component: string;
  props?: Record<string, any>;
  hydrate?: boolean;
  priority?: 'high' | 'normal' | 'low';
}