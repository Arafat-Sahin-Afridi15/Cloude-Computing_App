# AI Cloud Service

**Name:** Arafat Sahin Afridi
**Student ID:** 2026512801

A simple Node.js + Express web service with a functioning AI feature (chat/Q&A powered
by the OpenAI API), built for Assignment 1: "Make a simple Render-based cloud service
that uses AI feature."

## What it does
- Home page shows my name and student ID.
- A text box lets you type a prompt/question.
- The server calls the OpenAI API and returns the AI's answer on the page.

## Project structure
```
ai-cloud-service/
├── public/
│   └── index.html      # home page + AI chat UI
├── server.js            # Express server + /api/ask endpoint
├── package.json
├── .env.example
└── README.md
```

## Step-by-step: how I deployed this to Render

### 1. Get a free OpenAI API key
1. Go to https://platform.openai.com/api-keys and sign up / log in.
2. Click "Create new secret key" and copy it (starts with `sk-...`).
3. New accounts usually get a small free trial credit — enough for a class demo.
   (If your trial has expired, any teammate's key or Google AI Studio's free
   Gemini API key can be swapped in with a small code change — ask if you need this.)

### 2. Push the code to GitHub
From inside the `ai-cloud-service` folder:
```bash
git init
git add .
git commit -m "Initial commit: AI cloud service for Assignment 1"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```
(Create an empty repository first at https://github.com/new — don't add a
README/.gitignore there, since this project already has them.)

### 3. Deploy on Render
1. Go to https://render.com and sign up / log in (you can sign in with GitHub).
2. Click **New +** → **Web Service**.
3. Connect your GitHub account and select this repository.
4. Fill in the settings:
   - **Name:** ai-cloud-service (or anything you like)
   - **Region:** closest to you
   - **Branch:** main
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. Under **Environment Variables**, click **Add Environment Variable**:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** (paste your OpenAI key from Step 1)
6. Click **Create Web Service**.
7. Render will build and deploy automatically. After a minute or two, you'll get a
   live URL like `https://ai-cloud-service-xxxx.onrender.com`.
8. Open that URL — you should see the home page with your name/ID and the AI box working.

### 4. Submit
- Submit the Render live URL and the GitHub repo link to the LMS by 28 September.

## Running locally (optional, to test before deploying)
```bash
npm install
cp .env.example .env
# edit .env and paste your real OPENAI_API_KEY
npm start
# open http://localhost:3000
```

## Notes
- The free Render tier "spins down" after inactivity, so the first request after
  idle time may take ~30–50 seconds to wake up — this is normal.
- Never commit your real API key. `.env` is already excluded via `.gitignore`.
