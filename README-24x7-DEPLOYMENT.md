# 24x7 Live Access Guide — IIT Kharagpur BS Portal

Your website is now configured for **24/7 Live Availability** across three tiers:

---

## 🌐 1. Live Public Internet URL (Active Right Now)

Your local development server is securely tunneled to the public internet:

- **Public URL**: [https://upset-ways-drum.loca.lt](https://upset-ways-drum.loca.lt)
- **Tunnel Password / IP**: `203.110.242.51`
  *(When prompted on your first visit, enter `203.110.242.51` and click "Click to Submit" to view the live site from any device, mobile phone, or laptop worldwide).*

- **Local Network / LAN URLs**:
  - `http://localhost:5173/`
  - `http://10.35.1.205:5173/`
  - `http://10.148.6.213:5173/`

---

## 💻 2. Run 24/7 on Windows (Silent Background Service)

To keep the website running 24/7 on your local machine even when terminals are closed:

1. **Silent Background Launch**:
   - Double-click [`start-24x7-background.vbs`](file:///e:/IIT%20kgp%20bs/start-24x7-background.vbs).
   - This starts the Vite dev server silently without keeping any command prompt window open.

2. **Auto-Start on Windows Boot (24/7 Persistence)**:
   - Press `Win + R`, type `shell:startup`, and press Enter.
   - Right-click [`start-24x7-background.vbs`](file:///e:/IIT%20kgp%20bs/start-24x7-background.vbs) -> Create Shortcut.
   - Move the shortcut into the Windows Startup folder.
   - Every time your computer boots, your portal will automatically start and run 24/7 in the background!

---

## ☁️ 3. Permanent Global Cloud Hosting (100% Free, 24/7/365, Never Goes Down)

Because a local PC can lose internet or go to sleep, the industry standard for a permanent 24/7 website is free static hosting:

### Option A: Drag-and-Drop to Netlify (Fastest — 30 Seconds)
1. Open [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `e:\IIT kgp bs\dist` folder directly onto the browser window.
3. Your site will instantly be given a permanent 24/7 HTTPS address like `https://iitkgp-bs-portal.netlify.app`.

### Option B: Deploy with Vercel CLI
Run this command in terminal:
```bash
cd "e:\IIT kgp bs"
npx vercel
```
Follow the 3 prompts to deploy directly to a permanent free `.vercel.app` URL with global CDN and SSL.
