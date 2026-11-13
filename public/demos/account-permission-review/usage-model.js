(function (root, factory) {
  const api = factory(typeof module === 'object' && module.exports ? require('./engine.js') : root.ReviewEngine);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.ReviewUsage = api;
})(typeof window !== 'undefined' ? window : globalThis, function (E) {
  'use strict';

  const fields = ['invited','sent','delivered','opened','replied','deliveryRate','openRate','replyRate','connected','influencerMessages','followupMessages','contacted','crmTotal','crmOngoing','crmCompleted','monitorAdded','monitorItemsAdded','viewGrowth','interactionGrowth','monitoredContent','views','interactions'];
  const zero = value => Object.fromEntries(fields.map(key => [key, value ?? 0]));
  const asOf = health => health === 'delayed' ? '2026-11-09T09:00:00+08:00' : '2026-11-11T09:00:00+08:00';
  const currentMembership = (u, gid) => u.memberships.some(m => m.groupId === gid && m.status !== 'REMOVED');
  const selectedGroups = c => c.groups.filter(g => c.groupId === 'all' || g.id === c.groupId);

  function context(s, actorId, opts = {}) {
    const actor=E.user(s,actorId),manager=E.canManageOrganization(s,actorId),views=[];
    if(manager)views.push('organization');
    if(manager||s.groups.some(g=>E.isLead(s,actorId,g.id)))views.push('group');
    const view=opts.view??views[0],groups=manager&&views.includes(view)?s.groups:view==='group'?s.groups.filter(g=>E.isLead(s,actorId,g.id)):[];
    const groupId=opts.groupId??(view==='group'?groups[0]?.id:'all'),userId=opts.userId===undefined?'all':opts.userId;
    const result={ok:true,reason:'',view,groupId,userId,views,groups,users:[]};
    const deny=reason=>Object.assign(result,{ok:false,reason,groups:[]});
    if(!actor||actor.status!=='ACTIVE')return deny('需要有效组织成员身份');
    if(view==='personal'||userId!=='all'||opts.reportMode==='workload')return deny('本期仅提供组织和组整合统计，不提供个人、单人或实际操作量报表');
    if(!views.includes(view))return deny('当前身份无统计资格；仅组织管理者或有效组长可查看组织/组汇总');
    if(groupId==='all'?view==='group':!groups.some(g=>g.id===groupId))return deny('无权查看所选业务组，不能自动扩大统计范围');
    return result;
  }

  // 每条虚构来源保留日期、收件键和 task.uid；两个观察窗口独立，不按月份比例外推。
  const mailSources = {receivers:[],messages:[]};
  const mailSeeds = [
    ['u-member','g-growth','email1',[720,690,318,42],[620,590,240,35]],
    ['u-editor','g-growth','email1',[260,240,112,15],[310,300,140,20]],
    ['u-lead','g-growth','email1',[310,300,144,23],[260,250,118,18]],
    ['u-admin','g-growth','email1',[110,105,48,8],[90,85,39,7]],
    ['u-admin','g-brand','brand-email',[80,75,41,5],[100,95,32,6]],
    ['u-brand','g-brand','brand-email',[200,190,88,13],[250,240,106,15]]
  ];
  mailSeeds.forEach(([uid,groupId,projectId,october,september]) => {
    [[october,['2026-10-03','2026-10-15','2026-10-26']],[september,['2026-09-04','2026-09-18','2026-09-30']]].forEach(([counts,dates]) => {
      const [sent,delivered,opened,replied] = counts;
      for(let i=0;i<sent+4;i++) {
        const taskId=projectId+':'+uid+':'+(i%2+1);
        mailSources.receivers.push({id:taskId+':'+dates[0]+':'+i,uid,groupId,projectId,taskId,sendDate:dates[i%dates.length],channelId:i%17===0?null:'creator-'+i%80,email:'creator-'+i%80+'@example.test',status:i>=sent?0:i<opened?2:i<delivered?1:4,replied:i<replied});
      }
      for(let i=0;i<12;i++) {
        const taskId=projectId+':'+uid+':'+(i%2+1);
        mailSources.messages.push({id:taskId+':message:'+dates[0]+':'+i,uid,groupId,projectId,taskId,sendDate:dates[i%dates.length],channelId:'creator-'+i%3,direction:i<5?'received':'sent'});
      }
    });
    for(let i=0;i<7;i++)mailSources.messages.push({id:uid+':'+groupId+':late:'+i,uid,groupId,projectId,taskId:projectId+':'+uid+':1',sendDate:'2026-11-02',channelId:'creator-'+i%2,direction:i<2?'received':'sent'});
  });
  mailSources.receivers.push({id:'pending-only',uid:'u-member',groupId:'g-growth',projectId:'email1',taskId:'pending-task',sendDate:'2026-10-02',channelId:'pending-unique',email:'pending@example.test',status:0,replied:true});
  const conversationDefinitions=new Map();
  mailSources.messages.forEach((message,index)=>{
    Object.assign(message,{platform:'YouTube',valid:true,sentAt:message.sendDate+'T10:'+String(index%60).padStart(2,'0')+':00+08:00',conversationId:message.taskId+'|YouTube|'+message.channelId});
    conversationDefinitions.set(message.conversationId,{conversationId:message.conversationId,uid:message.uid,groupId:message.groupId,projectId:message.projectId,taskId:message.taskId,platform:message.platform,channelId:message.channelId,createdAt:'2026-09-01',historyComplete:true,historyFrom:'2026-09-01'});
  });
  function conversationSample(conversationId,groupId,projectId,uid,task,channelId,events,historyComplete=true) {
    const taskId=projectId+':'+uid+':'+task;
    conversationDefinitions.set(conversationId,{conversationId,groupId,projectId,uid,taskId,channelId,platform:'YouTube',createdAt:historyComplete?'2026-09-01':'2026-11-04',historyComplete,historyFrom:historyComplete?'2026-09-01':'2026-11-05'});
    events.forEach(([sentAt,direction,valid=true],index)=>mailSources.messages.push({id:conversationId+':'+index,conversationId,uid,groupId,projectId,taskId,channelId,platform:'YouTube',sendDate:sentAt.slice(0,10),sentAt:sentAt+'+08:00',direction,valid}));
  }
  conversationSample('demo-old','g-growth','email1','u-member','1','old-creator',[['2026-09-28T10:00:00','received'],['2026-10-07T09:00:00','sent'],['2026-10-07T11:00:00','received']]);
  conversationSample('demo-new-a','g-growth','email1','u-member','1','shared-creator',[['2026-10-06T09:00:00','sent'],['2026-10-07T12:00:00','received'],['2026-10-07T13:00:00','sent']]);
  conversationSample('demo-new-b','g-growth','email1','u-member','2','shared-creator',[['2026-10-07T14:00:00','received']]);
  conversationSample('demo-brand','g-brand','brand-email','u-brand','1','shared-creator',[['2026-10-07T14:00:00','received']]);
  conversationSample('demo-oneway','g-growth','email1','u-member','1','oneway-creator',[['2026-10-07T09:00:00','sent']]);
  conversationSample('demo-invalid','g-growth','email1','u-member','1','invalid-creator',[['2026-10-07T10:00:00','received',false]]);
  conversationSample('demo-unknown-history','g-growth','email1','u-member','1','unknown-creator',[['2026-11-05T10:00:00','received']],false);
  mailSources.receivers.push({id:'reply-without-tracked-open',uid:'u-member',groupId:'g-growth',projectId:'email1',taskId:'email1:u-member:1',sendDate:'2026-11-03',channelId:'untracked-open',email:'untracked@example.test',status:1,replied:true});
  const monitorProjects = {monitor1:{views:84200,interactions:3820}};
  const createdDates = {crm1:'2026-10-03',crm2:'2026-10-15','crm-brand1':'2026-10-26',monitor1:'2026-09-20'};
  const itemAddedDates = {'monitor-item-1':'2026-09-25'};
  // Fictional daily observations cover every day in this window; unlisted days have observed zero growth.
  const monitorDaily = [{projectId:'monitor1',itemId:'monitor-item-1',date:'2026-09-25',views:300,interactions:20},{projectId:'monitor1',itemId:'monitor-item-1',date:'2026-10-03',views:1200,interactions:80},{projectId:'monitor1',itemId:'monitor-item-1',date:'2026-10-15',views:2400,interactions:130},{projectId:'monitor1',itemId:'monitor-item-1',date:'2026-10-26',views:700,interactions:40},{projectId:'monitor1',itemId:'monitor-item-1',date:'2026-11-10',views:900,interactions:75}];
  const createdDate = p => (p.createdAt || createdDates[p.id] || '').slice(0,10);
  function aggregate(rows) {
    const grouped = new Map();
    rows.forEach(row => {
      const key = row.groupId;
      if (!grouped.has(key)) grouped.set(key, {...zero(),groupId:row.groupId});
      const target = grouped.get(key);
      fields.forEach(field => { target[field] = target[field] === null || row[field] === null ? null : target[field] + (Number(row[field]) || 0); });
    });
    return [...grouped.values()];
  }
  function totals(rows) {
    const result = zero();
    rows.forEach(row => fields.forEach(key => { result[key] = result[key] === null || row[key] === null ? null : result[key] + row[key]; }));
    return result;
  }
  function projectMetrics(p, domain, range, cutoff) {
    if (domain === 'crm') return {crmTotal:1,crmOngoing:p.cooperationStatus === '合作中' ? 1 : 0,crmCompleted:p.cooperationStatus === '已完成' ? 1 : 0};
    const items = (p.items || []).filter(item => item.status !== 'DELETED');
    const inRange = date => date >= range.startDate && date <= range.endDate;
    const daily = monitorDaily.filter(row => row.projectId === p.id && items.some(item => item.id === row.itemId) && inRange(row.date) && row.date <= cutoff);
    const observed = range.startDate <= cutoff && !!monitorProjects[p.id];
    return {monitorAdded:inRange(createdDate(p))?1:0,monitorItemsAdded:items.filter(item=>inRange((item.addedAt||itemAddedDates[item.id]||'').slice(0,10))).length,viewGrowth:observed?daily.reduce((v,r)=>v+r.views,0):null,interactionGrowth:observed?daily.reduce((v,r)=>v+r.interactions,0):null,monitoredContent:items.length,...(monitorProjects[p.id] || {views:null,interactions:null})};
  }
  function dateRange(opts = {}) {
    const month=opts.period&&/^2026-(09|10)$/.test(opts.period)?opts.period:'2026-10';
    const startDate=opts.startDate??(opts.period==='uncovered'?'2026-08-01':month+'-01');
    const endDate=opts.endDate??(month==='2026-09'?'2026-09-30':'2026-10-31');
    const valid=value=>/^\d{4}-\d{2}-\d{2}$/.test(value)&&!Number.isNaN(Date.parse(value+'T00:00:00Z'))&&new Date(value+'T00:00:00Z').toISOString().slice(0,10)===value;
    return {startDate,endDate,ok:valid(startDate)&&valid(endDate)&&startDate<=endDate};
  }
  function emailMetrics(receivers,messages) {
    receivers=receivers.filter(r=>[1,2,4,5].includes(r.status));
    const unique=values=>new Set(values.filter(value=>value!==null&&value!==undefined)).size;
    const result={...zero(),invited:unique(receivers.map(r=>r.channelId===null?r.email:r.channelId)),sent:receivers.filter(r=>[1,2,4,5].includes(r.status)).length,delivered:receivers.filter(r=>[1,2,5].includes(r.status)).length,opened:receivers.filter(r=>r.status===2).length,replied:receivers.filter(r=>r.replied).length};
    const received=messages.filter(r=>r.direction==='received'),outgoing=messages.filter(r=>r.direction==='sent');
    Object.assign(result,{connected:unique(received.map(r=>r.channelId)),influencerMessages:received.length,followupMessages:outgoing.length-unique(outgoing.map(r=>r.channelId)),contacted:receivers.length});
    for(const [rate,key] of [['deliveryRate','delivered'],['openRate','opened'],['replyRate','replied']])result[rate]=result.sent?result[key]/result.sent:0;
    return result;
  }
  function conversationMetrics(definitions,messages,range) {
    const result={newConversations:0,activeConversations:0,newCoverage:'covered',activeCoverage:'covered',coverage:'covered',reason:'',rows:[]};
    const inRange=date=>date>=range.startDate&&date<=range.endDate;
    definitions.forEach(definition=>{
      const history=messages.filter(message=>message.conversationId===definition.conversationId&&message.valid),period=history.filter(message=>inRange(message.sendDate));
      const knownReply=history.filter(message=>message.direction==='received').map(message=>message.sentAt).sort()[0]||null;
      const firstReply=definition.historyComplete?knownReply:null;
      const missingOverlap=!definition.historyComplete&&range.endDate>=definition.createdAt&&range.startDate<definition.historyFrom;
      const newUnknown=!definition.historyComplete&&(!knownReply||knownReply.slice(0,10)>=range.startDate)&&(missingOverlap||knownReply&&inRange(knownReply.slice(0,10)));
      const isNew=newUnknown?null:!!(firstReply&&inRange(firstReply.slice(0,10)));
      const activeKnown=!!knownReply&&period.some(message=>message.sentAt>=knownReply);
      const activeUnknown=!activeKnown&&!definition.historyComplete&&(missingOverlap||period.length>0&&(!knownReply||period.some(message=>message.sentAt<knownReply)));
      const isActive=activeUnknown?null:activeKnown;
      if(isNew===null)result.newCoverage='uncovered';else if(isNew)result.newConversations++;
      if(isActive===null)result.activeCoverage='uncovered';else if(isActive)result.activeConversations++;
      if(isNew!==false||isActive!==false)result.rows.push({...definition,firstReply,knownReplyAt:knownReply,isNew,isActive});
    });
    if(result.newCoverage==='uncovered')result.newConversations=null;
    if(result.activeCoverage==='uncovered')result.activeConversations=null;
    if(result.newConversations===null||result.activeConversations===null){result.coverage='partial';result.reason='部分对话首次有效回复的完整历史未覆盖；新增与活跃分别判断，未知不当零。';}
    return result;
  }
  function bucketSeries(series,grain='day') {
    if(!['day','week','month'].includes(grain))throw new RangeError('未知邮件趋势粒度');
    const buckets=new Map();
    [...series].sort((a,b)=>a.date.localeCompare(b.date)).forEach(row=>{
      const date=new Date(row.date+'T00:00:00Z');
      if(grain==='week')date.setUTCDate(date.getUTCDate()-(date.getUTCDay()+6)%7);
      if(grain==='month')date.setUTCDate(1);
      const key=grain==='day'?row.date:date.toISOString().slice(0,10);
      if(!buckets.has(key))buckets.set(key,{date:row.date,startDate:row.date,endDate:row.date,sent:0,delivered:0,opened:0,replied:0});
      const bucket=buckets.get(key);bucket.endDate=row.date;
      for(const field of ['sent','delivered','opened','replied'])bucket[field]+=row[field];
    });
    return [...buckets.values()].map(row=>({...row,value:row.sent,label:row.startDate===row.endDate?row.startDate.slice(5).replace('-','/'):row.startDate.slice(5).replace('-','/')+' 至 '+row.endDate.slice(5).replace('-','/')}));
  }
  function businessQuery(s, actorId, opts = {}) {
    const c = context(s, actorId, opts), domain = opts.domain ?? 'email', health = opts.health ?? 'normal', range=dateRange(opts);
    const result = {ok:c.ok,reason:c.reason,context:c,coverage:'covered',rows:[],groupRows:[],taskRows:[],totals:zero(),series:[],trendSeries:[],trendGrain:opts.trendGrain||'day',conversations:{newConversations:null,activeConversations:null,newCoverage:'uncovered',activeCoverage:'uncovered',coverage:'uncovered',reason:'尚无可靠来源',rows:[]},projects:[],projectOptions:[],dateRange:{startDate:range.startDate,endDate:range.endDate},asOf:asOf(health)};
    const unavailable = (coverage, reason, ok = false) => Object.assign(result, {ok,reason,coverage,totals:Object.fromEntries(fields.map(key => [key,null])),conversations:{...result.conversations,reason}});
    if (!c.ok) return unavailable('forbidden',c.reason);
    if (!['email','crm','monitor'].includes(domain)) return unavailable('error','未知业务统计领域');
    if (!['normal','empty','delayed','error','forbidden'].includes(health)) return unavailable('error','未知审阅数据状态');
    if (['error','forbidden'].includes(health)) return unavailable(health,health === 'error' ? '示例数据来源异常，不返回业务统计' : '当前示例无统计权限');
    if (!range.ok) return unavailable('error','请选择有效日期，开始日期不能晚于结束日期');
    const gids = new Set(selectedGroups(c).map(g => g.id));
    const candidateProjects = s.projects.filter(p => p.module === domain && p.status !== 'DELETED' && gids.has(p.groupId));
    if(domain==='email') {
      if(!['day','week','month'].includes(result.trendGrain))return unavailable('error','未知邮件趋势粒度');
      const allowed=s.projects.filter(p=>p.module==='email'&&p.status!=='DELETED'&&(gids.has(p.groupId)||[...mailSources.receivers,...mailSources.messages].some(r=>r.projectId===p.id&&gids.has(r.groupId))));
      result.projectOptions=allowed;
      if(opts.projectId&&opts.projectId!=='all'&&!allowed.some(p=>p.id===opts.projectId))return unavailable('forbidden','所选邮件项目不在当前获准统计范围');
      if(range.startDate<'2026-09-01'||range.endDate>'2026-11-11')return unavailable('uncovered','该日期范围缺少可靠历史样例，不视为业务为零',true);
      const pids=new Set(allowed.filter(p=>!opts.projectId||opts.projectId==='all'||p.id===opts.projectId).map(p=>p.id));
      const inScope=r=>pids.has(r.projectId)&&gids.has(r.groupId);
      const visible=r=>inScope(r)&&r.sendDate>=range.startDate&&r.sendDate<=range.endDate;
      const receivers=health==='empty'?[]:mailSources.receivers.filter(r=>visible(r)&&[1,2,4,5].includes(r.status)),messages=health==='empty'?[]:mailSources.messages.filter(r=>visible(r)&&r.valid);
      result.rows=selectedGroups(c).map(g=>({...emailMetrics(receivers.filter(r=>r.groupId===g.id),messages.filter(r=>r.groupId===g.id)),groupId:g.id}));
      result.groupRows=result.rows;
      result.totals=emailMetrics(receivers,messages);
      const days=[];
      for(let date=range.startDate;date<=range.endDate;date=new Date(Date.parse(date+'T00:00:00Z')+86400000).toISOString().slice(0,10))days.push(date);
      result.series=days.map(date=>{const daily=emailMetrics(receivers.filter(r=>r.sendDate===date),[]);return {date,label:date.slice(5).replace('-','/'),value:daily.sent,...Object.fromEntries(['sent','delivered','opened','replied'].map(key=>[key,daily[key]]))};});
      result.trendSeries=bucketSeries(result.series,result.trendGrain);
      result.conversations=conversationMetrics(health==='empty'?[]:[...conversationDefinitions.values()].filter(inScope),health==='empty'?[]:mailSources.messages.filter(inScope),range);
      if(!receivers.length&&!messages.length)Object.assign(result,{coverage:'empty',reason:'当前授权范围及日期内暂无虚构邮件记录'});
      return result;
    }
    if(range.startDate<'2026-09-01'||range.endDate>'2026-11-11')return unavailable('uncovered','所选日期超出虚构来源覆盖（2026-09-01 至 2026-11-11）；不视为业务为零',true);
    const availableUntil=health==='delayed'?'2026-11-08':'2026-11-10',cutoff=range.endDate<availableUntil?range.endDate:availableUntil;
    result.availableUntil=availableUntil;
    result.growthCutoff=range.startDate<=cutoff?cutoff:null;
    result.growthPartial=range.endDate>availableUntil;
    result.timeBasis=domain==='crm'?'业务记录创建时间；当前合作状态及当前对接归属':'项目创建时间 / 条目加入时间；观看与互动按日观察增长，截至 '+cutoff;
    if (health === 'empty') return Object.assign(result, {coverage:'empty',reason:'当前授权范围内暂无示例记录'});
    let projects=candidateProjects;
    if(projects.some(p=>!createdDate(p)||domain==='monitor'&&(p.items||[]).filter(item=>item.status!=='DELETED').some(item=>!(item.addedAt||itemAddedDates[item.id]))))return unavailable('uncovered','该业务对象缺少已核对的创建或加入日期来源，不能按零展示',true);
    if(domain==='crm')projects=projects.filter(p=>createdDate(p)>=range.startDate&&createdDate(p)<=range.endDate);
    const rows=projects.map(p=>({...projectMetrics(p,domain,range,cutoff),groupId:p.groupId}));
    result.rows = aggregate(rows);
    result.groupRows=selectedGroups(c).map(g=>result.rows.find(row=>row.groupId===g.id)||{...zero(),groupId:g.id});
    result.totals = totals(result.rows);
    if (!result.rows.length) return Object.assign(result, {coverage:'empty',reason:'当前授权范围内暂无示例记录'});
    const metric = fields.includes(opts.metric) ? opts.metric : {crm:'crmTotal',monitor:'viewGrowth'}[domain];
    result.series = domain==='monitor'?monitorDaily.filter(row=>projects.some(p=>p.id===row.projectId&&(p.items||[]).some(item=>item.id===row.itemId&&item.status!=='DELETED'))&&row.date>=range.startDate&&row.date<=range.endDate&&row.date<=cutoff).map(row=>({label:row.date,date:row.date,value:row.views})):result.rows.map(row => ({label:E.group(s,row.groupId).name,value:row[metric]}));
    return result;
  }

  function reportCapabilities(s,actorId,opts={}) {
    const c=context(s,actorId,opts),groups=c.ok?c.groups.filter(g=>(c.groupId==='all'||g.id===c.groupId)&&E.isLead(s,actorId,g.id)):[];
    return {ok:c.ok,context:c,projectGroups:groups,projects:s.projects.filter(p=>['email','monitor'].includes(p.module)&&p.status!=='DELETED'&&groups.some(g=>g.id===p.groupId)),canProject:groups.length>0};
  }
  function workload(s,actorId,opts={}) {
    return {...businessQuery(s,actorId,{...opts,reportMode:'workload'}),reportKind:'excluded'};
  }
  function projectReport(s,actorId,opts={}) {
    const c=context(s,actorId,opts),p=E.project(s,opts.projectId);
    if(!c.ok||!p||p.status==='DELETED'||!['email','monitor'].includes(p.module)||opts.domain&&opts.domain!==p.module||p.groupId!==c.groupId||!E.isLead(s,actorId,p.groupId))return {...businessQuery(s,actorId,{...opts,projectId:'all',health:'forbidden'}),ok:false,coverage:'forbidden',reason:'项目整体统计仅目标组有效组长可读；组织管理身份不授予项目整体统计权'};
    const range=dateRange(opts);
    if(p.module==='email'&&[...mailSources.receivers,...mailSources.messages].some(row=>row.projectId===p.id&&row.groupId!==p.groupId&&row.sendDate>=range.startDate&&row.sendDate<=range.endDate))return {...businessQuery(s,actorId,{...opts,projectId:'all',health:'error'}),ok:true,reportKind:'project',coverage:'uncovered',reason:'项目迁组后的整体历史范围待核；保留原组来源，不以零或当前组回填'};
    const result=businessQuery(s,actorId,{...opts,userId:'all',domain:p.module});
    if(p.module==='monitor') {
      const scoped={...s,projects:s.projects.filter(item=>item.id===p.id)};
      return {...businessQuery(scoped,actorId,{...opts,userId:'all',domain:p.module}),reportKind:'project'};
    }
    return {...result,reportKind:'project'};
  }
  function query(s,actorId,opts={}) {
    if(opts.reportMode==='project'||opts.projectId&&opts.projectId!=='all')return projectReport(s,actorId,opts);
    return {...businessQuery(s,actorId,opts),reportKind:'summary'};
  }
  function overview(s,actorId,opts={}) {
    const c=context(s,actorId,opts),result={ok:c.ok,reason:c.reason,context:c,projectScope:'all-authorized-projects',asOf:asOf(opts.health),panels:[]};
    if(!c.ok)return result;
    const options={...opts,projectId:'all',reportMode:'summary',trendGrain:'day'};
    const email=query(s,actorId,{...options,domain:'email'}),crm=query(s,actorId,{...options,domain:'crm'}),monitor=query(s,actorId,{...options,domain:'monitor'});
    if([email,crm,monitor].every(source=>!source.ok))return {...result,ok:false,reason:email.reason};
    result.dateRange=email.dateRange;
    const metric=(key,label,unit,value,source,coverage=source.coverage,reason=source.reason)=>({key,label,unit,value,coverage:opts.health==='delayed'&&coverage==='covered'?'delayed':coverage,reason});
    result.panels=[
      {id:'reach',name:'触达',domain:'email',metrics:[metric('sent','发送邮件数','封',email.totals.sent,email),metric('replyRate','邮件回复率','%',email.totals.replyRate,email)]},
      {id:'communication',name:'沟通',domain:'email',metrics:[metric('newConversations','新增沟通对话','个',email.conversations.newConversations,email,email.conversations.newConversations===null?email.conversations.newCoverage:email.coverage==='empty'?'empty':email.conversations.newCoverage,email.conversations.reason),metric('activeConversations','期间活跃对话','个',email.conversations.activeConversations,email,email.conversations.activeConversations===null?email.conversations.activeCoverage:email.coverage==='empty'?'empty':email.conversations.activeCoverage,email.conversations.reason)]},
      {id:'cooperation',name:'合作',domain:'crm',metrics:[metric('crmTotal','期间新增 CRM','条',crm.totals.crmTotal,crm),metric('crmOngoing','其中当前合作中','条',crm.totals.crmOngoing,crm)]},
      {id:'content',name:'内容',domain:'monitor',metrics:[metric('monitorItemsAdded','期间新增监控条目','条',monitor.totals.monitorItemsAdded,monitor),metric('viewGrowth','期间观看增长','次',monitor.totals.viewGrowth,monitor,monitor.totals.viewGrowth===null?'uncovered':monitor.growthPartial?'partial':monitor.coverage,monitor.timeBasis||monitor.reason)],note:(monitor.growthPartial?'部分观察：所选范围超过日增长来源可用截止；':'')+'日增长来源可用至 '+(monitor.availableUntil||'—')+'，实际观察截止 '+(monitor.growthCutoff||'—')}
    ];
    return result;
  }

  const finiteLimit = q => typeof q?.quotaLimit === 'number' && Number.isFinite(q.quotaLimit) && q.quotaLimit >= 0 ? q.quotaLimit : null;
  function quotaRow(scope, q, level, groupId, uid, parentRemaining, usable = true) {
    const inherited = level !== 'organization' && (q.quotaMode === 'inherit' || q.quotaLimit === null);
    const limit = inherited ? null : finiteLimit(q), used = Number(q.used) || 0;
    const remaining = limit === null ? null : Math.max(0,limit-used);
    const effectiveRemaining = usable ? level === 'organization' ? remaining ?? 0 : Math.min(parentRemaining,remaining ?? parentRemaining) : 0;
    return {scopeId:scope.id,scopeName:scope.name,unit:scope.unit,groupId,uid,level,limit,used,remaining,effectiveRemaining,mode:level === 'organization' ? 'entitlement' : inherited ? 'inherit' : 'capped'};
  }
  function quotaRows(s, actorId, opts = {}) {
    const c = context(s,actorId,opts), result = {ok:c.ok,reason:c.reason,context:c,rows:[],periodLabel:'当前配额周期（示例，独立于业务统计月份）'};
    if (!c.ok) return result;
    const groups = selectedGroups(c), allOrganization = c.view === 'organization' && c.groupId === 'all' && c.userId === 'all';
    E.quotaScopes.forEach(scope => {
      const organization = groups[0] ? E.quota(s,groups[0].id,scope.id).organization : scope.id === 'email' ? s.organization : s.organization.quotas[scope.id];
      const organizationRow = quotaRow(scope,organization,'organization',null,null,0);
      if (allOrganization) result.rows.push(organizationRow);
      groups.forEach(g => {
        const q = E.quota(s,g.id,scope.id), groupRow = quotaRow(scope,q.group,'group',g.id,null,organizationRow.effectiveRemaining,g.status === 'ACTIVE');
        result.rows.push(groupRow);
      });
    });
    return result;
  }
  return {context,query,workload,projectReport,reportCapabilities,overview,bucketSeries,quotaRows,dateRange};
});
