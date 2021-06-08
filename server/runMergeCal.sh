#!/bin/bash
if [[ $# -eq 3 ]]; then
	./mergeCal.hs $1 $2 > $3
elif [[ $# -eq 2 ]]; then
	./mergeCal.hs $1 > $2
else
	echo "Error: Script must have either 1 or 2 arguments."
fi



