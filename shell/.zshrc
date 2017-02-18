#
# Prompt
#

export PROMPT="→ "

function precmd()
{
  # Hostname
  host_name="%F{cyan}"$(scutil --get LocalHostName)":%f"

  # Working directory
  working_dir=" %F{yellow}${PWD/$HOME/~}%f"

  # Elasped time since last command
  if [ $timer ]; then
    elapsed_time=" %F{cyan}+${$(($SECONDS - $timer))}s%f"
    timer=""
  else
    elapsed_time=""
  fi

  # Git status
  if git rev-parse --git-dir > /dev/null 2>&1; then
    git_color=$(git diff-index --quiet HEAD && echo "%F{green}" || echo "%F{red}")
    git_branch=$(git branch | grep \* | cut -d ' ' -f2)
    git_status=" $git_color"[git:"$git_branch"]"%f"
  else
    git_status=""
  fi

  # Final prompt
  print -rP "$host_name$working_dir$git_status$elapsed_time"
}

function preexec()
{
    timer=$SECONDS
}

#
# Misc settings
#

setopt auto_cd

#
# History settings
#

# File configuration
HISTSIZE=10000
SAVEHIST=10000
HISTFILE=~/.zsh_history

# History search with up/down keys
bindkey '\e[A' history-beginning-search-backward
bindkey '\e[B' history-beginning-search-forward

setopt HIST_EXPIRE_DUPS_FIRST # Drop duplicates first when trimming the history
setopt HIST_IGNORE_DUPS       # Do not save immediate duplicate commands
setopt HIST_IGNORE_SPACE      # Do not save commands starting with a space
setopt INC_APPEND_HISTORY     # Do not wait for a command to complete to save
setopt SHARE_HISTORY          # Share history between sessions

#
# Environment vars
#

export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/mysql/bin"
export PATH="/usr/local/sbin:$PATH"
export PATH="/Users/johan/.depot_tools:$PATH"
export PATH="/Applications/Hugin/HuginTools:$PATH"
export PATH="/usr/local/share/python:$PATH"

#
# Node & NVM
#

export NODE_PATH=/usr/local/lib/node_modules

export NVM_DIR="/Users/johan/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

#
# Git settings
#

export GIT_EDITOR=nano

#
# Aliases
#

alias nwjs="/Applications/nwjs.app/Contents/MacOS/nwjs"
alias handbrake="/Applications/HandbrakeCLI"
alias st="/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl"
alias stree="/Applications/SourceTree.app/Contents/MacOS/SourceTree"
