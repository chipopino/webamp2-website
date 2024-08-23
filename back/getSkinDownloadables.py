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
        with open('errors.txt', 'a') as errfile:
            errfile.write(f"Error1 no meta: {identifier}\n\n\n")
            errors += 1 

    files = []
    try:
        for i in meta['files']:
            files.append(f"https://archive.org/download/{identifier}/{i['name']}")
        files = [item for item in files if item.endswith('.wsz') or item.endswith('.zip') or item.endswith('.wal')]
    except KeyError as e:
        with open('errors.txt', 'a') as errfile:
            errfile.write(f"Error2 {errors}: {e}\n\n\n")
            errors += 1

    return files

with open('skins.txt', 'r') as file:
    for line_number, line in enumerate(file, start=1):
        try:
            if(line_number > 11382):
                skin = line.strip()
                item = getDownloadables(skin)
                if len(item):
                    print(item[0])
                    with open('out.txt', 'a') as file:
                        file.write(f"{item[0]}\n")
                time.sleep(3)
        except KeyError as e:
            with open('errors.txt', 'a') as errfile:
                errfile.write(f"Error3 {errors}: {e}\n\n\n")
                errors += 1

