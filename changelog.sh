#!/bin/bash

# script to generate markdown changelog
# reference: https://gist.github.com/koraktor/258806

git_tags=(`git tag |\
           sort -r -n -t . -k 3 |\
           sort -r -n -t . -k 2,2 -s |\
           sort -r -n -t . -k 1,1 -s`)
tag_count=`git tag | wc -l`

echo "# Changelog"
echo

for ((i=0; i < tag_count; i++)) do
  tag=${git_tags[$i]}
  previous_tag=${git_tags[$((i+1))]}
  date=`git log -1 $tag --format=%cd --date=format:"%d-%m-%Y"`
  hash=`git log -1 $tag --format=%h`
  repoUrl=`git config --get remote.origin.url`

  echo "## [$tag](${repoUrl%.git}/commit/$hash) - $date"
  echo
  if [ "$previous_tag" != "" ]; then
    git log $previous_tag..$tag^ --format="* %s by %an (<%ae>)" | cat
    echo
  fi
done

# include commits prior to first tag
# git log $tag --format="  * %s" | cat
