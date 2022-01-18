import tkns from '@wonderflow/tokens/platforms/web/tokens.json'
import { createTheme, TableStyles } from 'react-data-table-component'

/* Reference: https://github.com/jbetancur/react-data-table-component/blob/master/src/DataTable/themes.ts */
createTheme('wanda', {
  text: {
    primary: 'var(--foreground-color)',
    secondary: 'var(--dimmed-6)',
    disabled: 'var(--global-disabled-foreground)'
  },
  background: {
    default: 'transparent'
  },
  context: {
    background: 'var(--global-vibrancy-background)',
    text: 'var(--global-vibrancy-foreground)'
  },
  divider: {
    default: 'transparent'
  },
  button: {
    default: 'transparent',
    focus: 'var(--dimmed-1)',
    hover: 'transparent',
    disabled: 'var(--global-disabled-foreground)'
  },
  selected: {
    default: 'var(--highlight-blue-background)',
    text: 'var(--highlight-blue-foreground)'
  },
  highlightOnHover: {
    default: 'var(--dimmed-1)',
    text: 'var(--global-foreground)'
  },
  striped: {
    default: 'var(--dimmed-0)',
    text: 'var(--global-foreground)'
  }
})

/* Reference: https://github.com/jbetancur/react-data-table-component/blob/master/src/DataTable/styles.ts */
export const customStyle = (rowHeight: string): TableStyles => ({
  rows: {
    style: {
      minHeight: rowHeight
    },
    highlightOnHoverStyle: {
      outline: 'none'
    }
  },
  headRow: {
    style: {
      borderBottom: '3px solid var(--dimmed-2)'
    }
  },
  headCells: {
    style: {
      fontWeight: 800,
      fontSize: tkns.font.size[16]
    }
  },
  cells: {
    style: {
      fontSize: tkns.font.size[16]
    }
  },
  pagination: {
    style: {
      fontSize: tkns.font.size[16]
    },
    pageButtonsStyle: {
      color: 'var(--global-foreground)'
    }
  },
  contextMenu: {
    style: {
      backdropFilter: 'blur(32px)',
      borderRadius: '4px'
    }
  }
})
