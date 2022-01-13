import * as react from 'react';
import { SVGAttributes, ImgHTMLAttributes } from 'react';

declare const Spinner: react.ForwardRefExoticComponent<SVGAttributes<SVGElement> & {
    /**
     * Set the size of the spinner
     */
    dimension?: "small" | "regular" | "big" | undefined;
    /**
     * Override the color of the spinner
     */
    color?: string | undefined;
} & react.RefAttributes<SVGSVGElement>>;

declare const Avatar: react.ForwardRefExoticComponent<ImgHTMLAttributes<HTMLImageElement> & {
    /**
     * The source of the image to use as avatar
     */
    src?: string | undefined;
    /**
     * Define the size of the avatar
     */
    dimension?: "small" | "regular" | "big" | undefined;
} & react.RefAttributes<HTMLImageElement>>;

export { Avatar, Spinner };
