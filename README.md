# OSX Reminder

My regular OS X installation.

## IDE

[Atom](https://atom.io/) - A hackable text editor for the 21st Century

* [Darkula UI](https://atom.io/packages/darkula-ui)
* [Darkula Syntax](https://atom.io/packages/darkula-syntax)
* [Settings file](settings.jar)

[PHPStorm](https://www.jetbrains.com/phpstorm/download/) - PHP IDE that evolves with you

* [Markdown plugin](https://github.com/nicoulaj/idea-markdown)
* [Mustache plugin](https://github.com/dmarcotte/idea-handlebars)
* [.ignore plugin](https://github.com/hsz/idea-gitignore)

[Sequel Pro](http://www.sequelpro.com/) - MySQL database management for Mac OS X

[Mailcatcher](http://mailcatcher.me/) - Super simple SMTP server

[POEdit](http://poedit.net/) - Gettext Translations Editor

## Git

[Git](http://git-scm.com/downloads) - A free and open source distributed version control system

[SourceTree](http://www.sourcetreeapp.com/) - A free Git & Mercurial client for Windows or Mac

[DiffMerge](https://sourcegear.com/diffmerge/downloads.php) - An application to visually compare and merge files

[git-credential-osxkeychain](https://help.github.com/articles/caching-your-github-password-in-git/) - Caching your Git credentials when using HTTPS

## Package managers

[Homebrew](http://brew.sh/) - The missing package manager for OS X

[Cask](http://caskroom.io/) - Extends Homebrew and brings its elegance, simplicity, and speed to OS X applications

[Composer](https://getcomposer.org/download/) - Dependency Manager for PHP

[Bower](http://bower.io/) - A package manager for the web

## Command-line environment

### Tools

[webkit2png](http://www.paulhammond.org/webkit2png/) - A command line tool that creates screenshots of webpages

### Terminal settings

[Oh My ZSH](http://ohmyz.sh) - An open source framework for managing your ZSH configuration

[Settings file](johan.terminal) - Colors and windows settings

`.zshrc` file:

    alias composer="php /usr/bin/composer.phar"
    alias nw="/Applications/node-webkit.app/Contents/MacOS/node-webkit"
    alias fixairplay="sudo kill `ps -ax | grep 'coreaudiod' | grep 'sbin' |awk '{print $1}'`"

`johan.zsh-theme` file:

    function git_prompt_info()
    {
        foo=$(git status 2> /dev/null) && echo "$(parse_git_dirty)$ZSH_THEME_GIT_PROMPT_PREFIX$(current_branch)$ZSH_THEME_GIT_PROMPT_SUFFIX" || return
    }

    function precmd()
    {
        print -rP '
    $fg[cyan]%m: $fg[yellow]`print -D $PWD` $(git_prompt_info)'
    }

    PROMPT='%{$reset_color%}→ '

    ZSH_THEME_GIT_PROMPT_PREFIX="[git:"
    ZSH_THEME_GIT_PROMPT_SUFFIX="]$reset_color"
    ZSH_THEME_GIT_PROMPT_DIRTY="$fg[red]"
    ZSH_THEME_GIT_PROMPT_CLEAN="$fg[green]"

## Node tools

[node.js](http://nodejs.org/) - A cross-platform Javascript runtime environment

[node-webkit](https://github.com/rogerwang/node-webkit) - An app runtime based on Chromium and node.js

## Task runners

[Grunt](http://gruntjs.com/) - The JavaScript task runner

[Gulp](http://gulpjs.com/) - The streaming build system

## Internet tools

[Chrome](https://www.google.fr/chrome/browser/)

[Ghostery](https://www.ghostery.com/) - Chrome tracking blocker

[Cache killer](https://chrome.google.com/webstore/detail/cache-killer/jpfbieopdmepaolggioebjmedmclkbap) - Automatically clear your browser cache before loading a page

[Choco Chip](https://chrome.google.com/webstore/detail/chocochip-cookie-manager/cdllihdpcibkhhkidaicoeeiammjkokm) - Fast, easy-to-use cookie manager

[Javascript Error Notifier](https://chrome.google.com/webstore/detail/javascript-errors-notifie/jafmfknfnkoekkdocjiaipcnmkklaajd) - Notifies Javascript errors by icon in address bar

[JSON Formatter](https://github.com/callumlocke/json-formatter) - Chrome extension for printing JSON and JSONP nicely

[The QR Code Extension](https://chrome.google.com/webstore/detail/the-qr-code-extension/oijdcdmnjjgnnhgljmhkjlablaejfeeb) - QR Code generator

[Form Filler](https://chrome.google.com/webstore/detail/form-filler/bnjjngeaknajbdcgpfkgnonkmififhfo) - Fills all form inputs in a page with dummy data

[The Great Suspender](https://chrome.google.com/webstore/detail/the-great-suspender/klbibkeccnjlkjkiokjodocebajanakg) - Automatically suspends unused tabs to free up system resources

[Transmit](http://panic.com/transmit/) - The well-known FTP client

[Modern.IE](https://www.modern.ie/fr-fr/virtualization-tools) - Official Microsoft virtual machines

[Cellist](http://cellist.patr0n.us/) - HTTP debugging proxy for OS X

## Quicklook plugins

[qlcolorcode](https://code.google.com/p/qlcolorcode/) - A Quick Look plugin for source code with syntax highlighting

[QuickLookStephen](http://whomwah.github.io/qlstephen/) - A QuickLook plugin that lets you view plain text files without a file extension

[QLMarkdown](https://github.com/toland/qlmarkdown) - QuickLook generator for Markdown files

[quick look JSON](http://www.sagtau.com/quicklookjson.html) - A useful quick look plugin to preview JSON files

[quicklook-csv](https://github.com/p2/quicklook-csv) - A QuickLook plugin for CSV files

[qlImageSize](https://github.com/Nyx0uf/qlImageSize) - QuickLook plugin to display the dimensions and size of an image in the title bar

[Suspicious Package](http://www.mothersruin.com/software/SuspiciousPackage/) - A Quick Look Plug-in for OS X Installer Packages

## Productivity

[Workflowy](https://workflowy.com/) - Organize your brain

[Alfred](http://www.alfredapp.com/) - An award-winning productivity application for Mac OS X

[iStat Menus](http://bjango.com/mac/istatmenus/) - An advanced Mac system monitor for your menubar

[Spectacle](http://spectacleapp.com) - Move and resize windows with ease

[Monosnap](https://monosnap.com/welcome) - Make screenshots - Draw on it - Shoot video and share your files

[TotalFinder](http://totalfinder.binaryage.com/) - Brings colored labels back to your Finder and more!

[1Password](https://agilebits.com/onepassword) - Put passwords in their place

## Misc

[Spotify](https://www.spotify.com/fr/)

[Skype](http://www.skype.com/)

[Balsamiq Mockups](https://balsamiq.com/) - Rapid, effective and fun wireframing
