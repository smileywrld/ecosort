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
}

export function inferWasteFromFilename(filename = '') {
  const normalized = filename.toLowerCase()

  if (/(banana|food|leaf|peel|organic|compost)/.test(normalized)) {
    return wasteProfiles.organic
  }

  if (/(can|metal|tin|aluminium|aluminum)/.test(normalized)) {
    return wasteProfiles.metal
  }

  if (/(glass|jar|bottle-glass)/.test(normalized)) {
    return wasteProfiles.glass
  }

  return wasteProfiles.plastic
}
