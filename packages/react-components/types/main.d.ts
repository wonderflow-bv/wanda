/**
 * Default CSS definition for typescript
 */
 declare module '*.css'

declare module 'csstype' {
  interface Properties {
    [index: string]: any;
  }
}

declare module '*.svg' {
  const svgUrl: string
  const svgComponent: React.StatelessComponent<React.SVGAttributes<SVGElement>>
  export default svgUrl
  export { svgComponent as ReactComponent }
}

type PropsWithClass = {
  style?: Record<string, any>;
  className?: string;
}
