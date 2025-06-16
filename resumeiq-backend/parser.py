import fitz 
import docx
import os
import tempfile
from fastapi import UploadFile

def extract_text_from_pdf(file_path: str) -> str:
    text = ""
    with fitz.open(file_path) as pdf:
        for page in pdf:
            text += page.get_text()
    return text

def extract_text_from_docx(file_path: str) -> str:
    doc = docx.Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs])

def parse_resume(file: UploadFile) -> str:
    suffix = os.path.splitext(file.filename)[1].lower()
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        tmp.write(file.file.read())
        tmp_path = tmp.name
    try:
        if suffix == ".pdf":
            return extract_text_from_pdf(tmp_path)
        elif suffix == ".docx":
            return extract_text_from_docx(tmp_path)
        else:
            return ""
    finally:
        os.remove(tmp_path)
