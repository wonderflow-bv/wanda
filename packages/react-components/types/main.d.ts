/* eslint-disable no-unused-vars */
declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

/**
 * Default CSS definition for typescript
 */
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
