#!/data/data/com.termux/files/usr/bin/bash

cd ~/angelic-triggered-solutions/angelic-triggered-solutions/public/certificates/output/

# Build fresh HTML with live values
cat > regeneration_dashboard.html <<HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Certificate Regeneration Dashboard</title>
  <meta http-equiv="refresh" content="60">
  <style>
    body { font-family: Arial, sans-serif; background: #fdf6e3; color: #333; }
    h1 { text-align: center; color: #b58900; }
    .summary { margin: 20px auto; width: 80%; border: 2px solid #b58900; padding: 20px; background: #fff; }
    .crest { display: inline-block; margin: 10px; text-align: center; }
    .crest img { width: 150px; height: auto; border: 1px solid #ccc; padding: 5px; background: #fafafa; }
    .log { margin-top: 20px; font-size: 14px; }
  </style>
</head>
<body>
  <h1>Certificate Regeneration Dashboard</h1>
  <div class="summary">
    <h2>Latest Run: $(date)</h2>
    <p>Total Certificates Regenerated: $(ls output_*.png | wc -l)</p>
    <div class="crest">
      <img src="output_ats-crest.png" alt="ATS Crest"><br>ATS Crest
    </div>
    <div class="crest">
      <img src="output_in-unity-faith.png" alt="Unity & Faith Crest"><br>Unity & Faith
    </div>
    <div class="crest">
      <img src="output_golden-covenant.png" alt="Golden Covenant Crest"><br>Golden Covenant
    </div>
    <div class="log">
      <h3>Regeneration Log</h3>
      <pre>$(tail -20 regeneration_log.txt)</pre>
    </div>
  </div>
</body>
</html>
HTML
