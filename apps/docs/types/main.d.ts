/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Default CSS definition for typescript
 */

 declare module '*.svg' {
  const svgUrl: string
  const svgComponent: React.StatelessComponent<React.SVGAttributes<SVGElement>>
  export default svgUrl
  export { svgComponent as ReactComponent }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_CMS_ENDPOINT: string;
    SLACK_RELEASE_CHANNEL: string;
    SLACK_TOKEN: string;
    NEXT_PUBLIC_DOMAIN: string;
    NEXT_PUBLIC_ALGOLIA_API_KEY: string;
  }
}

type PropsWithClass = {
  style?: Record<string, any>;
  className?: string;
}
