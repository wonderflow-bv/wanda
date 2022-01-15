/* eslint-disable */
import React from 'react'
import { Container } from '../container'

export default {
  title: 'Core/Typograhy',
  parameters: {
    controls: { hideNoControlsWarning: true }
  }
}

export const Basic = () => (
  <Container dimension="medium">
    <p>This is a standard paragraph</p>

    <p><a href="#">Text link</a></p>
    <p>
      <a>
        This is a link without
        <em>href</em>
      </a>
    </p>
    <p>
      <strong>Strong</strong>
      {' '}
      is used to indicate strong importance.
    </p>
    <p>
      This text has added
      <em>emphasis</em>
      .
    </p>
    <p>
      The
      <b>b element</b>
      {' '}
      is stylistically different text from normal text
    </p>
    <p>
      The
      <i>i element</i>
      {' '}
      is text that is offset from the normal text.
    </p>
    <p>
      The
      <u>u element</u>
      {' '}
      is text with an unarticulated
    </p>
    <p>
      <del>This text is deleted.</del>
    </p>
    <p>
      <ins>This text is inserted.</ins>
    </p>
    <p>
      <s>This text has a strikethrough</s>
      .
    </p>
    <p>
      Superscript
      <sup>®</sup>
      .
    </p>
    <p>
      Subscript for things like H
      <sub>2</sub>
      O.
    </p>
    <p>
      <small>This small text is small for for fine print, etc.</small>
    </p>
    <p>
      Abbreviation:
      <abbr title="HyperText Markup Language">HTML</abbr>
    </p>
    <p>
      <q cite="https://mzl.la/2MHdcJy">
        This text is a short inline quotation.
      </q>
    </p>
    <p>
      The
      <dfn>dfn element</dfn>
      {' '}
      indicates a definition.
    </p>
    <p>
      The
      <var>variable element</var>
      , such as
      <var>x</var>
      {' '}
      =
      <var>y</var>
      .
    </p>
    <address>
      2518 W Armitage Ave
      <br />
      Chicago IL 60647
    </address>
    <p>
      The time element:
      <time dateTime="2013-04-06T12:32+00:00">2 weeks ago</time>
    </p>
    <p>
      The
      <mark>mark element</mark>
      {' '}
      indicates a highlight.
    </p>
  </Container>
)

export const List = () => (
  <Container dimension="medium">
    <dl>
      <dt>Definition List Title</dt>
      <dd>This is a definition list division.</dd>

      <dt>Definition List Title</dt>
      <dd>This is a definition list division.</dd>
    </dl>
    <ul>
      <li>List item 01</li>
      <li>List item 02</li>
      <li>List item 03</li>
    </ul>
    <ol>
      <li>Item 01</li>
      <li>Item 02</li>
      <li>Item 03</li>
      <li>Item 04</li>
      <li>Item 05</li>
      <li>Item 06</li>
      <li>Item 07</li>
      <li>Item 08</li>
      <li>Item 09</li>
      <li>Item 10</li>
      <li>Item 11</li>
      <li>Item 12</li>
      <li>Item 13</li>
      <li>Item 14</li>
      <li>Item 15</li>
      <li>Item 16</li>
      <li>Item 17</li>
      <li>Item 18</li>
      <li>Item 19</li>
      <li>Item 20</li>
    </ol>
  </Container>
)

export const Code = () => (
  <Container dimension="medium">
    <p>
      <code>&lt;kbd&gt;</code>
      {' '}
      tag example
      {' '}
      <kbd>ctrl + ,</kbd>
    </p>
    <p>
      <a href="#">
        This is a link with
        <code>code</code>
      </a>
    </p>
    <p><samp>This is sample output from a computer program.</samp></p>
  </Container>
)
