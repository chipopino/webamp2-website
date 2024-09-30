import random
import requests
from datetime import datetime, timedelta
from urllib.parse import quote


def get(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as http_err:
        return False
    except Exception as err:
        return False


def random_date_range():
    start_date = datetime(1996, 1, 1)
    end_date = datetime.now()

    # Generate a random start date
    random_start = start_date + timedelta(
        days=random.randint(0, (end_date - start_date).days)
    )

    # Ensure the end date is no more than two years from the start date
    random_end = random_start + timedelta(
        days=random.randint(1, 780)  # 730 days is roughly 2 years
    )

    # Ensure end_date does not exceed the current date
    random_end = min(random_end, end_date)

    return random_start.strftime("%Y-%m-%d"), random_end.strftime("%Y-%m-%d")


def genRandomIAdateRange():
    d = random_date_range()
    return f"date:[{d[0]} TO {d[1]}]"


def getSeachIaUrl(query):
    q = quote(query + " mediatype:audio " + genRandomIAdateRange())
    url = f"https://archive.org/advancedsearch.php?q={q}&rows=1&page=1&output=json&fl=identifier,title,description,year"
    return url


def getFiles(identifier):
    files = get(f"https://archive.org/metadata/{identifier}")
    return files["files"]


def getDownlos(id, file):
    return f"https://archive.org/download/{id}/{quote(file['name'])}"


def is_audio_url(url):
    return url.endswith((".mp3", ".m3u"))


def searchIA(term):
    try:
        docs = get(getSeachIaUrl(term))["response"]["docs"][0]
        id = docs["identifier"]
        files = getFiles(id)

        traks = []
        for f in files:
            try:
                traks.append(
                    {
                        "name": f.get("title"),
                        "url": getDownlos(id, f),
                        "duration": 0,
                        "metaData": {
                            "artist": f.get("artist") or "artist",
                            "title": f.get("name") or f.get("title") or "title",
                        },
                    }
                )
            except:
                print("POOP")
                pass

        traks = [
            i
            for i in traks
            if is_audio_url(i["url"])
        ]

        return {
            "title": docs.get("title") or "",
            "desc": docs.get("description") or "",
            "year": docs.get("year") or "",
            "traks": traks,
        }
    except Exception as e:
        print("POOP", e)


if __name__ == "__main__":
    searchIA("fallout radio")
