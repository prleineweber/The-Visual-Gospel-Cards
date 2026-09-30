#!/usr/bin/env python3
"""Download public-domain biblical paintings from Wikimedia Commons."""
from __future__ import annotations

import json
import ssl
import time
import urllib.parse
import urllib.request
from pathlib import Path

OUT = Path("/workspace/public/cards")
OUT.mkdir(parents=True, exist_ok=True)

UA = "VisualGospelApp/1.0 (educational flashcards; https://grok.com)"
CTX = ssl.create_default_context()

# Prefer classical paintings that crop well to portrait cards.
FILES: dict[str, list[str]] = {
    "01": [
        "The_Fall_of_Man_by_Hendrik_Goltzius.jpg",
        "Peter_Paul_Rubens_-_The_Fall_of_Man.jpg",
        "Original_sin_michelangelo.jpg",
    ],
    "02": [
        "Leonardo_da_Vinci_Annunciation.jpg",
        "Fra_Angelico_049.jpg",
        "Leonardo_da_Vinci_-_Annunciazione.jpg",
    ],
    "03": [
        "Gerrit_van_Honthorst_-_Adoration_of_the_Shepherds_(1622).jpg",
        "Correggio_-_Nativity_-_WGA05264.jpg",
        "Giorgione_-_Adoration_of_the_Shepherds_-_National_Gallery_of_Art.jpg",
    ],
    "04": [
        "Abraham_Hondius_-_Annunciation_to_the_shepherds.jpg",
        "Gerrit_van_Honthorst_-_Adoration_of_the_Shepherds_(1622).jpg",
        "Annunciation_to_the_shepherds.jpg",
    ],
    "05": [
        "Gentile_da_Fabriano_002.jpg",
        "Peter_Paul_Rubens_-_Adoration_of_the_Magi_-_WGA20246.jpg",
        "Adoration_of_the_Magi_(Bosch,_Madrid).jpg",
    ],
    "06": [
        "Christ_in_the_Temple_-_Heinrich_Hofmann.jpg",
        "Hofmann_Christus_im_Tempel.jpg",
        "William_Holman_Hunt_-_The_Finding_of_the_Saviour_in_the_Temple.jpg",
    ],
    "07": [
        "Verrocchio,_Leonardo_da_Vinci_-_Baptism_of_Christ.jpg",
        "The_Baptism_of_Christ_(Verrocchio).jpg",
        "Piero_della_Francesca_041.jpg",
    ],
    "08": [
        "Kramskoi_Hristos_v_pustyne.jpg",
        "Ivan_Kramskoy_-_Christ_in_the_Desert.jpg",
        "Christ_in_the_Wilderness.jpg",
    ],
    "09": [
        "Duccio_di_Buoninsegna_037.jpg",
        "The_Calling_of_the_Apostles_Peter_and_Andrew_(Duccio).jpg",
        "Vocation_of_the_Apostles.jpg",
    ],
    "10": [
        "Giotto_di_Bondone_-_No._24_Scenes_from_the_Life_of_Christ_-_8._Marriage_at_Cana_-_WGA09190.jpg",
        "Marriage_at_Cana_(Giotto).jpg",
        "Paolo_Veronese_008.jpg",
    ],
    "11": [
        "Bloch-SermonOnTheMount.jpg",
        "Carl_Bloch_-_Sermon_on_the_Mount.jpg",
        "The_Sermon_on_the_Mount_Carl_Heinrich_Bloch.jpg",
    ],
    "12": [
        "Christ_Healing_the_Sick_at_Bethesda.jpg",
        "Carl_Heinrich_Bloch_-_Healing_at_the_Pool_of_Bethesda.jpg",
        "Christ_healing_the_paralytic_at_Bethesda.jpg",
    ],
    "13": [
        "Juan_de_Flandes_-_Miracle_of_the_Loaves_and_Fishes.jpg",
        "The_Miracle_of_the_Loaves_and_Fishes_(Lambert_Lombard).jpg",
        "Feeding_the_multitude.jpg",
    ],
    "14": [
        "Jesus_walking_on_water.jpg",
        "Ivan_Aivazovsky_-_Walking_on_Water.jpg",
        "Christ_Walking_on_the_Sea.jpg",
    ],
    "15": [
        "The_Good_Shepherd.jpg",
        "Bernhard_Plockhorst_-_The_Good_Shepherd.jpg",
        "Brooklyn_Museum_-_The_Good_Shepherd_(Le_bon_pasteur)_-_James_Tissot.jpg",
    ],
    "16": [
        "Rembrandt_Harmensz_van_Rijn_-_Return_of_the_Prodigal_Son_-_Google_Art_Project.jpg",
        "Return_of_the_Prodigal_Son_1667-1670_Rembrandt.jpg",
        "Rembrandt-Return_of_the_Prodigal_Son.jpg",
    ],
    "17": [
        "The_Raising_of_Lazarus_(Rembrandt,_Los_Angeles).jpg",
        "Raising_of_Lazarus_by_Rembrandt.jpg",
        "Bonnat_Résurrection_de_Lazare.jpg",
    ],
    "18": [
        "Giotto_-_Scrovegni_-_-26-_-_Entry_into_Jerusalem.jpg",
        "Entry_of_Christ_into_Jerusalem_(1320).jpg",
        "Christ's_entry_into_Jerusalem.jpg",
    ],
    "19": [
        "The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg",
        "Última_Cena_-_Da_Vinci_5.jpg",
        "Last_Supper_by_Pascal_Dagnan-Bouveret.jpg",
    ],
    "20": [
        "Christ_in_Gethsemane.jpg",
        "Bloch-ChristGethsemane.jpg",
        "Christ_in_Gethsemane_Heinrich_Hofmann.jpg",
    ],
    "21": [
        "Christ_Crucified_(Velázquez).jpg",
        "Diego_Velázquez_012.jpg",
        "Christ_on_the_Cross_by_Diego_Velazquez.jpg",
    ],
    "22": [
        "Caravaggio_-_La_Deposizione_di_Cristo.jpg",
        "The_Entombment_of_Christ-Caravaggio_(c.1602-3).jpg",
        "Deposition_(Caravaggio).jpg",
    ],
    "23": [
        "The_Resurrection_Carl_Heinrich_Bloch.jpg",
        "Piero_della_Francesca_021.jpg",
        "Resurrection_(Piero_della_Francesca).jpg",
    ],
    "24": [
        "1606_Caravaggio,_Supper_at_Emmaus_National_Gallery,_London.jpg",
        "Caravaggio_-_Cena_in_Emmaus.jpg",
        "Rembrandt_Harmensz._van_Rijn_013.jpg",
    ],
    "25": [
        "Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg",
        "The_Incredulity_of_Saint_Thomas_(Caravaggio).jpg",
        "CaravaggioThomas.jpg",
    ],
    "26": [
        "Great_Commission.jpg",
        "Christ_taking_leave_of_his_disciples.jpg",
        "Bloch-SermonOnTheMount.jpg",
    ],
    "27": [
        "Giotto_-_Scrovegni_-_-38-_-_Ascension.jpg",
        "The_Ascension_Rembrandt.jpg",
        "Benjamin_West_-_The_Ascension.jpg",
    ],
    "28": [
        "Jean_II_Restout_-_Pentecôte.jpg",
        "Pentecost_Giotto.jpg",
        "El_Greco_Pentecost.jpg",
    ],
    "29": [
        "The_Conversion_of_Saint_Paul_(Caravaggio-Cerasi).jpg",
        "Conversion_on_the_Way_to_Damascus-Caravaggio_(c.1600-1).jpg",
        "Masaccio,_cappella_brancacci,_battesimo_dei_neofiti_01.jpg",
    ],
    "30": [
        "Hunt_Light_of_the_World.jpg",
        "William_Holman_Hunt_-_The_Light_of_the_World_-_Google_Art_Project.jpg",
        "The_Light_of_the_World_(Manchester).jpg",
    ],
}


def fetch(url: str, timeout: int = 40) -> bytes | None:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as res:
            if res.status != 200:
                return None
            data = res.read()
            if len(data) < 8000:
                return None
            return data
    except Exception as exc:
        print(f"  fail {url[:80]} ({exc.__class__.__name__})")
        return None


def commons_url(filename: str) -> str | None:
    title = "File:" + filename
    qs = urllib.parse.urlencode(
        {
            "action": "query",
            "format": "json",
            "prop": "imageinfo",
            "iiprop": "url",
            "iiurlwidth": "1400",
            "titles": title,
        }
    )
    raw = fetch("https://commons.wikimedia.org/w/api.php?" + qs, timeout=20)
    if not raw:
        return None
    try:
        payload = json.loads(raw.decode("utf-8", "replace"))
        pages = payload.get("query", {}).get("pages", {})
        for page in pages.values():
            info = (page.get("imageinfo") or [None])[0]
            if not info:
                continue
            return info.get("thumburl") or info.get("url")
    except Exception:
        return None
    return None


def save(day: str, data: bytes, source: str) -> None:
    dest = OUT / f"{day}.jpg"
    dest.write_bytes(data)
    print(f"saved {dest.name} ({len(data)} bytes) from {source}")


def main() -> None:
    for day, names in FILES.items():
        dest = OUT / f"{day}.jpg"
        if dest.exists() and dest.stat().st_size > 20000 and day not in {
            # Always try to replace generated 01-07 with PD set? Keep if download fails.
        }:
            # Still try to fill missing only
            pass
        got = False
        for name in names:
            url = commons_url(name)
            if not url:
                # Direct FilePath fallback
                url = "https://commons.wikimedia.org/wiki/Special:FilePath/" + urllib.parse.quote(
                    name
                )
            data = fetch(url)
            if data:
                save(day, data, name)
                got = True
                break
            time.sleep(0.2)
        if not got:
            print(f"MISSING {day}")
        time.sleep(0.15)


if __name__ == "__main__":
    main()
