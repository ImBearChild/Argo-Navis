#/usr/bin/env python3
import os
from dominate.tags import *
from PIL import Image

#list = []
pre_dir_name = ""
#dir={}
list = ""

##class icon():
##    link_name = []
##    def __init__(self,name,dir_name,path):
####        self.name = name
####        self.kind = dir_name
####        self.path = path

        
#list= li(span(p("Tip: Click left side to view,Click right botton to choose"),style="font-size: smaller;")).render()
for (root, dirs, files) in os.walk(os.getcwd()+"/navi-icons/",followlinks=False):
    for name in files:
        p = os.path.join(root,name)
        q = p.index("/images/navi-icons")
        path = "." + p[q:]
        if path.find(".bak") != -1:
            continue
        dir_name = path.replace("./images/navi-icons/","").replace("/"+name,"")
        if path.replace("./images/navi-icons/","") == name:
            dir_name = "root"
            if pre_dir_name != dir_name:
                pre_dir_name = dir_name
                list += li("root",data_role='list-divider').render()
        if pre_dir_name != dir_name:
            pre_dir_name = dir_name
            list += li(dir_name,data_role='list-divider').render()
        if name.find(".mini.") == -1 and name.find(".navi.") == -1:
            if name.find(".png") != -1:
                aa =a(name,img(cls="ui-li-icon",src=path.replace(".png",".mini.png")),href="#icon_viewer",onclick="passIcon('"+ path.replace(".png",".navi.png") + "')")
                list += li(aa,a("Choose this",href="#iconbox_editor",onclick="passIcon('"+ path.replace(".png",".navi.png") + "')")).render()

f = open("navi-iconlist.txt", "w+")
f.write(list)
f.close()
