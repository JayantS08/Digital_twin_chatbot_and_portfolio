from pathlib import Path
import json

PROJECT_ROOT = Path(__file__).resolve().parent.parent

PROFILE_FILE = PROJECT_ROOT / "content" / "generated" / "profile.json"
EXTRACTED_DIR = PROJECT_ROOT / "knowledge" / "extracted"
OUTPUT_FILE = PROJECT_ROOT / "worker" / "src" / "knowledge.json"


def main():
    profile = json.loads(
        PROFILE_FILE.read_text(encoding="utf-8")
    )

    documents = {}

    for text_file in sorted(EXTRACTED_DIR.glob("*.txt")):
        text = text_file.read_text(
            encoding="utf-8",
            errors="ignore",
        ).strip()

        if text:
            documents[text_file.name] = text

    knowledge = {
        "profile": profile,
        "documents": documents,
    }

    OUTPUT_FILE.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    OUTPUT_FILE.write_text(
        json.dumps(
            knowledge,
            indent=2,
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )

    print(f"Created: {OUTPUT_FILE}")
    print(f"Profile loaded: {PROFILE_FILE}")
    print(f"Documents included: {len(documents)}")

    for name, text in documents.items():
        print(f"  - {name}: {len(text):,} characters")


if __name__ == "__main__":
    main()
