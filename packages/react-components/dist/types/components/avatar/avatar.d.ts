import { ImgHTMLAttributes } from 'react';
export declare type AvatarProps = ImgHTMLAttributes<HTMLImageElement> & {
    /**
     * The source of the image to use as avatar
     */
    src?: string;
    /**
     * Define the size of the avatar
     */
    dimension?: 'small' | 'regular' | 'big';
};
export declare const Avatar: import("react").ForwardRefExoticComponent<ImgHTMLAttributes<HTMLImageElement> & {
    /**
     * The source of the image to use as avatar
     */
    src?: string | undefined;
    /**
     * Define the size of the avatar
     */
    dimension?: "small" | "regular" | "big" | undefined;
} & import("react").RefAttributes<HTMLImageElement>>;
//# sourceMappingURL=avatar.d.ts.map