#!/bin/bash

# Options:
EXT_UUID=XForwardedForHeader.jakoblandbo@gmail.com
PROFILE=dev

XPI=$EXT_UUID".xpi"
# Default action
if [ -z "$1" ];
then
	./build.sh build
fi

# Build extension
if [ "$1" = "build" ];
then
	# create xpi
	echo " :: Building $XPI ::"
	zip -r $XPI {chrome/,chrome.manifest,install.rdf}
	echo " :: Done ::"
fi

# install extension
if [ "$1" = "install" ];
then
	# if xpi dont exist: build it!
	if [! -f $XPI ];
	then
		./build.sh build	
	fi
	echo " :: Installing $XPI ::"
	cp -v $XPI ~/.mozilla/firefox/$PROFILE/extensions/
 	echo " :: Done :: "
fi
