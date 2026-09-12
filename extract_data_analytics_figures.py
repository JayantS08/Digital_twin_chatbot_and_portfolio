from pathlib import Path
from zipfile import ZipFile
import shutil

DOCX = Path("Consolidated_Project_Report.docx")
OUTPUT = Path("public/projects/data-analytics")

if not DOCX.exists():
    raise SystemExit(
        "\nCould not find Consolidated_Project_Report.docx\n"
        "Copy it into the repository root and run this script again.\n"
    )

OUTPUT.mkdir(parents=True, exist_ok=True)

# Mapping from the DOCX's embedded media files to clean website names.
figures = {
    "0db983feb96033a60d0774de925ca00da38b7fca.png":
        "01-dls-resource-curves.png",

    "efb23004ae81ad9f550b650df4f696cfeb14aa81.png":
        "02-mars-orbit.png",

    "04147c2a7e7d623123a5c6d5f7863d936122988a.png":
        "03-facebook-fiedler-vector.png",

    "e7c3be69eb7d1482ea0968879b9f31c1d0382cde.png":
        "03-facebook-spectral-2way.png",

    "079b651e0f7fa34c93283e61f440c02a54b4c025.png":
        "03-facebook-spectral-8-community.png",

    "8875875645e7cbf0f59dce365bdf4428621ecae6.png":
        "03-facebook-adjacency-community.png",

    "28f9bde7ce27a576b454323fdc43608112b27087.png":
        "03-bitcoin-spectral-2way.png",

    "eab88436d5bcacfcdddab5a8bf729a00539e13c9.png":
        "03-bitcoin-spectral-5-community.png",

    "0e2d361f64410aa2b96b5455a13648c45f79d2f0.png":
        "03-louvain-community.png",

    "1ae1d1fb0bab811c14eb5ac80c692631d36a639b.png":
        "04-genomic-configuration-comparison.png",

    "524d55d80313aaedbfc056060e2f360a8cec453c.png":
        "05-covid-open-loop.png",

    "c1a03f96ca791d72ca0c4a6af1caafe6bc6c910b.png":
        "05-covid-closed-loop.png",

    "4c14e786a4c532b68e974ce02f87f7e64a7c7c05.png":
        "06-svd-reconstruction-loss.png",

    "3e1c19f37d31665745308b72efd36d7a7601481a.png":
        "06-cur-reconstruction-loss.png",
}

with ZipFile(DOCX) as docx:
    available = set(docx.namelist())

    for source, destination in figures.items():
        internal_path = f"word/media/{source}"

        if internal_path not in available:
            print(f"WARNING: missing {internal_path}")
            continue

        output_path = OUTPUT / destination

        with docx.open(internal_path) as src:
            with output_path.open("wb") as dst:
                shutil.copyfileobj(src, dst)

        print(f"✓ {destination}")

print()
print(f"Figures extracted to: {OUTPUT}")
