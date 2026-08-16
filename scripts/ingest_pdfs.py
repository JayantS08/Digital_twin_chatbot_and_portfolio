from pathlib import Path

import fitz  # PyMuPDF
from pypdf import PdfReader


PROJECT_ROOT = Path(__file__).resolve().parent.parent

PDF_DIR = PROJECT_ROOT / "knowledge" / "pdfs"
OUTPUT_DIR = PROJECT_ROOT / "knowledge" / "extracted"


def extract_with_pymupdf(pdf_path: Path) -> str:
    """Extract text using PyMuPDF."""

    document = fitz.open(str(pdf_path))

    pages = []

    for page_number, page in enumerate(document, start=1):
        text = page.get_text("text")

        pages.append(
            f"\n\n--- PAGE {page_number} ---\n\n{text}"
        )

    document.close()

    return "".join(pages)


def extract_with_pypdf(pdf_path: Path) -> str:
    """Fallback extraction using pypdf."""

    reader = PdfReader(str(pdf_path))

    pages = []

    for page_number, page in enumerate(reader.pages, start=1):
        try:
            text = page.extract_text() or ""
        except Exception as e:
            print(
                f"Warning: could not extract page "
                f"{page_number}: {e}"
            )
            text = ""

        pages.append(
            f"\n\n--- PAGE {page_number} ---\n\n{text}"
        )

    return "".join(pages)


def extract_pdf(pdf_path: Path) -> str:
    """
    Try PyMuPDF first because it is generally more tolerant
    of malformed PDFs. Fall back to pypdf if necessary.
    """

    try:
        print("  Trying PyMuPDF...")
        text = extract_with_pymupdf(pdf_path)

        if len(text.strip()) > 200:
            return text

        print(
            f"  PyMuPDF extracted only {len(text.strip())} "
            "characters. Trying pypdf..."
        )

    except Exception as e:
        print(f"  PyMuPDF failed: {e}")

    try:
        print("  Trying pypdf...")
        return extract_with_pypdf(pdf_path)

    except Exception as e:
        print(f"  pypdf failed: {e}")
        return ""


def main():
    PDF_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    pdf_files = sorted(PDF_DIR.glob("*.pdf"))

    if not pdf_files:
        print(f"No PDFs found in: {PDF_DIR}")
        return

    print(f"Found {len(pdf_files)} PDF(s).")

    for pdf_path in pdf_files:

        print(f"\nProcessing: {pdf_path.name}")

        text = extract_pdf(pdf_path)

        output_name = pdf_path.stem + ".txt"
        output_path = OUTPUT_DIR / output_name

        output_path.write_text(
            text,
            encoding="utf-8"
        )

        print(f"Saved: {output_path}")
        print(
            f"Characters extracted: "
            f"{len(text):,}"
        )


if __name__ == "__main__":
    main()