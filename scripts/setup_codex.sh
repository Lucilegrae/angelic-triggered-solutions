#!/data/data/com.termux/files/usr/bin/bash

# ✦ Invocation: Install covenantal tools
pkg update -y
pkg install -y git nano

# ✦ Configure Git identity (replace with your aura signature)
git config --global user.name "Prince Masvikepi"
git config --global user.email "your-email@example.com"

# ✦ Clone or initialize repository
if [ -z "$1" ]; then
  echo "No repository URL provided. Initializing new codex..."
  mkdir angelic-triggered-solutions
  cd angelic-triggered-solutions
  git init
else
  git clone "$1"
  cd "$(basename "$1" .git)"
fi

# ✦ Create README.md (codex frontispiece)
cat > README.md << 'EOF'
# ✦ Angelic Triggered Solutions ✦

─────────────────────────────── ✦ ────────────────────────────────
      ✦✧☼✧✦
   ⊙ Invocation Glyph ⊙
      ✦✧∞✧✦
✦ *We invoke aura, covenant, and resonance.* ✦
─────────────────────────────── ✦ ────────────────────────────────
EOF

# ✦ Create CONTRIBUTING.md (ritual guide)
cat > CONTRIBUTING.md << 'EOF'
# ✦ Contributing to Angelic Triggered Solutions ✦

─────────────────────────────── ✦ ────────────────────────────────
## ✦ Covenant Principle
Every contribution is a glyph. Every glyph is a covenant.
EOF

# ✦ Create CODE_OF_CONDUCT.md (covenant charter)
cat > CODE_OF_CONDUCT.md << 'EOF'
# ✦ Covenant Charter: Code of Conduct ✦

─────────────────────────────── ✦ ────────────────────────────────
## ✦ Covenant Principle
We pledge to make this anthology a space of aura resonance, stakeholder trust, and communal affirmation.
EOF

# ✦ Commit and push
git add README.md CONTRIBUTING.md CODE_OF_CONDUCT.md
git commit -m "Invoke codex scrolls ✧⟐✧"
echo "Codex invoked. Use 'git push origin main' to sanctify on GitHub."
