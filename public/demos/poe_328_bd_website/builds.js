const allBuilds = [
  {
    id: 1,
    name: "Kinetic Fusillade Hierophant",
    nameZh: "念动飞射 圣宗",
    author: "Tuadh, Peuget2, 多位主播",
    ascendancy: "hierophant",
    skill: "Kinetic Fusillade of Detonation",
    tags: ["热门", "图腾", "开荒", "终局", "低造价"],
    description: "目前最热门的开荒选择之一，技能未被削弱，配合图腾玩法清图效率极高，多位主播测试通过。低造价即可farm Minotaur T16/Maven。",
    features: ["图腾辅助", "清图效率高", "低造价", "开荒到终局", "30%保留效能盾牌"],
    links: [
      { text: "YouTube", url: "https://www.youtube.com/watch?v=FISRi_Ll8NE" },
      { text: "PoB", url: "https://pobarchives.com/build/bwRiFDeE" }
    ],
    featured: true
  },
  {
    id: 2,
    name: "Righteous Fire Chieftain",
    nameZh: "正义之火 酋长",
    author: "Pohx",
    ascendancy: "chieftain",
    skill: "Righteous Fire",
    tags: ["经典", "HC适用", "SSF", "3.28 Buff"],
    description: "Pohx的经典BD，3.28获得Buff，传统HC/SSF可靠开荒选择，防御与生存兼备。",
    features: ["HC适用", "SSF友好", "3.28 Buff", "传统BD", "高生存"],
    links: [
      { text: "YouTube", url: "https://www.youtube.com/watch?v=BQlc_nwgD5k" }
    ],
    featured: true
  },
  {
    id: 3,
    name: "Shield Crush Gladiator",
    nameZh: "盾碾 卫士",
    author: "ilnino-gaming, Sanavixx",
    ascendancy: "gladiator",
    skill: "Shield Crush",
    tags: ["速通", "格挡", "HC适用", "Max Block"],
    description: "5h 53m完成Act 10，11h完成Eater & Exarch。Max Block版本可用Herald of Agony，防御与输出兼备。",
    features: ["速通剧情", "Max Block", "T17 Farming", "HC适用", "高护甲"],
    links: [
      { text: "PoB", url: "https://pobarchives.com/build/CgJ4Ki4U" },
      { text: "YouTube", url: "https://www.youtube.com/watch?v=ProP7mK0ADY" }
    ]
  },
  {
    id: 4,
    name: "Holy Hammers Inquisitor",
    nameZh: "圣锤 审判者",
    author: "Woolie / AOEAH",
    ascendancy: "inquisitor",
    skill: "Holy Hammers",
    tags: ["新技能", "热门", "连锁", "砸地"],
    description: "首个详细的新Holy技能BD指南。物理转闪电砸地，击中后向前连锁传播，可消耗Power Charge召唤额外锤子。技能倍率220%，50%物理转闪电。",
    features: ["新技能", "220%基础伤害", "连锁传播", "Power Charge互动", "Mace/Staff"],
    links: [
      { text: "PoB", url: "https://mobalytics.gg/poe/profile/woolie/builds/3-28-woolie-s-holy-hammer-slammer" }
    ],
    newSkill: true,
    featured: true
  },
  {
    id: 5,
    name: "Divine Blast Shield Inquisitor",
    nameZh: "神圣爆裂 审判者",
    author: "社区开发",
    ascendancy: "inquisitor",
    skill: "Divine Blast + Shield of Light",
    tags: ["新技能", "盾牌", "反击", "双段伤害"],
    description: "盾牌发射光束先内爆后外爆的双段伤害，格挡后反击释放锥形光波，盟友也会发射光波指向目标。",
    features: ["双段伤害", "格挡反击", "团队增益", "高ES盾牌", "法术暴击"],
    links: [],
    newSkill: true
  },
  {
    id: 6,
    name: "Reliquarian Pyroclast Mine Ascendant",
    nameZh: "遗守使徒 火屑地雷",
    author: "AOEAH / 社区",
    ascendancy: "ascendant",
    skill: "Pyroclast Mine",
    tags: ["Reliquarian", "S-Tier潜力", "理论构建"],
    description: "被社区认为是3.28可能的S-Tier构建。Astral Projector精准定位+Victario's Influence增伤20%+Heartbreaker斩杀，三节点完美解决采矿问题。",
    features: ["S-Tier潜力", "Astral Projector", "精准定位", "斩杀效果", "Zizaran访谈关注"],
    links: [
      { text: "Ziz访谈", url: "https://www.youtube.com/watch?v=1vRHUP9P6tI" }
    ],
    featured: true
  },
  {
    id: 7,
    name: "Reliquarian Bleed Axe Ascendant",
    nameZh: "遗守使徒 流血斧头",
    author: "AOEAH",
    ascendancy: "ascendant",
    skill: "流血斧头",
    tags: ["Reliquarian", "流血", "近战"],
    description: "Jack, the Axe高流血伤害倍率+Terminus Est解放武器格子+Astramentis或Haemophilia手套提供流血爆炸清图。",
    features: ["高流血伤害", "清图爆炸", "近战", "理论构建"],
    links: []
  },
  {
    id: 8,
    name: "Absolution Guardian",
    nameZh: "赦罪 守护者",
    author: "GhazzyTV",
    ascendancy: "guardian",
    skill: "Absolution",
    tags: ["召唤", "3.28 Buff", "新手友好", "From Zero to Hero"],
    description: "3.28 Patch Notes中获得大Buff，召唤+防御兼备，GhazzyTV专门优化的生存型开荒BD，新手友好。",
    features: ["3.28 Buff", "召唤+防御", "新手友好", "生存型", "剧情流畅"],
    links: [
      { text: "YouTube", url: "https://www.youtube.com/watch?v=9ocHC8EEKLA" }
    ]
  },
  {
    id: 9,
    name: "Dominating Blow Guardian",
    nameZh: "霸权 守护者",
    author: "Mathil",
    ascendancy: "guardian",
    skill: "Dominating Blow",
    tags: ["Mathil推荐", "近战+召唤", "混合玩法"],
    description: "Mathil推荐的5个有趣BD之一，近战+召唤混合玩法，击败敌人后将其转化为友军为你战斗。",
    features: ["近战+召唤", "转换敌人", "Mathil推荐", "有趣机制"],
    links: []
  },
  {
    id: 10,
    name: "Spark Inquisitor",
    nameZh: "闪电火花 审判者",
    author: "Mathil",
    ascendancy: "inquisitor",
    skill: "Spark",
    tags: ["Mathil推荐", "3.28 Buff", "清图优秀", "经典法术"],
    description: "3.28获得Buff，清图效率优秀，经典法术BD的审判者版本。",
    features: ["3.28 Buff", "清图优秀", "经典法术", "Mathil推荐"],
    links: []
  },
  {
    id: 11,
    name: "Righteous Fire Inquisitor",
    nameZh: "正火 审判者",
    author: "Mathil",
    ascendancy: "inquisitor",
    skill: "Righteous Fire",
    tags: ["Mathil推荐", "正火", "经典BD变体"],
    description: "Mathil推荐的正火BD，与Pohx的Chieftain版本形成对比，Inquisitor版本有更好的元素伤害处理。",
    features: ["正火", "Mathil推荐", "元素无视抗性", "经典变体"],
    links: []
  },
  {
    id: 12,
    name: "Lightning Arrow Deadeye",
    nameZh: "闪电箭 锐眼",
    author: "Mathil",
    ascendancy: "deadeye",
    skill: "Lightning Arrow",
    tags: ["Mathil推荐", "弓系", "传统BD"],
    description: "Mathil推荐的弓系BD，传统闪电箭玩法，稳健可靠。",
    features: ["弓系", "传统BD", "Mathil推荐", "清图优秀"],
    links: []
  },
  {
    id: 13,
    name: "SRS Necromancer",
    nameZh: "狂怒召唤灵 死灵法师",
    author: "GhazzyTV / Steelmage",
    ascendancy: "necromancer",
    skill: "Summon Raging Spirit",
    tags: ["召唤", "经典", "新手友好", "详细攻略"],
    description: "经典召唤BD，Steelmage发布详细leveling guide，新手友好，剧情流畅。",
    features: ["经典召唤", "新手友好", "详细攻略", "剧情流畅"],
    links: []
  },
  {
    id: 14,
    name: "Spectre/Zombie Summoner",
    nameZh: "幽魂/僵尸召唤",
    author: "GhazzyTV",
    ascendancy: "necromancer",
    skill: "Spectres + Zombies",
    tags: ["召唤", "生存型", "Minion Buffed"],
    description: "GhazzyTV的'Survive in Mirage'生存型召唤BD，Minion获得'mega buffed'，完整From Zero to Hero攻略。",
    features: ["生存型", "幽魂+僵尸", "Minion Buffed", "开荒到终局"],
    links: [
      { text: "YouTube", url: "https://www.youtube.com/watch?v=9JiHNYdS5E8" }
    ]
  },
  {
    id: 15,
    name: "Static Strike of Gathering Lightning + Mirage Warrior",
    nameZh: "充能打击+幻象战士",
    author: "Reddit社区",
    ascendancy: "slayer",
    skill: "Static Strike of Gathering Lightning",
    tags: ["赛季机制", "高频击中", "热门理论", "新转化技能"],
    description: "与Mirage赛季机制完美配合，10个幻象战士同时在地面释放Static Strike，每个每秒命中6次以上，极高hit频率。",
    features: ["赛季机制", "高频击中", "10幻象战士", "每秒6+命中"],
    links: []
  },
  {
    id: 16,
    name: "Ice Spear / Freezing Pulse Totems",
    nameZh: "冰矛/冰脉冲图腾",
    author: "Xyton_98",
    ascendancy: "hierophant",
    skill: "Ice Spear / Freezing Pulse",
    tags: ["图腾", "3.28 Buff", "经典", "双技能切换"],
    description: "经典图腾玩法，3.28获得轻微Buff，冰矛和冰脉冲双技能切换使用，极其稳定的开荒选择。",
    features: ["3.28 Buff", "双技能切换", "经典图腾", "开荒可用", "极其稳定"],
    links: [
      { text: "PoB(开荒)", url: "https://pobb.in/3WcuGeSSk53U" },
      { text: "PoB(终局)", url: "https://pobb.in/FtDbV5SoBv5i" }
    ]
  },
  {
    id: 17,
    name: "Chaos DoT Occultist Expedition Farmer",
    nameZh: "混沌持续伤 秘术师",
    author: "社区",
    ascendancy: "occultist",
    skill: "Essence Drain / Contagion / Blight",
    tags: ["DoT", "Expedition", "早期Farm"],
    description: "专为3.28早期farm Expedition设计，平滑开荒，防御扎实，低投资高回报，适合喜欢DoT玩法的玩家。",
    features: ["DoT玩法", "Expedition Farm", "平滑开荒", "防御扎实"],
    links: [
      { text: "PoB", url: "https://pobb.in/ZOFpPvSj6Bq" }
    ]
  },
  {
    id: 18,
    name: "Wave of Conviction of Trarthus Miner",
    nameZh: "定罪波采矿",
    author: "社区",
    ascendancy: "saboteur",
    skill: "Wave of Conviction of Trarthus",
    tags: ["新转化技能", "采矿", "Reap替代"],
    description: "新Transfigured Skill，作为Reap Miner的替代选择，暴露机制配合采矿玩法。",
    features: ["新转化技能", "暴露机制", "采矿玩法", "Reap替代"],
    links: []
  },
  {
    id: 19,
    name: "Cyclone of Tumult Slayer",
    nameZh: " tumult旋风斩 处刑者",
    author: "Sanavixx",
    ascendancy: "slayer",
    skill: "Cyclone of Tumult",
    tags: ["新转化技能", "近战", "社区验证", "稳定"],
    description: "经过3个联赛测试+SSF私域测试，3.28 Patch Notes审查后依然稳定。1.5M DPS, 487%暴击伤害, 144K eHP。",
    features: ["新转化技能", "1.5M DPS", "144K eHP", "社区验证", "Stampede"],
    links: [
      { text: "YouTube", url: "https://www.youtube.com/watch?v=eZ0JWU-pqNw" },
      { text: "PoB", url: "https://pobb.in/cJb22IPyLch8" }
    ]
  },
  {
    id: 20,
    name: "Dual Strike of Ambidexterity Gladiator",
    nameZh: "双持打击 卫士",
    author: "Reddit社区",
    ascendancy: "gladiator",
    skill: "Dual Strike of Ambidexterity",
    tags: ["双持", "格挡", "流血爆炸", "SSF"],
    description: "双持武器高伤害，适合SSF/Trade，Gladiator升华提供格挡和流血爆炸。",
    features: ["双持武器", "高伤害", "格挡", "流血爆炸", "SSF适用"],
    links: []
  },
  {
    id: 21,
    name: "Herald of Agony Max Block Gladiator",
    nameZh: "苦痛之捷 格挡卫士",
    author: "社区",
    ascendancy: "gladiator",
    skill: "Herald of Agony",
    tags: ["Max Block", "T17 Farm", "Semi-budget"],
    description: "Semi-budget T17 farming build，第三天即可低价凑齐装备，T17 Sanctuary Lycia轻松farm Dark Seer。",
    features: ["Max Block", "T17 Farming", "Semi-budget", "Dark Seer", "Guardian Turtle Spectre"],
    links: [
      { text: "PoB", url: "https://pobarchives.com/build/9CbinPhc" }
    ]
  },
  {
    id: 22,
    name: "Poison Summon Holy Relic Necromancer",
    nameZh: "中毒召唤圣物 死灵法师",
    author: "社区",
    ascendancy: "necromancer",
    skill: "Summon Holy Relic of Conviction",
    tags: ["召唤", "中毒", "低成本"],
    description: "低造价即可启动，可farm Minotaur T16/Maven。",
    features: ["低成本", "召唤圣物", "中毒", "Farm T16"],
    links: [
      { text: "PoB", url: "https://pobarchives.com/build/D348wpeR" }
    ]
  },
  {
    id: 23,
    name: "CoC Ethereal Blades Blazing Salvo Inquisitor",
    nameZh: "暴击时施放 灵刃+炽烈飞扑 审判者",
    author: "CaptainLance9",
    ascendancy: "inquisitor",
    skill: "Cast on Critical + Ethereal Blades + Blazing Salvo",
    tags: ["CoC", "终局BD", "非开荒"],
    description: "预Patch Notes测试，明确标注非开荒BD，需要装备积累。终局强力BD。",
    features: ["CoC", "灵刃", "炽烈飞扑", "终局BD", "需装备"],
    links: [
      { text: "YouTube", url: "https://www.youtube.com/watch?v=nGhJY8F-Y9w" }
    ]
  },
  {
    id: 24,
    name: "Smite Champion",
    nameZh: "惩击 冠军",
    author: "社区",
    ascendancy: "champion",
    skill: "Smite",
    tags: ["新手友好", "简单机制", "稳健"],
    description: "基础Smite开荒测试，适合新手，机制简单，稳健的传统开荒选择。",
    features: ["新手友好", "简单", "稳健", "传统BD"],
    links: [
      { text: "YouTube", url: "https://www.youtube.com/watch?v=IEzopx62x_g" }
    ]
  },
  {
    id: 25,
    name: "Scion Wander League Start",
    nameZh: "贵族 魔武者开荒",
    author: "LLYD",
    ascendancy: "ascendant",
    skill: "Wander (Kinetic Blast/Fusillade)",
    tags: ["原型", "测试中", "贵族"],
    description: "Scion Wander开荒原型测试，作者表示feels strong，可能配合Kinetic Fusillade使用。",
    features: ["原型BD", "测试中", "贵族", " feels strong"],
    links: [
      { text: "PoB", url: "https://pobarchives.com/build/cNQFb8zL" }
    ]
  },
  {
    id: 26,
    name: "Bleed Bow Build",
    nameZh: "流血弓",
    author: "AOEAH",
    ascendancy: "deadeye",
    skill: "Puncture + Snipe",
    tags: ["AOEAH推荐", "流血", "DoT"],
    description: "AOEAH推荐的3.28最佳BD之一，Resolute Technique保证100%命中，多层防御，稳健且安全。",
    features: ["AOEAH推荐", "流血DoT", "Resolute Technique", "多层防御"],
    links: [
      { text: "AOEAH", url: "https://www.aoeah.com/news/4402--poe-328-best-build--top-3-best-builds-for-path-of-exile-mirage" }
    ]
  },
  {
    id: 27,
    name: "Elemental Hit Slayer",
    nameZh: "元素打击 处刑者",
    author: "AOEAH",
    ascendancy: "slayer",
    skill: "Elemental Hit + Trinity",
    tags: ["AOEAH推荐", "元素打击", "速度快"],
    description: "AOEAH推荐的3.28最佳BD之一，Precise Technique + 大量命中，Slayer提供overleech和stun免疫，速度快、伤害高。",
    features: ["AOEAH推荐", "Trinity", "Overleech", "速度快", "Iron Reflexes"],
    links: [
      { text: "AOEAH", url: "https://www.aoeah.com/news/4402--poe-328-best-build--top-3-best-builds-for-path-of-exile-mirage" }
    ]
  },
  {
    id: 28,
    name: "Crit Smite Ascendant",
    nameZh: "暴击惩击 使徒",
    author: "AOEAH",
    ascendancy: "ascendant",
    skill: "Smite + Wrath + Anger + Trinity",
    tags: ["AOEAH推荐", "暴击", "全能型"],
    description: "AOEAH推荐的3.28最佳BD之一，41%暴击率 + 300%+暴击伤害，全能型BD。",
    features: ["AOEAH推荐", "41%暴击率", "300%+爆伤", "全能型", "法术压制"],
    links: [
      { text: "AOEAH", url: "https://www.aoeah.com/news/4402--poe-328-best-build--top-3-best-builds-for-path-of-exile-mirage" }
    ]
  },
  {
    id: 29,
    name: "Dominating Blow Necromancer",
    nameZh: "霸权 死灵法师",
    author: "AOEAH / Maxroll",
    ascendancy: "necromancer",
    skill: "Dominating Blow",
    tags: ["召唤", "混沌伤害", "新手友好"],
    description: "混沌伤害转换，自动叠加wither，+3 Staff制作简单，Purity of Elements提供完全异常免疫，适合新手。",
    features: ["新手友好", "混沌伤害", "异常免疫", "操作简单"],
    links: [
      { text: "Maxroll", url: "https://maxroll.gg/poe/pob/iwgvp0oc" }
    ]
  },
  {
    id: 30,
    name: "Chain Hook Rage Vortex Berserker",
    nameZh: "钩链狂怒漩涡 狂战士",
    author: "AOEAH / Maxroll",
    ascendancy: "berserker",
    skill: "Chain Hook + Rage Vortex",
    tags: ["狂战士", "Rage", "Uber Shaper"],
    description: "双幸运格挡 + fortify + 大量护甲，跳跃攻击快速移动，全屏爆炸清图，Uber Shaper可在SSF装备下轻松应对。",
    features: ["双幸运格挡", "Rage", "Uber Shaper", "全屏爆炸", "SSF可用"],
    links: [
      { text: "Maxroll", url: "https://maxroll.gg/poe/pob/83gw30oc" }
    ]
  },
  {
    id: 31,
    name: "Boneshatter Bleed Gladiator",
    nameZh: "碎骨流血 卫士",
    author: "AOEAH",
    ascendancy: "gladiator",
    skill: "Boneshatter + Bleed",
    tags: ["流血", "碎骨", "攻防兼备"],
    description: "双幸运格挡，可站在地图中间吃伤害，跳跃攻击 + Gladiator爆炸 + Infernal Cry = 全屏清图，Uber Shaper展示视频证明强度。",
    features: ["双幸运格挡", "全屏清图", "Uber Shaper", "攻防兼备"],
    links: [
      { text: "PoB", url: "https://pobb.in/JZ-5nP5oczaJ" }
    ]
  },
  {
    id: 32,
    name: "Thirst Corpseblaster",
    nameZh: "基塔瓦之渴 尸体爆破",
    author: "AOEAH / Maxroll",
    ascendancy: "necromancer",
    skill: "Unearth + Detonate Dead / Volatile Dead",
    tags: ["Kitava's Thirst", "尸体机制", "经典BD"],
    description: "一键爆炸清屏，尸体机制利用，Bone Offering + Mistress of Sacrifice提供格挡上限，可升级至Mageblood版本。",
    features: ["Kitava's Thirst", "一键清屏", "格挡上限", "Mageblood升级"],
    links: [
      { text: "Maxroll", url: "https://maxroll.gg/poe/pob/c7gus0ow" }
    ]
  },
  {
    id: 33,
    name: "Explosive Arrow Champion",
    nameZh: "爆炸箭 冠军",
    author: "AOEAH",
    ascendancy: "champion",
    skill: "Explosive Arrow",
    tags: ["经典BD", "防御扎实", "新手友好"],
    description: "经过多年优化的经典BD，操作简单，防御极其扎实，适合Softcore和Hardcore。",
    features: ["经典BD", "防御扎实", "操作简单", "HC适用"],
    links: []
  },
  {
    id: 34,
    name: "Poisonous Concoction Pathfinder",
    nameZh: "剧毒化合 追猎者",
    author: "AOEAH",
    ascendancy: "pathfinder",
    skill: "Poisonous Concoction",
    tags: ["药水流", "升级快速", "防御出色"],
    description: "升级快速高效，药水-focused endgame，防御出色，范围覆盖好，速度快。",
    features: ["药水流", "升级快速", "防御出色", "范围覆盖"],
    links: []
  },
  {
    id: 35,
    name: "Reap & Exsanguinate Miner",
    nameZh: "收割&放血 采矿",
    author: "AOEAH",
    ascendancy: "trickster",
    skill: "Reap / Exsanguinate + Mines",
    tags: ["采矿", "战术型", "Trickster"],
    description: "'准备-引爆'战术玩法，地图和boss表现均衡，Trickster即使被削弱后仍有收益。",
    features: ["战术型", "Trickster", "地图+Boss均衡"],
    links: []
  },
  {
    id: 36,
    name: "Blade Vortex Elementalist",
    nameZh: "刀阵 元素使",
    author: "AOEAH",
    ascendancy: "elementalist",
    skill: "Cold Blade Vortex",
    tags: ["刀阵", "冰霜", "元素使"],
    description: "快速移动，冻结敌人，Elementalist提供多种增益，冻结效果作为额外防御。",
    features: ["刀阵", "冻结", "元素使", "额外防御"],
    links: []
  },
  {
    id: 37,
    name: "Glacial Cascade of the Fissure Miner",
    nameZh: "冰川裂隙 采矿元素使",
    author: "AOEAH",
    ascendancy: "elementalist",
    skill: "Glacial Cascade of the Fissure",
    tags: ["采矿", "稳定", "Elementalist"],
    description: "3.28几乎无变化，非常稳定，Elementalist节点调整后有收益，传统采矿BD。",
    features: ["稳定", "采矿", "Elementalist", "几乎无变化"],
    links: [
      { text: "AOEAH", url: "https://www.aoeah.com/news/4384--top-10-poe-328-best-builds-for-league-starter--endgame-mirage" }
    ]
  },
  {
    id: 38,
    name: "Explosive Trap Saboteur",
    nameZh: "爆炸陷阱 破坏者",
    author: "Jungroan",
    ascendancy: "saboteur",
    skill: "Explosive Trap",
    tags: ["陷阱", "经典", "多次验证"],
    description: "Jungroan的经典开荒BD，在Reddit讨论中被推荐，可靠的陷阱开荒选择，多次赛季验证。",
    features: ["经典陷阱", "多次验证", "Jungroan", "稳健"],
    links: [
      { text: "YouTube", url: "https://www.youtube.com/@Jungroan" }
    ]
  },
  {
    id: 39,
    name: "General's Cry Cyclone with Shockwave",
    nameZh: "将军之吼旋风斩震波",
    author: "Jungroan / 社区",
    ascendancy: "berserker",
    skill: "General's Cry + Cyclone + Shockwave",
    tags: ["将军之吼", "双手武器", "高DPH"],
    description: "战士之吼配合旋风斩震波，多次赛季验证的强力BD，高DPH双手武器。",
    features: ["将军之吼", "震波", "双手武器", "多次验证"],
    links: []
  },
  {
    id: 40,
    name: "Frostblink Ignite Elementalist",
    nameZh: "冰霜闪现点燃 元素使",
    author: "Subtractem",
    ascendancy: "elementalist",
    skill: "Frostblink + Ignite",
    tags: ["位移核心", "快速清图", "独特机制"],
    description: "位移技能即核心玩法，快速清图，机制独特，Subtractem的标志性BD之一。",
    features: ["位移核心", "快速清图", "独特机制", "Subtractem"],
    links: []
  },
  {
    id: 41,
    name: "Lightning Arrow / Tornado Shot Deadeye",
    nameZh: "闪电箭/龙卷射击 锐眼",
    author: "Maxroll / 社区",
    ascendancy: "deadeye",
    skill: "Lightning Arrow / Tornado Shot",
    tags: ["弓系", "经典", "Maxroll"],
    description: "传统弓系开荒选择，在Maxroll等网站持续更新，适合喜欢弓类玩法的玩家。",
    features: ["弓系", "经典BD", "Maxroll", "持续更新"],
    links: [
      { text: "Maxroll", url: "https://maxroll.gg/poe" }
    ]
  },
  {
    id: 42,
    name: "Blazing Salvo Inquisitor",
    nameZh: "炽烈飞扑 审判者",
    author: "社区",
    ascendancy: "inquisitor",
    skill: "Blazing Salvo",
    tags: ["法术", "审判者", "Consecrated Ground"],
    description: "3.28赛季开荒测试run，Inquisitor的Consecrated Ground增伤和回复，元素伤害无视抗性。",
    features: ["法术", "Consecrated Ground", "元素无视抗性"],
    links: [
      { text: "YouTube", url: "https://www.youtube.com/watch?v=emxZUxQw1Fo" }
    ]
  },
  {
    id: 43,
    name: "Chaos DoT / Summon Spectre",
    nameZh: "混沌持续伤/幽魂召唤",
    author: "GhazzyTV",
    ascendancy: "occultist",
    skill: "Essence Drain / Contagion / Summon Spectre",
    tags: ["DoT", "召唤", "GhazzyTV"],
    description: "Ghazzy是Minion和Chaos DoT专家，其Chaos DoT BD长期被社区推荐。",
    features: ["DoT", "召唤", "GhazzyTV专家", "长期推荐"],
    links: [
      { text: "PoE Vault", url: "https://www.poe-vault.com/guides/ghazzy-guide-hub" }
    ]
  },
  {
    id: 44,
    name: "Guardian Cyclone CWC Holy Skills",
    nameZh: "守护者旋风斩CWC Holy技能",
    author: "Reddit社区",
    ascendancy: "guardian",
    skill: "Cyclone + CWC + Holy Skills",
    tags: ["新技能", "CWC", "守护者"],
    description: "利用Guardian升华的防御和召唤物增益，Cyclone引导触发新Holy Skill，防御+新伤害技能组合。",
    features: ["新技能", "CWC", "守护者", "防御+伤害"],
    links: []
  },
  {
    id: 45,
    name: "Holy Strike Build",
    nameZh: "Holy Strike BD",
    author: "待发布",
    ascendancy: "inquisitor",
    skill: "Holy Strike",
    tags: ["新技能", "召唤武器", "待开发"],
    description: "武器注入圣能攻击，击中召唤Holy Armament（复制主手武器属性的无敌召唤物），需要Mace、Sceptre或Staff。",
    features: ["新技能", "召唤武器", "复制主手", "无敌召唤物"],
    links: []
  },
  {
    id: 46,
    name: "Holy Sweep Build",
    nameZh: "Holy Sweep BD",
    author: "待发布",
    ascendancy: "inquisitor",
    skill: "Holy Sweep",
    tags: ["新技能", "清屏", "待开发"],
    description: "据notebookcheck.net描述：'Holy Heavens... can clear a screen full of enemies'，需要Power Charges来最大化效果。",
    features: ["新技能", "清屏", "Power Charge"],
    links: []
  },
  {
    id: 47,
    name: "Reliquarian + Widowhail/Astramentis",
    nameZh: "遗守使徒 Widowhail/Astramentis",
    author: "待社区开发",
    ascendancy: "ascendant",
    skill: "取决于装备组合",
    tags: ["Reliquarian", "革命性", "极高自由度"],
    description: "Reliquarian可harness特定Unique效果而无需装备它们，每个赛季更换可用的Unique列表，极高的构建自由度和实验空间。",
    features: ["Reliquarian", "无需装备", "极高自由度", "每赛季更换"],
    links: [
      { text: "NotebookCheck", url: "https://www.notebookcheck.net/Path-of-Exile-3-28-shown-off-with-new-Mirage-mechanic-and-sweeping-endgame-improvements.1236090.0.html" }
    ]
  },
  {
    id: 48,
    name: "Kinetic Fusillade Low Budget Ballista",
    nameZh: "念动飞射 低造价图腾",
    author: "Tuadh",
    ascendancy: "hierophant",
    skill: "Kinetic Fusillade + Ballista",
    tags: ["低造价", "图腾", "变体"],
    description: "极低造价即可凑齐，可farm Minotaur T16/Maven，图腾自动瞄准，清图效率高。",
    features: ["低造价", "图腾自动瞄准", "Farm T16"],
    links: [
      { text: "YouTube", url: "https://www.youtube.com/watch?v=aruyjNVhGRA" }
    ]
  },
  {
    id: 49,
    name: "Herald of Purity Guardian",
    nameZh: "纯净之捷 守护者",
    author: "社区",
    ascendancy: "guardian",
    skill: "Herald of Purity",
    tags: ["召唤", "守护者", "防御"],
    description: "经典Herald of Purity Guardian BD，优秀的防御和召唤物增益。",
    features: ["纯净之捷", "守护者", "防御", "召唤物增益"],
    links: []
  },
  {
    id: 50,
    name: "Viper Strike of the Mamba (削弱)",
    nameZh: "毒蛇打击·曼巴 (3.28削弱)",
    author: "社区",
    ascendancy: "pathfinder",
    skill: "Viper Strike of the Mamba",
    tags: ["削弱", "需注意"],
    description: "3.28 Patch Notes中此技能被削弱，Bino's成为Viper Strike副手BIS。",
    features: ["3.28削弱", "Bino's BIS"],
    links: []
  },
  {
    id: 51,
    name: "CoC Ice Spear / Freezing Pulse",
    nameZh: "CoC冰矛/冰脉冲",
    author: "社区",
    ascendancy: "assassin",
    skill: "Cast on Critical + Ice Spear/Freezing Pulse",
    tags: ["CoC", "暴击", "法术"],
    description: "经典CoC法术BD，暴击触发法术，高输出但需要装备支持。",
    features: ["CoC", "暴击触发", "法术", "高输出"],
    links: []
  },
  {
    id: 52,
    name: "Lightning Strike Raider",
    nameZh: "闪电打击 侠客",
    author: "社区",
    ascendancy: "raider",
    skill: "Lightning Strike",
    tags: ["近战", "元素", "快速"],
    description: "经典Lightning Strike BD，快速攻击，元素伤害，清图效率高。",
    features: ["闪电打击", "快速攻击", "元素伤害"],
    links: []
  },
  {
    id: 53,
    name: "Summon Raging Spirit Necromancer",
    nameZh: "狂怒召唤灵 死灵法师",
    author: "Steelmage",
    ascendancy: "necromancer",
    skill: "Summon Raging Spirit",
    tags: ["召唤", "经典", "详细攻略"],
    description: "经典SRS BD，Steelmage发布详细leveling guide，从fresh SSF到Act 10的详细攻略。",
    features: ["SRS", "详细攻略", "新手友好"],
    links: [
      { text: "PoB Archives", url: "https://pobarchives.com/build/EXHDf4wL" }
    ]
  },
  {
    id: 54,
    name: "Holy Absolution Guardian",
    nameZh: "神圣赦罪 守护者",
    author: "Ronarray",
    ascendancy: "guardian",
    skill: "Absolution",
    tags: ["召唤", "3.28 Buff", "双重Buff", "强力BD"],
    description: "Guardian升华，Absolution技能，3.28双重Buff的强力召唤BD。",
    features: ["3.28双重Buff", "召唤", "强力BD"],
    links: []
  },
  {
    id: 55,
    name: "Cold Blade Vortex Elementalist",
    nameZh: "冰霜刀阵 元素使",
    author: "社区",
    ascendancy: "elementalist",
    skill: "Cold Blade Vortex",
    tags: ["3.28 Buff", "经典BD", "小幅增强"],
    description: "Elementalist升华，Cold Blade Vortex，3.28小幅增强的经典BD。",
    features: ["3.28小幅增强", "经典BD", "冰霜伤害"],
    links: []
  },
  {
    id: 56,
    name: "Frost Blades Warden",
    nameZh: "冰霜之刃 守望者",
    author: "Reddit社区",
    ascendancy: "warden",
    skill: "Frost Blades",
    tags: ["更新版", "全地形适配", "近战"],
    description: "Warden升华，Frost Blades，全地形适配的更新版BD。",
    features: ["全地形适配", "更新版", "近战", "冰霜伤害"],
    links: []
  },
  {
    id: 57,
    name: "Penance Brand Inquisitor",
    nameZh: "赎罪烙印 审判者",
    author: "社区",
    ascendancy: "inquisitor",
    skill: "Penance Brand",
    tags: ["3.28 Buff", "回归", "经典BD"],
    description: "Inquisitor升华，Penance Brand，Transfigured版削弱后常规版Buff回归。",
    features: ["3.28 Buff", "经典回归", "烙印", "审判者"],
    links: []
  },
  {
    id: 58,
    name: "Reliquarian Elemental Hit Ascendant",
    nameZh: "遗守使徒 元素打击",
    author: "Zizaran访谈",
    ascendancy: "ascendant",
    skill: "Elemental Hit",
    tags: ["Reliquarian", "S-Tier", "开发者确认", "3.28限定"],
    description: "Reliquarian升华，Elemental Hit，开发者确认3.28限定S-Tier。",
    features: ["开发者确认S-Tier", "3.28限定", "Reliquarian", "元素打击"],
    links: [
      { text: "Zizaran访谈", url: "https://www.youtube.com/watch?v=1vRHUP9P6tI" }
    ],
    featured: true
  },
  {
    id: 59,
    name: "Kinetic Fusillade Totem Champion",
    nameZh: "念动飞射图腾 冠军",
    author: "Reddit社区",
    ascendancy: "champion",
    skill: "Kinetic Fusillade Totem",
    tags: ["图腾", "防御向", "新变体"],
    description: "Champion升华，Kinetic Fusillade图腾，防御向新变体。",
    features: ["防御向", "图腾", "新变体", "Champion"],
    links: []
  }
];
