import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cx = (...classValue: ClassValue[]) => twMerge(clsx(...classValue));
