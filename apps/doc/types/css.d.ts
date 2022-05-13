/* eslint-disable no-unused-vars */

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
declare module 'csstype' {
  type Properties = Record<string, any>;
}
