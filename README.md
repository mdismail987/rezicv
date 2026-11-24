# ReziCV — AI Resume Builder (RenderCV Powered & ATS-Optimized)

> **Build high-impact, ATS-optimized resumes with AI bullet rewriting, job description tailoring, and clean RenderCV formatting.** Inspired by Rezi’s core business model ($272k/mo) and built on the open-source **[rendercv/rendercv](https://github.com/rendercv/rendercv)** typography and schema standards.

---

## 🌟 Key Features

1. **Guided Multi-Step Form**:
   - Structured sections: Contact & Socials, Professional Summary, Work Experience, Education, Projects, Technical Skills, and Certifications.
   - Clean, ATS-friendly typography avoiding column layouts that break parsers.

2. **RenderCV Themes & Standards**:
   - **RenderCV Classic**: Harvard/Columbia standard with clean horizontal dividers.
   - **SB2Nov (Jake’s Resume)**: The #1 resume format from Reddit `r/EngineeringResumes` (ultra-dense, 99% ATS pass rate).
   - **ModernCV Accent**: Modern header with subtle accent bars.
   - **Engineering Matrix**: Tech skills-first layout with monospaced accents.
   - **Executive Minimalist**: Refined whitespace and typography for senior roles.

3. **AI Bullet Point Enhancer (STAR Method)**:
   - **STAR Impact**: Turns passive phrasing into Action Verb + Context + Measurable Result.
   - **Metrics Booster**: Injects percentages, dollar amounts, and scalability benchmarks.
   - **Executive Tone**: Rephrases for senior leadership and strategic ownership.
   - **Concise & Punchy**: Trims filler words for high ATS keyword density.

4. **Target Job Description Matcher**:
   - Paste any target job description.
   - Real-time **ATS Match Score** (0–100%).
   - Identifies **Matched Keywords** vs **Missing Keywords**.
   - Generates tailored bullet point suggestions and a tailored executive summary.

5. **Interoperability & Export**:
   - **Vector PDF Export**: One-click download using print-optimized CSS for selectable vector text that ATS bots can parse effortlessly.
   - **RenderCV YAML Code**: Full two-way sync with the official RenderCV schema (`# yaml-language-server: $schema=...`).

6. **Monetization & Auth**:
   - Email/password authentication with 1-click Demo Account.
   - Free Tier vs Pro Tier ($19 Lifetime / $9 mo).
   - Stripe Checkout test mode integration (`/api/stripe/checkout`) + instant local test bypass.

---

## 🚀 Quick Start (Local Run)

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **pnpm** (default package manager)

### 2. Installation
```bash
cd rezicv
pnpm install
```

### 3. Run Development Server
```bash
# Starts the frontend with hot module reload on http://localhost:3000
pnpm dev
```

Optionally, run the local backend server (for API simulation):
```bash
# In a separate terminal
pnpm server
```

Open your browser at **`http://localhost:3000`**.

---

## ⚙️ Environment Variables

Create a `.env.local` or `.env` file in the root directory:

```env
# Google Gemini API key (optional, for live AI inference)
# If omitted, ReziCV uses its built-in NLP heuristics engine automatically!
GEMINI_API_KEY=your_gemini_api_key_here

# Stripe Keys (optional, for test mode checkout)
# If omitted, 1-click simulated checkout is enabled for instant testing!
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Port for local server (default: 3001)
PORT=3001
```

---

## 🌐 Deploying to Vercel (100% Free on Vercel Hobby Plan)

### Method A: Deploy via GitHub (Recommended)
1. Push this project to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of ReziCV"
   git remote add origin https://github.com/your-username/rezicv.git
   git push -u origin main
   ```
2. Go to **[vercel.com](https://vercel.com)** and sign in with your GitHub account.
3. Click **"Add New..." → "Project"**.
4. Select your `rezicv` repository.
5. In the configuration:
   - **Framework Preset**: `Vite`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
6. (Optional) Under **Environment Variables**, add `GEMINI_API_KEY` and `STRIPE_SECRET_KEY`.
7. Click **"Deploy"**. Your live URL (e.g. `https://rezicv.vercel.app`) will be ready in under 60 seconds!

### Method B: Deploy via Vercel CLI
```bash
pnpm dlx vercel
```
Follow the terminal prompts and your site will be live.

---

## 📱 Converting into an Android APK / App

You have three clean options to turn this web app into an Android app:

### Option 1: Progressive Web App (PWA) - Instant 0-config
1. Open your live Vercel URL in Google Chrome on your Android phone.
2. Tap the Chrome three-dot menu `⋮` and select **"Add to Home screen"** or **"Install app"**.
3. ReziCV will install as a standalone full-screen native Android app (using the configured `manifest.json`).

### Option 2: PWABuilder (Generate Signed APK in 2 Minutes)
1. Visit **[PWABuilder.com](https://www.pwabuilder.com/)**.
2. Enter your live Vercel URL (e.g. `https://rezicv.vercel.app`).
3. Click **"Package for Stores"** → **Android**.
4. Download the generated ready-to-install `.apk` or `.aab` file for Google Play.

### Option 3: Capacitor (Full Native Wrapper)
```bash
pnpm add @capacitor/core @capacitor/cli @capacitor/android
pnpm dlx cap init ReziCV com.rezicv.app --web-dir dist
pnpm build
pnpm dlx cap add android
pnpm dlx cap open android
```

---

## 📄 License
MIT License. Inspired by RenderCV and Rezi.
