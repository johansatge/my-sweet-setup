#
# ZSH prompt
# ----------------------------------------------------------------------
export PROMPT="→ "

# Ran before each prompt is displayed
function precmd()
{
  # Hostname
  host_name="%F{cyan}"$(scutil --get LocalHostName)":%f"

  # Working directory
  working_dir=" %F{yellow}${PWD/$HOME/~}%f"

  # Elasped time since last command
  elapsed_time=""
  if [ $timer ]; then
    elapsed_time=" %F{cyan}+${$(($SECONDS - $timer))}s%f"
    timer=""
  fi

  # Git status
  git_status=""
  if git rev-parse --git-dir > /dev/null 2>&1; then
    git_color=$([[ $(git status --porcelain | tail -n1) == "" ]] && echo "%F{green}" || echo "%F{red}")
    git_branch=${$(git rev-parse --abbrev-ref HEAD 2>/dev/null):-no-branch}
    git_status=" $git_color"[git:"$git_branch"]"%f"
  fi

  # Node.js version (major.minor only, no v prefix)
  node_status=""
  local nv verparts
  if command -v node >/dev/null 2>&1 && nv=$(node -v 2>/dev/null) && [[ -n $nv ]]; then
    nv=${nv#v}
    verparts=(${(s:.:)nv})
    node_status=" %F{blue}[node:${verparts[1]}.${verparts[2]}]%f"
  fi

  # Final prompt
  print -rP "$host_name$working_dir$git_status$node_status$elapsed_time"
}

# Ran before each command is executed
function preexec()
{
    timer=$SECONDS
}

#
# ZSH settings
# ----------------------------------------------------------------------

# History configuration
HISTSIZE=50000
SAVEHIST=50000
HISTFILE=~/.zsh_history

# History search with up/down keys
bindkey '\e[A' history-beginning-search-backward
bindkey '\e[B' history-beginning-search-forward

setopt HIST_EXPIRE_DUPS_FIRST # Drop duplicates first when trimming the history
setopt HIST_IGNORE_DUPS       # Do not save immediate duplicate commands in history
setopt HIST_IGNORE_SPACE      # Do not save commands starting with a space in history
setopt SHARE_HISTORY          # Share history between sessions
setopt auto_cd                # Type a directory name to cd into it without typing "cd"

#
# Environment vars
# ----------------------------------------------------------------------
export PATH="$HOME/.local/bin:$PATH"               # Claude, etc
export PATH="$HOME/.android_platform_tools:$PATH"  # ADB & other Android utilities

# Git settings
# ----------------------------------------------------------------------
export GIT_EDITOR=nano

# Language (for tools like GPG...)
# ----------------------------------------------------------------------
export LANG="en"

# johansatge/data-hoarding
# ----------------------------------------------------------------------
export DATA_HOARDING_PATH="/Volumes/AirData/Projets/Dev/data-hoarding"
. ${DATA_HOARDING_PATH}/aliases.sh

# Homebrew
# ----------------------------------------------------------------------
eval "$(/opt/homebrew/bin/brew shellenv)"
export HOMEBREW_NO_AUTO_UPDATE=1
