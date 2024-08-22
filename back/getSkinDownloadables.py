import requests
import time

errors = 0

def get(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as http_err:
        return False
    except Exception as err:
        return False

def getDownloadables(identifier):
    meta = get(f"https://archive.org/metadata/{identifier}")
    if not meta:
        print("ERROR", identifier) 

    files = []
    try:
        for i in meta['files']:
            files.append(f"https://archive.org/download/{identifier}/{i['name']}")
        files = [item for item in files if item.endswith('.wsz')]
    except:
        print("ERROR", errors)
        errors += 1

    return files

with open('skins.txt', 'r') as file:
    for line_number, line in enumerate(file, start=1):
        try:
            if(line_number > 784):
                skin = line.strip()
                item = getDownloadables(skin)
                if len(item):
                    print(item[0])
                    with open('out.txt', 'a') as file:
                        file.write(f"{item[0]}\n")
                time.sleep(10)
        except:
            print("ERROR", errors)
            errors += 1

