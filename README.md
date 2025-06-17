# ResumeIQ

ResumeIQ is an AI-powered resume analyzer and job matcher. Upload your resume (PDF or DOCX) and get:

* Extracted technical skills
* Detailed AI-generated feedback
* Live matching job recommendations

---

🚀 **Features**

* **Smart Resume Parsing:** Supports PDF and DOCX
* **AI-Powered Feedback:** Uses Gemini LLM for tailored suggestions and recommendations
* **Live Job Search:** Fetches relevant jobs from Google Jobs via SerpAPI
* **Modern UI:** Built with React, TailwindCSS, and shadcn/ui; fully responsive

---

🛠 **Tech Stack**

| Layer      | Tech                                     |
| :--------- | :--------------------------------------- |
| Frontend   | React (Vite), TailwindCSS, shadcn/ui     |
| Backend    | FastAPI (Python), Spacy, Gemini LLM (API) |
| Jobs API   | SerpAPI (Google Jobs)                    |

---

⚡️ **Getting Started**

### 1. Prerequisites

* Python 3.9+
* Node.js 18+
* npm
* (Recommended) virtualenv/venv

### 2. Clone the Repo

```bash
git clone [https://github.com/yourusername/resumeIQ.git](https://github.com/yourusername/resumeIQ.git)
cd resumeIQ
```

### 3. Backend Setup

```bash
cd resumeiq-backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file in `resumeiq-backend/` with your API keys:

```
GOOGLE_API_KEY=your_gemini_api_key_here
SERPAPI_API_KEY=your_serpapi_api_key_here
```

Run the backend:

```bash
uvicorn main:app --reload --port 8000
```

### 4. Frontend Setup

```bash
cd ../resumeiq-frontend
npm install
npm run dev
```

The frontend will run at: `http://localhost:5173`

---

🧑‍💻 **Usage**

1.  Open the frontend in your browser
2.  Upload your resume (PDF/DOCX)
3.  See skills, AI feedback, and matching job cards instantly

---

🤝 **Contributing**

Want to contribute? Collaborators (like your brother) can be added via GitHub repo settings.

1.  Ask the repo owner to add your GitHub username as a collaborator.
2.  Accept the invite (via email or GitHub notification).
3.  Clone the repo and create a new branch:

    ```bash
    git clone https://[https://github.com/yourusername/resumeIQ.git](https://github.com/yourusername/resumeIQ.git)
    cd resumeIQ
    git checkout -b your-feature-branch
    ```

4.  Commit and push your changes:

    ```bash
    git add .
    git commit -m "Describe your changes"
    git push origin your-feature-branch
    ```

5.  Open a Pull Request (PR) on GitHub!

---

📂 **Project Structure**

```
resumeIQ/
│
├── resumeiq-backend/       # FastAPI backend
│   ├── main.py
│   ├── parser.py
│   ├── skills.py
│   ├── feedback.py
│   ├── job_search.py
│   ├── utils.py
│   └── requirements.txt
│
├── resumeiq-frontend/      # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── FileUpload.jsx
│   │   │   ├── SkillsChips.jsx
│   │   │   ├── FeedbackMarkdown.jsx
│   │   │   └── JobCards.jsx
│   │   └── ...
│   ├── package.json
│   └── ...
│
└── README.md               # This file
```

---

⚠️ **Notes**

* API Keys are required for Gemini (Google AI) and SerpAPI (Google Jobs).
* Do NOT share your `.env` file publicly!
* For issues or suggestions, please open an issue or PR.
