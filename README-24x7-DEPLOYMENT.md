# 24x7 Live Access & Google Cloud Deployment Guide

Your **IIT Kharagpur BS Programme Portal** is configured with:
1. **Dedicated Student Login Page** (`#student-login`)
2. **Dedicated Admin Login Page** (`#admin-login`)
3. **All-in-One Single Page Website for Everyone** (`#home` or `/`)
4. **Live Public Internet Tunnel**
5. **Git Repository & GitHub Push Tool**
6. **Google Cloud 24/7 Enterprise Deployment**

---

## 🌐 1. Live URLs (Active Right Now)

| Interface | URL |
| :--- | :--- |
| **All-in-One Single Page (Public Portal)** | [http://localhost:5173/](http://localhost:5173/) |
| **Dedicated Student Login Page** | [http://localhost:5173/#student-login](http://localhost:5173/#student-login) |
| **Dedicated Admin Login Page** | [http://localhost:5173/#admin-login](http://localhost:5173/#admin-login) |
| **Public 24/7 Internet URL** | [https://silent-hands-tell.loca.lt](https://silent-hands-tell.loca.lt) |

> **Tunnel Verification Password**: `203.110.242.51`  
> *(When visiting the public tunnel URL on mobile/PC for the first time, enter `203.110.242.51` and click "Click to Submit").*

---

## 🐙 2. How to Add to Your GitHub

Your project is already initialized as a clean Git repository with `main` branch and initial commit ready!

To push to your GitHub:
1. Go to [https://github.com/new](https://github.com/new) and create a repository (e.g., `iit-kgp-bs`).
2. Double-click the helper script in your project folder:
   👉 [**`push-to-github.bat`**](file:///e:/IIT%20kgp%20bs/push-to-github.bat)
3. Paste your GitHub repository URL (e.g., `https://github.com/YourUsername/iit-kgp-bs.git`) and press Enter!

*Or manually in terminal:*
```powershell
cd "e:\IIT kgp bs"
git remote add origin https://github.com/<YourUsername>/<YourRepo>.git
git push -u origin main
```

---

## ☁️ 3. Deploy 24/7 on Google Cloud

We have added enterprise-grade configuration files for all Google Cloud deployment modes:

### Method A: Google Cloud Run (Docker Container — Most Powerful)
- Uses the included [`Dockerfile`](file:///e:/IIT%20kgp%20bs/Dockerfile) and [`nginx.conf`](file:///e:/IIT%20kgp%20bs/nginx.conf).
- Run:
  ```bash
  gcloud run deploy iitkgp-bs-portal --source . --region asia-south1 --allow-unauthenticated --min-instances 1
  ```
  *(`--min-instances 1` ensures zero cold-start delay, running 24/7 continuously).*

### Method B: Google App Engine (Simplest Google Cloud Service)
- Uses the included [`app.yaml`](file:///e:/IIT%20kgp%20bs/app.yaml).
- Run:
  ```bash
  gcloud app deploy app.yaml
  ```

### Method C: Firebase Hosting by Google Cloud (100% Free Forever 24/7)
- Uses the included [`firebase.json`](file:///e:/IIT%20kgp%20bs/firebase.json).
- Run:
  ```bash
  npx firebase-tools login
  npx firebase-tools init hosting
  npx firebase-tools deploy
  ```

### Method D: Automated GitHub Actions CI/CD to Google Cloud
- The automated workflow at [`.github/workflows/deploy-gcp.yml`](file:///e:/IIT%20kgp%20bs/.github/workflows/deploy-gcp.yml) automatically compiles and deploys your website to Google Cloud on every `git push` to your repository!
