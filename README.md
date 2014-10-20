# OSX Bootstrap

My regular OSX installation.

* [Development environment](#dev-env)
    * [Git](#git)
    * [IDE](#ide)
    * [Command-line configuration](#command-line-config)
    * [Misc tools](#misc-tools)
* [Internet tools](#internet)
* [Productivity](#productivity)

## <a name="dev-env"></a>Development environment

### <a name="git"></a>Git

[Git](http://git-scm.com/downloads)

[SourceTree](http://www.sourcetreeapp.com/)

[DiffMerge](https://sourcegear.com/diffmerge/downloads.php)

### <a name="ide"></a>IDE

[Atom](https://atom.io/)

* [Darkula UI](https://atom.io/packages/darkula-ui)
* [Darkula Syntax](https://atom.io/packages/darkula-syntax)

[PHPStorm](https://www.jetbrains.com/phpstorm/download/)

* *Darcula* theme
* *Mac OS X* keymap

### <a name="command-line-config"></a>Command-line configuration

[Oh My ZSH](http://ohmyz.sh) - An open source framework for managing your ZSH configuration

`.zshrc`:

    alias fixairplay="sudo kill `ps -ax | grep 'coreaudiod' | grep 'sbin' |awk '{print $1}'`"

    alias composer="php /usr/bin/composer.phar"
    alias hosts="atom /etc/hosts & atom /etc/apache2/httpd.conf"
    alias nw="/Applications/node-webkit.app/Contents/MacOS/node-webkit"

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

    function git_prompt_info() {
      ref=$(git symbolic-ref HEAD 2> /dev/null) || return
      echo "$(parse_git_dirty)$ZSH_THEME_GIT_PROMPT_PREFIX$(current_branch)$ZSH_THEME_GIT_PROMPT_SUFFIX"
    }

    function get_pwd() {
      print -D $PWD
    }

    function put_spacing() {
      local git=$(git_prompt_info)
      if [ ${#git} != 0 ]; then
        ((git=${#git} - 10))
      else
        git=0
      fi

      local termwidth
      (( termwidth = ${COLUMNS} - 3 - ${#HOST} - ${#$(get_pwd)} - ${git} ))

      local spacing=""
      for i in {1..$termwidth}; do
        spacing="${spacing} "
      done
      echo $spacing
    }

    function precmd() {
    print -rP '
    $fg[cyan]%m: $fg[yellow]$(get_pwd)$(put_spacing)$(git_prompt_info)'
    }

    PROMPT='%{$reset_color%}→ '

    ZSH_THEME_GIT_PROMPT_PREFIX="[git:"
    ZSH_THEME_GIT_PROMPT_SUFFIX="]$reset_color"
    ZSH_THEME_GIT_PROMPT_DIRTY="$fg[red]+"
    ZSH_THEME_GIT_PROMPT_CLEAN="$fg[green]"

@todo export terminal theme

### <a name="misc-tools"></a>Misc tools

[Homebrew](http://brew.sh/) - The missing package manager for OS X

[Composer](https://getcomposer.org/download/) - Dependency Manager for PHP

[node.js](http://nodejs.org/) - A cross-platform Javascript runtime environment

[Bower](http://bower.io/) - A package manager for the web

[Grunt](http://gruntjs.com/) - The JavaScript task runner

[Gulp](http://gulpjs.com/) - The streaming build system

[node-webkit](https://github.com/rogerwang/node-webkit) - an app runtime based on Chromium and node.js

## <a name="internet"></a>Internet tools

[Chrome](https://www.google.fr/chrome/browser/)

[Ghostery](https://www.ghostery.com/)

[Cache killer](https://chrome.google.com/webstore/detail/cache-killer/jpfbieopdmepaolggioebjmedmclkbap)

[Choco Chip](https://chrome.google.com/webstore/detail/chocochip-cookie-manager/cdllihdpcibkhhkidaicoeeiammjkokm)

[The QR Code Extension](https://chrome.google.com/webstore/detail/the-qr-code-extension/oijdcdmnjjgnnhgljmhkjlablaejfeeb)

[Transmit](http://panic.com/transmit/)

[Modern.IE](https://www.modern.ie/fr-fr/virtualization-tools)

## <a name="productivity"></a>Productivity

[iStat Mini ](http://bjango.com/mac/istatmini/)

[Monity](https://itunes.apple.com/app/monity/id915542151)

[Spectacle](http://spectacleapp.com)

[Glui](http://glui.me)
