# My sweet setup

> OSX tools and tips for MAMP developers and daily users

---

* [Dotfiles and settings](#dotfiles-and-settings)
* [Development](#development)
    * [Editor](#editor)
    * [Revision control](#revision-control)
    * [MAMP stack](#mamp-stack)
* [Internet](#internet)
    * [Chrome environment](#chrome-environment)
    * [Network and debugging](#network-and-debugging)
* [Productivity](#productivity)
    * [Data and lists](#data-and-lists)
    * [OSX enhancement](#osx-enhancement)
* [Messaging](#messaging)
* [Photo and Imaging](#photo-and-imaging)
* [Video](#video)

## Dotfiles and settings

[Oh My ZSH](http://ohmyz.sh) - An open source framework for managing your ZSH configuration

[.zshrc](shell/.zshrc) - ZSH settings

[johan.zsh-theme](shell/johan.zsh-theme) - Oh My ZSH theme

[johan.terminal](shell/johan.terminal) - OSX Terminal theme & colors

## Development

### Editor

[Atom](https://atom.io/) - A hackable text editor for the 21st Century

* Font: [Menlo](https://en.wikipedia.org/wiki/Menlo_(typeface)) *(12pt | 1.4)*
* Theme: [native-ui](https://atom.io/packages/native-ui)
* Syntax: [monokai](https://atom.io/packages/monokai)
* Packages:
   * [file-icons](https://atom.io/packages/file-icons)
   * [Sublime-Style-Column-Selection](https://atom.io/packages/Sublime-Style-Column-Selection)
   * [highlight-selected](https://atom.io/packages/highlight-selected)
   * [pigments](https://atom.io/packages/pigments)
   * [docblockr](https://atom.io/packages/docblockr)
   * [language-htaccess](https://atom.io/packages/language-htaccess)
   * [language-gitignore](https://atom.io/packages/language-gitignore)
   * [autocomplete-php](https://atom.io/packages/autocomplete-php)

### Revision control

[Git](http://git-scm.com/downloads) - A free and open source distributed version control system ([configured](git))

[SourceTree](http://www.sourcetreeapp.com/) - A free Git & Mercurial client for Windows or Mac

[DiffMerge](https://sourcegear.com/diffmerge/downloads.php) - An application to visually compare and merge files

[PopHub](http://questbe.at/pophub/) - GitHub Feed Reader for OS X

[git-credential-osxkeychain](https://help.github.com/articles/caching-your-github-password-in-git/) - Caching your Git credentials when using HTTPS

### MAMP stack

Apache [2.4](https://httpd.apache.org/docs/2.4/) (comes with OSX Yosemite, [configured](mamp/httpd.conf) and [fixed](https://gist.github.com/johansatge/968f981128ab0ca49ce4))

PHP ([brewed](https://github.com/Homebrew/homebrew-php) and [configured](mamp/php.ini))

MySQL ([brewed](https://github.com/Homebrew/homebrew/blob/master/Library/Formula/mysql.rb) or [original](http://dev.mysql.com/downloads/mysql/), [configured](mamp/mysql.md))

Xdebug ([brewed](https://github.com/homebrew/homebrew-php/blob/master/Formula/php56-xdebug.rb) and [configured](mamp/ext-xdebug.ini))

[Sequel Pro](http://www.sequelpro.com/) - MySQL database management for Mac OS X

## Internet

### Chrome environment

[Chrome](https://www.google.fr/chrome/browser/)

[DuckDuckGo](https://duckduckgo.com/?q=%s) - The search engine that doesn't track you

[Privacy Badger](https://www.eff.org/privacybadger) - Blocks spying ads and invisible trackers

[Cache killer](https://chrome.google.com/webstore/detail/cache-killer/jpfbieopdmepaolggioebjmedmclkbap) - Automatically clear your browser cache before loading a page

[Choco Chip](https://chrome.google.com/webstore/detail/chocochip-cookie-manager/cdllihdpcibkhhkidaicoeeiammjkokm) - Fast, easy-to-use cookie manager

[Javascript Error Notifier](https://chrome.google.com/webstore/detail/javascript-errors-notifie/jafmfknfnkoekkdocjiaipcnmkklaajd) - Notifies Javascript errors by icon in address bar

[JSON Formatter](https://github.com/callumlocke/json-formatter) - Chrome extension for printing JSON and JSONP nicely

[The QR Code Extension](https://chrome.google.com/webstore/detail/the-qr-code-extension/oijdcdmnjjgnnhgljmhkjlablaejfeeb) - QR Code generator

[Form Filler](https://chrome.google.com/webstore/detail/form-filler/bnjjngeaknajbdcgpfkgnonkmififhfo) - Fills all form inputs in a page with dummy data

[Full Page Screen Capture](https://chrome.google.com/webstore/detail/full-page-screen-capture/fdpohaocaechififmbbbbbknoalclacl) - Screen capture your current page in entirety and reliably

[Visual Event](https://chrome.google.com/webstore/detail/visual-event/pbmmieigblcbldgdokdjpioljjninaim) - Know what event is bound on each dom element

[Window Resizer](https://chrome.google.com/webstore/detail/window-resizer/kkelicaakdanhinjdeammmilcgefonfh) - Resize browser window to emulate various screen resolutions

[Flashcontrol](https://chrome.google.com/webstore/detail/flashcontrol/mfidmkgnfgnkihnjeklbekckimkipmoe) - Prevents Flash content from loading unless you allow it

### Network and debugging

[VirtualBox](https://www.virtualbox.org/wiki/Downloads) - A powerful x86 and AMD64/Intel64 virtualization product

[Transmit](http://panic.com/transmit/) - The well-known FTP client

[Mailcatcher](http://mailcatcher.me/) - Super simple SMTP server ([Custom install on OSX 10.11](mamp/mailcatcher.md))

[Modern.IE](https://www.modern.ie/fr-fr/virtualization-tools) - Official Microsoft virtual machines

[Little Snitch](https://www.obdev.at/products/littlesnitch/index.html) - Intercepts and filters outgoing connections

## Productivity

### Data and lists

[Wunderlist](https://www.wunderlist.com) - To-do list, reminders, errands

[1Password](https://agilebits.com/onepassword) - Put passwords in their place

[Arq](https://www.arqbackup.com) - Back up all your computers. Simple. Awesome.

[Carbon Copy Cloner](http://bombich.com/) - Mac Backup Software

[Dropbox](https://www.dropbox.com/)

### OSX enhancement

[Alfred](http://www.alfredapp.com/) - An award-winning productivity application for Mac OS X

[iStat Menus](http://bjango.com/mac/istatmenus/) - An advanced Mac system monitor for your menubar

[Spectacle](http://spectacleapp.com) - Move and resize windows with ease

[qlcolorcode](https://code.google.com/p/qlcolorcode/) - A Quick Look plugin for source code with syntax highlighting

[QuickLookStephen](http://whomwah.github.io/qlstephen/) - A QuickLook plugin that lets you view plain text files without a file extension

[QLMarkdown](https://github.com/toland/qlmarkdown) - QuickLook generator for Markdown files

[quick look JSON](http://www.sagtau.com/quicklookjson.html) - A useful quick look plugin to preview JSON files

[quicklook-csv](https://github.com/p2/quicklook-csv) - A QuickLook plugin for CSV files

[qlImageSize](https://github.com/Nyx0uf/qlImageSize) - QuickLook plugin to display the dimensions and size of an image in the title bar

[Suspicious Package](http://www.mothersruin.com/software/SuspiciousPackage/) - A Quick Look Plug-in for OS X Installer Package

[QuickLook Video](https://github.com/Marginal/QLVideo) - Display thumbnails, static QuickLook previews, cover art and metadata for most types of video files

[The Unarchiver](http://unarchiver.c3.cx/unarchiver) - The hugely popular unarchiving app for Mac OS X

## Messaging

[Skype](http://www.skype.com/)

[AirMail](http://airmailapp.com/) - Lightning Fast Mail Client for Mac and iPhone

## Photo and Imaging

[Monosnap](https://monosnap.com/welcome) - Make screenshots - Draw on it - Shoot video and share your files

[Lyn](http://www.lynapp.com/) - Lightweight image browser and viewer

[PhotoSync](https://www.photosync-app.com/) - Wireless transfer, backup and share photo and video files

[ImageOptim](https://imageoptim.com/) - Better *Save For Web*

## Video

[VLC](https://www.videolan.org/vlc/)

[HandBrake](https://handbrake.fr/) - The open source video transcoder

[Shotcut](http://shotcut.org/) - Cross-platform, open-source video editor

[Adapter](https://www.macroplant.com/adapter/) - Converts Video, Audio and Images
