import type { IconType } from 'react-icons';
import type { BtnVariantType } from './button-variant.type';

export interface NavItemProps {
  to: string;
  label: string;
  icon: IconType;
  variant: BtnVariantType;
}
