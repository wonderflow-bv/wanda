/* eslint-disable no-unused-vars */
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

/**
 * Default CSS definition for typescript
 */
declare module 'csstype' {
  type Properties = Record<string, any>;
}

declare module '*.svg' {
  const svgUrl: string;
  const svgComponent: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
  export default svgUrl;
  export { svgComponent as ReactComponent };
}

type PropsWithClass<T = Record<string, unknown>> = {
  style?: Record<string, any>;
  className?: string;
} & T

type FCClass<T = Record<string, unknown>> = React.FC<{
  style?: Record<string, any>;
  className?: string;
} & T>

type FCChildren<T = Record<string, unknown>> = React.FC<React.PropsWithChildren<T>>

type FCChildrenClass<T = Record<string, unknown>> = FCChildren<PropsWithClass<T>>
