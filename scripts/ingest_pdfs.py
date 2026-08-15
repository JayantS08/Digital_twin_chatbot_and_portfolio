# TODO: PDF -> text -> chunks -> embeddings -> vector DB.
from pathlib import Path
for pdf in Path("knowledge/pdfs").glob("*.pdf"):
    print("TODO: ingest", pdf)
