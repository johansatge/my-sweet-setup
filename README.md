# OSX Reminder

My regular OS X installation.

### IDE

[Atom](https://atom.io/) - A hackable text editor for the 21st Century

* [Darkula UI](https://atom.io/packages/darkula-ui)
* [Darkula Syntax](https://atom.io/packages/darkula-syntax)
* [Settings file](settings.jar)

[PHPStorm](https://www.jetbrains.com/phpstorm/download/) - PHP IDE that evolves with you

* [Markdown plugin](https://github.com/nicoulaj/idea-markdown)
* [Mustache plugin](https://github.com/dmarcotte/idea-handlebars)

[Sequel Pro](http://www.sequelpro.com/) - MySQL database management for Mac OS X

[Mailcatcher](http://mailcatcher.me/) - Super simple SMTP server

[POEdit](http://poedit.net/) - Gettext Translations Editor

### Git

[Git](http://git-scm.com/downloads) - A free and open source distributed version control system

[SourceTree](http://www.sourcetreeapp.com/) - A free Git & Mercurial client for Windows or Mac

[DiffMerge](https://sourcegear.com/diffmerge/downloads.php) - An application to visually compare and merge files

### Dotfiles

[Oh My ZSH](http://ohmyz.sh) - An open source framework for managing your ZSH configuration

`.zshrc`:

    alias fixairplay="sudo kill `ps -ax | grep 'coreaudiod' | grep 'sbin' |awk '{print $1}'`"

    alias composer="php /usr/bin/composer.phar"
    alias hosts="atom /etc/hosts & atom /etc/apache2/httpd.conf"
    alias nw="/Applications/node-webkit.app/Contents/MacOS/node-webkit"
    alias phpstorm="open -a 'PHPStorm' "
    alias sourcetree="open -a 'SourceTree' "
    alias atom="open -a 'Atom' "

    alias php56='homebrewphp php56'
    alias php55='homebrewphp php55'
    alias php54='homebrewphp php54'
    alias php53='homebrewphp php53'

    function homebrewphp
    {
        versions=`brew list | grep "php"`
        for version in $versions
        do
            brew unlink $version
        done
        brew link $1
        ln -f -s "/usr/local/opt/$1/libexec/apache2/libphp5.so" ~/.libphp5.so
        sudo apachectl restart
        echo "PHP version enabled: $1"
    }

`johan.zsh-theme`:

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

@todo export Terminal settings

## Package managers

[Homebrew](http://brew.sh/) - The missing package manager for OS X

[Composer](https://getcomposer.org/download/) - Dependency Manager for PHP

[Bower](http://bower.io/) - A package manager for the web

## Node tools

[node.js](http://nodejs.org/) - A cross-platform Javascript runtime environment

[node-webkit](https://github.com/rogerwang/node-webkit) - an app runtime based on Chromium and node.js

## Task runners

[Grunt](http://gruntjs.com/) - The JavaScript task runner

[Gulp](http://gulpjs.com/) - The streaming build system

## Browser tools

[Chrome](https://www.google.fr/chrome/browser/)

[Ghostery](https://www.ghostery.com/) - Chrome tracking blocker

[Cache killer](https://chrome.google.com/webstore/detail/cache-killer/jpfbieopdmepaolggioebjmedmclkbap) - Automatically clear your browser cache before loading a page

[Choco Chip](https://chrome.google.com/webstore/detail/chocochip-cookie-manager/cdllihdpcibkhhkidaicoeeiammjkokm) - Fast, easy-to-use cookie manager

[Javascript Error Notifier](https://chrome.google.com/webstore/detail/javascript-errors-notifie/jafmfknfnkoekkdocjiaipcnmkklaajd) - Notifies Javascript errors by icon in address bar

[JSON Formatter](https://github.com/callumlocke/json-formatter) - Chrome extension for printing JSON and JSONP nicely

[The QR Code Extension](https://chrome.google.com/webstore/detail/the-qr-code-extension/oijdcdmnjjgnnhgljmhkjlablaejfeeb) - QR Code generator

[Gmail Checker Lite](https://chrome.google.com/webstore/detail/gmail-checker-lite/ehecgbjlfigjeeapplnmliblgpkjaeme) - Account notifier for Google Mail

[Form Filler](https://chrome.google.com/webstore/detail/form-filler/bnjjngeaknajbdcgpfkgnonkmififhfo) - Fills all form inputs in a page with dummy data

[Transmit](http://panic.com/transmit/) - The well-known FTP client

[Modern.IE](https://www.modern.ie/fr-fr/virtualization-tools) - Official Microsoft virtual machines

## Productivity

[Workflowy](https://workflowy.com/) - Organize your brain

[iStat Mini](http://bjango.com/mac/istatmini/) - A mini system monitor for your Mac

[Monity](https://itunes.apple.com/app/monity/id915542151) - An advanced System Monitoring Widget for OS X Yosemite

[Spectacle](http://spectacleapp.com) - Move and resize windows with ease

[Monosnap](https://monosnap.com/welcome) - Make screenshots - Draw on it - Shoot video and share your files

## Misc

[Spotify](https://www.spotify.com/fr/)

[Skype](http://www.skype.com/)

[Balsamiq Mockups](https://balsamiq.com/) - Rapid, effective and fun wireframing
