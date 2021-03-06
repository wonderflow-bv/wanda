/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Default CSS definition for typescript
 */

declare module '*.svg' {
  const svgUrl: string;
  const svgComponent: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
  export default svgUrl;
  export { svgComponent as ReactComponent };
}

declare namespace NodeJS {
  export interface ProcessEnv {
    SLACK_RELEASE_CHANNEL: string;
    SLACK_TOKEN: string;
    NEXT_PUBLIC_CMS_ENDPOINT: string;
    NEXT_PUBLIC_DOMAIN: string;
    NEXT_PUBLIC_ALGOLIA_API_KEY: string;
    NEXT_PUBLIC_GITHUB_DESIGN_TOKEN: string;
  }
}

type PropsWithClass<T = Record<string, unknown>> = {
  style?: Record<string, any>;
  className?: string;
} & T

type FCClass<T = Record<string, unknown>> = React.FC<PropsWithClass<T>>

type FCChildren<T = Record<string, unknown>> = React.FC<React.PropsWithChildren<T>>

type FCChildrenClass<T = Record<string, unknown>> = FCChildren<PropsWithClass<T>>
