export const wasteProfiles = {
  plastic: {
    wasteType: 'Plastic Bottle',
    category: 'Plastic',
    disposalMethod:
      'Rinse the bottle, remove extra liquid, and place it in a plastics recycling bin if your area accepts PET containers.',
    environmentalTip:
      'Crushing bottles before disposal can save storage space and reduce collection volume.',
    impactScore: 63,
    impactLabel: 'Manageable',
  },
  organic: {
    wasteType: 'Food Scraps',
    category: 'Organic',
    disposalMethod:
      'Send it to a compost bin or municipal organics collection so it breaks down without producing excess landfill methane.',
    environmentalTip:
      'Keep organics separate from dry recyclables to prevent contamination.',
    impactScore: 38,
    impactLabel: 'Lower Risk',
  },
  metal: {
    wasteType: 'Aluminum Can',
    category: 'Metal',
    disposalMethod:
      'Empty and lightly rinse the can, then place it in a metal or mixed recycling stream accepted by your local program.',
    environmentalTip:
      'Aluminum is highly recyclable, so keeping cans clean helps them stay in circulation.',
    impactScore: 49,
    impactLabel: 'Recoverable',
  },
  glass: {
    wasteType: 'Glass Jar',
    category: 'Glass',
    disposalMethod:
      'Remove food residue and sort it into a glass recycling stream if your municipality supports container glass collection.',
    environmentalTip:
      'Reuse jars for storage before recycling to extend their life cycle.',
    impactScore: 44,
    impactLabel: 'Stable',
  },
  paper: {
    wasteType: 'Paper / Cardboard',
    category: 'Paper',
    disposalMethod:
      'Keep it clean and dry, then place it in a paper recycling bin. Remove any plastic tape or coatings first.',
    environmentalTip:
      'Recycling one tonne of paper saves roughly 17 trees and 26,000 litres of water.',
    impactScore: 35,
    impactLabel: 'Lower Risk',
  },
  ewaste: {
    wasteType: 'Electronic Waste',
    category: 'E-Waste',
    disposalMethod:
      'Never put electronics in regular bins. Take them to a certified e-waste collection point or retailer take-back program.',
    environmentalTip:
      'E-waste contains toxic materials like lead and mercury that contaminate soil and water if landfilled.',
    impactScore: 88,
    impactLabel: 'High Risk',
  },
  textile: {
    wasteType: 'Textile / Fabric',
    category: 'Textile',
    disposalMethod:
      'Donate wearable items. For damaged textiles, look for textile recycling bins or drop-off programs in your area.',
    environmentalTip:
      'The fashion industry produces 10% of global carbon emissions — extending garment life helps.',
    impactScore: 52,
    impactLabel: 'Moderate',
  },
  not_waste: {
    wasteType: 'Not Identified as Waste',
    category: 'Unknown / Not Waste',
    disposalMethod:
      'This image does not appear to be a waste item. Try uploading a clearer picture of a waste item such as a plastic bottle, food scraps, metal can, or glass jar.',
    environmentalTip:
      'For best results, use descriptive filenames like "plastic-bottle.jpg" or upload images that clearly show a single waste item.',
    impactScore: 0,
    impactLabel: 'Not Applicable',
  },
}

export function inferWasteFromFilename(filename = '') {
  const normalized = filename.toLowerCase()

  if (/(plastic|bottle|bag|wrapper|packaging|straw|cup|lid|polythene|nylon|pet|hdpe|styrofoam|sachet)/.test(normalized)) {
    return wasteProfiles.plastic
  }

  if (/(banana|food|leaf|peel|organic|compost|fruit|vegetable|rice|bread|leftover|scraps|apple|orange|egg)/.test(normalized)) {
    return wasteProfiles.organic
  }

  if (/(can|metal|tin|aluminium|aluminum|steel|iron|foil|wire|scrap-metal)/.test(normalized)) {
    return wasteProfiles.metal
  }

  if (/(glass|jar|bottle-glass|mirror|window-glass|vase)/.test(normalized)) {
    return wasteProfiles.glass
  }

  if (/(paper|cardboard|newspaper|magazine|carton|box|envelope|tissue|napkin)/.test(normalized)) {
    return wasteProfiles.paper
  }

  if (/(phone|battery|charger|cable|laptop|computer|circuit|electronic|ewaste|e-waste|keyboard|mouse|monitor|printer|tv|television)/.test(normalized)) {
    return wasteProfiles.ewaste
  }

  if (/(cloth|fabric|textile|shirt|jeans|shoe|sock|dress|jacket|sweater|cotton|polyester|garment)/.test(normalized)) {
    return wasteProfiles.textile
  }

  // If nothing matched, it is NOT recognized as waste
  return wasteProfiles.not_waste
}

/* ── Quiz Data ──────────────────────────────────────────── */
export const quizQuestions = [
  {
    id: 1,
    question: 'Which SDG focuses on responsible consumption and production?',
    options: ['SDG 6', 'SDG 12', 'SDG 14', 'SDG 15'],
    correctIndex: 1,
    explanation:
      'SDG 12 — Responsible Consumption and Production — aims to ensure sustainable consumption and production patterns worldwide.',
  },
  {
    id: 2,
    question: 'What percentage of global plastic waste is actually recycled?',
    options: ['About 9%', 'About 35%', 'About 55%', 'About 75%'],
    correctIndex: 0,
    explanation:
      'Only about 9% of all plastic ever produced has been recycled. The rest ends up in landfills, incinerated, or in the environment.',
  },
  {
    id: 3,
    question: 'Which of these should NOT go in a regular recycling bin?',
    options: ['Aluminum can', 'Plastic bottle', 'Used battery', 'Cardboard box'],
    correctIndex: 2,
    explanation:
      'Batteries contain hazardous chemicals and must be taken to special e-waste or battery collection points.',
  },
  {
    id: 4,
    question: 'How long does a plastic bottle take to decompose in nature?',
    options: ['10 years', '50 years', '200 years', '450+ years'],
    correctIndex: 3,
    explanation:
      'A plastic bottle can take 450 years or more to decompose, leaching harmful chemicals into soil and water in the process.',
  },
  {
    id: 5,
    question: 'What is the benefit of composting organic waste instead of landfilling it?',
    options: [
      'It produces less methane',
      'It creates useful fertiliser',
      'It reduces landfill volume',
      'All of the above',
    ],
    correctIndex: 3,
    explanation:
      'Composting reduces methane emissions, creates nutrient-rich soil, and diverts waste from overburdened landfills.',
  },
  {
    id: 6,
    question: 'Which material is the most recyclable — it can be recycled infinitely?',
    options: ['Plastic', 'Glass', 'Paper', 'Aluminum'],
    correctIndex: 3,
    explanation:
      'Aluminum can be recycled infinitely without losing quality, making it one of the most sustainable packaging materials.',
  },
  {
    id: 7,
    question: 'What does "circular economy" mean?',
    options: [
      'An economy based on circles',
      'Keeping resources in use for as long as possible',
      'Selling products in round containers',
      'Only buying local products',
    ],
    correctIndex: 1,
    explanation:
      'A circular economy keeps resources in use for as long as possible through reuse, repair, and recycling — minimising waste.',
  },
  {
    id: 8,
    question: 'Recycling one tonne of paper saves roughly how many trees?',
    options: ['3 trees', '7 trees', '17 trees', '30 trees'],
    correctIndex: 2,
    explanation:
      'Recycling one tonne of paper saves approximately 17 trees and 26,000 litres of water.',
  },
  {
    id: 9,
    question: 'What happens when food waste goes to landfill?',
    options: [
      'It composts naturally',
      'It produces methane — a potent greenhouse gas',
      'It evaporates within a month',
      'It turns into clean soil',
    ],
    correctIndex: 1,
    explanation:
      'In landfills, food waste decomposes without oxygen, producing methane — a greenhouse gas 25x more potent than CO2.',
  },
  {
    id: 10,
    question: 'Which action has the BIGGEST positive environmental impact?',
    options: [
      'Recycling after use',
      'Refusing unnecessary items entirely',
      'Switching to a bigger bin',
      'Burning waste at home',
    ],
    correctIndex: 1,
    explanation:
      'The waste hierarchy puts "Refuse" at the top. Avoiding unnecessary consumption has a bigger impact than recycling.',
  },
]

/* ── Game Data ──────────────────────────────────────────── */
export const gameItems = [
  { name: 'Plastic Bottle', bin: 'plastic' },
  { name: 'Banana Peel', bin: 'organic' },
  { name: 'Soda Can', bin: 'metal' },
  { name: 'Glass Jar', bin: 'glass' },
  { name: 'Newspaper', bin: 'paper' },
  { name: 'Old Phone', bin: 'ewaste' },
  { name: 'Plastic Bag', bin: 'plastic' },
  { name: 'Apple Core', bin: 'organic' },
  { name: 'Tin Foil', bin: 'metal' },
  { name: 'Wine Bottle', bin: 'glass' },
  { name: 'Cardboard Box', bin: 'paper' },
  { name: 'Battery', bin: 'ewaste' },
  { name: 'Yoghurt Cup', bin: 'plastic' },
  { name: 'Egg Shells', bin: 'organic' },
  { name: 'Aluminium Can', bin: 'metal' },
  { name: 'Glass Vase', bin: 'glass' },
  { name: 'Magazine', bin: 'paper' },
  { name: 'USB Cable', bin: 'ewaste' },
  { name: 'Food Wrapper', bin: 'plastic' },
  { name: 'Tea Leaves', bin: 'organic' },
  { name: 'Screw Bolt', bin: 'metal' },
  { name: 'Light Bulb', bin: 'glass' },
  { name: 'Envelope', bin: 'paper' },
  { name: 'Old Charger', bin: 'ewaste' },
]

export const gameBins = [
  { id: 'plastic', label: 'Plastic', color: '#3b82f6' },
  { id: 'organic', label: 'Organic', color: '#22c55e' },
  { id: 'metal', label: 'Metal', color: '#94a3b8' },
  { id: 'glass', label: 'Glass', color: '#8b5cf6' },
  { id: 'paper', label: 'Paper', color: '#f59e0b' },
  { id: 'ewaste', label: 'E-Waste', color: '#ef4444' },
]
