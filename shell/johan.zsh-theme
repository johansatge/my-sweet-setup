
PROMPT='%{$reset_color%}→ '

ZSH_THEME_GIT_PROMPT_PREFIX=" [git:"
ZSH_THEME_GIT_PROMPT_SUFFIX="]$reset_color"
ZSH_THEME_GIT_PROMPT_DIRTY="$fg[red]"
ZSH_THEME_GIT_PROMPT_CLEAN="$fg[green]"

function precmd()
{
  if [ $timer ]; then
    elapsed_time=" %F{cyan}+${$(($SECONDS - $timer))}s %{$reset_color%}"
    timer=""
  else
    elapsed_time=""
  fi
  if git rev-parse --git-dir > /dev/null 2>&1; then
    git_status="$(parse_git_dirty)$ZSH_THEME_GIT_PROMPT_PREFIX$(current_branch)$ZSH_THEME_GIT_PROMPT_SUFFIX"
  else
    git_status=""
  fi
  print -rP '$fg[cyan]%m: $fg[yellow]`print -D $PWD`$git_status$elapsed_time'
}

function preexec()
{
  timer=$SECONDS
}
