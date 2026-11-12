(function (root, factory) {
  const commonJS = typeof module === 'object' && module.exports;
  const api = factory(commonJS ? require('./engine.js') : root.ReviewEngine, commonJS ? require('./usage-model.js') : root.ReviewUsage);
  if (commonJS) module.exports = api;
  if (root) root.ReviewResources = api;
})(typeof window !== 'undefined' ? window : globalThis, function (E, U) {
  'use strict';

  const categories = {
    34:'analysis',2:'analysis',10:'analysis',47:'analysis',49:'analysis',71:'analysis',78:'analysis',84:'analysis',
    4:'outreach',59:'outreach',21:'outreach',5:'outreach',51:'outreach',82:'outreach',31:'collection',
    45:'monitor',89:'monitor',24:'monitor',56:'monitor',46:'export',7502:'export',7503:'export',17:'account'
  };
  const displayMetadata = {
    2:{kind:'entitlement',kindLabel:'当前资格',windowLabel:'当前资格'},
    10:{kind:'entitlement',kindLabel:'当前资格',windowLabel:'当前资格'},
    31:{kind:'capacity',kindLabel:'当前占用',unitLabel:'个',windowLabel:'当前占用'},
    56:{kind:'capacity',kindLabel:'当前占用',unitLabel:'网红席位',windowLabel:'当前占用'},
    17:{kind:'capacity',kindLabel:'当前占用',unitLabel:'席位',windowLabel:'当前占用'},
    7502:{kind:'limit',kindLabel:'每日限制',windowLabel:'每日'},
    7503:{kind:'limit',kindLabel:'每月限制',windowLabel:'每月'},
    24:{kind:'pending',kindLabel:'时长折算待核',windowLabel:'调整时间口径待核'},
    45:{kind:'pending',kindLabel:'授权存量待核',windowLabel:'当前授权存量'},
    89:{kind:'pending',kindLabel:'计量口径待核',windowLabel:'周期待核'},
    4:{unitLabel:'次'},59:{unitLabel:'次'},21:{unitLabel:'封'}
  };
  const catalog = [
    [34,'基础数据分析'], [2,'网红受众分析'], [10,'品牌推广分析'], [4,'解锁电子邮件'],
    [59,'解锁WhatsApp'], [31,'收藏夹数量'], [21,'批量邮件邀约数量'], [5,'推广任务数量'],
    [47,'品牌概览报告'], [49,'营销策略报告'], [45,'品牌动向和营销资产监控'], [89,'品牌社媒舆情监控'],
    [24,'推广内容监控'], [56,'合作网红监控 (自动追踪)','合作网红监控'], [46,'深度数据导出'],
    [71,'产品评论洞察'], [51,'AI邮件生成'], [78,'店铺和商品详情分析'], [82,'AI谈判助手'],
    [17,'子账户数量'], [84,'AI网红分析报告'], [7502,'基础数据导出每天上限'], [7503,'基础数据导出每月上限']
  ].map(([scopeId,name,columnName]) => Object.freeze({scopeId,name,columnName:columnName || name,organizationOnly:scopeId === 17,kind:'usage',kindLabel:'有效用量',unitLabel:'单位待核',windowLabel:'原配额周期（待核）',category:categories[scopeId],...displayMetadata[scopeId]}));
  Object.freeze(catalog);
  const columns = catalog.filter(scope => !scope.organizationOnly);
  const finite = value => typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : null;
  const currentMembership = (u,gid) => u.memberships.some(m => m.groupId === gid && m.status !== 'REMOVED');
  const unknownNote = '该账号与业务组组合没有已核对的虚构样例；未知不视为零';
  const pendingNote = '仅展示虚构用量；该 Scope 的组及个人分配资格、单位和周期待核实';
  const occupancyNote = '容量占用不是累计消费；累计口径待核实，不跨周期加总';

  // Fixed fictional account-by-group samples, in member-column order. They are not an API contract.
  // Cumulative samples are independent history, never a multiplier of current usage.
  const fixtures = {
    'u-member:g-growth': {
      current:[168,24,9,18,4,3,720,2,3,1,2,1,4,5,6,1,14,8,2,3,8,35],
      cumulative:[1420,311,57,205,38,null,6400,17,29,13,12,8,24,33,58,11,123,49,22,31,125,488]
    },
    'u-editor:g-growth': {
      current:[81,12,3,11,2,2,260,1,1,2,1,1,2,1,3,2,9,3,1,2,4,18],
      cumulative:[744,96,35,143,17,null,2890,9,8,22,7,4,11,8,36,17,82,26,6,18,63,279]
    },
    'u-lead:g-growth': {
      current:[97,15,6,14,3,2,310,3,2,1,2,1,2,2,2,1,6,5,1,2,5,22],
      cumulative:[819,155,62,167,29,null,3450,23,21,10,17,6,18,14,25,9,71,46,13,24,78,313]
    },
    'u-admin:g-growth': {
      current:[28,6,2,3,1,1,110,1,1,1,0,1,1,1,1,0,3,2,1,1,1,9],
      cumulative:[206,44,21,54,8,null,1110,8,7,9,3,4,8,7,15,2,32,17,6,10,21,124]
    },
    'u-admin:g-brand': {
      current:[22,4,3,4,1,1,80,1,1,0,1,1,1,1,1,1,2,2,0,1,2,7],
      cumulative:[318,56,18,47,13,null,940,6,11,4,9,5,7,10,12,7,27,13,3,9,29,91]
    },
    'u-brand:g-brand': {
      current:[64,18,8,9,2,2,200,2,3,2,2,2,3,2,3,1,8,7,2,4,3,16],
      cumulative:[648,222,73,98,21,null,2270,19,25,18,15,11,28,17,31,13,76,62,17,38,55,245]
    },
    'u-owner:g-default': {current:columns.map(() => 0),cumulative:columns.map(() => 0)},
    'u-owner:g-growth': {current:columns.map(() => 0),cumulative:columns.map(() => 0)},
    'u-view:g-growth': {current:columns.map(() => 0),cumulative:columns.map(() => 0)}
  };
  // Handoff-only objects have no events in the independent resource sample ledger.
  for(const gid of ['g-growth','g-brand'])fixtures['u-removing:'+gid]={current:columns.map(()=>0),cumulative:columns.map(scope=>scope.scopeId===31?null:0)};
  const organizationLimits = {
    34:2000, 2:400, 10:200, 4:600, 59:100, 31:30, 5:40, 47:80, 49:80,
    45:20, 89:20, 24:40, 56:40, 46:150, 71:'unsupported', 51:'unlimited',
    78:300, 82:50, 84:80, 7502:100, 7503:1000
  };
  const eventScopes = new Set([34,4,59,21,5,47,49,46,71,51,78,82,84]);
  const rangeNotes = {
    2:'当前资格参数，不是期间消费',10:'当前资格参数，不是期间消费',
    31:'收藏夹为当前未删除占用；未提供历史占用还原',56:'合作网红监控为当前有效席位；未提供历史占用还原',17:'子账户为当前占位，不按创建日期伪造历史席位',
    24:'监控时长折算及调整时间口径待部署核验；不虚构消费次数',45:'监控资源区间用量来源尚未核实',89:'监控资源区间用量来源尚未核实',
    7502:'每天上限是当前独立限制，不与每月上限相加',7503:'每月上限是当前独立限制，不与每天上限相加'
  };
  // Independent fictional occurrence records; never distribute a current counter over dates.
  const occurrences=[];
  Object.entries(fixtures).forEach(([key,sample])=>{
    if(!sample.current.some(value=>value>0))return;
    const [uid,groupId]=key.split(':');
    [...eventScopes].filter(scope=>![4,59].includes(scope)).forEach(scopeId=>{
      [['2026-09-30',1],['2026-10-03',1],['2026-10-15',2],['2026-11-02',1]].forEach(([date,amount])=>occurrences.push({uid,groupId,scopeId,date,amount,key:key+':'+scopeId+':'+date,effective:true}));
    });
    occurrences.push({uid,groupId,scopeId:34,date:'2026-10-15',amount:0,key:key+':free-unlock',effective:true});
    occurrences.push({uid,groupId,scopeId:21,date:'2026-10-15',amount:9,key:key+':refunded-recipients',effective:false});
  });
  for(const scopeId of [4,59])occurrences.push(
    {uid:'u-member',groupId:'g-growth',scopeId,date:'2026-10-03',amount:1,key:'shared-contact:'+scopeId,effective:true},
    {uid:'u-brand',groupId:'g-brand',scopeId,date:'2026-10-15',amount:0,key:'shared-contact:'+scopeId,effective:true}
  );

  function rangeQuery(s,actorId,opts,current) {
    const range=U.dateRange(opts),c=current.context;
    const result={...current,resourcePeriod:'range',periodLabel:range.startDate+' 至 '+range.endDate+'（期间发生量）',dateRange:{startDate:range.startDate,endDate:range.endDate},timeBasis:'发生记录日期；沿原有效扣量规则，非当前额度重置'};
    if(!range.ok||range.startDate<'2026-09-01'||range.endDate>'2026-11-11') {
      const reason=range.ok?'所选日期超出虚构资源流水覆盖（2026-09-01 至 2026-11-11）；不视为零':'请选择有效日期，开始日期不能晚于结束日期';
      return {...result,ok:range.ok,coverage:range.ok?'uncovered':'error',reason,matrixRows:[],groupRows:[],summary:current.summary.map(cell=>({...cell,used:null,limit:null,limitState:'pending',remaining:null,coverageNote:reason}))};
    }
    const pairs=current.matrixRows.map(row=>row.uid+':'+row.groupId);
    const selected=opts.health==='empty'?[]:occurrences.filter(row=>pairs.includes(row.uid+':'+row.groupId)&&row.effective&&row.date>=range.startDate&&row.date<=range.endDate);
    const value=(cell,rows,known)=>{
      const list=rows.filter(row=>row.scopeId===cell.scopeId);
      const used=!eventScopes.has(cell.scopeId)||!known?null:list.reduce((sum,row)=>sum+row.amount,0);
      const note=rangeNotes[cell.scopeId]||(!known?unknownNote:cell.scopeId===21?'按原发送记录日期计有效收件消耗；已返还样例不计入':cell.scopeId===5?'按创建发生计数，删除不返还':cell.scopeId===71?'首次分析发生计量，删除不返还':[4,59].includes(cell.scopeId)?'组织内首次解锁计量，后续复用不重复扣量':'按发生记录日期计有效用量；免费条件样例不计消费');
      return {...cell,currentUsed:cell.used,currentLimit:cell.limit,currentLimitState:cell.limitState,currentRemaining:cell.remaining,used,limit:null,limitState:'pending',remaining:null,timeBasis:eventScopes.has(cell.scopeId)?'有效发生记录日期':'当前值 / 区间不适用或待核',coverageNote:note};
    };
    result.matrixRows=current.matrixRows.map(row=>({...row,cells:row.cells.map(cell=>value(cell,selected.filter(event=>event.uid===row.uid&&event.groupId===row.groupId),!!fixtures[row.uid+':'+row.groupId]))}));
    result.groupRows=current.groupRows.map(row=>({...row,cells:row.cells.map(cell=>value(cell,selected.filter(event=>event.groupId===row.groupId),current.matrixRows.filter(member=>member.groupId===row.groupId).every(member=>!!fixtures[member.uid+':'+member.groupId])))}));
    result.summary=current.summary.map(cell=>value(cell,selected,current.matrixRows.every(row=>!!fixtures[row.uid+':'+row.groupId])));
    return result;
  }

  function context(s,actorId,opts) {
    const c = U.context(s,actorId,{...opts,userId:undefined});
    if (!c.ok) return c;
    const gids = new Set(c.groups.filter(g => c.groupId === 'all' || g.id === c.groupId).map(g => g.id));
    const users = s.users.filter(u => c.view === 'personal' ? u.id === actorId : c.groupId === 'all' || [...gids].some(gid => currentMembership(u,gid) || fixtures[u.id + ':' + gid]));
    const userId = c.view === 'personal' ? actorId : opts.userId ?? 'all';
    const deny = reason => ({...c,ok:false,reason,userId,groups:[],users:[]});
    if (c.view === 'personal' && opts.userId != null && !['all',actorId].includes(opts.userId)) return deny('个人视图只能查看本人资源和获准项目');
    if (userId !== 'all' && !users.some(u => u.id === userId)) return deny('所选账号不在当前获准统计范围');
    return {...c,userId,users};
  }
  function blank(scope,coverageNote) {
    return {...scope,used:null,limit:null,limitState:'pending',remaining:null,...(coverageNote ? {coverageNote} : {})};
  }
  function fixtureCell(uid,gid,scope,resourcePeriod) {
    const sample = fixtures[uid + ':' + gid];
    if (resourcePeriod === 'cumulative' && scope.scopeId === 31) return blank(scope,occupancyNote);
    return {...blank(scope,sample ? pendingNote : unknownNote),used:sample ? sample[resourcePeriod][columns.indexOf(scope)] : null};
  }
  function organizationCell(scope,used,resourcePeriod) {
    const limit = organizationLimits[scope.scopeId];
    if (resourcePeriod === 'cumulative') return {...blank(scope,scope.scopeId === 31 ? occupancyNote : undefined),used};
    if (limit === 'unsupported') return {...blank(scope,'组织套餐不支持此项；不代表实际消耗为零'),limitState:'unsupported'};
    if (limit === 'unlimited') return {...blank(scope),used,limitState:'unlimited'};
    return {scopeId:scope.scopeId,used,limit,limitState:'finite',remaining:used === null ? null : Math.max(0,limit-used)};
  }
  function aggregate(rows,scope,resourcePeriod) {
    if (resourcePeriod === 'cumulative' && scope.scopeId === 31) return blank(scope,occupancyNote);
    const cells = rows.map(row => row.cells.find(c => c.scopeId === scope.scopeId));
    const unknown = cells.some(cell => cell.used === null);
    return {...blank(scope,unknown ? unknownNote : pendingNote),used:unknown ? null : cells.reduce((sum,cell) => sum + cell.used,0)};
  }
  function quotaCell(s,gid,uid) {
    const q = E.quota(s,gid,'email',uid), scope = catalog.find(scope => scope.scopeId === 21);
    if (!q) {
      const sample = uid && fixtures[uid + ':' + gid], historical = uid && E.user(s,uid)?.memberships.find(m => m.groupId === gid);
      const used = sample ? historical ? finite(historical.used) : sample.current[columns.indexOf(scope)] : null;
      return {...blank(scope,sample ? '保留原账号与组的历史消耗；已结束的组关系不提供当前可用额度' : '当前组关系缺少配额样例，不视为零'),used};
    }
    const node = uid ? q.member : q.group, inherited = node.quotaMode === 'inherit' || node.quotaLimit === null;
    const orgLimit = finite(q.organization.quotaLimit), orgUsed = finite(q.organization.used);
    const groupInherited = q.group.quotaMode === 'inherit' || q.group.quotaLimit === null;
    const groupLimit = groupInherited ? null : finite(q.group.quotaLimit), groupUsed = finite(q.group.used);
    const used = finite(node.used), limit = inherited ? null : finite(node.quotaLimit);
    const known = used !== null && orgLimit !== null && orgUsed !== null && groupUsed !== null && (groupInherited || groupLimit !== null) && (inherited || limit !== null);
    const orgRemaining = orgLimit === null || orgUsed === null ? null : Math.max(0,orgLimit-orgUsed);
    const groupRemaining = known ? Math.min(orgRemaining,groupInherited ? orgRemaining : Math.max(0,groupLimit-groupUsed)) : null;
    const usable = uid ? E.active(s,uid,gid) : E.group(s,gid)?.status === 'ACTIVE';
    const remaining = !known ? null : !usable ? 0 : uid ? Math.min(groupRemaining,limit === null ? groupRemaining : Math.max(0,limit-used)) : groupRemaining;
    return {scopeId:21,used,limit,limitState:!known ? 'pending' : inherited ? 'inherit' : 'finite',remaining,allocationMode:inherited ? 'inherit' : 'capped',configuredRemaining:limit === null || used === null ? null : Math.max(0,limit-used),coverageNote:known ? '沿用现有邮件额度示意；实际可用受组织、组及个人逐层约束，不确认其他 Scope 映射' : '组织、组或个人配额上限/用量未知；实际可用待核实，不视为零或无限制'};
  }
  function organizationQuota(s) {
    const limit = finite(s.organization.quotaLimit), used = finite(s.organization.used);
    const known = limit !== null && used !== null;
    return {scopeId:21,used,limit,limitState:known ? 'finite' : 'pending',remaining:known ? Math.max(0,limit-used) : null,allocationMode:'entitlement',coverageNote:known ? '沿用现有邮件额度示意；组织已用为共享父级用量' : '组织配额上限或用量未知；实际可用待核实，不视为零或无限制'};
  }
  function seatCell(s,resourcePeriod) {
    const scope = catalog.find(scope => scope.scopeId === 17);
    const coverageNote = 'Owner 不占子账户名额，待接受邀请占位；仅将原 Demo 含 Owner 的总席位换算为子账户展示，不改原席位规则';
    if (resourcePeriod === 'cumulative') return blank(scope,occupancyNote + '；' + coverageNote);
    const total = finite(s.organization.seatLimit), limit = total === null ? null : Math.max(0,total-1);
    const used = s.users.filter(u => u.status === 'ACTIVE' && u.orgRole !== 'owner').length + s.invites.filter(i => i.status === 'PENDING').length;
    return {scopeId:17,used,limit,limitState:limit === null ? 'pending' : 'finite',remaining:limit === null ? null : Math.max(0,limit-used),coverageNote};
  }
  function query(s,actorId,opts = {}) {
    const c = context(s,actorId,opts), resourcePeriod = opts.resourcePeriod ?? 'current', health = opts.health ?? 'normal';
    const allOrganization = c.view === 'organization' && c.groupId === 'all' && c.userId === 'all';
    const visible = allOrganization ? catalog : columns;
    const result = {ok:c.ok,reason:c.reason,context:c,coverage:'covered',resourcePeriod,periodLabel:resourcePeriod === 'cumulative' ? '会员开通时间-现在（虚构样例）' : '当前配额周期（虚构样例；导出保留每天/每月口径）',summary:[],columns:[...columns],matrixRows:[],groupRows:[],asOf:health === 'delayed' ? '2026-11-09T09:00:00+08:00' : '2026-11-11T09:00:00+08:00'};
    const summarize = cells => cells.map((cell,i) => ({...visible[i],...cell}));
    function unavailable(coverage,reason,ok = false) {
      result.ok=ok;result.reason=reason;result.coverage=coverage;
      result.summary=summarize(visible.map(scope => blank(scope,reason)));
      if (coverage === 'forbidden') result.context={...c,groups:[],users:[]};
      return result;
    }
    if (!c.ok) return Object.assign(unavailable('forbidden',c.reason),{summary:[]});
    if (!['current','cumulative','range'].includes(resourcePeriod)) return unavailable('error','未知资源统计周期');
    if (!['normal','empty','uncovered','delayed','error','forbidden'].includes(health)) return unavailable('error','未知审阅数据状态');
    if (['uncovered','error','forbidden'].includes(health)) return unavailable(health,{uncovered:'该范围缺少可靠的资源归属或周期证据，不视为零',error:'示例数据来源异常，不返回资源用量',forbidden:'当前示例无资源统计权限'}[health],health === 'uncovered');
    if(resourcePeriod==='range')return rangeQuery(s,actorId,opts,query(s,actorId,{...opts,resourcePeriod:'current'}));
    const groups = c.groups.filter(g => c.groupId === 'all' || g.id === c.groupId);
    if (health !== 'empty') {
      c.users.filter(u => c.userId === 'all' || u.id === c.userId).forEach(u => {
        groups.filter(g => currentMembership(u,g.id) || c.view !== 'personal' && fixtures[u.id + ':' + g.id]).forEach(g => {
          const cells = columns.map(scope => ({...scope,...(scope.scopeId === 21 && resourcePeriod === 'current' ? quotaCell(s,g.id,u.id) : fixtureCell(u.id,g.id,scope,resourcePeriod))}));
          result.matrixRows.push({uid:u.id,groupId:g.id,label:u.name,historical:!currentMembership(u,g.id),cells});
        });
      });
      if (allOrganization) result.groupRows = groups.map(g => ({uid:null,groupId:g.id,label:g.name,cells:columns.map(scope => ({...scope,...(scope.scopeId === 21 && resourcePeriod === 'current' ? quotaCell(s,g.id) : aggregate(result.matrixRows.filter(row => row.groupId === g.id),scope,resourcePeriod))}))}));
    }
    const cells = visible.map(scope => {
      if (scope.scopeId === 17) return seatCell(s,resourcePeriod);
      if (resourcePeriod === 'current' && scope.scopeId === 21) {
        if (allOrganization) return organizationQuota(s);
        if (c.userId === 'all' && groups.length === 1) return quotaCell(s,groups[0].id);
        if (result.matrixRows.length === 1) return {...result.matrixRows[0].cells.find(cell => cell.scopeId === 21)};
        return {...aggregate(result.matrixRows,scope,resourcePeriod),coverageNote:'各组分别核算，不相加组上限或建立全局个人上限；按账号与组查看实际可用'};
      }
      const cell = aggregate(result.matrixRows,scope,resourcePeriod);
      return allOrganization ? {...organizationCell(scope,cell.used,resourcePeriod),...(cell.used === null ? {coverageNote:cell.coverageNote} : {})} : cell;
    });
    if (health === 'empty') {
      cells.forEach(cell => {cell.used=resourcePeriod === 'cumulative' && [31,17].includes(cell.scopeId) || cell.limitState === 'unsupported' ? null : 0;cell.remaining=null;});
      result.coverage='empty';result.reason='当前授权范围内暂无虚构资源记录';
    } else if (!result.matrixRows.length) {
      result.coverage='empty';result.reason='当前授权范围内没有账号与组的资源样例';
    } else if (health === 'delayed') {
      result.coverage='delayed';result.reason='资源示例更新延迟，保留最近一次有效结果';
    }
    result.summary=summarize(cells);
    return result;
  }
  return {catalog,query};
});
