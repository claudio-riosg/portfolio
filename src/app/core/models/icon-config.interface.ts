export interface IconConfig {
  name: string;
  spritePath?: string;
  size?: string;
  color?: string;
  strokeColor?: string;
  strokeWidth?: string;
  hoverable?: boolean;
  darkMode?: boolean;
}


export interface SocialLinkIcon extends Pick<IconConfig, 'name' | 'spritePath' | 'size'> {
  path: string;
  iconName: string;
}