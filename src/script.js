/* ✨ Ceremonial Anthology Scroll Logic ✨ */

import { createClient } from '@supabas../supabase-js'

// 🔧 Supabase setup
const supabaseUrl = "https://YOUR_PROJECT.supabase.co"
const supabaseKey = "YOUR_ANON_KEY"
const supabase = createClient(supabaseUrl, supabaseKey)

const blessings = {
  stone: "From the depths of endurance, the Stone awakens—Steadfast and eternal.",
  river: "Flowing through time's memory, the River speaks in ripples of truth.",
  flame: "Kindled by purpose, the Flame dances—Illuminating the path of courage.",
  celestial: "Stars whisper their harmony; the Celestial veil unfolds in radiant grace.",
  ouroboros: "The serpent encircles all beginnings and ends—The eternal return sanctified."
};

const branchColors = {
  stone: "#4CAF50",
  river: "#2196F3",
  flame: "#FF5722",
  celestial: "#9C27B0",
  ouroboros: "#FFD700"
};

let activeBranches = new Set();

// Constellation canvas
const canvas = document.getElementById('constellation');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* 🔊 Sound motifs */
function playSound(branch) {
  const audio = document.getElementById(`sound-${branch}`);
  audio.currentTime = 0;
  audio.play();
}

/* 🌌 Branch constellation overlay */
function drawConstellation(branch) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = branchColors[branch];
  ctx.lineWidth = 1.5;

  const stars = [];
  for (let i = 0; i < 30; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height
    });
    ctx.beginPath();
    ctx.arc(stars[i].x, stars[i].y, 2, 0, Math.PI * 2);
    ctx.fillStyle = branchColors[branch];
    ctx.fill();
  }

  ctx.beginPath();
  for (let i = 0; i < stars.length - 1; i++) {
    ctx.moveTo(stars[i].x, stars[i].y);
    ctx.lineTo(stars[i + 1].x, stars[i + 1].y);
  }
  ctx.stroke();
}

/* ✨ Idle shimmer animation */
function animateIdleSky() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
}
setInterval(animateIdleSky, 3000);

/* 🖱️ Crest invocation */
document.querySelectorAll('.crest').forEach(button => {
  button.addEventListener('click', () => {
    const branch = button.id;
    button.classList.toggle('active');
    playSound(branch);
    drawConstellation(branch);

    const log = document.getElementById('log');
    const entry = document.createElement('li');
    entry.textContent = `${new Date().toLocaleTimeString()} - ${blessings[branch]}`;
    log.appendChild(entry);

    activeBranches.add(branch);

    if (activeBranches.size === 5) {
      const star = document.getElementById('golden-star');
      star.style.opacity = 1;
      star.textContent = "🌟 The Circle of Five converges; Harmony ascends in the Golden Star's embrace 🌟";
    }
  });
});

/* 🪨 Stone Crest – Community Members */
document.getElementById('memberForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)

  const { error } = await supabase
    .from('members')
    .insert([{
      name: formData.get('name'),
      national_id: formData.get('national_id'),
      insurance_policy_id: formData.get('policy_number'),
      location: formData.get('location'),
      family_size: formData.get('family_size')
    }])

  if (error) alert("Error: " + error.message)
  else alert("Membership application submitted successfully!")
})

/* 💧 River Crest – Insurance Policies */
document.getElementById('insuranceForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)

  const { error } = await supabase
    .from('insurance_policies')
    .insert([{
      coverage_type: formData.get('coverage_type'),
      premium_amount: formData.get('premium_amount'),
      status: 'active'
    }])

  if (error) alert("Error: " + error.message)
  else alert("Insurance policy subscribed successfully!")
})

/* 🔥 Flame Crest – Miners */
document.getElementById('minerForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)

  const { error } = await supabase
    .from('funding_requests')
    .insert([{
      miner_name: formData.get('name'),
      license_number: formData.get('license_number'),
      amount_requested: formData.get('amount_requested'),
      purpose: formData.get('purpose'),
      insurance_policy_id: formData.get('policy_number'),
      status: 'pending'
    }])

  if (error) alert("Error: " + error.message)
  else alert("Funding request submitted successfully!")
})

/* ✨ Celestial Crest – Land Transactions */
document.getElementById('landForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)

  const { error } = await supabase
    .from('land_transactions')
    .insert([{
      source_type: formData.get('source_type'),
      transaction_type: formData.get('transaction_type'),
      location: formData.get('location'),
      size: formData.get('size'),
      value: formData.get('value')
    }])

  if (error) alert("Error: " + error.message)
  else alert("Land transaction recorded successfully!")
})

/* 🐍 Ouroboros Crest – Financing */
document.getElementById('financeForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)

  const { error } = await supabase
    .from('financing')
    .insert([{
      bank_name: formData.get('bank_name'),
      funding_request_id: formData.get('fundingrequestid'),
      status: formData.get('status'),
      amount: formData.get('amount')
    }])

  if (error) alert("Error: " + error.message)
  else alert("Financing approval recorded successfully!")
})

/* 🌟 Golden Star Covenant Dashboard with Progress Bars + Aura Rings + Sound */
async function updateGoldenStar() {
  const { count: membersCount } = await supabase.from('members').select('*', { count: 'exact', head: true })
  const { count: policiesCount } = await supabase.from('insurance_policies').select('*', { count: 'exact', head: true })
  const { count: fundingCount } = await supabase.from('funding_requests').select('*', { count: 'exact', head: true })
  const { count: landCount } = await supabase.from('land_transactions').select('*', { count: 'exact', head: true })
  const { count: financeCount } = await supabase.from('financing').select('*', { count: 'exact', head: true })

  const targets = { members: 100, policies: 100, funding: 50, land: 20, finance: 50 }

  function progressBar(current, target, cssClass) {
    const percent = Math.min((current / target) * 100, 100)
    return `
      <div class="progress-container">
        <div class="${cssClass}" style="width:${percent}%"></div>
      </div>
      <small>${current}/${target}</small>
    `
  }

  const star = document.getElementById('golden-star')
  star.style.opacity = 1
  star.innerHTML = `
    🌟 Golden Star of Harmony 🌟<br><br>
    Members: ${progressBar(membersCount || 0, targets.members, 'progress-stone')}
    Policies: ${progressBar(policiesCount || 0, targets.policies, 'progress-river')}
    Funding: ${progressBar(fundingCount || 0, targets.funding, 'progress-flame')}
    Land: ${progressBar(landCount || 0, targets.land, 'progress-celestial')}
    Financing: ${progressBar(financeCount || 0, targets.finance, 'progress-ouroboros')}
  `

  // Calculate overall covenant progress
  const totalPercent = (
    ((membersCount || 0) / targets.members) +
    ((policiesCount || 0) / targets.policies) +
    ((fundingCount || 0) / targets.funding) +
    ((landCount || 0) / targets.land) +
    ((financeCount || 0) / targets.finance)
  ) / 5 * 100

  // Apply aura rings + play sound when covenant is complete
  if (totalPercent >= 100) {
    if (!star.classList.contains('complete')) {
      // First time reaching completion → play celestial chime
      const completeAudio = document.getElementById('sound-complete')
      if (completeAudio) {
        completeAudio.currentTime = 0
        completeAudio.play()
      }

      // Stagger crest sounds for harmony build-up with ripple effect
      const crestSounds = [
        { id: 'sound-stone', delay: 0, color: branchColors.stone },
        { id: 'sound-river', delay: 500, color: branchColors.river },
        { id: 'sound-flame', delay: 1000, color: branchColors.flame },
        { id: 'sound-celestial', delay: 1500, color: branchColors.celestial },
        { id: 'sound-ouroboros', delay: 2000, color: branchColors.ouroboros }
      ]

      crestSounds.forEach(({ id, delay, color }) => {
        setTimeout(() => {
          const audio = document.getElementById(id)
          if (audio) {
            audio.currentTime = 0
            audio.play()
          }

          // Trigger ripple effect in sync
          star.classList.add('ripple')
          star.style.setProperty('--ripple-color', color)

          // Remove ripple after animation ends
          setTimeout(() => {
            star.classList.remove('ripple')
          }, 1500)
        }, delay)
      })

      // After Ouroboros bell, trigger unified ripple burst + narration
      setTimeout(() => {
        star.classList.add('unified')
        star.innerHTML += `<br><br>🌌 The Circle of Five converges — harmony ascends 🌌`

        // Remove unified ripple after animation ends
        setTimeout(() => {
          star.classList.remove('unified')
        }, 2000)
      }, 2500) // 0.5s after Ouroboros sound
    }
    star.classList.add('complete')
  } else {
    star.classList.remove('complete')
  }
}

// Refresh dashboard every 10 seconds
setInterval(updateGoldenStar, 10000)
updateGoldenStar()
