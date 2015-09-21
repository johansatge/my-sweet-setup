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

# Aliases
alias mysql.server="/usr/local/mysql/support-files/mysql.server"
alias fixairplay="sudo kill `ps -ax | grep 'coreaudiod' | grep 'sbin' |awk '{print $1}'`"
alias nwjs="/Applications/nwjs.app/Contents/MacOS/nwjs"

# Misc
ulimit -n 1024 # This is needed for Duplicity to work on heavy backup sets
