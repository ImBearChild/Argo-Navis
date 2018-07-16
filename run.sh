#! /bin/bash
( bluefish &)

konsole --hide-menubar --hide-tabbar --hold -e "python3 -m http.server 8081"
