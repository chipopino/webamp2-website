import internetarchive
import time
import json
import os

directory = './raw'
file_count = len([f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))])

identifiers = []
with open('skins.txt', 'r') as file:
    for index, iden in enumerate(file):
        if index >= file_count:
            identifier = iden.strip()
            item = internetarchive.get_item(identifier)
            files = item.files
            print(f"Files for {identifier}:")
            poop = {
                "index": index,
                "identifier": identifier, 
                "files": [f"https://archive.org/download/{identifier}/{i['name']}" for i in files]
            }
            print(poop)

            with open(f"./raw/{identifier}", 'w') as file:
                file.write(json.dumps(poop))

            time.sleep(3)
