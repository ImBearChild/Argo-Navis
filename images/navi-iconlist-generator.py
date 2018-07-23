#/usr/bin/env python3
import os
from dominate.tags import *
#from PIL import Image

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

        
for (root, dirs, files) in os.walk(os.getcwd()+"/navi-icons/",followlinks=False):
    for name in files:
        p = os.path.join(root,name)
        q = p.index("/images/navi-icons")
        path = "." + p[q:]
        dir_name = path.replace("./images/navi-icons/","").replace("/"+name,"")
        if path.replace("./images/navi-icons/","") == name:
            dir_name = "root"
            if pre_dir_name != dir_name:
                pre_dir_name = dir_name
                list += li("root",data_role='list-divider').render()
        if pre_dir_name != dir_name:
            pre_dir_name = dir_name
            list += li(dir_name,data_role='list-divider').render()
        if name.find("[MIN]") == -1:
            if name.find(".png") != -1:
                aa =a(name,img(cls="ui-li-icon",src=path.replace(".png"," [MIN].png")),herf="")
                list += li(aa,herf="").render()


f = open("navi-iconlist.txt", "w+")
f.write(list)
f.close()
