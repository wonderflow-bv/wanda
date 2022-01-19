import { PrismTheme } from 'prism-react-renderer'

const theme: PrismTheme = {
  plain: {
    color: 'var(--global-foreground)'
  },
  styles: [{
    types: ['changed'],
    style: {
      color: 'var(--highlight-blue-foreground)',
      fontStyle: 'italic'
    }
  }, {
    types: ['deleted'],
    style: {
      color: 'var(--highlight-red-foreground)',
      fontStyle: 'italic'
    }
  }, {
    types: ['inserted', 'attr-name'],
    style: {
      color: 'var(--highlight-red-foreground)',
      fontStyle: 'italic'
    }
  }, {
    types: ['comment'],
    style: {
      color: 'var(--dimmed-5)',
      fontStyle: 'italic'
    }
  }, {
    types: ['string', 'url'],
    style: {
      color: 'var(--highlight-green-foreground)'
    }
  }, {
    types: ['variable'],
    style: {
      color: 'var(--global-foreground)'
    }
  }, {
    types: ['number'],
    style: {
      color: 'var(--highlight-yellow-foreground)'
    }
  }, {
    types: ['builtin', 'char', 'constant'],
    style: {
      color: 'var(--highlight-cyan-foreground)'
    }
  }, {
    types: ['function'],
    style: {
      color: 'var(--highlight-blue-foreground)'
    }
  }, {
    types: ['constant'],
    style: {
      color: 'var(--highlight-blue-foreground)'
    }
  }, {
    // This was manually added after the auto-generation
    // so that punctuations are not italicised
    types: ['punctuation', 'operator'],
    style: {
      color: 'var(--highlight-purple-foreground)'
    }
  }, {
    types: ['selector', 'doctype'],
    style: {
      color: 'var(--highlight-red-foreground)',
      fontStyle: 'italic'
    }
  }, {
    types: ['class-name'],
    style: {
      color: 'var(--highlight-cyan-foreground)'
    }
  }, {
    types: ['tag'],
    style: {
      color: 'var(--highlight-green-foreground)'
    }
  }, {
    types: ['keyword', 'atrule'],
    style: {
      color: 'var(--highlight-red-foreground)'
    }
  }, {
    types: ['boolean'],
    style: {
      color: 'var(--highlight-red-foreground)'
    }
  }, {
    types: ['property'],
    style: {
      color: 'var(--highlight-cyan-foreground)'
    }
  }, {
    types: ['namespace'],
    style: {
      color: 'var(--dimmed-8)'
    }
  }]
}

export default theme
