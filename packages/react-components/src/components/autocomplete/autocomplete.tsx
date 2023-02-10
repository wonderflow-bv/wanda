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

import {
  useClickAway,
  useDebounce, useFocusWithin, useKeyPress, useSize,
} from 'ahooks';
import {
  AnimatePresence, domMax, LazyMotion, m,
} from 'framer-motion';
import {
  Children, cloneElement, forwardRef, ForwardRefExoticComponent,
  isValidElement,
  ReactElement,
  ReactNode, useCallback, useEffect, useMemo, useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { mergeRefs } from 'react-merge-refs';
import { usePopperTooltip } from 'react-popper-tooltip';
import { useUIDSeed } from 'react-uid';

import {
  Menu, Skeleton, Stack, Text, Textfield, TextfieldProps,
} from '@/components';

import createWrapper from '../../hooks/createWrapper';
// import { usePopUpWrapper } from '../../hooks';
import { MenuItemProps, MenuProps } from '../menu';
import * as styles from './autocomplete.module.css';
import { AutocompleteOption, AutocompleteOptionProps } from './autocomplete-option';

type ValueType = {
  query: string;
  value: string;
}

export type AutocompleteProps = PropsWithClass<TextfieldProps<{
  /**
   * The callback called when an option is picked from the list
   */
  onChange?: (value: ValueType) => void;
  /**
   * Set the maximum height of the options list after which
   * it will scroll.
   */
  maxHeight?: MenuProps['maxHeight'];
  /**
   * Custom empty content to display when there are no options or
   * when the value does not match any of the options.
   */
  emptyContent?: ReactNode;
  /**
   * Show skeletons while loading options.
   */
  busy?: boolean;
}>>;

type AutocompleteComponent = ForwardRefExoticComponent<AutocompleteProps> & {
  Option: ForwardRefExoticComponent<AutocompleteOptionProps>;
}

const AutocompleteAnimation = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0, 0, 0.34, 1],
      duration: 0.1,
    },
  },
  hidden: {
    y: -5,
    opacity: 0,
    transition: {
      ease: [0.3, 0.07, 1, 1],
      duration: 0.1,
    },
  },
};

export const Autocomplete = forwardRef<HTMLElement, AutocompleteProps>(({
  children,
  onChange,
  disabled,
  readOnly,
  value: val,
  busy,
  maxHeight = '200px',
  emptyContent = 'No items to show',
  ...otherProps
}, forwardedRef) => {
  const seedID = useUIDSeed();
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(val ? String(val) : '');
  const [value, setValue] = useState<string>(val ? String(val) : '');
  const [optionsValues, setOptionValues] = useState<string[]>([]);
  const isInteractive = useMemo(() => !disabled && !readOnly, [disabled, readOnly]);
  // const { wrapper } = usePopUpWrapper('autocomplete-popup-root');
  const wrapper = createWrapper('autocomplete-popup-root') ?? document.body;

  const debounceQuery = useDebounce(
    query,
    { wait: 100 },
  );

  const filteredOptions = useMemo(
    () => {
      const items = Children.toArray(children);
      return debounceQuery
        ? items.filter(
          (o) => {
            const props = isValidElement(o) && o.props.children;
            const stringToMatch = typeof props === 'string' ? props : props.join('');
            return stringToMatch?.toLowerCase().includes(debounceQuery.toLowerCase());
          },
        )
        : items;
    },
    [debounceQuery, children],
  );

  const isFocusWithin = useFocusWithin(autocompleteRef, {
    onChange: (isFocusWithin) => {
      const m = document.getElementById(seedID('autocomplete-menu'));
      if (isFocusWithin || m) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    },
  });

  useClickAway(() => setIsOpen(false), autocompleteRef);

  useKeyPress('esc', () => setIsOpen(false));

  const {
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    triggerRef,
    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
    visible,
  } = usePopperTooltip({
    delayShow: 0,
    delayHide: 0,
    trigger: null,
    visible: isInteractive ? isOpen : false,
    closeOnTriggerHidden: true,
    placement: 'bottom-start',
    offset: [0, 8],
  });

  const triggerSize = useSize(triggerRef);

  const handleOptionClick = useCallback(
    (optionValue, optionContent) => {
      setQuery(optionContent);
      setValue(optionValue);
      onChange?.({ query: optionContent, value: optionValue });
      setIsOpen(false);
    },
    [onChange],
  );

  const handleFilter = useCallback(
    ({ currentTarget }) => {
      const targetValue = currentTarget.value.toLowerCase();
      setQuery(currentTarget.value);
      setValue(currentTarget.value);
      onChange?.({
        query: currentTarget.value,
        value: optionsValues.includes(targetValue) ? optionsValues[optionsValues.indexOf(targetValue)] : '',
      });
    },
    [onChange, optionsValues],
  );

  useEffect(() => {
    const currentValues = Children.map(
      filteredOptions as any,
      (o: ReactElement) => (typeof o.props.children === 'string' ? o.props.children.toLowerCase() : o.props.children.join('').toLowerCase()),
    );

    if (val) setValue(String(val));
    setOptionValues(currentValues);
  }, [filteredOptions, val]);

  return (
    <div
      ref={autocompleteRef}
      className={styles.Autocomplete}
      data-focus-within={isFocusWithin}
    >
      <Textfield
        ref={mergeRefs([setTriggerRef, forwardedRef])}
        id={seedID('autocomplete-trigger')}
        key={seedID('autocomplete-trigger')}
        aria-haspopup="true"
        aria-controls={seedID('autocomplete-menu')}
        aria-expanded={isOpen}
        onChange={handleFilter}
        data-testid="Autocomplete"
        data-current-value={value}
        value={query}
        autoComplete="off"
        disabled={disabled}
        readOnly={readOnly}
        {...otherProps}
      />
      {visible && createPortal(
        <AnimatePresence>
          <div
            ref={setTooltipRef}
            {...getTooltipProps({ className: styles.PopUp, style: { minInlineSize: triggerSize ? (triggerSize.width + 2) : 'auto' } })}
          >
            <LazyMotion features={domMax} strict>
              <m.div
                variants={AutocompleteAnimation}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Menu
                  role="listbox"
                  id={seedID('autocomplete-menu')}
                  className={styles.OptionsList}
                  maxHeight={maxHeight}
                  aria-labelledby={seedID('autocomplete-trigger')}
                >
                  {(filteredOptions.length === 0 && !busy) && <Text as="div" textAlign="center" dimmed={5}>{emptyContent}</Text>}
                  {busy
                    ? <Stack hPadding={8} as="span"><Skeleton count={3} /></Stack>
                    : Children.map(filteredOptions, child => isValidElement(child) && cloneElement(
                      child as ReactElement<MenuItemProps>,
                      {
                        onClick: handleOptionClick,
                      },
                    ))
              }
                </Menu>
              </m.div>
            </LazyMotion>
          </div>
        </AnimatePresence>,
        wrapper,
      )}
    </div>
  );
}) as AutocompleteComponent;

Autocomplete.Option = AutocompleteOption;
Autocomplete.displayName = 'Autocomplete';
