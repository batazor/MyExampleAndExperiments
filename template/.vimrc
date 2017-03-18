" General ======================================================================
" Show line numbers
set number

" Break lines at word (requires Wrap lines)
set linebreak

" Wrap-broken line prefix
set showbreak=+++

" Line wrap (number of cols)
set textwidth=120

" Highlight matching brace
set showmatch

" Enable spell-checking
set spell

" Enable free-range cursor
set virtualedit=block

" Use visual bell (no beeping)
set visualbell

" Highlight all search results
set hlsearch

" Enable smart-case search
set smartcase

" Always case-insensitive
set ignorecase

" Searches for strings incrementally
set incsearch

" Auto-indent new lines
set autoindent

" Use spaces instead of tabs
set expandtab

" Number of auto-indent spaces
set shiftwidth=2

" Enable smart-indent
set smartindent

" Enable smart-tabs
set smarttab

" Number of spaces per Tab
set softtabstop=4

" Advanced =====================================================================
" Prompt confirmation dialogs
set confirm

" Show row and column ruler information
set ruler

" Show tab bar
set showtabline=2

" Number of undo levels
set undolevels=1000

" Backspace behaviour
set backspace=indent,eol,start

" Editor =======================================================================
" Use 256 colours (Use this setting only if your terminal supports 256 colours)
set t_Co=256

" Always show statusline
set laststatus=2

" Powerline
set rtp+=/usr/share/powerline/bindings/vim/
