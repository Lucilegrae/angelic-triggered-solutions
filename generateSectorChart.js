import { createClient } from '@supabase/supabase-js';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import fs from 'fs';   // <-- move import to the top

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function generateSectorChart() {
  const { data, error } = await supabase
    .from('covenant_profiles')
    .select('sector');

  if (error) throw error;

  const counts = {};
  data.forEach(row => {
    counts[row.sector] = (counts[row.sector] || 0) + 1;
  });

  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 800, height: 600 });
  const config = {
    type: 'bar',
    data: {
      labels: Object.keys(counts),
      datasets: [{
        label: 'Profiles per Sector',
        data: Object.values(counts),
        backgroundColor: 'gold'
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Phoenix Rising: Sector Counts',
          color: 'gold'
        }
      }
    }
  };

  const image = await chartJSNodeCanvas.renderToBuffer(config);
  fs.writeFileSync('sector_chart.png', image);
  console.log('Chart saved as sector_chart.png');
}

generateSectorChart();


