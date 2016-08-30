
# Ohmyzsh settings

export ZSH=$HOME/.oh-my-zsh
ZSH_THEME="johan"
plugins=(git)
source $ZSH/oh-my-zsh.sh
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

# Environment vars

export NODE_PATH=/usr/local/lib/node_modules

export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/mysql/bin"
export PATH="/usr/local/sbin:$PATH"
export PATH="/Users/johan/.depot_tools:$PATH"
export PATH="/Applications/Hugin/HuginTools:$PATH"
export PATH="/usr/local/share/python:${PATH}"

# NVM

export NVM_DIR="/Users/j.satge/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# GIT

export GIT_EDITOR=nano

# Aliases

alias nwjs="/Applications/nwjs.app/Contents/MacOS/nwjs"
