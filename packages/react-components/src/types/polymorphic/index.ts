/*
 * Copyright 2022 Wonderflow <authored by Wonderflow Design Team>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable @typescript-eslint/ban-types */
/**
 * Polymorphic types aretaken from https://github.com/radix-ui/primitives/blob/main/packages/react/polymorphic/src/polymorphic.ts
 * Due the deprecation, we decided to include these types inside Wanda's react-components.
 *
 * All the references and liceses are own by the team Radix
 */
import * as React from 'react';

/* -------------------------------------------------------------------------------------------------
 * Utility types
 * ----------------------------------------------------------------------------------------------- */
type Merge<P1 = Record<string, unknown>, P2 = Record<string, unknown>> = Omit<P1, keyof P2> & P2;

/**
 * Infers the OwnProps if E is a ForwardRefExoticComponentWithAs
 */
type OwnProps<E> = E extends ForwardRefComponent<any, infer P> ? P : Record<string, unknown>;

/**
 * Infers the JSX.IntrinsicElement if E is a ForwardRefExoticComponentWithAs
 */
type IntrinsicElement<E> = E extends ForwardRefComponent<infer I, any> ? I : never;

type ForwardRefExoticComponent<E, OwnProps> = React.ForwardRefExoticComponent<
Merge<E extends React.ElementType ? React.ComponentPropsWithRef<E> : never, OwnProps & { as?: E }>
>;

/* -------------------------------------------------------------------------------------------------
 * ForwardRefComponent
 * ----------------------------------------------------------------------------------------------- */

interface ForwardRefComponent<
  IntrinsicElementString,
  OwnProps = Record<string, unknown>,
  /**
   * Extends original type to ensure built in React types play nice
   * with polymorphic components still e.g. `React.ElementRef` etc.
   */
> extends ForwardRefExoticComponent<IntrinsicElementString, OwnProps> {
  /**
   * When `as` prop is passed, use this overload.
   * Merges original own props (without DOM props) and the inferred props
   * from `as` element with the own props taking precendence.
   *
   * We explicitly avoid `React.ElementType` and manually narrow the prop types
   * so that events are typed when using JSX.IntrinsicElements.
   */
  <As = IntrinsicElementString>(
    props: As extends ''
      ? { as: keyof JSX.IntrinsicElements }
      : As extends React.ComponentType<infer P>
        ? Merge<P, OwnProps & { as: As }>
        : As extends keyof JSX.IntrinsicElements
          ? Merge<JSX.IntrinsicElements[As], OwnProps & { as: As }>
          : never
  ): React.ReactElement | null;
}

export type {
  ForwardRefComponent, IntrinsicElement, Merge, OwnProps,
};
