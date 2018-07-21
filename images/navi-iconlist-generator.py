#/usr/bin/env python3
import os,json

list = []
pre_dir_name = ""
dir={}

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
            if dir != {}:
                list.append(dir)
            pre_dir_name = dir_name
            dir = {"name": dir_name , "icons" :[]}
        dict = {}
        dict["name"]=name
        dict["path"]=path
        dir["icons"].append(dict)
list.append(dir)

json_str = json.dumps(list, sort_keys=True, indent=2)
f = open("navi-iconlist.json", "w+")
f.write(json_str)
f.close()