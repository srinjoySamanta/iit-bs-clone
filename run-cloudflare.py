import subprocess, re, time, os, sys

target_url = "http://localhost:5173"
print(f"Starting Cloudflare 24/7 tunnel for {target_url}...")

cmd = [os.path.join(os.path.dirname(__file__), "cloudflared.exe"), "tunnel", "--url", target_url, "--no-autoupdate"]
proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, bufsize=1)

url_file = os.path.join(os.path.dirname(__file__), "cloudflare_url.txt")

while True:
    line = proc.stderr.readline()
    if not line:
        time.sleep(1)
        continue
    sys.stdout.write(line)
    sys.stdout.flush()
    match = re.search(r'https://[a-zA-Z0-9-]+\.trycloudflare\.com', line)
    if match:
        found_url = match.group(0)
        with open(url_file, "w") as f:
            f.write(found_url)
        print(f"\n=======================================================")
        print(f"  PUBLIC 24/7 ZERO-PASSWORD URL: {found_url}")
        print(f"=======================================================\n")
