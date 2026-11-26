(function (root, factory) {
  const engine = factory();
  if (typeof module === 'object' && module.exports) module.exports = engine;
  else root.Brand754 = engine;
})(globalThis, function () {
  'use strict';

  const platforms = ['youtube', 'instagram', 'tiktok'];
  const promotionLabels = { paid: '付费推广', suspected: '疑似付费推广', natural: '自然传播', unknown: '未识别' };
  const maxInclusionGroups = 5;
  const maxComparisonViews = 5;
  const dateStart = '2026-10-24';
  const dateEnd = '2026-11-22';
  const terraCoverageStart = '2026-10-01';
  const initialCutoff = '2026-11-22 23:59';
  const refreshedCutoff = '2026-11-23 09:00';
  const millisecondsPerDay = 86400000;
  const platformNames = { youtube: 'YouTube', instagram: 'Instagram', tiktok: 'TikTok' };
  const fieldNames = { text: '内容文本', tag: '内容标签', account: '发布账号', link: '内容外链' };
  const rules = [
    { id: 'trail', name: '山野系列', labels: ['产品线', '山野'], platforms, include: [{ type: 'tag', value: 'trail' }], exclude: [], version: 1 },
    { id: 'home', name: '居家系列', labels: ['产品线', '居家'], platforms, include: [{ type: 'tag', value: 'home' }], exclude: [], version: 1 },
    { id: 'launch', name: '新品体验内容', labels: ['内容主题'], platforms: ['youtube'], include: [{ type: 'text', value: '新品体验' }], exclude: [], version: 1 }
  ];
  const copy = value => JSON.parse(JSON.stringify(value));
  const clean = value => String(value ?? '').normalize('NFKC').trim().toLowerCase();
  const cleanTag = value => clean(value).replace(/^#+/, '').trim();
  const fail = (error, reason) => ({ ok: false, error, reason });

  function dateAt(iso, offset) {
    return new Date(Date.parse(iso + 'T00:00:00Z') + offset * millisecondsPerDay).toISOString().slice(0, 10);
  }

  // These per-content values are simulated observations of the current parent brand relationship.
  function samplePromotion(index, leansPaid) {
    const bucket = (index * 17 + Math.floor(index / 7)) % 20;
    if (bucket === 0) return 'unknown';
    if (bucket <= 3) return 'suspected';
    if (bucket < (leansPaid ? 14 : 7)) return 'paid';
    return 'natural';
  }

  function createRecord(index, tags) {
    const platform = platforms[index % platforms.length];
    const channelNumber = index % 12 + 1;
    const channels = ['荒野装备间', '林间小记', '山岸观察', '理想居所', '轻装出游', '周末实验室',
      '户外慢游', '城野日记', '简装生活', '山谷研究所', '旅行书架', '居家实践社'];
    const subject = tags.includes('trail') ? 'Trail 山野装备' : tags.includes('home') ? 'Home 居家装备' : 'TerraPeak 岩途';
    const stories = ['新品体验', '装备实测', '花时间看看', '使用记录', '选购笔记', '一周回顾'];
    return {
      id: String(1001 + index),
      title: subject + ' · ' + stories[index % stories.length] + ' ' + String(index + 1).padStart(2, '0'),
      description: subject + '。' + stories[index % stories.length] + '，分享产品细节和日常使用感受。',
      tags: ['terrapeak', ...tags],
      channel: channels[channelNumber - 1],
      channelId: 'tp-channel-' + channelNumber,
      profileMatched: channelNumber !== 12,
      contentType: 'video',
      promotionType: samplePromotion(index, tags.includes('home')),
      shares: 3 + index % 27,
      collects: 1 + index % 16,
      platform,
      date: dateAt(dateStart, index % 30),
      views: 2200 + (index * 929) % 14900,
      likes: 80 + (index * 17) % 750,
      comments: 2 + index % 50,
      lang: index % 4 === 0 ? 'en' : 'zh'
    };
  }

  function initialRecords() {
    return Array.from({ length: 100 }, (_, index) => {
      const tags = [];
      if (index < 60) tags.push('trail');
      if (index >= 35 && index < 90) tags.push('home');
      return createRecord(index, tags);
    });
  }

  // Extend TerraPeak's frozen coverage through the full October without altering its rolling 30-day fixture.
  function octoberRecords() {
    const segments = [
      { tags: ['trail'], mix: ['youtube', 'youtube', 'youtube', 'instagram'], count: 36 },
      { tags: ['home'], mix: ['tiktok', 'tiktok', 'instagram'], count: 30 },
      { tags: ['trail', 'home'], mix: platforms, count: 6 },
      { tags: [], mix: platforms, count: 8 }
    ];
    const records = [];
    for (const { tags, mix, count } of segments) {
      for (let i = 0; i < count; i++) {
        const record = createRecord(200 + records.length, tags);
        record.platform = mix[i % mix.length];
        if (tags.includes('trail') && i % 3 === 1) {
          record.channelId = 'tp-guest-' + record.id;
          record.channel = '山野体验官 ' + record.id;
          record.profileMatched = true;
        }
        record.date = dateAt(terraCoverageStart, records.length % 23);
        if (tags.length === 1 && tags[0] === 'home') {
          record.views = i < 3 ? 175000 - i * 16000 : 3500 + i * 57;
        }
        records.push(record);
      }
    }
    return records;
  }

  // Distribution inputs shape individual observations. Reports only aggregate the generated records.
  const fullLines = [
    { id: 'trail', name: '山野系列', product: '徒步背包', weight: 25, youtube: 58, instagram: 18, creatorPool: 117, typicalViews: 13500, paid: 18 },
    { id: 'home', name: '居家系列', product: '折叠置物架', weight: 22, youtube: 17, instagram: 34, creatorPool: 48, typicalViews: 8100, paid: 42 },
    { id: 'camp', name: '露营装备', product: '双层帐篷', weight: 17, youtube: 41, instagram: 23, creatorPool: 88, typicalViews: 9300, paid: 29 },
    { id: 'commute', name: '城市通勤', product: '通勤斜挎包', weight: 13, youtube: 13, instagram: 60, creatorPool: 122, typicalViews: 5200, paid: 20 },
    { id: 'travel', name: '旅行收纳', product: '旅行分装袋', weight: 9, youtube: 22, instagram: 29, creatorPool: 76, typicalViews: 6800, paid: 38 },
    { id: 'lighting', name: '营地照明', product: '便携营灯', weight: 5, youtube: 45, instagram: 15, creatorPool: 29, typicalViews: 5100, paid: 24 },
    { id: 'power', name: '户外供电', product: '移动电源', weight: 4, youtube: 62, instagram: 12, creatorPool: 33, typicalViews: 15000, paid: 47 }
  ];

  function fullFixture() {
    // A fixed seed keeps a shared review URL reproducible, including after a refresh.
    let seed = 7541026;
    const random = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const brandOnly = { name: '岩途品牌', product: '品牌体验', youtube: 33, instagram: 33, creatorPool: 110, typicalViews: 6400, paid: 16 };
    const stories = ['新品体验', '一周使用记录', '选购笔记', '装备实测', '整理清单', '对比测评'];
    const names = ['林间手记', '装备观察室', '行走日常', '山居生活', '轻装研究所', '城野之间', '周末出走', '旅人笔记'];
    let sequence = 0;
    function observation(day) {
      // The remaining weight belongs to the parent brand's own content.
      let ticket = random() * 100;
      let line = brandOnly;
      for (const item of fullLines) {
        ticket -= item.weight;
        if (ticket < 0) { line = item; break; }
      }
      const related = [line];
      if (line.id && random() < .24) {
        const other = fullLines[Math.floor(random() * fullLines.length)];
        if (other !== line) related.push(other);
      }
      const channelMix = random() * 100;
      const platform = channelMix < line.youtube ? 'youtube' : channelMix < line.youtube + line.instagram ? 'instagram' : 'tiktok';
      const channelNumber = 1 + Math.floor(random() * line.creatorPool);
      const story = stories[Math.floor(random() * stories.length)];
      const products = related.map(item => item.product).join('与');
      const spike = random() < (line.id === 'home' ? .035 : .012) ? 24 : 1;
      const views = Math.round(line.typicalViews * (.12 + 2 * random() ** 2) * spike);
      const promotionDraw = random() * 100;
      const promotionType = promotionDraw < line.paid ? 'paid' : promotionDraw < line.paid + 14 ? 'suspected'
        : promotionDraw < 95 ? 'natural' : 'unknown';
      const id = ++sequence;
      return {
        id: 'tp-full-' + id, title: products + ' · ' + story + ' #' + id,
        description: '岩途' + products + '的' + story + '。', tags: ['terrapeak', ...related.filter(item => item.id).map(item => item.id)],
        channelId: 'tp-full-channel-' + channelNumber, channel: names[(channelNumber - 1) % names.length] + ' ' + channelNumber,
        profileMatched: channelNumber % 19 !== 0, promotionType, platform, contentType: 'video',
        lang: random() < .72 ? 'zh' : 'en', date: dateAt(terraCoverageStart, day), views,
        likes: Math.round(views * (.008 + random() * .07)), comments: Math.round(views * random() * .006),
        ...(platform === 'tiktok' ? { shares: Math.round(views * random() * .014), collects: Math.round(views * random() * .009) } : {})
      };
    }
    const records = [];
    for (let day = 0; day < 53; day++) {
      const phase = 2 * Math.PI * day / 31;
      const count = 80 + Math.round(22 * Math.sin(4 * phase)) + Math.round(12 * Math.sin(phase));
      for (let i = 0; i < count; i++) records.push(observation(day));
    }
    const lateArrivals = Array.from({ length: 24 }, (_, i) => observation(52 - i % 3));
    return { records, lateArrivals };
  }

  // Values are transcribed from the read-only Anker MIS form; account IDs, content and metrics below are fixtures.
  const solixStore = 'https://www.amazon.com/stores/AnkerSOLIX/page/03368E97-E1F6-4264-8A97-909CE5D07821';
  const solixSite = 'https://www.anker.com/anker-solix';
  const soundcoreShop = 'https://www.tokopedia.com/soundcorebyanker';
  const ankerKeywordLabels = [
    'anker official', 'anker_official', 'anker power bank', 'anker power house', 'anker nano',
    'anker charger', 'anker soundcore', 'anker indonesia', 'anker mic', 'anker kuwait',
    'anker power core', 'anker nebula', 'anker maggo', 'anker cable', 'anker official store',
    'anker nano pro', 'anker power line', 'anker wall charger', 'soundcore by anker', 'anker shop',
    'anker power port nano', 'anker power port', 'anker partner', 'anker tws', 'anker accessories',
    'anker gifts', 'anker headphones', 'anker headphone', 'anker power port nano pro',
    'anker power core 10050', 'anker solix', 'anker japan', 'anker store', 'anker korea',
    'anker hongkong', 'anker tr', 'anker-tr', 'anker ph', 'anker', 'ankerofficial',
    'ankerindonesia', 'soundcorebyanker', 'ankerpowerbank', 'ankersoundcore', 'ankershop',
    'ankersolix', 'ankercharger', 'ankermaggo', 'ankernano', 'ankerpowerhouse',
    'ankerofficialstore', 'ankercable', 'ankerpowercore', 'ankerpowerport', 'ankershop_us',
    'ankerwallcharger', 'ankertws', 'ankergifts', 'ankersolixc1000', 'ankerheadphone', 'ankerph',
    'ankernebula', 'twsanker', 'ankerid', 'ankerheadphones', 'anker.indonesia',
    'anker3in1powerbank', 'ankermagsafe', 'ankerpowerline', 'ankernanopro', 'anker_kuwait',
    'ankerpowerstation', 'ankersolixf3800', 'ankeraccessories', 'ankernigeria', 'ankerkw',
    'anker power station', 'ankerchargers', 'ankerearbuds', 'ankersoundcoretws', 'ankerstore',
    'ankerportablecharger', 'ankerr50i', 'ankerkuwait', 'anker737', 'ankerjordan', 'ankerreview',
    'ankera20i', 'ankerofficialbali', 'ankerpartner', 'anker review', 'anker622', 'ankersoundcore2',
    'ankerbali', 'ankersolixf2000', 'ankerspeaker', 'ankerbluetoothspeaker', 'ankersolixc800plus',
    'ankerpowerportnano', 'ankermic', 'ankerkerobokan', 'ankerkerobokanbali', 'ankerのある生活',
    'anker_jp', 'anker solix c1000', 'ankersoundcorer50i', 'ankerinnovations',
    'ankersoundcoreliberty3pro', 'ankerprojector', 'anker soundcore liberty 3 pro',
    'anker soundcore 2', 'anker 737', 'ankerprime', 'ankersolixx1', 'ankernanoii', 'ankerpowerpods',
    'ankerganprime', 'ankersoundcorereview', 'ankerwirelesscharger', 'anker soundcore review',
    'ankersolixbalkonkraftwerkmitspeicher', 'anker portable charger', 'ankersoundcorea20i',
    'anker a20i', 'ankerp20i', 'ankersoundcoremotion+', 'anker521',
  ];
  const existingKeywordIds = {
    'anker solix': 'tag-solix',
    'ankersolixc1000': 'tag-c1000',
    'ankersolixf3800': 'tag-f3800',
    'anker nano': 'tag-nano',
  };
  const parentCatalog = [
    ...ankerKeywordLabels.map(value => ({
      id: existingKeywordIds[value] ?? 'keyword:' + value, group: '关键词标签', label: value, type: 'tag', value
    })),
    { id: 'site-solix', group: '品牌子网站', label: solixSite, type: 'link', value: solixSite },
    { id: 'site-japan', group: '品牌子网站', label: 'https://www.ankerjapan.com', type: 'link', value: 'https://www.ankerjapan.com' },
    { id: 'account-ig-solix', group: '第三方服务商', label: 'https://www.instagram.com/ankersolix_official', type: 'account', platform: 'instagram', value: 'demo-ig-solix' },
    { id: 'account-tt-solix', group: '第三方服务商', label: 'https://www.tiktok.com/@ankersolix_official', type: 'account', platform: 'tiktok', value: 'demo-tt-solix' },
    { id: 'shop-solix', group: '第三方服务商', label: solixStore, type: 'link', value: solixStore },
    { id: 'other-soundcore', group: '品牌其他链接', label: soundcoreShop, type: 'link', value: soundcoreShop },
    { id: 'other-community', group: '品牌其他链接', label: 'https://community.anker.com', type: 'link', value: 'https://community.anker.com' }
  ];

  function createAnkerRecord(index, platform, title, details = {}) {
    return {
      brandId: '17220', id: 'demo-' + index, platform, title, description: title,
      tags: ['anker'], channel: '样例频道 ' + index, channelId: 'demo-channel-' + index,
      links: [], date: dateAt(dateStart, (index * 2) % 30), views: 1200 + index * 147,
      likes: 35 + index, comments: 2 + index, shares: 2 + index % 7, collects: index % 5,
      contentType: 'video', profileMatched: true, promotionType: samplePromotion(index, false), lang: 'zh', ...details
    };
  }

  function ankerPool() {
    return [
      createAnkerRecord(1, 'youtube', 'SOLIX C1000 户外电源实测', { tags: ['anker solix', 'ankersolixc1000'], links: [solixSite + '/c1000'] }),
      createAnkerRecord(2, 'instagram', 'C1000 收纳记录', { channel: '@ankersolix_official', channelId: 'demo-ig-solix' }),
      createAnkerRecord(3, 'tiktok', '出发前给电源充电', { channel: '@ankersolix_official', channelId: 'demo-tt-solix', tags: ['anker solix'] }),
      createAnkerRecord(4, 'youtube', 'C1000 二手转售体验'),
      createAnkerRecord(5, 'instagram', '家庭备用电源的安装过程', { links: [solixSite + '?ref=video'] }),
      createAnkerRecord(6, 'tiktok', 'SOLIX F3800 体验', { tags: ['ankersolixf3800'], links: [solixStore + '?ref=demo'] }),
      createAnkerRecord(7, 'youtube', 'Soundcore 耳机通勤试听', { links: [soundcoreShop] }),
      createAnkerRecord(8, 'tiktok', 'Nano 随身充电头', { tags: ['anker nano'] }),
      createAnkerRecord(9, 'instagram', '日本门店的充电配件', { links: ['https://www.ankerjapan.com/products/sample'] }),
      createAnkerRecord(10, 'youtube', '旅行充电器与接口整理', { links: ['https://www.anker.com/chargers'] }),
      createAnkerRecord(11, 'tiktok', '安克用户社区配件讨论', { links: ['https://community.anker.com'] }),
      createAnkerRecord(12, 'youtube', 'SOLIX 阳台储能安装记录', { tags: ['anker solix'] })
    ];
  }

  function contentKey(record) {
    return record.platform + ':' + record.id;
  }

  function uniqueRecords(records) {
    return Array.from(new Map(records.map(record => [contentKey(record), record])).values());
  }

  function isApplicable(condition, platform) {
    return !condition.platform || condition.platform === platform;
  }

  function matchesLink(actual, expected) {
    try {
      const link = new URL(actual);
      const pattern = new URL(expected);
      const path = pattern.pathname.replace(/\/+$/, '');
      return ['http:', 'https:'].includes(link.protocol) && link.host === pattern.host &&
        (link.pathname === path || link.pathname.startsWith(path + '/'));
    } catch {
      return false;
    }
  }

  function matchingEvidence(record, condition) {
    if (!isApplicable(condition, record.platform)) return null;
    let field;
    let actual;
    switch (condition.type) {
      case 'account':
        field = '发布账号';
        if (record.channelId === condition.value) actual = record.channel || condition.label || record.channelId;
        break;
      case 'link':
        field = '内容外链';
        actual = record.links?.find(link => matchesLink(link, condition.value));
        break;
      case 'tag':
        field = '内容标签';
        actual = record.tags?.find(tag => cleanTag(tag) === cleanTag(condition.value));
        break;
      case 'text': {
        field = record.platform === 'youtube' ? '标题' : '说明';
        const content = record.platform === 'youtube' ? record.title : record.description;
        if (clean(content).includes(clean(condition.value))) actual = content;
        break;
      }
      default: return null;
    }
    return actual ? { ...condition, source: condition.configId ? 'parent' : 'custom', field, actual } : null;
  }

  function upgradeConditionGroups(rule) {
    if (rule.groupMatch === 'any') return rule;
    // Every pre-v0.14 requirement was mandatory, including rows sharing a visual group.
    const require = (rule.require ?? []).map((condition, index) => ({ ...condition, groupId: String(index + 1) }));
    return { ...rule, groupMatch: 'any', require };
  }

  function groupRequiredConditions(conditions) {
    const groups = new Map();
    for (const condition of conditions) {
      if (!groups.has(condition.groupId)) groups.set(condition.groupId, []);
      groups.get(condition.groupId).push(condition);
    }
    return groups;
  }

  function configIssues(state, rule) {
    if (!state.parentConfig || !rule) return [];
    const catalog = new Map(state.parentConfig.map(item => [item.id, item]));
    const frozen = new Map((rule.parentConditions ?? []).map(item => [item.configId, item]));
    const first = (rule.parentConfigIds ?? []).map(configId => frozen.get(configId) ?? { configId });
    const groups = [first, ...groupRequiredConditions(upgradeConditionGroups(rule).require ?? []).values()];
    const issues = [];
    groups.forEach((conditions, index) => {
      for (const ref of conditions) {
        if (!ref?.configId) continue;
        const item = catalog.get(ref.configId);
        const changed = item && ref.value !== undefined &&
          (item.type !== ref.type || item.value !== ref.value || item.platform !== ref.platform);
        if (!item || changed) issues.push({
          configId: ref.configId, groupId: ref.groupId, groupNumber: index + 1,
          label: ref.label ?? ref.value ?? ref.configId, platform: ref.platform, type: ref.type,
          kind: item ? 'changed' : 'removed'
        });
      }
    });
    return issues;
  }

  function matchRecords(records, rule, explain = false) {
    const matches = [];
    const firstGroup = [...(rule.parentConditions ?? []), ...rule.include];
    const groups = [firstGroup, ...groupRequiredConditions(upgradeConditionGroups(rule).require ?? []).values()];
    for (const record of records) {
      if (!rule.platforms.includes(record.platform) || rule.exclude.some(condition => matchingEvidence(record, condition))) continue;
      const evidenceByGroup = groups.map(group =>
        group.map(condition => matchingEvidence(record, condition)).filter(Boolean));
      if (evidenceByGroup.some(evidence => !evidence.length)) continue;
      if (explain) {
        const matchedConditions = evidenceByGroup.flatMap((evidence, index) => evidence.map(item => ({
          ...item, groupRole: index === 0 ? 'include' : 'require', groupNumber: index + 1
        })));
        matches.push({ ...record, matchedConditions });
      } else matches.push(record);
    }
    return matches;
  }

  function checkRule(state, rule, requireName) {
    if (!rule || typeof rule !== 'object') return fail('请填写查询规则。', 'rule');
    const name = String(rule.name ?? '').trim();
    if (requireName && !name) return fail('请输入子视图名称。', 'rule');
    const selection = rule.platforms ?? platforms;
    const selectedPlatforms = Array.isArray(selection) && selection.includes('all') ? platforms : selection;
    if (!Array.isArray(selectedPlatforms) || !selectedPlatforms.length || selectedPlatforms.some(platform => !platforms.includes(platform))) {
      return fail('请选择有效的平台。', 'rule');
    }
    const include = rule.include ?? [];
    const exclude = rule.exclude ?? [];
    const require = rule.require ?? [];
    const parentConfigIds = rule.parentConfigIds ?? [];
    if (!Array.isArray(parentConfigIds) || !Array.isArray(require)) return fail('子视图条件格式无效。', 'rule');
    if (rule.groupMatch !== undefined && rule.groupMatch !== 'any') return fail('不支持此条件组匹配方式。', 'rule');
    if (rule.groupMatch === 'any' && require.some(condition => typeof condition?.groupId !== 'string' || !condition.groupId.trim())) {
      return fail('条件缺少所属组，请重新选择。', 'rule');
    }
    if (state.views.some(view => view.id === rule.id) && configIssues(state, rule).length) {
      return fail('请先处理条件组中已移除或已变更的主配置。', 'config_changed');
    }
    if (!Array.isArray(include) || !(include.length || parentConfigIds.length) || !Array.isArray(exclude)) {
      return fail('请至少添加一项纳入条件。', 'rule');
    }
    if ([...include, ...exclude].some(row => row?.configId !== undefined)) {
      return fail('请通过包含组内的主配置选择器添加配置。', 'rule');
    }
    const catalog = new Map((state.parentConfig ?? []).map(item => [item.id, item]));
    const parentConditions = [];
    const requiredConditions = [];
    const selectedByGroup = new Map();
    // Resolve references in their owning group. Match only catalog values from this brand.
    for (const id of new Set(parentConfigIds)) {
      const item = catalog.get(id);
      if (!item) return fail('所选主配置不属于该品牌，请重新选择。', 'rule');
      parentConditions.push({ ...item, configId: id });
    }
    for (const row of require) {
      if (row?.configId === undefined) {
        requiredConditions.push(row);
        continue;
      }
      const item = catalog.get(row.configId);
      if (!item || rule.groupMatch !== 'any') return fail('所属组或主配置无效，请重新选择。', 'rule');
      if (!selectedByGroup.has(row.groupId)) selectedByGroup.set(row.groupId, new Set());
      const ids = selectedByGroup.get(row.groupId);
      if (!ids.has(item.id)) requiredConditions.push({ ...item, configId: item.id, groupId: row.groupId });
      ids.add(item.id);
    }
    if (exclude.some(condition => condition?.type === 'account')) {
      return fail('账号条件仅支持纳入。', 'rule');
    }
    const existing = rule.id && findView(state, rule.id);
    const savedRule = existing?.pendingRule ?? existing?.rule;
    const legacyAccounts = [...(savedRule?.include ?? []), ...(savedRule?.require ?? [])]
      .filter(row => row.type === 'account' && !row.configId);
    for (const condition of [...parentConditions, ...include, ...requiredConditions, ...exclude]) {
      if (!condition || (!condition.configId && !['text', 'tag', 'account'].includes(condition.type))) return fail('条件类型无效。', 'rule');
      const value = condition.type === 'tag' ? cleanTag(condition.value) : clean(condition.value);
      if (!value) return fail('请填写条件内容。', 'rule');
      if (condition.type === 'account' && !condition.configId) {
        const index = legacyAccounts.findIndex(row => row.platform === condition.platform && row.value === condition.value);
        if (index < 0) return fail('请从当前主品牌配置中选择发布账号。', 'rule');
        legacyAccounts.splice(index, 1);
      }
      if (condition.platform && !selectedPlatforms.includes(condition.platform)) {
        return fail('条件所用的平台必须在已选平台范围内。', 'rule');
      }
    }
    if (!state.parentConfig && selectedPlatforms.some(platform => !include.some(condition => isApplicable(condition, platform)))) {
      return fail('每个已选平台至少需要一项适用的纳入条件。', 'rule');
    }
    for (const platform of selectedPlatforms) {
      const missing = [...parentConditions, ...include, ...requiredConditions, ...exclude].find(condition =>
        isApplicable(condition, platform) && state.missingFields[platform]?.includes(condition.type));
      if (missing) return fail(platformNames[platform] + ' 的' + fieldNames[missing.type] + '字段当前不可用，请调整条件。', 'field');
    }
    const labels = new Map();
    for (const value of Array.isArray(rule.labels) ? rule.labels : []) {
      const label = String(value).trim();
      if (label && !labels.has(clean(label))) labels.set(clean(label), label);
    }
    const normalized = copy({ id: rule.id, name, labels: [...labels.values()], platforms: [...new Set(selectedPlatforms)], include, require: requiredConditions, exclude, groupMatch: rule.groupMatch, parentConditions, parentConfigIds: [...new Set(parentConfigIds)] });
    for (const condition of [...normalized.include, ...normalized.require, ...normalized.exclude]) {
      condition.value = String(condition.value).trim();
    }
    const additionalGroupCount = normalized.groupMatch === 'any'
      ? groupRequiredConditions(normalized.require).size : normalized.require.length;
    if (1 + additionalGroupCount > maxInclusionGroups) {
      return fail('请将包含条件组减少至 ' + maxInclusionGroups + ' 个后再预览或保存。', 'group_limit');
    }
    return { ok: true, rule: state.parentConfig ? upgradeConditionGroups(normalized) : normalized };
  }

  function childSnapshot(rule, records, poolBatchId, explain) {
    return { id: rule.id, name: rule.name, version: rule.version, poolBatchId,
      rule: copy(rule), records: matchRecords(records, rule, explain) };
  }

  function makePublication(id, cutoff, records, approvedRules, poolBatchId = id, brandId, coverageStart = dateStart) {
    const frozenRecords = uniqueRecords(copy(brandId ? records.filter(record => record.brandId === brandId) : records));
    const children = Object.fromEntries(approvedRules.map(rule => [
      rule.id,
      childSnapshot(rule, frozenRecords, poolBatchId, Boolean(brandId))
    ]));
    return { id, cutoff, poolBatchId, dateEnd, dateStart: coverageStart, records: frozenRecords, children };
  }

  function createState(scenario = 'normal') {
    const isAnker = scenario === 'anker';
    const full = scenario === 'full' ? fullFixture() : null;
    const hasOctober = ['full', 'normal', 'many', 'viewer', 'revoked', 'base', 'advanced'].includes(scenario);
    const initial = full ? full.records : isAnker ? ankerPool() : initialRecords();
    if (!full && hasOctober) initial.push(...octoberRecords());
    if (scenario === 'missing') {
      initial[0].views = null;
      initial[2].shares = null;
      initial.filter(record => record.platform === 'tiktok').forEach(record => { record.description = ''; });
    }
    const liveRecords = initial.map(record => ({ ...record, tags: [...record.tags], views: record.views === null ? null : record.views + 150 }));
    const added = [['trail'], ['home'], ['trail', 'home'], [], ['home'], []];
    if (full) liveRecords.push(...full.lateArrivals);
    else if (isAnker) liveRecords.push(createAnkerRecord(13, 'youtube', 'C1000 新到货体验', { tags: ['ankersolixc1000'] }));
    else added.forEach((tags, index) => {
      const record = createRecord(100 + index, tags);
      if (scenario === 'missing' && record.platform === 'tiktok') record.description = '';
      liveRecords.push(record);
    });
    const approved = full ? fullLines.map(line => ({
      id: line.id, name: line.name, labels: ['产品线'], platforms: [...platforms], version: 1,
      include: [{ type: 'tag', value: line.id }], exclude: []
    })) : isAnker || scenario === 'first' ? [] : copy(rules);
    const comparisonViewIds = full ? approved.slice(0, maxComparisonViews).map(rule => rule.id) : approved.length ? ['trail', 'home'] : [];
    if (scenario === 'many') {
      for (const [id, name] of [['field-test', '装备实测'], ['usage', '使用记录'], ['buying', '选购笔记'], ['weekly', '一周回顾']]) {
        approved.push({ id, name, labels: ['内容主题'], platforms: [...platforms],
          include: [{ type: 'text', value: name }], exclude: [], version: 1 });
      }
      comparisonViewIds.push('launch', 'field-test', 'usage');
    }
    return {
      brand: isAnker ? { id: '17220', name: 'Anker', category: '电子产品' } : { name: '岩途 TerraPeak', category: '户外及生活装备' },
      parentConfig: isAnker ? copy(parentCatalog) : null,
      poolSequence: 1,
      role: ['viewer', 'revoked', 'base', 'advanced'].includes(scenario) ? scenario : 'editor',
      views: approved.map(rule => ({
        id: rule.id, name: rule.name, active: true, rule, pendingRule: null, status: 'available',
        activationPending: false, versionCounter: rule.version
      })),
      comparisonViewIds,
      liveRecords,
      liveCutoff: refreshedCutoff,
      liveComplete: true,
      missingFields: scenario === 'missing' ? { tiktok: ['text'] } : {},
      publication: makePublication('pub-1', initialCutoff, initial, approved, isAnker ? 'anker-17220-pool-1' : 'pub-1', isAnker ? '17220' : undefined, hasOctober ? terraCoverageStart : dateStart),
      history: [],
      task: null,
      lastError: null,
      taskSequence: 0,
      publicationSequence: 1,
      viewSequence: 0
    };
  }

  function seedPublishedViews(state, examples) {
    const batch = state.publication;
    // The review fixtures were published against Anker's pre-change catalog.
    const original = { ...state, parentConfig: parentCatalog };
    for (const example of examples) {
      const checked = checkRule(original, { ...example, groupMatch: 'any', platforms }, true);
      if (!checked.ok) throw new Error(checked.error);
      const rule = { ...checked.rule, version: 1 };
      state.views.push({ id: rule.id, name: rule.name, active: true, rule, pendingRule: null,
        status: 'available', activationPending: false, versionCounter: 1 });
      batch.children[rule.id] = childSnapshot(rule, batch.records, batch.poolBatchId, true);
    }
  }

  function seedImpactExample(state) {
    if (state.brand.id !== '17220' || findView(state, 'impact-account')) return;
    seedPublishedViews(state, [
      { id: 'impact-account', name: 'SOLIX 官号内容', include: [{ type: 'text', value: 'C1000' }],
        require: [{ configId: 'account-ig-solix', groupId: '1' }, { type: 'text', value: '收纳', groupId: '1' }] },
      { id: 'impact-product', name: 'SOLIX 产品内容', parentConfigIds: ['tag-solix'], include: [] }
    ]);
    // The original snapshot predates the simulated removal from the next configuration.
    state.parentConfig = state.parentConfig.filter(item => item.id !== 'account-ig-solix');
    for (const view of state.views) view.configIssues = configIssues(state, view.rule);
  }

  function seedBulkImpactExample(state) {
    if (state.brand.id !== '17220' || findView(state, 'impact-site')) return;
    seedImpactExample(state);
    seedPublishedViews(state, [
      { id: 'impact-site', name: 'SOLIX 官网内容', parentConfigIds: ['site-solix'] },
      { id: 'impact-official', name: 'SOLIX 官方账号', include: [{ type: 'text', value: 'C1000' }],
        require: [{ configId: 'account-ig-solix', groupId: '1' }] }
    ]);
    const path = solixSite + '/c1000';
    state.parentConfig = state.parentConfig.map(item =>
      item.id === 'site-solix' ? { ...item, label: path, value: path } : item);
    for (const view of state.views) view.configIssues = configIssues(state, view.rule);
  }

  function checkRole(state, write = false) {
    if (state.role === 'revoked') return fail('当前没有主品牌报告的访问权限。', 'denied');
    if (state.role !== 'editor' && state.role !== 'viewer') return fail('需要当前主品牌的有效监控权限。', 'denied');
    if (write && state.role !== 'editor') return fail('当前没有管理子视图的权限。', 'denied');
    return { ok: true };
  }

  function preview(state, rule) {
    const access = checkRole(state, true);
    if (!access.ok) return access;
    const checked = checkRule(state, rule, false);
    if (!checked.ok) return checked;
    const batch = state.publication;
    const records = copy(matchRecords(batch.records, checked.rule, true));
    return {
      ok: true,
      records,
      batchId: batch.id,
      cutoff: batch.cutoff,
      poolBatchId: batch.poolBatchId,
      dateStart: batch.dateStart,
      dateEnd: batch.dateEnd,
      platforms: [...checked.rule.platforms],
      total: summarize(records)
    };
  }

  function findView(state, id) {
    return state.views.find(view => view.id === id);
  }

  function prepareConfigRepair(state, savedRule, catalog) {
    const rule = upgradeConditionGroups(savedRule);
    const parentConfigIds = (rule.parentConfigIds ?? []).filter(id => catalog.has(id));
    const emptyGroup = number => fail('条件组 ' + number + ' 将没有条件，请手动补充。', 'empty_group');
    if (!parentConfigIds.length && !rule.include.length) return emptyGroup(1);
    const require = [];
    let groupNumber = 1;
    for (const [groupId, conditions] of groupRequiredConditions(rule.require ?? [])) {
      groupNumber++;
      const kept = conditions.filter(row => !row.configId || catalog.has(row.configId));
      if (!kept.length) return emptyGroup(groupNumber);
      for (const row of kept) require.push(row.configId ? { groupId, configId: row.configId } : row);
    }
    // checkRule resolves the remaining references from the current catalog and validates their platforms.
    return checkRule(state, { ...rule, parentConditions: [], parentConfigIds, require }, true);
  }

  function repairAllConfigIssues(state) {
    const access = checkRole(state, true);
    if (!access.ok) return access;
    if (state.task) return fail('当前有任务进行中，请在任务结束后再处理。', 'busy');
    const previous = state.publication;
    const catalog = new Set((state.parentConfig ?? []).map(item => item.id));
    const prepared = [];
    const remaining = [];
    for (const view of state.views) {
      const snapshot = previous.children[view.id];
      if (!view.active || !view.rule || !snapshot || !configIssues(state, view.rule).length) continue;
      if (view.pendingRule || view.activationPending || snapshot.version !== view.rule.version) {
        remaining.push({ id: view.id, reason: '请先处理此子视图待发布的修改。' });
        continue;
      }
      const checked = prepareConfigRepair(state, view.rule, catalog);
      if (!checked.ok) {
        remaining.push({ id: view.id, reason: checked.error });
        continue;
      }
      const rule = { ...checked.rule, version: view.versionCounter + 1 };
      prepared.push({ view, rule, snapshot: childSnapshot(rule, previous.records, previous.poolBatchId, true) });
    }
    if (prepared.length) {
      const children = { ...previous.children };
      for (const { view, rule, snapshot } of prepared) {
        children[view.id] = snapshot;
        view.rule = rule;
        view.versionCounter = rule.version;
        view.configIssues = [];
        view.status = 'available';
      }
      state.history = [];
      state.publication = { ...previous, id: 'pub-' + ++state.publicationSequence, children };
      state.lastError = null;
    }
    return { ok: true, updated: prepared.map(item => item.view.id), remaining };
  }

  function begin(state, kind, view, records, cutoff, complete = true) {
    const oldTask = state.task;
    if (oldTask?.viewId && oldTask.viewId !== view?.id) {
      const superseded = findView(state, oldTask.viewId);
      if (superseded?.active && superseded.pendingRule) {
        superseded.status = 'failed';
      }
    }
    const preparedRules = state.views
      .filter(candidate => candidate.active)
      .map(candidate => candidate.id === view?.id ? candidate.pendingRule : candidate.activationPending ? null : candidate.rule)
      .filter(Boolean);
    const task = {
      id: 'task-' + ++state.taskSequence,
      kind,
      viewId: view?.id,
      records: copy(records),
      cutoff,
      complete,
      rules: copy(preparedRules)
    };
    state.task = task;
    state.lastError = null;
    return { ok: true, id: view?.id, taskId: task.id };
  }

  function save(state, rule, expectedPoolBatchId) {
    const access = checkRole(state, true);
    if (!access.ok) return access;
    if (expectedPoolBatchId !== undefined && expectedPoolBatchId !== state.publication.poolBatchId) {
      return fail('主池批次已更新，请重新预览后保存。', 'stale');
    }
    const checked = checkRule(state, rule, true);
    if (!checked.ok) return checked;
    let view = checked.rule.id ? findView(state, checked.rule.id) : undefined;
    if (checked.rule.id && !view) return fail('找不到要编辑的子视图。', 'missing');
    if (view && !view.active) return fail('请先重新启用该子视图。', 'inactive');
    if (state.views.some(candidate => candidate.id !== view?.id &&
        [candidate.name, candidate.pendingRule?.name].some(name => clean(name) === clean(checked.rule.name)))) {
      return fail('该主品牌下已有同名子视图。', 'duplicate');
    }
    if (!view) {
      view = {
        id: 'view-' + ++state.viewSequence,
        name: checked.rule.name,
        active: true,
        rule: null,
        pendingRule: null,
        status: 'generating',
        activationPending: false,
        versionCounter: 0
      };
      state.views.push(view);
    }
    view.pendingRule = { ...checked.rule, id: view.id, version: ++view.versionCounter };
    view.status = view.rule && !view.activationPending ? 'updating' : 'generating';
    const current = state.publication;
    return begin(state, 'save', view, current.records, current.cutoff);
  }

  function retry(state, id) {
    const access = checkRole(state, true);
    if (!access.ok) return access;
    const view = findView(state, id);
    if (!view?.active || !view.pendingRule || view.status !== 'failed') {
      return fail('此子视图没有可重试的规则。', 'missing');
    }
    view.status = view.rule && !view.activationPending ? 'updating' : 'generating';
    return begin(state, 'retry', view, state.publication.records, state.publication.cutoff);
  }

  function refresh(state) {
    const access = checkRole(state, true);
    if (!access.ok) return access;
    return begin(state, 'refresh', null, state.liveRecords, state.liveCutoff, state.liveComplete);
  }

  function settle(state, outcome, optionalTaskId) {
    const access = checkRole(state, true);
    if (!access.ok) return access;
    const task = state.task;
    if (!task || (optionalTaskId && optionalTaskId !== task.id)) return fail('任务已失效。', 'stale');
    if (!['success', 'failure'].includes(outcome)) return fail('结果状态无效。', 'task');
    const view = task.viewId ? findView(state, task.viewId) : null;
    state.task = null;
    const publishingRules = task.kind === 'refresh' ? task.rules : task.rules.filter(rule => rule.id === task.viewId);
    if (outcome === 'success' && publishingRules.some(rule => configIssues(state, rule).length)) {
      if (view?.active) view.status = 'failed';
      state.lastError = '主配置已变动，请处理受影响的条件。当前结果仍可查看。';
      return fail(state.lastError, 'config_changed');
    }
    if (outcome === 'failure' || !task.complete) {
      if (view?.active) view.status = 'failed';
      state.lastError = task.complete ? '生成失败，已发布快照仍可查看。' : '本次取数不完整，继续使用已发布快照。';
      if (view && !view.rule) state.lastError = '生成失败，尚未发布此子视图的快照。';
      return fail(state.lastError, 'generation');
    }
    const previous = state.publication;
    const nextId = 'pub-' + ++state.publicationSequence;
    let poolBatchId = previous.poolBatchId;
    if (task.kind === 'refresh') {
      poolBatchId = state.brand.id ? 'anker-' + state.brand.id + '-pool-' + ++state.poolSequence : nextId;
    }
    const next = makePublication(nextId, task.cutoff, task.records, task.rules, poolBatchId, state.brand.id, previous.dateStart);
    if (view?.active) {
      view.rule = view.pendingRule;
      view.name = view.rule.name;
      view.configIssues = configIssues(state, view.rule);
      view.pendingRule = null;
      view.activationPending = false;
      view.status = 'available';
    }
    state.publication = next;
    state.history = [previous];
    state.lastError = null;
    return { ok: true, batchId: next.id };
  }

  function setActive(state, id, active) {
    const access = checkRole(state, true);
    if (!access.ok) return access;
    const view = findView(state, id);
    if (!view) return fail('找不到此子视图。', 'missing');
    if (view.active === active) return { ok: true };
    if (!active) {
      const task = state.task;
      if (task?.rules.some(rule => rule.id === id)) {
        const pending = findView(state, task.viewId);
        if (pending && pending.id !== id && pending.pendingRule) pending.status = 'failed';
        state.task = null;
      }
      view.active = false;
      view.activationPending = false;
      view.status = 'inactive';
      state.comparisonViewIds = state.comparisonViewIds.filter(viewId => viewId !== id);
      return { ok: true };
    }
    view.active = true;
    view.activationPending = true;
    view.pendingRule ||= copy(view.rule);
    view.status = 'generating';
    return begin(state, 'activate', view, state.publication.records, state.publication.cutoff);
  }

  function selectBatch(state, batchId) {
    const access = checkRole(state);
    if (!access.ok) return access;
    const batch = batchId && batchId !== state.publication.id
      ? state.history.find(candidate => candidate.id === batchId)
      : state.publication;
    return batch ? { ok: true, batch } : fail('该快照已过期，请查看当前结果。', 'expired');
  }

  function nextMonthStart(start) {
    const next = new Date(start + 'T00:00:00Z');
    next.setUTCMonth(next.getUTCMonth() + 1);
    return next.toISOString().slice(0, 10);
  }

  function completeComparisonMonths(state, batchId) {
    const selected = selectBatch(state, batchId);
    if (!selected.ok) return [];
    const { dateStart, dateEnd } = selected.batch;
    let start = dateStart.slice(0, 7) + '-01';
    if (start < dateStart) start = nextMonthStart(start);
    const months = [];
    while (start <= dateEnd) {
      const next = nextMonthStart(start);
      if (dateAt(next, -1) > dateEnd) break;
      months.push(start.slice(0, 7));
      start = next;
    }
    return months.reverse();
  }

  function checkScope(batch, filters = {}) {
    const platform = filters.platform ?? 'all';
    if (platform !== 'all' && !platforms.includes(platform)) return fail('所选平台无效。', 'range');
    if (filters.month !== undefined && filters.month !== null) {
      const start = filters.month + '-01';
      if (!isCalendarDate(start)) return fail('所选自然月无效。', 'range');
      if (start > batch.dateEnd || start < batch.dateStart) return fail('快照未完整覆盖所选自然月。', 'range');
      const end = dateAt(nextMonthStart(start), -1);
      if (end > batch.dateEnd) return fail('快照未完整覆盖所选自然月。', 'range');
      return { ok: true, month: filters.month, platform, dateStart: start, dateEnd: end };
    }
    const days = Number(filters.days ?? 30);
    if (!Number.isInteger(days) || days < 1 || days > 30 || dateAt(batch.dateEnd, 1 - days) < batch.dateStart) {
      return fail('所选日期超出此快照的覆盖范围。', 'range');
    }
    return { ok: true, days, platform, dateStart: dateAt(batch.dateEnd, 1 - days), dateEnd: batch.dateEnd };
  }

  function filterRecords(records, filters = {}, end = dateEnd) {
    const platform = filters.platform ?? 'all';
    let until = filters.dateEnd ?? end;
    let start = filters.dateStart;
    if (filters.month && !start) {
      start = filters.month + '-01';
      if (!isCalendarDate(start) || start > until) return [];
      until = dateAt(nextMonthStart(start), -1);
    }
    start ??= dateAt(until, 1 - Number(filters.days ?? 30));
    return uniqueRecords(records).filter(record => (platform === 'all' || record.platform === platform) &&
      record.date >= start && record.date <= until);
  }

  function isCalendarDate(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(value + 'T00:00:00Z');
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }

  function publicationBuckets(start, end, granularity = 'day') {
    if (!isCalendarDate(start) || !isCalendarDate(end) || start > end || !['day', 'week'].includes(granularity)) return [];
    const buckets = [];
    let bucketStart = start;
    while (bucketStart <= end) {
      const day = new Date(bucketStart + 'T00:00:00Z').getUTCDay();
      const bucketEnd = granularity === 'week' ? dateAt(bucketStart, (7 - day) % 7) : bucketStart;
      buckets.push({ dateStart: bucketStart, dateEnd: bucketEnd < end ? bucketEnd : end });
      if (bucketEnd >= end) break;
      bucketStart = dateAt(bucketEnd, 1);
    }
    return buckets;
  }

  function countByPublicationDate(records, buckets) {
    const dayCounts = new Map();
    for (const record of uniqueRecords(records)) dayCounts.set(record.date, (dayCounts.get(record.date) ?? 0) + 1);
    return buckets.map(bucket => {
      let count = 0;
      for (let day = bucket.dateStart; day <= bucket.dateEnd; day = dateAt(day, 1)) count += dayCounts.get(day) ?? 0;
      return count;
    });
  }

  function summarize(records) {
    const unique = uniqueRecords(records);
    const known = unique.every(record => Number.isFinite(record.views) && record.views >= 0);
    return {
      videos: unique.length,
      views: known ? unique.reduce((sum, record) => sum + record.views, 0) : null
    };
  }

  function groupPublishers(records) {
    const groups = new Map();
    for (const record of records) {
      if (!record.channelId) continue;
      const key = record.platform + ':' + record.channelId;
      if (!groups.has(key)) {
        groups.set(key, { platform: record.platform, id: record.channelId, name: record.channel || record.channelId,
          profileMatched: record.profileMatched, videoCount: 0, records: [] });
      }
      const group = groups.get(key);
      group.videoCount++;
      group.records.push(record);
      if (record.profileMatched === true) group.profileMatched = true;
    }
    return [...groups.values()];
  }

  function publisherSummary(records) {
    records = uniqueRecords(records);
    const creators = groupPublishers(records);
    const identitiesKnown = records.every(record => Boolean(record.channelId));
    const profilesKnown = creators.every(creator => typeof creator.profileMatched === 'boolean');
    const creatorCount = identitiesKnown && profilesKnown ? creators.filter(creator => creator.profileMatched).length : null;
    const publisherCount = identitiesKnown ? creators.length : null;
    const repeatCreatorCount = identitiesKnown ? creators.filter(creator => creator.videoCount > 1).length : null;
    return { creators, creatorCount, publisherCount, repeatCreatorCount, repeatCreatorRate: ratio(repeatCreatorCount, publisherCount) };
  }

  function promotionKey(record) {
    return Object.hasOwn(promotionLabels, record.promotionType) ? record.promotionType : 'unknown';
  }

  const observedCount = value => Number.isFinite(value) && value >= 0;
  function engagementCount(record) {
    const fields = record.platform === 'tiktok'
      ? ['likes', 'comments', 'shares', 'collects'] : ['likes', 'comments'];
    return fields.every(field => observedCount(record[field])) ? fields.reduce((n, field) => n + record[field], 0) : null;
  }

  function engagementSample(records, platform) {
    return records.filter(record => record.platform === platform && (platform !== 'instagram' || record.contentType === 'video'));
  }

  function platformEngagement(records, platform) {
    const sample = engagementSample(records, platform);
    const unknownType = platform === 'instagram' && records.some(r => r.platform === platform && !['video', 'image'].includes(r.contentType));
    let numerator = 0, denominator = 0, validCount = 0;
    for (const record of sample) {
      const count = engagementCount(record);
      if (count === null || !observedCount(record.views)) continue;
      numerator += count;
      denominator += record.views;
      validCount++;
    }
    const incomplete = unknownType || validCount !== sample.length;
    let reason = '';
    if (unknownType) reason = '内容形式缺失';
    else if (incomplete) reason = '互动或观看数据缺失';
    else if (!sample.length) reason = '暂无可比视频';
    else if (!denominator) reason = '观看量分母为零';
    return { rate: reason ? null : Math.round(numerator / denominator * 10000) / 10000,
      numerator: incomplete ? null : numerator, denominator: incomplete ? null : denominator,
      sampleCount: sample.length, validCount, reason };
  }

  function comparisonMetrics(records, publishers = publisherSummary(records)) {
    const counts = Object.fromEntries(platforms.map(platform => [platform, 0]));
    const observations = [];
    for (const record of records) {
      counts[record.platform]++;
      if (Number.isFinite(record.views) && record.views >= 0) observations.push(record.views);
    }
    const total = summarize(records);
    let medianViews = null;
    if (total.views !== null && observations.length) {
      observations.sort((a, b) => a - b);
      const middle = Math.floor(observations.length / 2);
      medianViews = (observations[middle] + observations[Math.floor((observations.length - 1) / 2)]) / 2;
    }
    const { creatorCount, publisherCount, repeatCreatorCount, repeatCreatorRate } = publishers;
    const promotionCounts = { paid: 0, suspected: 0, natural: 0, unknown: 0 };
    let engagements = 0;
    for (const record of records) {
      promotionCounts[promotionKey(record)]++;
      const n = engagementCount(record);
      engagements = engagements === null || n === null ? null : engagements + n;
    }
    const engagementByPlatform = Object.fromEntries(platforms.map(p => [p, platformEngagement(records, p)]));
    return { ...total, medianViews, validViewCount: observations.length, platformCounts: counts,
      creatorCount, publisherCount, repeatCreatorCount, repeatCreatorRate,
      engagements, engagementByPlatform, promotionCounts };
  }

  function ratio(value, total) {
    return value !== null && total !== null && total > 0 ? value / total : null;
  }

  function comparisonCandidates(state) {
    if (!checkRole(state).ok) return [];
    return state.views.flatMap(view => {
      const child = view.active && !view.activationPending && state.publication.children[view.id];
      return child && child.poolBatchId === state.publication.poolBatchId
        ? [{ id: child.id, name: child.name, labels: [...(child.rule.labels ?? [])] }] : [];
    });
  }

  function setComparisonViews(state, ids) {
    const access = checkRole(state, true);
    if (!access.ok) return access;
    const eligible = new Set(comparisonCandidates(state).map(view => view.id));
    if (!Array.isArray(ids) || !ids.every(id => eligible.has(id))) return fail('请选择有可用快照的子视图。', 'comparison');
    const uniqueIds = [...new Set(ids)];
    if (uniqueIds.length > maxComparisonViews) return fail('最多可勾选 ' + maxComparisonViews + ' 个子视图参与对比。', 'comparison_limit');
    state.comparisonViewIds = uniqueIds;
    return { ok: true };
  }

  function comparisonData(state, filters, batchId) {
    const selected = selectBatch(state, batchId);
    if (!selected.ok) return selected;
    const { batch } = selected;
    const scope = checkScope(batch, filters);
    if (!scope.ok) return scope;

    const selectedIds = new Set(state.comparisonViewIds);
    if (selectedIds.size > maxComparisonViews) {
      return fail('当前对比成员超过上限，请由管理者在「子视图管理」中保留最多 ' + maxComparisonViews + ' 个并保存。', 'comparison_limit');
    }
    const members = [];
    for (const id of selectedIds) {
      const view = findView(state, id);
      const child = batch.children[id];
      if (!view?.active || view.activationPending || !child || child.poolBatchId !== batch.poolBatchId) {
        return fail('所配置的子视图尚未全部发布同批结果。', 'incomplete');
      }
      members.push({ ...child, records: filterRecords(child.records, scope, batch.dateEnd) });
    }
    const pool = { id: 'pool', name: '主品牌基准', rule: { platforms },
      records: filterRecords(batch.records, scope, batch.dateEnd) };
    return { ok: true, batch, scope, pool, members };
  }

  function comparisonCoverage(pool, members) {
    const matched = new Map();
    for (const member of members) {
      for (const record of member.records) {
        const id = contentKey(record);
        matched.set(id, (matched.get(id) ?? 0) + 1);
      }
    }
    const covered = [];
    const uncovered = [];
    const overlap = [];
    for (const record of pool.records) {
      const hits = matched.get(contentKey(record)) ?? 0;
      if (hits > 1) overlap.push(record);
      if (hits) covered.push(record);
      else uncovered.push(record);
    }
    return { covered, uncovered, overlap };
  }

  function matchedCreatorIndex(publishers) {
    if (publishers.creatorCount === null) return null;
    const index = new Map();
    for (const creator of publishers.creators) {
      if (creator.profileMatched) index.set(creator.platform + ':' + creator.id, creator);
    }
    return index;
  }

  function coversPlatform(member, platform) {
    return platform === 'all' || member.rule.platforms.includes(platform);
  }

  function measurePair(first, second, unit) {
    const left = first[unit];
    const right = second[unit];
    const firstCount = left?.size ?? null;
    const secondCount = right?.size ?? null;
    const reason = !first.covered || !second.covered ? 'platform' : (!left || !right ? 'missing' : '');
    let intersection = null, union = null, firstOnly = null, secondOnly = null;
    if (!reason) {
      const [smaller, larger] = firstCount <= secondCount ? [left, right] : [right, left];
      intersection = 0;
      for (const key of smaller.keys()) if (larger.has(key)) intersection++;
      firstOnly = firstCount - intersection;
      secondOnly = secondCount - intersection;
      union = firstOnly + secondCount;
    }
    return { firstId: first.id, secondId: second.id, applicable: !reason, reason, firstCount, secondCount,
      intersection, union, firstOnly, secondOnly, jaccard: ratio(intersection, union),
      shareOfFirst: ratio(intersection, firstCount), shareOfSecond: ratio(intersection, secondCount) };
  }

  function compare(state, filters, optionalBatchId) {
    const data = comparisonData(state, filters, optionalBatchId);
    if (!data.ok) return data;
    const { batch, scope, pool, members } = data;
    const total = comparisonMetrics(pool.records);
    const indexed = members.map(member => {
      const covered = coversPlatform(member, scope.platform);
      const publishers = publisherSummary(member.records);
      return { member, id: member.id, publishers, covered,
        videos: covered ? new Set(member.records.map(contentKey)) : null,
        creators: covered ? matchedCreatorIndex(publishers) : null };
    });
    const pairOverlaps = [], creatorPairOverlaps = [];
    for (let i = 0; i < indexed.length; i++) {
      for (let j = i + 1; j < indexed.length; j++) {
        pairOverlaps.push(measurePair(indexed[i], indexed[j], 'videos'));
        creatorPairOverlaps.push(measurePair(indexed[i], indexed[j], 'creators'));
      }
    }
    const rows = indexed.map(({member: child, publishers}) => {
      const metrics = comparisonMetrics(child.records, publishers);
      return {
        id: child.id, name: child.name, labels: [...(child.rule.labels ?? [])], version: child.version, ...metrics,
        videoShare: ratio(metrics.videos, total.videos), viewShare: ratio(metrics.views, total.views),
        platforms: [...child.rule.platforms]
      };
    });
    const coverage = members.length ? comparisonCoverage(pool, members) : null;
    return {
      ok: true, batchId: batch.id, cutoff: batch.cutoff, dateStart: scope.dateStart, dateEnd: scope.dateEnd,
      total, rows, pairOverlaps, creatorPairOverlaps, covered: coverage?.covered.length ?? null, overlap: coverage?.overlap.length ?? null, unassigned: coverage?.uncovered.length ?? null
    };
  }

  function publicationTrend(state, filters, granularity = 'day', optionalBatchId) {
    const data = comparisonData(state, filters, optionalBatchId);
    if (!data.ok) return data;
    const { batch, scope, pool, members } = data;
    const buckets = publicationBuckets(scope.dateStart, scope.dateEnd, granularity);
    if (!buckets.length) return fail('请选择按日或按周查看。', 'granularity');

    const series = [pool, ...members].map(member => {
      const covered = scope.platform === 'all' || member.rule.platforms.includes(scope.platform);
      const points = covered ? countByPublicationDate(member.records, buckets) : buckets.map(() => null);
      return { id: member.id, name: member.name, platforms: [...member.rule.platforms], points };
    });
    return {
      ok: true, batchId: batch.id, cutoff: batch.cutoff, dateStart: scope.dateStart, dateEnd: scope.dateEnd,
      platform: scope.platform, buckets, series
    };
  }

  function readChild(state, id, filters, optionalBatchId) {
    const selected = selectBatch(state, optionalBatchId);
    if (!selected.ok) return selected;
    const view = findView(state, id);
    if (!view) return fail('找不到此子视图。', 'missing');
    if (!view.active) return fail('该子视图已停用。', 'inactive');
    const { batch } = selected;
    const child = !view.activationPending && batch.children[id];
    if (!child) {
      if (view.status === 'failed') return fail('子视图生成失败，尚无可读快照。', 'failed');
      if (batch.id !== state.publication.id) return fail('该批次没有此子视图。', 'missing');
      return fail('子视图尚未发布快照。', 'pending');
    }
    const scope = checkScope(batch, filters);
    if (!scope.ok) return scope;
    const records = filterRecords(child.records, scope, batch.dateEnd);
    return {
      ok: true, id, name: child.name, version: child.version, rule: copy(child.rule), batchId: batch.id,
      poolBatchId: batch.poolBatchId, cutoff: batch.cutoff, dateStart: scope.dateStart, dateEnd: scope.dateEnd, records: copy(records), total: summarize(records)
    };
  }

  function readComparisonContents(state, id, filters = {}, optionalBatchId, optionalBucket) {
    const data = comparisonData(state, filters, optionalBatchId);
    if (!data.ok) return data;
    const { batch, scope, pool, members } = data;
    let source;
    if (['covered', 'uncovered', 'overlap'].includes(id)) {
      if (!members.length) return fail('请先配置对比成员。', 'comparison');
      source = { name: { covered: '已覆盖视频', uncovered: '未覆盖视频', overlap: '重复命中视频' }[id], records: comparisonCoverage(pool, members)[id] };
    } else {
      source = id === 'pool' ? pool : members.find(child => child.id === id);
      if (!source) return fail('此子视图不在当前对比成员中。', 'comparison');
      if (scope.platform !== 'all' && !source.rule.platforms.includes(scope.platform)) {
        return fail('该子视图未覆盖所选平台。', 'platform');
      }
    }

    const bucket = optionalBucket === undefined ? scope : optionalBucket;
    if (!isCalendarDate(bucket?.dateStart) || !isCalendarDate(bucket?.dateEnd) || bucket.dateStart > bucket.dateEnd ||
      bucket.dateStart < scope.dateStart || bucket.dateEnd > scope.dateEnd) {
      return fail('所选时间段超出此快照的查看范围。', 'range');
    }
    return {
      ok: true, id, name: source.name, batchId: batch.id, cutoff: batch.cutoff, platform: scope.platform,
      dateStart: bucket.dateStart, dateEnd: bucket.dateEnd,
      records: copy(source.records.filter(record => record.date >= bucket.dateStart && record.date <= bucket.dateEnd))
    };
  }

  function readCreatorDetails(state, id, filters = {}, batchId) {
    const data = readComparisonContents(state, id, filters, batchId);
    if (!data.ok) return data;
    const creators = groupPublishers(data.records).sort((a, b) => b.videoCount - a.videoCount || a.name.localeCompare(b.name));
    return { ...data, creators };
  }

  function readPromotionContents(state, id, filters = {}, batchId, key) {
    if (!Object.hasOwn(promotionLabels, key)) return fail('未知推广类型。', 'metric');
    const data = readComparisonContents(state, id, filters, batchId);
    if (!data.ok) return data;
    return { ...data, records: data.records.filter(record => promotionKey(record) === key) };
  }

  function readEngagementContents(state, id, filters = {}, batchId, platform) {
    if (!platforms.includes(platform) || (filters.platform && filters.platform !== 'all' && filters.platform !== platform)) {
      return fail('请选择当前范围内的单个平台。', 'platform');
    }
    const data = readComparisonContents(state, id, { ...filters, platform }, batchId);
    if (!data.ok) return data;
    const records = engagementSample(data.records, platform).sort((a, b) => (b.comments ?? -1) - (a.comments ?? -1) || contentKey(a).localeCompare(contentKey(b)));
    const middle = Math.floor(records.length / 2);
    const medianComments = records.length && records.every(r => observedCount(r.comments))
      ? (records[middle].comments + records[Math.floor((records.length - 1) / 2)].comments) / 2 : null;
    return { ...data, records, medianComments, ...platformEngagement(data.records, platform) };
  }

  function readTopViews(state, id, filters = {}, batchId) {
    const data = readComparisonContents(state, id, filters, batchId);
    if (!data.ok) return data;
    const totalViews = summarize(data.records).views;
    if (totalViews === null) return fail('部分视频缺少同批观看量，无法计算前五条贡献。', 'metric');
    const records = data.records.sort((a, b) => b.views - a.views || contentKey(a).localeCompare(contentKey(b))).slice(0, 5);
    const topViews = summarize(records).views;
    return { ...data, records, topViews, totalViews, sampleSize: data.records.length, share: ratio(topViews, totalViews) };
  }

  function readPair(state, firstId, secondId, filters, batchId) {
    const data = comparisonData(state, filters, batchId);
    if (!data.ok) return data;
    const first = data.members.find(member => member.id === firstId);
    const second = data.members.find(member => member.id === secondId);
    if (firstId === secondId || !first || !second) return fail('请选择两个不同的已配置子视图。', 'comparison');
    const { scope, batch } = data;
    if (!coversPlatform(first, scope.platform) || !coversPlatform(second, scope.platform)) {
      return fail('所选子视图未同时收录此平台。', 'platform');
    }
    return { ok: true, first, second, scope: { ok: true, batchId: batch.id, cutoff: batch.cutoff,
      platform: scope.platform, dateStart: scope.dateStart, dateEnd: scope.dateEnd } };
  }

  function readComparisonOverlap(state, firstId, secondId, filters = {}, batchId) {
    const pair = readPair(state, firstId, secondId, filters, batchId);
    if (!pair.ok) return pair;
    const { first, second } = pair;
    const otherKeys = new Set(second.records.map(contentKey));
    return { ...pair.scope, id: 'overlap', name: first.name + '与' + second.name + '共同命中',
      records: copy(first.records.filter(record => otherKeys.has(contentKey(record)))) };
  }

  function readCreatorOverlap(state, firstId, secondId, filters = {}, batchId) {
    const pair = readPair(state, firstId, secondId, filters, batchId);
    if (!pair.ok) return pair;
    const { first, second } = pair;
    const left = matchedCreatorIndex(publisherSummary(first.records));
    const right = matchedCreatorIndex(publisherSummary(second.records));
    if (!left || !right) return fail('账号标识或频道资料缺失，无法核对共同达人。', 'missing');
    const creators = [];
    for (const [key, creator] of left) {
      const other = right.get(key);
      if (other) creators.push({ platform: creator.platform, id: creator.id, name: creator.name,
        firstVideos: creator.videoCount, secondVideos: other.videoCount });
    }
    creators.sort((a, b) => b.firstVideos + b.secondVideos - a.firstVideos - a.secondVideos
      || a.platform.localeCompare(b.platform) || String(a.id).localeCompare(String(b.id)));
    return { ...pair.scope, id: 'creator-overlap', name: first.name + '与' + second.name + '共同达人', creators };
  }

  return {
    maxComparisonViews, maxInclusionGroups, upgradeConditionGroups, groupRequiredConditions, configIssues, seedImpactExample, seedBulkImpactExample, repairAllConfigIssues, createState, preview, save, retry, refresh, settle, setActive, setComparisonViews, comparisonCandidates, compare,
    publisherSummary, promotionLabels, readCreatorDetails, readPromotionContents, readEngagementContents, completeComparisonMonths, readTopViews, readComparisonOverlap, readCreatorOverlap, readChild, summarize, filterRecords, platforms, publicationTrend, readComparisonContents, publicationBuckets, countByPublicationDate
  };
});
