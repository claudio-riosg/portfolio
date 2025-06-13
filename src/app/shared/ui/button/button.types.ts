export type ButtonType = 'primary' | 'outline' | 'text' | 'danger' | 'transparent';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type AnimationType = 'fadeIn' | 'pulse' | 'none';

export interface ButtonConfig {
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
}