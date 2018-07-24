#/usr/bin/env python3
import os
from PIL import Image

print("Progressing")


num = 0
for (root, dirs, files) in os.walk(os.getcwd()+"/navi-icons/",followlinks=False):
    for name in files:
        path = os.path.join(root,name)
        if path.find(".bak") != -1:
            continue
        if name.find(".mini.") == -1 and name.find(".navi.") == -1 :
            if name.find(".png") != -1:
                num += 1
                print(num)
                continue
                im = Image.open(path)
                out = im.resize((32, 32),Image.ANTIALIAS)
                out.save(path.replace(".png",".mini.png"))
                if im.size[0] > 128 and im.size[1] > 128:
                    out = im.resize((128, 128),Image.ANTIALIAS)
                    out.save(path.replace(".png",".navi.png"))
                else:
                    im.save(path.replace(".png",".navi.png"))