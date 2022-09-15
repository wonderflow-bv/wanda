import {
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
import { mergeRefs } from 'react-merge-refs';
import { usePopperTooltip } from 'react-popper-tooltip';
import { useUIDSeed } from 'react-uid';

import {
  Menu, Skeleton, Stack, Text, Textfield, TextfieldProps,
} from '@/components';

import { MenuItemProps, MenuProps } from '../menu';
import * as styles from './autocomplete.module.css';
import { AutocompleteOption, AutocompleteOptionProps } from './autocomplete-option';

type ValueType = {
  query: string;
  value: string;
}

export type AutocompleteProps = TextfieldProps & {
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
};

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

export const Autocomplete = forwardRef<HTMLElement, PropsWithClass<AutocompleteProps>>(({
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

  const debounceQuery = useDebounce(
    query,
    { wait: 100 },
  );

  const filteredOptions = useMemo(
    () => {
      const items = Children.toArray(children);
      return debounceQuery
        ? items.filter(
          (o: any) => {
            const stringToMatch = typeof o.props.children === 'string' ? o.props.children : o.props.children.join('');
            return stringToMatch?.toLowerCase().includes(debounceQuery.toLowerCase());
          },
        )
        : items;
    },
    [debounceQuery, children],
  );

  const isFocusWithin = useFocusWithin(autocompleteRef, {
    onChange: (isFocusWithin) => {
      if (isFocusWithin) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    },
  });

  useKeyPress('esc', () => setIsOpen(false));

  const {
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    triggerRef,
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
    const currentValues = Children.map(filteredOptions, (o: any) => (typeof o.props.children === 'string' ? o.props.children.toLowerCase() : o.props.children.join('').toLowerCase()));

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
        data-current-value={value}
        value={query}
        autoComplete="off"
        disabled={disabled}
        readOnly={readOnly}
        {...otherProps}
      />
      <AnimatePresence>
        {visible && (
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
        )}
      </AnimatePresence>
    </div>
  );
}) as AutocompleteComponent;

Autocomplete.Option = AutocompleteOption;
Autocomplete.displayName = 'Autocomplete';
