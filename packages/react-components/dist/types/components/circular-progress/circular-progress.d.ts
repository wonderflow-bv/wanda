/// <reference types="react" />
export declare type CircularProgressProps = PropsWithClass & {
    /**
     * Set the current progress of the progress bar.
     * This value should be between 0 and 'max'. The percentage is
     * automatically computed.
     */
    value: number;
    /**
     * Set the max value of the progress bar. This determines the
     * computed percentage.
     */
    max?: number;
    /**
     * Set the dimension of the progress bar.
     */
    dimension?: 'small' | 'regular' | 'big';
    /**
     * Show or hide the progress value.
     */
    showProgress?: boolean;
};
export declare const CircularProgress: import("react").ForwardRefExoticComponent<PropsWithClass & {
    /**
     * Set the current progress of the progress bar.
     * This value should be between 0 and 'max'. The percentage is
     * automatically computed.
     */
    value: number;
    /**
     * Set the max value of the progress bar. This determines the
     * computed percentage.
     */
    max?: number | undefined;
    /**
     * Set the dimension of the progress bar.
     */
    dimension?: "small" | "regular" | "big" | undefined;
    /**
     * Show or hide the progress value.
     */
    showProgress?: boolean | undefined;
} & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=circular-progress.d.ts.map