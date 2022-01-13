import { SVGAttributes } from 'react';
export declare type SpinnerProps = SVGAttributes<SVGElement> & {
    /**
     * Set the size of the spinner
     */
    dimension?: 'small' | 'regular' | 'big';
    /**
     * Override the color of the spinner
     */
    color?: string;
};
export declare const Spinner: import("react").ForwardRefExoticComponent<SVGAttributes<SVGElement> & {
    /**
     * Set the size of the spinner
     */
    dimension?: "small" | "regular" | "big" | undefined;
    /**
     * Override the color of the spinner
     */
    color?: string | undefined;
} & import("react").RefAttributes<SVGSVGElement>>;
//# sourceMappingURL=spinner.d.ts.map