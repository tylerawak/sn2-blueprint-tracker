// Icon URLs use the official Subnautica 2 wiki thumbnail pattern.
// `icon` is the emoji fallback shown if the image fails to load.

const WIKI = 'https://wiki.subnautica.com/sn2/images/thumb/';
const img = (file, size = 64) => `${WIKI}${file}/${size}px-${file}`;

// Station definitions — defines the tab hierarchy shown in the browser.
const STATIONS = [
  {
    id: 'Fabricator',
    short: 'Fabricator',
    categories: ['Equipment', 'Tools', 'Basic Materials', 'Electronics', 'Prepared Meals', 'Cooked Food', 'Water', 'Consumables'],
  },
  {
    id: 'Processor',
    short: 'Processor',
    categories: ['Ingots', 'Refinement', 'Biofuel', 'Alternates'],
  },
  {
    id: 'Habitat Builder',
    short: 'Habitat Builder',
    categories: ['Structures', 'Interior', 'Exterior', 'Utility', 'Cultivation'],
  },
  {
    id: 'Vehicle Fabricator',
    short: 'Vehicle Fab',
    categories: ['Vehicles'],
  },
  {
    id: 'Modification Station',
    short: 'Mod Station',
    categories: ['Tool Upgrades', 'Vehicle Upgrades'],
  },
];

const RECIPES = [

  // ═══════════════════════════════════════════════
  //  FABRICATOR › EQUIPMENT
  // ═══════════════════════════════════════════════
  {
    id: 'rebreather',
    name: 'Rebreather',
    station: 'Fabricator', category: 'Equipment',
    iconUrl: img('Rebreather.png'), icon: '😮',
    description: 'Recycles exhaled air, drastically reducing oxygen consumption at depth.',
    ingredients: [
      { item: 'Fiber Mesh', qty: 2 },
      { item: 'System Chip', qty: 1 },
    ],
  },
  {
    id: 'basic_fins',
    name: 'Basic Fins',
    station: 'Fabricator', category: 'Equipment',
    iconUrl: img('Basic_Fins.png'), icon: '🏊',
    description: 'Hydrodynamic fins that increase swimming speed.',
    ingredients: [
      { item: 'Rubber', qty: 2 },
      { item: 'Fiber', qty: 2 },
    ],
  },
  {
    id: 'improved_fins',
    name: 'Improved Fins',
    station: 'Fabricator', category: 'Equipment',
    iconUrl: img('Improved_Fins.png'), icon: '💨',
    description: 'Upgraded fins with conduit-crystal propulsion.',
    ingredients: [
      { item: 'Basic Fins', qty: 1 },
      { item: 'Fiber Mesh', qty: 1 },
      { item: 'Conduit Crystal', qty: 2 },
    ],
  },
  {
    id: 'standard_air_tank',
    name: 'Standard Air Tank',
    station: 'Fabricator', category: 'Equipment',
    iconUrl: img('Standard_Air_Tank.png'), icon: '🫧',
    description: 'Increases your oxygen capacity.',
    ingredients: [
      { item: 'Titanium', qty: 2 },
      { item: 'Rubber', qty: 1 },
      { item: 'Silver', qty: 2 },
    ],
  },
  {
    id: 'high_capacity_air_tank',
    name: 'High Capacity Air Tank',
    station: 'Fabricator', category: 'Equipment',
    iconUrl: img('High_Capacity_Air_Tank.png'), icon: '💠',
    description: 'Significantly increases oxygen capacity.',
    ingredients: [
      { item: 'Standard Air Tank', qty: 1 },
      { item: 'Plasteel Ingot', qty: 1 },
    ],
  },
  {
    id: 'ultra_high_capacity_air_tank',
    name: 'Ultra High Capacity Air Tank',
    station: 'Fabricator', category: 'Equipment',
    iconUrl: img('Ultra_High_Capacity_Air_Tank.png'), icon: '🌬️',
    description: 'Maximum oxygen capacity using deep-biome minerals.',
    ingredients: [
      { item: 'High Capacity Air Tank', qty: 1 },
      { item: 'Troilite', qty: 3 },
      { item: 'Atacamite', qty: 3 },
    ],
  },

  // ═══════════════════════════════════════════════
  //  FABRICATOR › TOOLS
  // ═══════════════════════════════════════════════
  {
    id: 'survival_multitool',
    name: 'Survival Multitool',
    station: 'Fabricator', category: 'Tools',
    iconUrl: img('Survival_Multitool.png'), icon: '🔱',
    description: 'Basic all-purpose survival tool for harvesting and interaction.',
    ingredients: [
      { item: 'Titanium', qty: 3 },
    ],
  },
  {
    id: 'flashlight',
    name: 'Flashlight',
    station: 'Fabricator', category: 'Tools',
    iconUrl: img('Flashlight.png'), icon: '🔦',
    description: 'Illuminates dark underwater environments.',
    ingredients: [
      { item: 'Titanium', qty: 2 },
      { item: 'Quartz', qty: 1 },
      { item: 'Basic Battery', qty: 1 },
    ],
  },
  {
    id: 'scanner',
    name: 'Scanner',
    station: 'Fabricator', category: 'Tools',
    iconUrl: img('Scanner.png'), icon: '🔬',
    description: 'Analyzes organisms and fragments to unlock blueprints.',
    ingredients: [
      { item: 'Titanium', qty: 2 },
      { item: 'Quartz', qty: 2 },
      { item: 'Basic Battery', qty: 1 },
    ],
  },
  {
    id: 'habitat_builder',
    name: 'Habitat Builder',
    station: 'Fabricator', category: 'Tools',
    iconUrl: img('Habitat_Builder.png'), icon: '🏗️',
    description: 'Constructs and deconstructs seabase modules and interior equipment.',
    ingredients: [
      { item: 'Titanium', qty: 2 },
      { item: 'Glass', qty: 1 },
      { item: 'Basic Battery', qty: 1 },
      { item: 'Copper Wire', qty: 1 },
    ],
  },
  {
    id: 'repair_tool',
    name: 'Repair Tool',
    station: 'Fabricator', category: 'Tools',
    iconUrl: img('Repair_Tool.png'), icon: '🔧',
    description: 'Repairs damaged equipment and seabase modules.',
    ingredients: [
      { item: 'Titanium Ingot', qty: 1 },
      { item: 'Wiring Kit', qty: 1 },
      { item: 'Basic Battery', qty: 1 },
      { item: 'Sulfur', qty: 1 },
    ],
  },
  {
    id: 'sonic_resonator',
    name: 'Sonic Resonator',
    station: 'Fabricator', category: 'Tools',
    iconUrl: img('Sonic_Resonator.png'), icon: '🔊',
    description: 'Emits a focused sonic pulse used for stunning fauna and interacting with alien structures.',
    ingredients: [
      { item: 'Basic Battery', qty: 1 },
      { item: 'Titanium Ingot', qty: 2 },
      { item: 'Lead', qty: 2 },
      { item: 'Wiring Kit', qty: 1 },
    ],
  },
  {
    id: 'wakemaker',
    name: 'Wakemaker',
    station: 'Fabricator', category: 'Tools',
    iconUrl: img('Wakemaker.png'), icon: '🌀',
    description: 'Creates turbulent water currents to propel yourself or objects.',
    ingredients: [
      { item: 'Silver', qty: 1 },
      { item: 'Wiring Kit', qty: 1 },
      { item: 'Grease', qty: 1 },
      { item: 'Basic Battery', qty: 1 },
    ],
  },
  {
    id: 'air_bladder',
    name: 'Air Bladder',
    station: 'Fabricator', category: 'Tools',
    iconUrl: img('Air_Bladder.png'), icon: '🫁',
    description: 'Inflatable bladder that rapidly propels you to the surface.',
    ingredients: [
      { item: 'Titanium', qty: 2 },
      { item: 'Rubber', qty: 1 },
    ],
  },

  // ═══════════════════════════════════════════════
  //  FABRICATOR › BASIC MATERIALS
  // ═══════════════════════════════════════════════
  {
    id: 'mild_acid',
    name: 'Mild Acid',
    station: 'Fabricator', category: 'Basic Materials',
    iconUrl: img('Mild_Acid.png'), icon: '🧪',
    description: 'Weak acid solution used in processing and construction.',
    ingredients: [
      { item: 'Acidic Raion Pouch', qty: 2 },
      { item: 'Copper', qty: 1 },
    ],
  },
  {
    id: 'salvaged_titanium',
    name: 'Salvaged Titanium',
    station: 'Fabricator', category: 'Basic Materials',
    iconUrl: img('Titanium.png'), icon: '🪨',
    outputItem: 'Titanium', outputQty: 4,
    description: 'Titanium extracted from salvaged metal debris. Yields 4× Titanium per craft.',
    ingredients: [
      { item: 'Metal Salvage', qty: 1 },
    ],
  },
  {
    id: 'glass',
    name: 'Glass',
    station: 'Fabricator', category: 'Basic Materials',
    iconUrl: img('Glass.png'), icon: '🪟',
    description: 'Transparent silicon compound.',
    ingredients: [
      { item: 'Quartz', qty: 2 },
    ],
  },
  {
    id: 'enameled_glass',
    name: 'Enameled Glass',
    station: 'Fabricator', category: 'Basic Materials',
    iconUrl: img('Enameled_Glass.png'), icon: '💎',
    description: 'Hardened glass reinforced with creature enamel. Pressure-rated.',
    ingredients: [
      { item: 'Glass', qty: 1 },
      { item: 'Creature Enamel', qty: 1 },
    ],
  },
  {
    id: 'fiber',
    name: 'Fiber',
    station: 'Fabricator', category: 'Basic Materials',
    iconUrl: img('Fiber.png'), icon: '🌿',
    description: 'Plant-derived fiber, a basic structural material.',
    ingredients: [
      { item: 'Fibrous Pulp', qty: 2 },
    ],
  },
  {
    id: 'fiber_mesh',
    name: 'Fiber Mesh',
    station: 'Fabricator', category: 'Basic Materials',
    iconUrl: img('Fiber_Mesh.png'), icon: '🕸️',
    description: 'Acid-treated woven fiber composite used in equipment and suits.',
    ingredients: [
      { item: 'Fiber', qty: 2 },
      { item: 'Strong Acid', qty: 1 },
    ],
  },
  {
    id: 'rubber',
    name: 'Rubber',
    station: 'Fabricator', category: 'Basic Materials',
    iconUrl: img('Rubber.png'), icon: '⚫',
    description: 'Flexible polymer processed from Lucifer Rotsac.',
    ingredients: [
      { item: 'Lucifer Rotsac', qty: 2 },
    ],
  },
  {
    id: 'grease',
    name: 'Grease',
    station: 'Fabricator', category: 'Basic Materials',
    iconUrl: img('Grease.png'), icon: '🫙',
    description: 'Mechanical lubricant extracted from Lucifer Rotsac.',
    ingredients: [
      { item: 'Lucifer Rotsac', qty: 1 },
    ],
  },

  // ═══════════════════════════════════════════════
  //  FABRICATOR › ELECTRONICS
  // ═══════════════════════════════════════════════
  {
    id: 'copper_wire',
    name: 'Copper Wire',
    station: 'Fabricator', category: 'Electronics',
    iconUrl: img('Copper_Wire.png'), icon: '〰️',
    description: 'Drawn copper wiring for basic electronic assemblies.',
    ingredients: [
      { item: 'Copper', qty: 2 },
    ],
  },
  {
    id: 'basic_battery',
    name: 'Basic Battery',
    station: 'Fabricator', category: 'Electronics',
    iconUrl: img('Basic_Battery.png'), icon: '🔋',
    description: 'Standard power cell for handheld equipment.',
    ingredients: [
      { item: 'Copper', qty: 2 },
      { item: 'Acidic Raion Pouch', qty: 1 },
    ],
  },
  {
    id: 'advanced_battery',
    name: 'Advanced Battery',
    station: 'Fabricator', category: 'Electronics',
    iconUrl: img('Advanced_Battery.png'), icon: '⚡',
    description: 'High-output battery using conduit crystal energy storage.',
    ingredients: [
      { item: 'Conduit Crystal', qty: 1 },
      { item: 'Strong Acid', qty: 1 },
      { item: 'Silver Ingot', qty: 1 },
    ],
  },
  {
    id: 'wiring_kit',
    name: 'Wiring Kit',
    station: 'Fabricator', category: 'Electronics',
    iconUrl: img('Wiring_Kit.png'), icon: '🔌',
    description: 'Copper wiring and silver contacts for electronic construction.',
    ingredients: [
      { item: 'Silver', qty: 1 },
      { item: 'Copper Wire', qty: 1 },
    ],
  },
  {
    id: 'advanced_wiring_kit',
    name: 'Advanced Wiring Kit',
    station: 'Fabricator', category: 'Electronics',
    iconUrl: img('Advanced_Wiring_Kit.png'), icon: '💡',
    description: 'High-performance wiring with gold contacts for advanced electronics.',
    ingredients: [
      { item: 'Wiring Kit', qty: 1 },
      { item: 'Gold', qty: 1 },
      { item: 'Sulfur', qty: 1 },
    ],
  },
  {
    id: 'system_chip',
    name: 'System Chip',
    station: 'Fabricator', category: 'Electronics',
    iconUrl: img('System_Chip.png'), icon: '💾',
    description: 'General-purpose microprocessor unit.',
    ingredients: [
      { item: 'Wiring Kit', qty: 1 },
      { item: 'Quartz', qty: 2 },
    ],
  },
  {
    id: 'dedicated_core',
    name: 'Dedicated Core',
    station: 'Fabricator', category: 'Electronics',
    iconUrl: img('Dedicated_Core.png'), icon: '🖥️',
    description: 'High-density computing core for advanced equipment and vehicles.',
    ingredients: [
      { item: 'Advanced Wiring Kit', qty: 1 },
      { item: 'Quartz', qty: 2 },
      { item: 'Strong Acid', qty: 1 },
    ],
  },
  {
    id: 'power_cell',
    name: 'Power Cell',
    station: 'Fabricator', category: 'Electronics',
    iconUrl: img('Power_Cell.png'), icon: '🔌',
    description: 'High-capacity power source for vehicles and large equipment.',
    ingredients: [
      { item: 'Basic Battery', qty: 2 },
      { item: 'Strong Acid', qty: 1 },
      { item: 'Salt', qty: 1 },
    ],
  },
  {
    id: 'entangled_power_cell',
    name: 'Entangled Power Cell',
    station: 'Fabricator', category: 'Electronics',
    iconUrl: img('Entangled_Power_Cell.png'), icon: '🔮',
    description: 'Exotic power cell using quantum-entangled conduit crystal energy.',
    ingredients: [
      { item: 'Conduit Crystal', qty: 1 },
      { item: 'Strong Acid', qty: 1 },
      { item: 'Gold Ingot', qty: 1 },
      { item: 'Troilite', qty: 1 },
    ],
  },

  // ═══════════════════════════════════════════════
  //  FABRICATOR › PREPARED MEALS
  // ═══════════════════════════════════════════════
  {
    id: 'sugar_of_saturn',
    name: 'Sugar of Saturn',
    station: 'Fabricator', category: 'Prepared Meals',
    iconUrl: img('Sugar_of_Saturn.png'), icon: '🍬',
    outputQty: 2,
    description: 'A sweet crystalline compound used in advanced food recipes. Yields 2× per craft.',
    ingredients: [
      { item: 'Lead', qty: 1 },
      { item: 'Salt', qty: 1 },
    ],
  },
  {
    id: 'halfmoon_jerky',
    name: 'Halfmoon Jerky',
    station: 'Fabricator', category: 'Prepared Meals',
    iconUrl: img('Halfmoon_Jerky.png'), icon: '🥩',
    outputQty: 2,
    description: 'Dried and salted Halfmoon. Better food value than cooked. Yields 2× per craft.',
    ingredients: [
      { item: 'Halfmoon', qty: 2 },
      { item: 'Salt', qty: 1 },
    ],
  },
  {
    id: 'threemoon_temaki',
    name: 'Threemoon Temaki',
    station: 'Fabricator', category: 'Prepared Meals',
    iconUrl: img('Threemoon_Temaki.png'), icon: '🍱',
    outputQty: 3,
    description: 'A multi-fish roll. Restores both food and hydration. Yields 3× per craft.',
    ingredients: [
      { item: 'Halfmoon', qty: 1 },
      { item: 'Harvestmoon', qty: 1 },
      { item: 'Bluemoon', qty: 1 },
      { item: 'Fibrous Pulp', qty: 1 },
    ],
  },
  {
    id: 'hoverthorn_souvlaki',
    name: 'Hoverthorn Souvlaki',
    station: 'Fabricator', category: 'Prepared Meals',
    iconUrl: img('Hoverthorn_Souvlaki.png'), icon: '🍢',
    description: 'Salted Hoverthorn skewer. Good food value.',
    ingredients: [
      { item: 'Hoverthorn', qty: 3 },
      { item: 'Salt', qty: 1 },
    ],
  },
  {
    id: 'cherimoya_chutney',
    name: 'Cherimoya Chutney',
    station: 'Fabricator', category: 'Prepared Meals',
    iconUrl: img('Cherimoya_Chutney.png'), icon: '🫙',
    description: 'Tangy fruit chutney. Restores food and a small amount of health.',
    ingredients: [
      { item: 'Cherimoya Rotsac', qty: 2 },
      { item: 'Sugar of Saturn', qty: 1 },
    ],
  },
  {
    id: 'pavlova',
    name: 'Pavlova',
    station: 'Fabricator', category: 'Prepared Meals',
    iconUrl: img('Pavlova.png'), icon: '🍰',
    description: 'A decadent dessert. Fully restores food and boosts morale.',
    ingredients: [
      { item: 'Deepwing Egg Clump', qty: 1 },
      { item: 'Sugar of Saturn', qty: 1 },
      { item: 'Cherimoya Rotsac', qty: 1 },
    ],
  },

  // ═══════════════════════════════════════════════
  //  FABRICATOR › COOKED FOOD
  // ═══════════════════════════════════════════════
  {
    id: 'cooked_halfmoon',
    name: 'Cooked Halfmoon',
    station: 'Fabricator', category: 'Cooked Food',
    iconUrl: img('Cooked_Halfmoon.png'), icon: '🐟',
    description: 'Cooked Halfmoon fish. Restores food.',
    ingredients: [{ item: 'Halfmoon', qty: 1 }],
  },
  {
    id: 'cooked_harvestmoon',
    name: 'Cooked Harvestmoon',
    station: 'Fabricator', category: 'Cooked Food',
    iconUrl: img('Cooked_Harvestmoon.png'), icon: '🐟',
    description: 'Cooked Harvestmoon. Restores food.',
    ingredients: [{ item: 'Harvestmoon', qty: 1 }],
  },
  {
    id: 'cooked_bluemoon',
    name: 'Cooked Bluemoon',
    station: 'Fabricator', category: 'Cooked Food',
    iconUrl: img('Cooked_Bluemoon.png'), icon: '🐟',
    description: 'Cooked Bluemoon. Restores food.',
    ingredients: [{ item: 'Bluemoon', qty: 1 }],
  },
  {
    id: 'cooked_quadrate',
    name: 'Cooked Quadrate',
    station: 'Fabricator', category: 'Cooked Food',
    iconUrl: img('Cooked_Quadrate.png'), icon: '🐟',
    description: 'Cooked Quadrate. Restores food.',
    ingredients: [{ item: 'Quadrate', qty: 1 }],
  },
  {
    id: 'cooked_geordie',
    name: 'Cooked Geordie',
    station: 'Fabricator', category: 'Cooked Food',
    iconUrl: img('Cooked_Geordie.png'), icon: '🐟',
    description: 'Cooked Geordie. Restores food.',
    ingredients: [{ item: 'Geordie', qty: 1 }],
  },
  {
    id: 'cooked_hoverthorn',
    name: 'Cooked Hoverthorn',
    station: 'Fabricator', category: 'Cooked Food',
    iconUrl: img('Cooked_Hoverthorn.png'), icon: '🦑',
    description: 'Cooked Hoverthorn. Restores food.',
    ingredients: [{ item: 'Hoverthorn', qty: 1 }],
  },
  {
    id: 'cooked_pneuma',
    name: 'Cooked Pneuma',
    station: 'Fabricator', category: 'Cooked Food',
    iconUrl: img('Cooked_Pneuma.png'), icon: '🐟',
    description: 'Cooked Pneuma. Restores food.',
    ingredients: [{ item: 'Pneuma', qty: 1 }],
  },
  {
    id: 'cooked_electric_geordie',
    name: 'Cooked Electric Geordie',
    station: 'Fabricator', category: 'Cooked Food',
    iconUrl: img('Cooked_Electric_Geordie.png'), icon: '⚡',
    description: 'Cooked Electric Geordie. Restores food.',
    ingredients: [{ item: 'Electric Geordie', qty: 1 }],
  },
  {
    id: 'cooked_black_hoverthorn',
    name: 'Cooked Black Hoverthorn',
    station: 'Fabricator', category: 'Cooked Food',
    iconUrl: img('Cooked_Black_Hoverthorn.png'), icon: '🦑',
    description: 'Cooked Black Hoverthorn. Restores food.',
    ingredients: [{ item: 'Black Hoverthorn', qty: 1 }],
  },
  {
    id: 'nutrient_block',
    name: 'Nutrient Block',
    station: 'Fabricator', category: 'Cooked Food',
    iconUrl: img('Nutrient_Block.png'), icon: '🟫',
    description: 'Compressed biofuel rations. Reliable emergency food.',
    ingredients: [
      { item: 'Biofuel Block', qty: 1 },
      { item: 'Salt', qty: 1 },
    ],
  },
  {
    id: 'oily_salad',
    name: 'Oily Salad',
    station: 'Fabricator', category: 'Cooked Food',
    iconUrl: img('Oily_Salad.png'), icon: '🥗',
    description: 'Fibrous plant salad. Light food restoration.',
    ingredients: [{ item: 'Fibrous Pulp', qty: 2 }],
  },
  {
    id: 'coral_mash',
    name: 'Coral Mash',
    station: 'Fabricator', category: 'Cooked Food',
    iconUrl: img('Coral_Mash.png'), icon: '🍜',
    description: 'Ground coral paste with sweetener. Restores food.',
    ingredients: [
      { item: 'Coral Shavings', qty: 3 },
      { item: 'Sugar of Saturn', qty: 1 },
    ],
  },

  // ═══════════════════════════════════════════════
  //  FABRICATOR › WATER
  // ═══════════════════════════════════════════════
  {
    id: 'water',
    name: 'Water',
    station: 'Fabricator', category: 'Water',
    iconUrl: img('Water.png'), icon: '💧',
    description: 'Purified drinking water processed from a Water Slug.',
    ingredients: [{ item: 'Water Slug', qty: 1 }],
  },
  {
    id: 'isotonic_water',
    name: 'Isotonic Water',
    station: 'Fabricator', category: 'Water',
    iconUrl: img('Isotonic_Water.png'), icon: '🧊',
    description: 'Electrolyte-balanced water. Restores more hydration than standard.',
    ingredients: [
      { item: 'Flash Slug', qty: 1 },
      { item: 'Salt', qty: 1 },
    ],
  },

  // ═══════════════════════════════════════════════
  //  FABRICATOR › CONSUMABLES
  // ═══════════════════════════════════════════════
  {
    id: 'basic_first_aid_kit',
    name: 'Basic First Aid Kit',
    station: 'Fabricator', category: 'Consumables',
    iconUrl: img('Basic_First_Aid_Kit.png'), icon: '🩹',
    description: 'Emergency fiber bandages. Restores health.',
    ingredients: [{ item: 'Fiber', qty: 2 }],
  },
  {
    id: 'enhanced_first_aid_kit',
    name: 'Enhanced First Aid Kit',
    station: 'Fabricator', category: 'Consumables',
    iconUrl: img('Enhanced_First_Aid_Kit.png'), icon: '🩺',
    description: 'Medical-grade kit with regenerative gel. Restores significant health.',
    ingredients: [
      { item: 'Fiber', qty: 1 },
      { item: 'Medical Gel Sac', qty: 1 },
    ],
  },
  {
    id: 'distraction_flare',
    name: 'Distraction Flare',
    station: 'Fabricator', category: 'Consumables',
    iconUrl: img('Distraction_Flare.png'), icon: '🔴',
    outputQty: 3,
    description: 'A bright flare that distracts and repels nearby fauna. Yields 3× per craft.',
    ingredients: [
      { item: 'Titanium', qty: 1 },
      { item: 'Quartz', qty: 1 },
    ],
  },

  // ═══════════════════════════════════════════════
  //  PROCESSOR › INGOTS
  // ═══════════════════════════════════════════════
  {
    id: 'titanium_ingot',
    name: 'Titanium Ingot',
    station: 'Processor', category: 'Ingots',
    iconUrl: img('Titanium_Ingot.png'), icon: '🪨',
    description: 'Smelted titanium alloy block.',
    ingredients: [{ item: 'Titanium', qty: 3 }],
  },
  {
    id: 'copper_ingot',
    name: 'Copper Ingot',
    station: 'Processor', category: 'Ingots',
    iconUrl: img('Copper_Ingot.png'), icon: '🟤',
    description: 'Refined copper block.',
    ingredients: [{ item: 'Copper', qty: 3 }],
  },
  {
    id: 'silver_ingot',
    name: 'Silver Ingot',
    station: 'Processor', category: 'Ingots',
    iconUrl: img('Silver_Ingot.png'), icon: '⬜',
    description: 'Refined silver block.',
    ingredients: [{ item: 'Silver', qty: 3 }],
  },
  {
    id: 'gold_ingot',
    name: 'Gold Ingot',
    station: 'Processor', category: 'Ingots',
    iconUrl: img('Gold_Ingot.png'), icon: '🟡',
    description: 'Refined gold block.',
    ingredients: [{ item: 'Gold', qty: 3 }],
  },
  {
    id: 'germanium_ingot',
    name: 'Germanium Ingot',
    station: 'Processor', category: 'Ingots',
    iconUrl: img('Germanium_Ingot.png'), icon: '🔷',
    description: 'Refined germanium, used in high-tech power storage.',
    ingredients: [{ item: 'Silver', qty: 2 }],
  },
  {
    id: 'germanium_ingot_lead',
    name: 'Germanium Ingot',
    station: 'Processor', category: 'Ingots',
    iconUrl: img('Germanium_Ingot.png'), icon: '🔷',
    description: 'Refined germanium, used in high-tech power storage. (Alt: Lead)',
    ingredients: [{ item: 'Lead', qty: 2 }],
  },
  {
    id: 'plasteel_ingot',
    name: 'Plasteel Ingot',
    station: 'Processor', category: 'Ingots',
    iconUrl: img('Plasteel_Ingot.png'), icon: '⬛',
    description: 'Ultra-strong lithium-titanium composite alloy.',
    ingredients: [
      { item: 'Titanium', qty: 2 },
      { item: 'Lithium', qty: 1 },
    ],
  },
  {
    id: 'mangalloy_ingot',
    name: 'Mangalloy Ingot',
    station: 'Processor', category: 'Ingots',
    iconUrl: img('Mangalloy_Ingot.png'), icon: '🔩',
    description: 'Exotic high-strength alloy used in advanced structures.',
    ingredients: [
      { item: 'Titanium Ingot', qty: 1 },
      { item: 'Atacamite', qty: 1 },
      { item: 'Troilite', qty: 1 },
    ],
  },

  // ═══════════════════════════════════════════════
  //  PROCESSOR › REFINEMENT
  // ═══════════════════════════════════════════════
  {
    id: 'strontium',
    name: 'Strontium',
    station: 'Processor', category: 'Refinement',
    iconUrl: img('Strontium.png'), icon: '🔷',
    description: 'Refined element extracted from Celestine ore.',
    ingredients: [{ item: 'Celestine', qty: 2 }],
  },
  {
    id: 'strong_acid',
    name: 'Strong Acid',
    station: 'Processor', category: 'Refinement',
    iconUrl: img('Strong_Acid.png'), icon: '⚗️',
    description: 'Highly corrosive acid refined from Necrolei Cysts.',
    ingredients: [{ item: 'Necrolei Cyst', qty: 2 }],
  },
  {
    id: 'strong_acid_alt',
    name: 'Strong Acid',
    station: 'Processor', category: 'Refinement',
    iconUrl: img('Strong_Acid.png'), icon: '⚗️',
    description: 'Highly corrosive acid synthesized from Sulfur and Gold. (Alt recipe)',
    ingredients: [
      { item: 'Sulfur', qty: 1 },
      { item: 'Gold', qty: 1 },
    ],
  },

  // ═══════════════════════════════════════════════
  //  PROCESSOR › BIOFUEL
  // ═══════════════════════════════════════════════
  {
    id: 'biofuel_block',
    name: 'Biofuel Block',
    station: 'Processor', category: 'Biofuel',
    iconUrl: img('Biofuel_Block.png'), icon: '🟩',
    description: 'Compressed organic material used as fuel and in food synthesis.',
    ingredients: [{ item: 'Fibrous Pulp', qty: 5 }],
  },
  {
    id: 'biofuel_block_pent',
    name: 'Biofuel Block',
    station: 'Processor', category: 'Biofuel',
    iconUrl: img('Biofuel_Block.png'), icon: '🟩',
    description: 'Compressed organic material used as fuel and in food synthesis. (Alt: Pent)',
    ingredients: [{ item: 'Pent', qty: 3 }],
  },
  {
    id: 'biofuel_block_crab',
    name: 'Biofuel Block',
    station: 'Processor', category: 'Biofuel',
    iconUrl: img('Biofuel_Block.png'), icon: '🟩',
    description: 'Compressed organic material used as fuel and in food synthesis. (Alt: Crab Feces)',
    ingredients: [{ item: 'Crab Feces', qty: 2 }],
  },

  // ═══════════════════════════════════════════════
  //  PROCESSOR › ALTERNATES
  // ═══════════════════════════════════════════════
  {
    id: 'glass_salt',
    name: 'Glass',
    station: 'Processor', category: 'Alternates',
    iconUrl: img('Glass.png'), icon: '🪟',
    description: 'Transparent silicon compound synthesized from Salt. (Alt recipe)',
    ingredients: [{ item: 'Salt', qty: 2 }],
  },
  {
    id: 'grease_halfmoon',
    name: 'Grease',
    station: 'Processor', category: 'Alternates',
    iconUrl: img('Grease.png'), icon: '🫙',
    description: 'Mechanical lubricant rendered from Halfmoon. (Alt recipe)',
    ingredients: [{ item: 'Halfmoon', qty: 2 }],
  },

  // ═══════════════════════════════════════════════
  //  HABITAT BUILDER › STRUCTURES
  // ═══════════════════════════════════════════════
  {
    id: 'corridor',
    name: 'Corridor',
    station: 'Habitat Builder', category: 'Structures',
    iconUrl: img('Corridor.png'), icon: '🔲',
    description: 'Standard pressurized passageway segment.',
    ingredients: [{ item: 'Titanium', qty: 2 }],
  },
  {
    id: 'room',
    name: 'Room',
    station: 'Habitat Builder', category: 'Structures',
    iconUrl: img('Room.png'), icon: '🏠',
    description: 'Large open habitat module for equipment and living space.',
    ingredients: [{ item: 'Titanium', qty: 5 }],
  },
  {
    id: 'nook',
    name: 'Nook',
    station: 'Habitat Builder', category: 'Structures',
    iconUrl: img('Nook.png'), icon: '🔳',
    description: 'Small compact habitat module.',
    ingredients: [
      { item: 'Titanium', qty: 3 },
      { item: 'Glass', qty: 2 },
    ],
  },
  {
    id: 'half_round_room',
    name: 'Half Round Room',
    station: 'Habitat Builder', category: 'Structures',
    iconUrl: img('Half_Round_Room.png'), icon: '🏛️',
    description: 'Semi-circular panoramic room with glass walls.',
    ingredients: [
      { item: 'Titanium', qty: 5 },
      { item: 'Glass', qty: 5 },
    ],
  },
  {
    id: 'hatch',
    name: 'Hatch',
    station: 'Habitat Builder', category: 'Structures',
    iconUrl: img('Hatch.png'), icon: '🚪',
    description: 'Pressurized entry/exit point for seabases.',
    ingredients: [
      { item: 'Titanium', qty: 1 },
      { item: 'Quartz', qty: 1 },
    ],
  },
  {
    id: 'window',
    name: 'Window',
    station: 'Habitat Builder', category: 'Structures',
    iconUrl: img('Window.png'), icon: '🌅',
    description: 'Pressure-rated transparent viewport panel.',
    ingredients: [{ item: 'Glass', qty: 1 }],
  },
  {
    id: 'interior_door',
    name: 'Interior Door',
    station: 'Habitat Builder', category: 'Structures',
    iconUrl: img('Interior_Door.png'), icon: '🔀',
    description: 'Internal door for separating base compartments.',
    ingredients: [
      { item: 'Titanium', qty: 3 },
      { item: 'Glass', qty: 1 },
      { item: 'Copper Wire', qty: 1 },
    ],
  },
  {
    id: 'moonpool',
    name: 'Moonpool',
    station: 'Habitat Builder', category: 'Structures',
    iconUrl: img('Moonpool.png'), icon: '🌊',
    description: 'Vehicle docking bay with underwater access.',
    ingredients: [{ item: 'Titanium', qty: 4 }],
  },
  {
    id: 'interior_wall',
    name: 'Interior Wall',
    station: 'Habitat Builder', category: 'Structures',
    iconUrl: img('Interior_Wall.png'), icon: '🧱',
    description: 'Internal wall panel for dividing base compartments.',
    ingredients: [{ item: 'Titanium', qty: 1 }],
  },
  {
    id: 'interior_arch',
    name: 'Interior Arch',
    station: 'Habitat Builder', category: 'Structures',
    iconUrl: img('Interior_Arch.png'), icon: '🏛️',
    description: 'Archway connector between base compartments.',
    ingredients: [{ item: 'Titanium', qty: 1 }],
  },
  {
    id: 'ladder',
    name: 'Ladder',
    station: 'Habitat Builder', category: 'Structures',
    iconUrl: img('Ladder.png'), icon: '🪜',
    description: 'Vertical access ladder between base levels.',
    ingredients: [{ item: 'Titanium', qty: 2 }],
  },

  // ═══════════════════════════════════════════════
  //  HABITAT BUILDER › INTERIOR
  // ═══════════════════════════════════════════════
  {
    id: 'fabricator_station',
    name: 'Fabricator',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Fabricator.png'), icon: '⚙️',
    description: 'Base-mounted crafting station.',
    ingredients: [
      { item: 'Titanium', qty: 1 },
      { item: 'Copper', qty: 1 },
      { item: 'Quartz', qty: 1 },
    ],
  },
  {
    id: 'processor_station',
    name: 'Processor',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Processor.png'), icon: '🔄',
    description: 'Refines ores into ingots and processes advanced materials.',
    ingredients: [
      { item: 'Titanium', qty: 2 },
      { item: 'Mild Acid', qty: 1 },
      { item: 'Copper Wire', qty: 1 },
    ],
  },
  {
    id: 'scanner_station',
    name: 'Scanner Station',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Scanner_Station.png'), icon: '📡',
    description: 'Long-range resource and fauna scanning module.',
    ingredients: [
      { item: 'Titanium', qty: 3 },
      { item: 'System Chip', qty: 1 },
      { item: 'Wiring Kit', qty: 1 },
    ],
  },
  {
    id: 'modification_station',
    name: 'Modification Station',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Modification_Station.png'), icon: '🛠️',
    description: 'Upgrades and modifies tools and vehicle systems.',
    ingredients: [
      { item: 'Titanium', qty: 2 },
      { item: 'Celestine', qty: 2 },
      { item: 'Copper', qty: 2 },
    ],
  },
  {
    id: 'biolab',
    name: 'Biolab',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Biolab.png'), icon: '🧬',
    description: 'Analyzes alien biology and cultivates organic samples.',
    ingredients: [
      { item: 'Titanium', qty: 3 },
      { item: 'Copper Wire', qty: 1 },
      { item: 'Mild Acid', qty: 1 },
    ],
  },
  {
    id: 'bioreactor',
    name: 'Bioreactor',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Bioreactor.png'), icon: '🌿',
    description: 'Generates power by processing organic material.',
    ingredients: [
      { item: 'Titanium Ingot', qty: 2 },
      { item: 'Copper Ingot', qty: 2 },
    ],
  },
  {
    id: 'power_storage',
    name: 'Power Storage',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Power_Storage.png'), icon: '🔋',
    description: 'Stores excess power generated by base systems.',
    ingredients: [
      { item: 'Germanium Ingot', qty: 1 },
      { item: 'Titanium', qty: 3 },
      { item: 'Salt', qty: 2 },
    ],
  },
  {
    id: 'wall_locker',
    name: 'Wall Locker',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Wall_Locker.png'), icon: '🗄️',
    description: 'Wall-mounted storage for base interiors.',
    ingredients: [{ item: 'Titanium', qty: 2 }],
  },
  {
    id: 'floor_locker',
    name: 'Floor Locker',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Floor_Locker.png'), icon: '🗃️',
    description: 'Large floor-standing storage locker.',
    ingredients: [
      { item: 'Titanium', qty: 3 },
      { item: 'Quartz', qty: 1 },
    ],
  },
  {
    id: 'growbed',
    name: 'Growbed',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Growbed.png'), icon: '🌱',
    description: 'Grows alien flora for food and crafting materials.',
    ingredients: [{ item: 'Titanium', qty: 1 }],
  },
  {
    id: 'tailing_chest',
    name: 'Tailing Chest',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Tailing_Chest.png'), icon: '🗃️',
    description: 'Compact storage chest for base interiors.',
    ingredients: [{ item: 'Titanium', qty: 3 }],
  },
  {
    id: 'wall_rack',
    name: 'Wall Rack',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Wall_Rack.png'), icon: '🗄️',
    description: 'Wall-mounted open rack for storing equipment.',
    ingredients: [
      { item: 'Titanium', qty: 1 },
      { item: 'Copper', qty: 1 },
    ],
  },
  {
    id: 'small_ceiling_light',
    name: 'Small Ceiling Light',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Small_Ceiling_Light.png'), icon: '💡',
    description: 'Compact ceiling-mounted light for base interiors.',
    ingredients: [
      { item: 'Titanium', qty: 1 },
      { item: 'Copper', qty: 1 },
    ],
  },
  {
    id: 'rectangular_ceiling_light',
    name: 'Rectangular Ceiling Light',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Rectangular_Ceiling_Light.png'), icon: '🔆',
    description: 'Large rectangular ceiling light for wider coverage.',
    ingredients: [
      { item: 'Titanium', qty: 2 },
      { item: 'Copper', qty: 1 },
    ],
  },
  {
    id: 'wall_light_small',
    name: 'Wall Light Small',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Wall_Light_Small.png'), icon: '🕯️',
    description: 'Small wall-mounted interior light.',
    ingredients: [
      { item: 'Titanium', qty: 1 },
      { item: 'Copper', qty: 1 },
    ],
  },
  {
    id: 'wall_light_large',
    name: 'Wall Light Large',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Wall_Light_Large.png'), icon: '🔦',
    description: 'Large wall-mounted interior light.',
    ingredients: [
      { item: 'Titanium', qty: 2 },
      { item: 'Copper', qty: 1 },
    ],
  },
  {
    id: 'axum_wall_lamp',
    name: 'Axum Wall Lamp',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Axum_Wall_Lamp.png'), icon: '🌟',
    description: 'Decorative alien-style wall lamp using Celestine crystal light.',
    ingredients: [
      { item: 'Celestine', qty: 1 },
      { item: 'Titanium', qty: 1 },
    ],
  },
  {
    id: 'battery_terminal',
    name: 'Battery Terminal',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Battery_Terminal.png'), icon: '🔋',
    description: 'Charges and swaps Basic Batteries from your inventory.',
    ingredients: [
      { item: 'Titanium', qty: 2 },
      { item: 'Quartz', qty: 2 },
      { item: 'Copper Wire', qty: 1 },
    ],
  },
  {
    id: 'power_cell_terminal',
    name: 'Power Cell Terminal',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Power_Cell_Terminal.png'), icon: '🔌',
    description: 'Charges and swaps Power Cells from your inventory.',
    ingredients: [
      { item: 'Titanium', qty: 3 },
      { item: 'Copper', qty: 3 },
      { item: 'Wiring Kit', qty: 1 },
    ],
  },
  {
    id: 'biobed',
    name: 'Biobed',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Biobed.png'), icon: '🛏️',
    description: 'Restorative bed that regenerates health over time.',
    ingredients: [
      { item: 'Titanium', qty: 3 },
      { item: 'Glass', qty: 1 },
      { item: 'Copper Wire', qty: 1 },
    ],
  },
  {
    id: 'noa_terminal',
    name: 'NoA Terminal',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('NoA_Terminal.png'), icon: '📟',
    description: 'Network of Alterra terminal for accessing base systems and logs.',
    ingredients: [
      { item: 'Titanium', qty: 3 },
      { item: 'Copper Wire', qty: 1 },
      { item: 'Glass', qty: 1 },
    ],
  },
  {
    id: 'time_of_day_display',
    name: 'Time of Day Display',
    station: 'Habitat Builder', category: 'Interior',
    iconUrl: img('Time_of_Day_Display.png'), icon: '🕐',
    description: 'Wall-mounted display showing current surface time of day.',
    ingredients: [
      { item: 'Titanium', qty: 1 },
      { item: 'Enameled Glass', qty: 1 },
      { item: 'Copper', qty: 1 },
    ],
  },

  // ═══════════════════════════════════════════════
  //  HABITAT BUILDER › EXTERIOR
  // ═══════════════════════════════════════════════
  {
    id: 'solar_panel',
    name: 'Solar Panel',
    station: 'Habitat Builder', category: 'Exterior',
    iconUrl: img('Solar_Panel.png'), icon: '☀️',
    description: 'Generates power from sunlight. Effective above 200m.',
    ingredients: [
      { item: 'Titanium', qty: 1 },
      { item: 'Quartz', qty: 2 },
    ],
  },
  {
    id: 'thermal_plant',
    name: 'Thermal Plant',
    station: 'Habitat Builder', category: 'Exterior',
    iconUrl: img('Thermal_Plant.png'), icon: '♨️',
    description: 'Converts geothermal heat into power. Place near thermal vents.',
    ingredients: [
      { item: 'Titanium', qty: 3 },
      { item: 'Copper', qty: 3 },
      { item: 'Gold', qty: 3 },
    ],
  },
  {
    id: 'hydroelectric_turbine',
    name: 'Hydroelectric Turbine',
    station: 'Habitat Builder', category: 'Exterior',
    iconUrl: img('Hydroelectric_Turbine.png'), icon: '🌊',
    description: 'Generates power from water currents.',
    ingredients: [
      { item: 'Titanium', qty: 3 },
      { item: 'Copper', qty: 3 },
      { item: 'Silver', qty: 3 },
    ],
  },
  {
    id: 'power_transmitter',
    name: 'Power Transmitter',
    station: 'Habitat Builder', category: 'Exterior',
    iconUrl: img('Power_Transmitter.png'), icon: '📶',
    description: 'Wirelessly extends your base power grid up to 100m.',
    ingredients: [
      { item: 'Titanium', qty: 1 },
      { item: 'Copper', qty: 1 },
    ],
  },
  {
    id: 'beacon',
    name: 'Beacon',
    station: 'Habitat Builder', category: 'Exterior',
    iconUrl: img('Beacon.png'), icon: '📍',
    description: 'Marks a location with a signal visible on your HUD.',
    ingredients: [
      { item: 'Copper', qty: 1 },
      { item: 'Titanium', qty: 1 },
    ],
  },
  {
    id: 'exterior_wall_light',
    name: 'Exterior Wall Light',
    station: 'Habitat Builder', category: 'Exterior',
    iconUrl: img('Exterior_Wall_Light.png'), icon: '🔦',
    description: 'Waterproof wall-mounted light for base exteriors.',
    ingredients: [
      { item: 'Titanium', qty: 1 },
      { item: 'Copper', qty: 1 },
    ],
  },
  {
    id: 'spotlight',
    name: 'Spotlight',
    station: 'Habitat Builder', category: 'Exterior',
    iconUrl: img('Spotlight.png'), icon: '🔆',
    description: 'High-intensity directional spotlight for illuminating large areas.',
    ingredients: [
      { item: 'Titanium', qty: 1 },
      { item: 'Copper', qty: 2 },
    ],
  },

  // ═══════════════════════════════════════════════
  //  HABITAT BUILDER › UTILITY
  // ═══════════════════════════════════════════════
  {
    id: 'portable_locker',
    name: 'Portable Locker',
    station: 'Habitat Builder', category: 'Utility',
    iconUrl: img('Portable_Locker.png'), icon: '📦',
    description: 'Compact portable storage. Can be placed anywhere.',
    ingredients: [{ item: 'Titanium', qty: 4 }],
  },
  {
    id: 'portable_oxygen_generator',
    name: 'Portable O₂ Generator',
    station: 'Habitat Builder', category: 'Utility',
    iconUrl: img('Portable_Oxygen_Generator.png'), icon: '💨',
    description: 'Generates breathable air. Place in open water.',
    ingredients: [
      { item: 'Titanium', qty: 3 },
      { item: 'Lithium', qty: 2 },
    ],
  },
  {
    id: 'tadpole_dock',
    name: 'Tadpole Dock',
    station: 'Habitat Builder', category: 'Utility',
    iconUrl: img('Tadpole_Dock.png'), icon: '🚢',
    description: 'Docking bay for the Tadpole submersible.',
    ingredients: [
      { item: 'Titanium Ingot', qty: 2 },
      { item: 'Silver Ingot', qty: 1 },
      { item: 'Copper Wire', qty: 2 },
    ],
  },
  {
    id: 'vehicle_fabricator',
    name: 'Vehicle Fabricator',
    station: 'Habitat Builder', category: 'Utility',
    iconUrl: img('Vehicle_Fabricator.png'), icon: '🏭',
    description: 'Constructs submersible vehicles.',
    ingredients: [
      { item: 'Titanium Ingot', qty: 2 },
      { item: 'Copper Ingot', qty: 1 },
      { item: 'Glass', qty: 2 },
    ],
  },
  {
    id: 'habitat_beacon',
    name: 'Habitat Beacon',
    station: 'Habitat Builder', category: 'Utility',
    iconUrl: img('Habitat_Beacon.png'), icon: '🏷️',
    description: 'Labels and marks your seabase on the HUD.',
    ingredients: [{ item: 'Titanium', qty: 1 }],
  },
  {
    id: 'dive_elevator',
    name: 'Dive Elevator',
    station: 'Habitat Builder', category: 'Utility',
    iconUrl: img('Dive_Elevator.png'), icon: '⬆️',
    description: 'Transports players between base levels quickly.',
    ingredients: [
      { item: 'Titanium', qty: 4 },
      { item: 'Copper', qty: 2 },
      { item: 'Quartz', qty: 2 },
    ],
  },
  {
    id: 'work_light',
    name: 'Work Light',
    station: 'Habitat Builder', category: 'Utility',
    iconUrl: img('Work_Light.png'), icon: '💡',
    description: 'Portable work light that can be placed anywhere underwater.',
    ingredients: [
      { item: 'Titanium', qty: 3 },
      { item: 'Quartz', qty: 2 },
    ],
  },

  // ═══════════════════════════════════════════════
  //  HABITAT BUILDER › CULTIVATION
  // ═══════════════════════════════════════════════
  {
    id: 'metal_farm',
    name: 'Metal Farm',
    station: 'Habitat Builder', category: 'Cultivation',
    iconUrl: img('Metal_Farm.png'), icon: '⛏️',
    description: 'Alien cultivation structure that passively grows metallic ore deposits.',
    ingredients: [
      { item: 'Mangalloy Ingot', qty: 1 },
      { item: 'Axum Bacterial Culture', qty: 1 },
    ],
  },

  // ═══════════════════════════════════════════════
  //  VEHICLE FABRICATOR › VEHICLES
  // ═══════════════════════════════════════════════
  {
    id: 'tadpole',
    name: 'Tadpole',
    station: 'Vehicle Fabricator', category: 'Vehicles',
    iconUrl: img('Tadpole.png'), icon: '🚤',
    description: 'Compact personal submersible. Fast, agile, and highly moddable.',
    ingredients: [
      { item: 'Titanium Ingot', qty: 2 },
      { item: 'Copper Ingot', qty: 1 },
      { item: 'Glass', qty: 2 },
      { item: 'System Chip', qty: 1 },
      { item: 'Power Cell', qty: 1 },
    ],
  },
  {
    id: 'scout_ray',
    name: 'Scout Ray Chassis',
    station: 'Vehicle Fabricator', category: 'Vehicles',
    iconUrl: img('Scout_Ray_Chassis.png'), icon: '🛸',
    description: 'Deep-dive exploration submersible with advanced sensor arrays.',
    ingredients: [
      { item: 'Plasteel Ingot', qty: 2 },
      { item: 'Advanced Wiring Kit', qty: 1 },
      { item: 'Dedicated Core', qty: 1 },
      { item: 'Strong Acid', qty: 1 },
    ],
  },
  {
    id: 'tadpole_haul',
    name: 'Tadpole Haul Chassis',
    station: 'Vehicle Fabricator', category: 'Vehicles',
    iconUrl: img('Tadpole_Haul_Chassis.png'), icon: '🛳️',
    description: 'Cargo-focused Tadpole variant with expanded storage.',
    ingredients: [
      { item: 'Titanium Ingot', qty: 4 },
      { item: 'Strontium', qty: 3 },
      { item: 'Enameled Glass', qty: 3 },
      { item: 'Dedicated Core', qty: 1 },
    ],
  },

  // ═══════════════════════════════════════════════
  //  MODIFICATION STATION › TOOL UPGRADES
  // ═══════════════════════════════════════════════
  {
    id: 'bioscanner',
    name: 'Bioscanner',
    station: 'Modification Station', category: 'Tool Upgrades',
    iconUrl: img('Bioscanner.png'), icon: '🔭',
    description: 'Scanner upgrade with biological analysis and DNA sampling.',
    ingredients: [
      { item: 'Scanner', qty: 1 },
      { item: 'Enameled Glass', qty: 2 },
      { item: 'Conduit Crystal', qty: 3 },
    ],
  },
  {
    id: 'feedback_resonator',
    name: 'Feedback Resonator',
    station: 'Modification Station', category: 'Tool Upgrades',
    iconUrl: img('Feedback_Resonator.png'), icon: '📻',
    description: 'Sonic Resonator upgrade with alien structure feedback analysis.',
    ingredients: [
      { item: 'Sonic Resonator', qty: 1 },
      { item: 'Enameled Glass', qty: 2 },
      { item: 'Conduit Crystal', qty: 2 },
      { item: 'Strontium', qty: 2 },
    ],
  },

  // ═══════════════════════════════════════════════
  //  MODIFICATION STATION › VEHICLE UPGRADES
  // ═══════════════════════════════════════════════
  {
    id: 'tadpole_depth_mk1',
    name: 'Depth Module Mk.1',
    station: 'Modification Station', category: 'Vehicle Upgrades',
    iconUrl: img('Tadpole_Depth_Module_Mk._1.png'), icon: '📉',
    description: 'Increases Tadpole crush depth by 200m.',
    ingredients: [
      { item: 'Celestine', qty: 3 },
      { item: 'Enameled Glass', qty: 2 },
      { item: 'System Chip', qty: 1 },
    ],
  },
  {
    id: 'tadpole_depth_mk2',
    name: 'Depth Module Mk.2',
    station: 'Modification Station', category: 'Vehicle Upgrades',
    iconUrl: img('Tadpole_Depth_Module_Mk._2.png'), icon: '📊',
    description: 'Increases Tadpole crush depth by a further 400m.',
    ingredients: [
      { item: 'Dedicated Core', qty: 2 },
      { item: 'Troilite', qty: 2 },
      { item: 'Mangalloy Ingot', qty: 2 },
    ],
  },
  {
    id: 'engine_efficiency',
    name: 'Engine Efficiency Module',
    station: 'Modification Station', category: 'Vehicle Upgrades',
    iconUrl: img('Engine_Efficiency.png'), icon: '⚡',
    description: 'Reduces Tadpole power consumption. Stacks up to 4× for up to 80% reduction.',
    ingredients: [
      { item: 'Titanium Ingot', qty: 2 },
      { item: 'Glass', qty: 2 },
      { item: 'System Chip', qty: 1 },
    ],
  },
  {
    id: 'strike_armor',
    name: 'Strike Armor',
    station: 'Modification Station', category: 'Vehicle Upgrades',
    iconUrl: img('Strike_Armor.png'), icon: '🛡️',
    description: 'Reinforced hull plating for the Tadpole.',
    ingredients: [
      { item: 'Enameled Glass', qty: 2 },
      { item: 'Strontium', qty: 2 },
    ],
  },
  {
    id: 'cavitation_muffler',
    name: 'Cavitation Muffler',
    station: 'Modification Station', category: 'Vehicle Upgrades',
    iconUrl: img('Cavitation_Muffler.png'), icon: '🔇',
    description: 'Reduces Tadpole noise, making it less detectable by fauna.',
    ingredients: [
      { item: 'Titanium', qty: 3 },
      { item: 'Strontium', qty: 2 },
    ],
  },
  {
    id: 'photovoltaic_charger',
    name: 'Photovoltaic Charger',
    station: 'Modification Station', category: 'Vehicle Upgrades',
    iconUrl: img('Photovoltaic_Charger.png'), icon: '🌞',
    description: 'Slowly recharges the Tadpole power cell in sunlit water.',
    ingredients: [
      { item: 'Copper Ingot', qty: 1 },
      { item: 'Strong Acid', qty: 1 },
      { item: 'Troilite', qty: 1 },
    ],
  },
];

// Raw materials and fauna — no recipe, but need icons for the detail/summary panels.
const MATERIALS = {
  'Titanium':           { iconUrl: img('Titanium.png'),            icon: '🪨' },
  'Quartz':             { iconUrl: img('Quartz.png'),              icon: '💎' },
  'Copper':             { iconUrl: img('Copper.png'),              icon: '🟤' },
  'Silver':             { iconUrl: img('Silver.png'),              icon: '⬜' },
  'Gold':               { iconUrl: img('Gold.png'),                icon: '🟡' },
  'Salt':               { iconUrl: img('Salt.png'),                icon: '🧂' },
  'Lead':               { iconUrl: img('Lead.png'),                icon: '⬛' },
  'Lithium':            { iconUrl: img('Lithium.png'),             icon: '🔵' },
  'Sulfur':             { iconUrl: img('Sulfur.png'),              icon: '🟨' },
  'Fibrous Pulp':       { iconUrl: img('Fibrous_Pulp.png'),        icon: '🌿' },
  'Lucifer Rotsac':     { iconUrl: img('Lucifer_Rotsac.png'),      icon: '🔴' },
  'Necrolei Cyst':      { iconUrl: img('Necrolei_Cyst.png'),       icon: '💚' },
  'Acidic Raion Pouch': { iconUrl: img('Acidic_Raion_Pouch.png'),  icon: '🟢' },
  'Conduit Crystal':    { iconUrl: img('Conduit_Crystal.png'),     icon: '🔷' },
  'Celestine':          { iconUrl: img('Celestine.png'),           icon: '💠' },
  'Troilite':           { iconUrl: img('Troilite.png'),            icon: '⚫' },
  'Atacamite':          { iconUrl: img('Atacamite.png'),           icon: '🟩' },
  'Metal Salvage':      { iconUrl: img('Metal_Salvage.png'),       icon: '🗑️' },
  'Creature Enamel':    { iconUrl: img('Creature_Enamel.png'),     icon: '🦷' },
  'Halfmoon':           { iconUrl: img('Halfmoon.png'),            icon: '🐟' },
  'Harvestmoon':        { iconUrl: img('Harvestmoon.png'),         icon: '🐟' },
  'Bluemoon':           { iconUrl: img('Bluemoon.png'),            icon: '🐟' },
  'Quadrate':           { iconUrl: img('Quadrate.png'),            icon: '🐟' },
  'Geordie':            { iconUrl: img('Geordie.png'),             icon: '🐟' },
  'Hoverthorn':         { iconUrl: img('Hoverthorn.png'),          icon: '🦑' },
  'Pneuma':             { iconUrl: img('Pneuma.png'),              icon: '🐟' },
  'Water Slug':         { iconUrl: img('Water_Slug.png'),          icon: '🐌' },
  'Flash Slug':         { iconUrl: img('Flash_Slug.png'),          icon: '⚡' },
  'Cherimoya Rotsac':   { iconUrl: img('Cherimoya_Rotsac.png'),    icon: '🍑' },
  'Deepwing Egg Clump': { iconUrl: img('Deepwing_Egg_Clump.png'),  icon: '🥚' },
  'Coral Shavings':     { iconUrl: img('Coral_Shavings.png'),      icon: '🪸' },
  'Medical Gel Sac':    { iconUrl: img('Medical_Gel_Sac.png'),     icon: '💊' },
  'Electric Geordie':   { iconUrl: img('Electric_Geordie.png'),    icon: '⚡' },
  'Black Hoverthorn':   { iconUrl: img('Black_Hoverthorn.png'),    icon: '🦑' },
  'Pent':               { iconUrl: img('Pent.png'),                icon: '🌿' },
  'Crab Feces':         { iconUrl: img('Crab_Feces.png'),          icon: '💩' },
  'Axum Bacterial Culture': { iconUrl: img('Axum_Bacterial_Culture.png'), icon: '🧫' },
};
