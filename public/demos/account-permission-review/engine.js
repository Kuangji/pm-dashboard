(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.ReviewEngine = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  const clone = value => JSON.parse(JSON.stringify(value));
  const quotaScopes = [{id:'email',name:'邮件发送',unit:'封'},{id:'search',name:'搜索次数',unit:'次'},{id:'channelUnlock',name:'频道详情页解锁次数',unit:'次'}];
  const quotaValues = (limit,used=0,mode='capped') => ({quotaLimit:limit,used,quotaMode:mode});
  const extraQuotas = (searchLimit,searchUsed,unlockLimit,unlockUsed,mode='capped') => ({search:quotaValues(searchLimit,searchUsed,mode),channelUnlock:quotaValues(unlockLimit,unlockUsed,mode)});
  const member = (groupId, role = 'T3', used = 0) => ({ groupId, role, status: 'ACTIVE', quotaMode: 'inherit', quotaLimit: 2500, used, quotas:extraQuotas(0,Math.round(used/2),0,Math.round(used/20),'inherit'), paymentLimit: null, paymentUsed: 0, paymentPending: 0 });
  function createState() {
    const recipients = [
      {id:'mia',channelId:'youtube-mia',channelName:'Mia Chen · YouTube',name:'Mia Chen · YouTube',account:'6222 **** 0321',source:'品牌团队',status:'ACTIVE'},
      {id:'mia-alternative',channelId:'youtube-mia',channelName:'Mia Chen · YouTube',name:'Mia Chen · YouTube',account:'6222 **** 0987',source:'增长团队',status:'ACTIVE'},
      {id:'alex',channelId:'tiktok-alex',channelName:'Alex Rivers · TikTok',name:'Alex Rivers · TikTok',account:'6222 **** 0712',source:'增长团队',status:'ACTIVE'}
    ];
    return {
      recipients,
      creatorProfiles: [
        {id:'mia',name:'Mia Chen',platform:'YouTube',channelId:'youtube-mia'},
        {id:'alex',name:'Alex Rivers',platform:'TikTok',channelId:'tiktok-alex'},
        {id:'jordan',name:'Jordan Lee',platform:'Instagram',channelId:'instagram-jordan'}
      ],
      crmWritePermissions: [2], crmLegacyAdminId: 'u-admin',
      crmLegacyGroups: [
        {id:'legacy-growth',members:['u-admin','u-lead','u-member','u-editor','u-view'],leaders:['u-admin','u-lead']},
        {id:'legacy-brand',members:['u-admin','u-brand'],leaders:['u-admin','u-brand']}
      ],
      organization: { name: '星野品牌 · 示例组织', quotaLimit: 10000, used: 1680, quotas:extraQuotas(5000,1000,1000,150), walletBalance: 50000, walletPending: 1200, seatLimit: 12 },
      users: [
        { id: 'u-owner', name: '林知夏', email: 'lin@xingye.example', orgRole: 'owner', status: 'ACTIVE', memberships: [member('g-growth'), member('g-default', 'T2')] },
        { id: 'u-admin', name: '陈予安', email: 'chen@xingye.example', orgRole: 'admin', status: 'ACTIVE', memberships: [member('g-growth', 'T2', 110), member('g-brand', 'T2', 80)] },
        { id: 'u-lead', name: '周明', email: 'zhou@xingye.example', orgRole: 'member', status: 'ACTIVE', memberships: [member('g-growth', 'T2', 310)] },
        { id: 'u-member', name: '许念', email: 'xu@xingye.example', orgRole: 'member', status: 'ACTIVE', memberships: [Object.assign(member('g-growth', 'T3', 720), { paymentUsed: 2200, paymentPending: 1200 })] },
        { id: 'u-editor', name: '孙可', email: 'sun@xingye.example', orgRole: 'member', status: 'ACTIVE', memberships: [member('g-growth', 'T3', 260)] },
        { id: 'u-brand', name: '乔南', email: 'qiao@xingye.example', orgRole: 'member', status: 'ACTIVE', memberships: [Object.assign(member('g-brand', 'T2', 200), { paymentUsed: 800 })] },
        { id: 'u-view', name: '方禾', email: 'fang@xingye.example', orgRole: 'member', status: 'ACTIVE', memberships: [member('g-growth', 'T3', 0)] }
      ],
      groups: [
        { id: 'g-default', name: '默认组', status: 'ACTIVE', isDefault: true, quotaLimit: 10000, used: 0, quotas:extraQuotas(5000,0,1000,0,'inherit'), paymentEnabled: true, paymentMode: 'shared', fundBalance: 0, fundCycle: 1, fundUsed: 0, fundPending: 0, requireT2PaymentRelease: false },
        { id: 'g-growth', name: '增长团队', status: 'ACTIVE', isDefault: false, quotaLimit: 6000, used: 1400, quotas:extraQuotas(3000,900,600,120), paymentEnabled: true, fundBalance: 8600, fundCycle: 1, fundUsed: 2200, fundPending: 1200, requireT2PaymentRelease: false },
        { id: 'g-brand', name: '品牌团队', status: 'ACTIVE', isDefault: false, quotaLimit: 4000, used: 280, quotas:extraQuotas(2000,100,400,30), paymentEnabled: true, fundBalance: 7200, fundCycle: 1, fundUsed: 800, fundPending: 0, requireT2PaymentRelease: false },
        { id: 'g-empty', name: '新市场团队', status: 'ACTIVE', isDefault: false, quotaLimit: 3000, used: 0, quotas:extraQuotas(5000,0,1000,0,'inherit'), paymentEnabled: false, fundBalance: 0, fundCycle: 0, fundUsed: 0, fundPending: 0, requireT2PaymentRelease: false }
      ],
      projects: [
        { id: 'email1', module: 'email', name: '秋季新品达人邀约', groupId: 'g-growth', ownerId: 'u-member', creatorId: 'u-member', assigneeId: null, status: 'ACTIVE', collaborators: [{ uid: 'u-editor', disabled: false, canManage: true, canExecute: false }] },
        { id: 'monitor1', module: 'monitor', name: '秋季新品内容监控', description: '秋季合作内容复盘 · 虚构样例', items: [{id:'monitor-item-1',name:'Mia · 新品视频',platform:'YouTube',monitorDays:60,responsibleUid:'u-editor',note:'等待复盘'}], groupId: 'g-growth', ownerId: 'u-member', creatorId: 'u-member', assigneeId: null, status: 'ACTIVE', collaborators: [{ uid: 'u-editor', disabled: false, canManage: false, canExecute: false }] },
        { id: 'resource1', module: 'resource', name: '北美生活方式创作者', description: '生活方式合作候选 · 虚构样例', sharingMode: 'selected', items: [{id:'collection-mia',name:'Mia Chen',platform:'YouTube',note:'已收藏'},{id:'collection-alex',name:'Alex Rivers',platform:'TikTok',note:'等待联系'}], groupId: 'g-growth', ownerId: 'u-editor', creatorId: 'u-editor', assigneeId: null, status: 'ACTIVE', collaborators: [{ uid: 'u-member', disabled: false, canManage: false, canExecute: false }] },
        { id: 'crm1', module: 'crm', name: 'Mia · 护肤合作洽谈', creatorProfileId:'mia', cooperationStatus:'洽谈中', note:'增长团队的独立合作进度', groupId: 'g-growth', ownerId: null, creatorId: 'u-member', assigneeId: 'u-member', status: 'ACTIVE', collaborators: [] },
        { id: 'crm2', module: 'crm', name: 'Alex · 新增合作线索', creatorProfileId:'alex', cooperationStatus:'待跟进', note:'待安排对接', groupId: 'g-growth', ownerId: null, creatorId: 'u-member', assigneeId: null, status: 'ACTIVE', collaborators: [] },
        { id: 'crm-brand1', module: 'crm', name: 'Mia · 品牌联名合作', creatorProfileId:'mia', cooperationStatus:'合作中', note:'品牌团队单独维护，不随增长团队修改', groupId: 'g-brand', ownerId: null, creatorId: 'u-brand', assigneeId:'u-brand', status:'ACTIVE', collaborators:[] },
        { id: 'pay1', module: 'payment', name: 'Mia · 首批合作款', groupId: 'g-growth', ownerId: 'u-member', creatorId: 'u-member', assigneeId: null, status: 'DRAFT', paymentAmount: 800, recipientId: 'mia', recipientSnapshot:clone(recipients[0]), collaborators: [{ uid: 'u-editor', disabled: false, canManage: false, canExecute: false }] },
        { id: 'pay2', module: 'payment', name: 'Alex · 十月合作尾款', groupId: 'g-growth', ownerId: 'u-member', creatorId: 'u-member', assigneeId: null, status: 'FORMAL', paymentAmount: 1200, recipientId: 'alex', recipientSnapshot:clone(recipients[2]), fundingUid: 'u-member', fundingGroupId: 'g-growth', fundingCycle: 1, fundingMemberIndex: 0, fundingCommitted: true, submitterId: 'u-member', collaborators: [] },
        { id: 'brand-email', module: 'email', name: '品牌联名邀请', groupId: 'g-brand', ownerId: 'u-brand', creatorId: 'u-brand', assigneeId: null, status: 'ACTIVE', collaborators: [] }
      ],
      conversations: [
        {id:'conv-growth-mia',projectId:'email1',channelId:'youtube-mia',creatorName:'Mia Chen',hasReply:true,preview:'已收到样品，期待下一步合作。',assignedUids:[],unreadBy:{}},
        {id:'conv-growth-alex',projectId:'email1',channelId:'tiktok-alex',creatorName:'Alex Rivers',hasReply:false,preview:'已发送邀约，尚无达人回复。',assignedUids:[],unreadBy:{}},
        {id:'conv-brand-mia',projectId:'brand-email',channelId:'youtube-mia',creatorName:'Mia Chen',hasReply:true,preview:'品牌联名方案已收到。',assignedUids:[],unreadBy:{}}
      ],
      senderConfigs: [
        ['u-owner','林知夏','lin'],['u-admin','陈予安','chen'],['u-lead','周明','zhou'],['u-member','许念','xu'],['u-editor','孙可','sun'],['u-brand','乔南','qiao'],['u-view','方禾','fang']
      ].map(([uid,sendName,address])=>({id:'sender-'+uid,uid,sendName,address:address+'@xingye.example'})),
      policies: { adminRemoveMembers: false, adminArchiveGroups: false, t2Collaborator: false, t2Quota: false, paymentSensitive: false, monitorLabelsT2: false, showTeamQuota: false },
      invites: [{ id: 'invite-seed-pending', name: '陆遥', email: 'lu@xingye.example', groupId: 'g-growth', role: 'T3', quotaMode: 'inherit', status: 'PENDING' }],
      tasks: [], handoffs: [], audit: [], notifications: [],
      fundEvents: [
        ['allocate','g-growth',null,12000,'十月增长预算','u-owner',0,12000,0],
        ['allocate','g-brand',null,8000,'十月品牌预算','u-owner',0,8000,0],
        ['hold','g-growth',null,2200,'历史支付占用','u-member',0,-2200,2200],
        ['payment','g-growth',null,2200,'历史支付成功','u-member',-2200,0,-2200],
        ['hold','g-brand',null,800,'历史支付占用','u-brand',0,-800,800],
        ['payment','g-brand',null,800,'历史支付成功','u-brand',-800,0,-800],
        ['hold','g-growth','pay2',1200,'现有支付单占用','u-member',0,-1200,1200]
      ].map(([type,groupId,projectId,amount,reason,actorId,walletDelta,groupDelta,pendingDelta],i)=>({id:'fund-seed-'+i,type,groupId,projectId,amount,reason,actorId,at:'2026-10-01T09:0'+i+':00+08:00',walletDelta,unallocatedDelta:walletDelta-pendingDelta-groupDelta,groupDelta,pendingDelta})),
      labels: [
        { id: 'tag1', name: '新品合作', creatorId: 'u-member', groupId: 'g-growth', module: 'monitor' },
        { id: 'tag2', name: '内容待确认', creatorId: 'u-editor', groupId: 'g-growth', module: 'monitor' },
        { id: 'tag3', name: '品牌联名', creatorId: 'u-brand', groupId: 'g-brand', module: 'monitor' },
        { id: 'tag-message1', name: '等待回复', creatorId: 'u-member', groupId: 'g-growth', module: 'message' },
        { id: 'tag-message2', name: '合同确认', creatorId: 'u-editor', groupId: 'g-growth', module: 'message' },
        { id: 'tag-message3', name: '品牌洽谈', creatorId: 'u-brand', groupId: 'g-brand', module: 'message' },
        { id: 'tag-crm1', name: '重点合作', creatorId: 'u-member', groupId: 'g-growth', module: 'crm', affected: 18 },
        { id: 'tag-crm2', name: '品牌签约', creatorId: 'u-brand', groupId: 'g-brand', module: 'crm', affected: 7 }
      ],
      usage: [
        { uid: 'u-member', groupId: 'g-growth', sent: 720, opened: 318, replied: 42, cooperate: 11, monitor: 7, clicks: 1320, samples: 9, month: '2026-10' },
        { uid: 'u-editor', groupId: 'g-growth', sent: 260, opened: 112, replied: 15, cooperate: 4, monitor: 3, clicks: 540, samples: 4, month: '2026-10' },
        { uid: 'u-lead', groupId: 'g-growth', sent: 310, opened: 144, replied: 23, cooperate: 5, monitor: 4, clicks: 810, samples: 5, month: '2026-10' },
        { uid: 'u-admin', groupId: 'g-growth', sent: 110, opened: 48, replied: 8, cooperate: 2, monitor: 2, clicks: 240, samples: 1, month: '2026-10' },
        { uid: 'u-admin', groupId: 'g-brand', sent: 80, opened: 41, replied: 5, cooperate: 1, monitor: 1, clicks: 180, samples: 0, month: '2026-10' },
        { uid: 'u-brand', groupId: 'g-brand', sent: 200, opened: 88, replied: 13, cooperate: 3, monitor: 2, clicks: 430, samples: 2, month: '2026-10' }
      ]
    };
  }
  const user = (s, id) => s.users.find(x => x.id === id);
  const group = (s, id) => s.groups.find(x => x.id === id);
  const project = (s, id) => s.projects.find(x => x.id === id);
  const recipient = (s, id) => s.recipients.find(x => x.id === id && x.status === 'ACTIVE');
  const membership = (s, uid, gid) => user(s, uid)?.memberships.find(x => x.groupId === gid && x.status !== 'REMOVED');
  const active = (s, uid, gid) => user(s, uid)?.status === 'ACTIVE' && membership(s, uid, gid)?.status === 'ACTIVE' && group(s, gid)?.status === 'ACTIVE';
  const canManageOrganization = (s, uid) => user(s, uid)?.status === 'ACTIVE' && ['owner', 'admin'].includes(user(s, uid)?.orgRole);
  const isLead = (s, uid, gid) => active(s, uid, gid) && membership(s, uid, gid).role === 'T2';
  const canRemoveMember = (s, actorId, uid, gid, asGroupLead=false) => !asGroupLead&&canManageOrganization(s,actorId)&&(user(s,actorId).orgRole==='owner'||s.policies.adminRemoveMembers===true);
  const canArchiveGroup = (s, actorId, gid) => canManageOrganization(s,actorId)&&group(s,gid)?.status==='ACTIVE'&&!group(s,gid).isDefault&&(user(s,actorId).orgRole==='owner'||s.policies.adminArchiveGroups===true);
  const removalObjects = (s, task) => s.projects.filter(p=>p.groupId===task.groupId&&(p.ownerId===task.uid||p.assigneeId===task.uid||p.module!=='crm'&&p.collaborators.some(c=>c.uid===task.uid)));
  const canHandleRemoval = (s, actorId, task) => {
    const h=s.handoffs.find(h=>h.id===task?.handoffId);
    return !!task&&task.status==='REMOVING'&&isLead(s,actorId,task.groupId)&&(!h||h.mode==='later');
  };
  const manageMonitorLabels = (s, uid) => user(s, uid)?.status === 'ACTIVE' && (!s.policies.monitorLabelsT2 || canManageOrganization(s, uid) || user(s, uid).memberships.some(m => isLead(s, uid, m.groupId)));
  const leadQuota = (s, uid, gid) => s.policies.t2Quota && isLead(s, uid, gid);
  const number = value => Number.isFinite(Number(value)) && Number(value) >= 0;
  const id = prefix => prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
  function access(s, uid, pid) {
    const p = project(s, pid);
    const r = { read: false, write: false, manage: false, grant: false, transfer: false, execute: false, delete: false, source: [], reason: '', role: 'None' };
    if (!p) return Object.assign(r, { reason: '对象不存在' });
    if (!active(s, uid, p.groupId)) return Object.assign(r, { reason: '需要对象所属组的 ACTIVE 成员身份；组织管理身份不授予业务权限' });
    if (p.status === 'DELETED') return Object.assign(r, { reason: '对象已删除' });
    if (p.module === 'crm') {
      const permissions=s.crmWritePermissions || [],assigned=!!p.assigneeId,legacyAdmin=uid===s.crmLegacyAdminId,sources=[];
      const oldGroups=(s.crmLegacyGroups||[]).filter(group=>group.members.includes(p.assigneeId));
      if(p.assigneeId===uid)sources.push('CRM 对接人');
      if(permissions.includes(1)&&legacyAdmin)sources.push('CRM 既有管理员写权限');
      if(assigned&&permissions.includes(2)&&oldGroups.some(group=>group.leaders.includes(uid)))sources.push('CRM 既有同组组长写权限');
      if(assigned&&permissions.includes(3)&&oldGroups.some(group=>group.members.includes(uid)))sources.push('CRM 既有同组成员写权限');
      if(permissions.includes(4))sources.push('CRM 所有人写权限（限记录组）');
      if(!assigned&&legacyAdmin&&(!permissions.length||permissions.some(v=>[1,2,3].includes(v))))sources.push('CRM 未分配记录原管理员兼容来源');
      r.read=true;r.write=sources.length>0;r.transfer=r.write;r.govern=p.assigneeId===uid;
      r.source=['CRM 同组固定读取',...sources];
      r.role=p.assigneeId===uid?'CRM 对接人':r.write?'CRM 可编辑成员':'CRM 同组读取';
      r.reason='先按记录组隔离，再沿用 CRM 四项写权限与改派规则；不设置协作者或组长隐式协作';
      return r;
    }
    const own = p.ownerId === uid;
    const collection = p.module === 'resource';
    const c = !collection || (p.sharingMode || 'selected') === 'selected' ? p.collaborators.find(x => x.uid === uid && !x.disabled) : null;
    const groupPublic = collection && p.sharingMode === 'group';
    const implicit = s.policies.t2Collaborator && isLead(s, uid, p.groupId);
    if (own) r.source.push('项目 Owner');
    if (c) r.source.push('显式 Collaborator');
    if (groupPublic && !own) r.source.push('本组公开');
    if (implicit && !own) r.source.push('组长默认协作策略');
    r.write = !!(own || c || implicit || groupPublic);
    r.read = r.write;
    if (p.module === 'payment' && p.status !== 'DRAFT') {
      r.read = true;
      if (!r.write) r.source.push('正式支付单同组只读');
    }
    r.role = own ? 'Owner' : r.write ? 'Collaborator' : r.read ? 'Viewer' : 'None';
    r.manage = !!(own || c?.canManage);
    r.grant = own;
    if (collection || p.module === 'monitor') { r.manage = own; r.grant = false; }
    r.transfer = own && !['payment','email'].includes(p.module);
    r.execute = p.module === 'payment' && !!(own || c?.canExecute);
    r.delete = p.module === 'payment' ? p.status === 'DRAFT' && r.write : own;
    r.reason = r.read ? collection ? '已合并夹内容读写来源；改名、范围、名单、转交及整夹删除仅 Owner' : p.module === 'monitor' ? '已合并监控内容读写来源；项目治理和名单仅 Owner，不提供管理协作者委派，配额沿用监控原口径' : '已合并当前有效授权来源；附加能力独立判断' : '未获得此对象授权；同组成员不自动获得项目权限';
    return r;
  }
  const conversation = (s,cid) => (s.conversations||[]).find(c=>c.id===cid);
  const formalEmailMember = (p,uid) => p.collaborators.some(c=>c.uid===uid&&!c.disabled);
  function effectiveDelegates(s,c,p) {
    return [...new Set(c.assignedUids)].filter(uid=>uid!==p.ownerId&&active(s,uid,p.groupId)&&!formalEmailMember(p,uid));
  }
  function conversationAccess(s,uid,cid) {
    const c=conversation(s,cid),p=c&&project(s,c.projectId);
    const denied={read:false,write:false,manageAssignments:false,ownerId:null,assigned:false,formal:false,role:'None'};
    if(!p||p.module!=='email'||p.status==='DELETED'||!active(s,uid,p.groupId))return denied;
    const own=p.ownerId===uid,formal=formalEmailMember(p,uid),assigned=effectiveDelegates(s,c,p).includes(uid),projectRights=access(s,uid,p.id);
    const write=projectRights.write||assigned;
    return {read:write,write,manageAssignments:own,ownerId:p.ownerId,assigned,formal,role:own?'Owner':formal?'项目协作者':assigned?'对话转交人':write?'组长隐式协作':'None'};
  }
  function conversationsForGroup(s,uid,gid,filter='chat') {
    if(!active(s,uid,gid)||!['chat','send','all'].includes(filter))return [];
    return (s.conversations||[]).filter(c=>project(s,c.projectId)?.groupId===gid&&conversationAccess(s,uid,c.id).read&&(filter==='all'||c.hasReply===(filter==='chat')));
  }
  function conversationRecipients(s,cid) {
    const c=conversation(s,cid),p=c&&project(s,c.projectId);
    if(!p||p.module!=='email'||p.status==='DELETED'||group(s,p.groupId)?.status!=='ACTIVE')return [];
    const delegates=effectiveDelegates(s,c,p);
    const formal=p.collaborators.filter(m=>!m.disabled&&active(s,m.uid,p.groupId)).map(m=>m.uid);
    return [...new Set([...(!delegates.length&&active(s,p.ownerId,p.groupId)?[p.ownerId]:[]),...formal,...delegates])];
  }
  function conversationSender(s,uid,cid,senderConfigId) {
    const rights=conversationAccess(s,uid,cid),fail=message=>({ok:false,message});
    if(!rights.write)return fail('需要当前组及该对话的有效跟进权限');
    const delegate=rights.assigned&&!rights.formal&&uid!==rights.ownerId;
    if(delegate&&!senderConfigId)return fail('对话转交人必须显式选择本人的发件配置');
    const configs=s.senderConfigs||[];
    const config=senderConfigId?configs.find(c=>c.id===senderConfigId):configs.find(c=>c.uid===rights.ownerId);
    if(!config||!(delegate?config.uid===uid:[uid,rights.ownerId].includes(config.uid)))return fail('请选择获准的发件配置；转交人仅可使用本人配置');
    return {ok:true,senderUid:config.uid,operatorUid:uid,address:config.address,sendName:config.sendName,avatarName:user(s,uid).name,replyToNote:'Reply-To 沿用现有回复地址设置，不因转交自动改写；这里只预览身份，不发送邮件'};
  }
  function clearConversationOwner(s,pid) {
    (s.conversations||[]).filter(c=>c.projectId===pid).forEach(c=>{c.assignedUids=[];c.unreadBy={};});
  }
  function clearConversationMember(s,uid,gid) {
    (s.conversations||[]).filter(c=>project(s,c.projectId)?.groupId===gid).forEach(c=>{
      c.assignedUids=c.assignedUids.filter(id=>id!==uid);delete c.unreadBy[uid];
    });
  }
  const roundMoney = value => Math.round(value * 100) / 100;
  const validMoney = value => value >= 0 && Number.isSafeInteger(Math.round(value * 100)) && value === roundMoney(value);
  const usesSharedFunds = (s,gid) => group(s,gid)?.isDefault===true&&group(s,gid).paymentMode==='shared';
  function balances(s, gid, uid) {
    const orgAvailable = roundMoney(s.organization.walletBalance - s.organization.walletPending);
    const unallocated = roundMoney(orgAvailable - s.groups.filter(g=>!usesSharedFunds(s,g.id)).reduce((v, g) => v + g.fundBalance, 0));
    const g = group(s, gid), m = membership(s, uid, gid);
    const groupRemaining = g?.paymentEnabled && g.status === 'ACTIVE' ? usesSharedFunds(s,gid)?Math.max(0,unallocated):g.fundBalance : 0;
    const memberRemaining = m ? m.paymentLimit === null ? Infinity : Math.max(0, roundMoney(m.paymentLimit - (m.paymentUsed || 0) - (m.paymentPending || 0))) : 0;
    return { orgAvailable, unallocated, groupRemaining, memberRemaining, available: Math.min(orgAvailable, groupRemaining, memberRemaining) };
  }
  function recordFunds(s, actorId, type, amount, { group: g, project: p, reason, relatedEventId, walletDelta = 0, groupDelta = 0, pendingDelta = 0 }) {
    s.organization.walletBalance = roundMoney(s.organization.walletBalance + walletDelta);
    s.organization.walletPending = roundMoney(s.organization.walletPending + pendingDelta);
    if (g) { g.fundBalance = roundMoney(g.fundBalance + groupDelta); g.fundPending = roundMoney(g.fundPending + pendingDelta); }
    const event = { id: id('fund'), type, groupId: g?.id || null, projectId: p?.id || null, fundingMode:p?.fundingMode||(g?(usesSharedFunds(s,g.id)?'shared':'dedicated'):null), amount, reason, actorId, at: new Date().toISOString(), walletDelta, unallocatedDelta: roundMoney(walletDelta - pendingDelta - groupDelta), groupDelta, pendingDelta, ...(relatedEventId ? {relatedEventId} : {}) };
    s.fundEvents.push(event);
    return event.id;
  }
  const acceptsFundingReturn = (g, p) => p.fundingMode!=='shared'&&g?.status === 'ACTIVE' && g.paymentEnabled && g.fundCycle === p.fundingCycle;
  function fundingMembership(s,p) {
    const memberships=user(s,p.fundingUid)?.memberships||[],original=memberships[p.fundingMemberIndex];
    return original?.groupId===p.fundingGroupId?original:memberships.find(m=>m.groupId===p.fundingGroupId);
  }
  function paymentReview(s,p) {
    const g=group(s,p.groupId);
    if(!g?.requireT2PaymentRelease)return {required:false,reason:'组长审核策略已关闭'};
    if(isLead(s,p.submitterId,p.groupId))return {required:false,reason:'实际提交人当前为有效组长'};
    if(!s.users.some(u=>isLead(s,u.id,p.groupId)))return {required:false,reason:'审核阶段无有效组长，自动跳过组长审核'};
    return {required:!p.reviewedBy,reason:null};
  }
  function reconcilePaymentReviews(s) {
    s.projects.filter(p=>p.module==='payment'&&p.fundingCommitted&&['WAITING_REVIEW','SCHEDULED'].includes(p.status)).forEach(p=>{
      const decision=paymentReview(s,p);
      p.reviewSkipReason=decision.reason;
      if(decision.required)p.status='WAITING_REVIEW';
      else if(p.status==='WAITING_REVIEW')p.status=p.scheduled?'SCHEDULED':'FORMAL';
    });
  }
  function settlePayment(s, actorId, p, paid) {
    const g = group(s, p.fundingGroupId), amount = p.paymentAmount;
    // A removed or subsequently re-added member must settle against the original relationship.
    const m = fundingMembership(s,p);
    if (m) {
      m.paymentPending = Math.max(0, roundMoney(m.paymentPending - amount));
      if (paid) m.paymentUsed = roundMoney(m.paymentUsed + amount);
    }
    if (paid) g.fundUsed = roundMoney(g.fundUsed + amount);
    p.fundingCommitted = false;
    p.status = paid ? 'PAID' : 'CANCELLED';
    return recordFunds(s, actorId, paid ? 'payment' : 'release', amount, { group: g, project: p, reason: paid ? '支付成功' : '支付作废，释放原占用', walletDelta: paid ? -amount : 0, groupDelta: !paid && acceptsFundingReturn(g, p) ? amount : 0, pendingDelta: -amount });
  }
  function validHandoffTasks(s,h) {
    return h&&user(s,h.uid)?.status==='REMOVING'&&h.taskIds.length>0&&h.taskIds.every(tid=>{
      const t=s.tasks.find(t=>t.id===tid);
      return t&&t.uid===h.uid&&t.handoffId===h.id&&t.organizationExit&&t.status==='REMOVING'&&h.groupIds.includes(t.groupId)&&group(s,t.groupId)?.status==='ACTIVE'&&membership(s,h.uid,t.groupId)?.status==='REMOVING';
    });
  }
  // The authorized submission triggers this local worker; there is no second user approval.
  function executeUnifiedHandoff(s,h) {
    const departing=user(s,h.uid),target=user(s,h.targetId),at=new Date().toISOString();
    for(const taskId of h.taskIds){
      const task=s.tasks.find(t=>t.id===taskId),summary={owner:0,assignee:0,collaborator:0,merged:0,disabledSkipped:0};
      s.projects.filter(p=>p.groupId===task.groupId&&p.status!=='DELETED').forEach(p=>{
        if(p.module==='crm'){
          if(p.assigneeId===departing.id){p.assigneeId=target.id;summary.assignee++;}
          p.collaborators=[];
          return;
        }
        const prior=p.collaborators.filter(c=>c.uid===departing.id);
        const explicit=prior.find(c=>!c.disabled&&(p.module!=='resource'||!p.sharingMode||p.sharingMode==='selected'));
        summary.disabledSkipped+=prior.filter(c=>c.disabled).length;
        if(p.ownerId===departing.id){clearConversationOwner(s,p.id);p.ownerId=target.id;summary.owner++;}
        p.collaborators=p.collaborators.filter(c=>c.uid!==departing.id);
        if(p.ownerId===target.id||p.assigneeId===target.id){
          summary.merged+=p.collaborators.filter(c=>c.uid===target.id).length;
          p.collaborators=p.collaborators.filter(c=>c.uid!==target.id);
        }else if(explicit){
          const existing=p.collaborators.find(c=>c.uid===target.id);
          const merged={uid:target.id,disabled:false,canManage:!['resource','monitor'].includes(p.module)&&!!(explicit.canManage||existing?.canManage),canExecute:p.module==='payment'&&!!(explicit.canExecute||existing?.canExecute)};
          if(existing){Object.assign(existing,merged);summary.merged++;}else p.collaborators.push(merged);
          summary.collaborator++;
        }
      });
      clearConversationMember(s,departing.id,task.groupId);
      membership(s,departing.id,task.groupId).status='REMOVED';
      Object.assign(task,{status:'COMPLETED',targetId:target.id,crmTargetId:summary.assignee?target.id:null,hasCrmAssignment:summary.assignee>0,summary});
      s.notifications.push({id:id('notice'),scope:'group',groupId:task.groupId,title:group(s,task.groupId).name+'：'+departing.name+' 的本组交接已完成',message:'业务接替已完成；个人配额不继承或相加，历史用量及资金承担不变',uid:h.authorizedBy,at});
    }
    departing.status='REMOVED';h.status='COMPLETED';h.completedAt=at;
    s.notifications.push({id:id('notice'),scope:'organization',groupId:null,title:departing.name+' 的组织清退已完成',message:'全部示例组交接已完成；未退回已消耗额度，也未释放原支付占用',uid:h.authorizedBy,at});
  }
  function act(s, actorId, type, payload = {}) {
    const a = user(s, actorId);
    const fail = message => ({ ok: false, message });
    if (!a || a.status !== 'ACTIVE') return fail('账号不处于 ACTIVE 状态，不能继续操作');
    const p = payload.projectId ? project(s, payload.projectId) : null;
    const g = payload.groupId ? group(s, payload.groupId) : null;
    const u = payload.uid ? user(s, payload.uid) : null;
    const m = payload.uid && payload.groupId ? membership(s, payload.uid, payload.groupId) : null;
    const rights = p ? access(s, actorId, p.id) : null;
    const adminActions = ['invite', 'acceptInvite', 'addGroup', 'renameGroup', 'setRole', 'setOrgRole', 'transferOrgOwner', 'addMembership', 'startOrganizationExit', 'completeHandoff', 'archiveGroup', 'moveProjects', 'setGroupPaymentAccess', 'allocateFunds', 'returnFunds', 'rechargeFunds', 'refundPayment'];
    if (adminActions.includes(type) && !canManageOrganization(s, actorId)) return fail('只有组织 Owner/Admin 可以执行此组织管理动作；T2 身份不授予该动作');
    let message = '操作已完成', extra = {};
    switch (type) {
      case 'invite': {
        const targetGroup = payload.groupId ? g : s.groups.find(x=>x.isDefault&&x.status==='ACTIVE');
        if (!targetGroup || targetGroup.status !== 'ACTIVE') return fail('请选择有效业务组；默认组必须始终存在');
        const email = String(payload.email || '').trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail('请输入有效邮箱');
        if (s.users.some(x => x.email.toLowerCase() === email && x.status !== 'REMOVED') || s.invites.some(x => x.email === email && x.status === 'PENDING')) return fail('该邮箱已经在组织或待接受邀请中');
        if (s.users.filter(x => x.status === 'ACTIVE').length + s.invites.filter(x => x.status === 'PENDING').length >= s.organization.seatLimit) return fail('组织席位已满；有效成员和待接受邀请共同占用席位');
        if ((payload.quotaMode !== undefined && payload.quotaMode !== 'inherit') || ['quotaLimit', 'paymentLimit'].some(key => Object.prototype.hasOwnProperty.call(payload, key))) return fail('邀请不配置个人额度；默认不追加限制，入组后由获委派的本组组长配置');
        const inv = { id: id('invite'), name: String(payload.name || email.split('@')[0]), email, groupId: targetGroup.id, role: 'T3', quotaMode: 'inherit', status: 'PENDING' };
        s.invites.push(inv); extra.inviteId = inv.id; message = '邀请已发送（模拟）；接受前不创建有效组身份'; break;
      }
      case 'cancelInvite': {
        if (!canManageOrganization(s, actorId)) return fail('需要组织管理权限');
        const inv = s.invites.find(x => x.id === payload.inviteId);
        if (!inv || inv.status !== 'PENDING') return fail('邀请已处理');
        inv.status = 'CANCELLED'; message = '邀请已撤销，释放占用席位'; break;
      }
      case 'acceptInvite': {
        const inv = s.invites.find(x => x.id === payload.inviteId);
        if (!inv || inv.status !== 'PENDING') return fail('邀请已处理或不存在');
        const targetGroup = group(s, inv.groupId);
        if (!targetGroup || targetGroup.status !== 'ACTIVE') return fail('目标组已归档，邀请配置失效');
        const groupIds=inv.groupIds||[inv.groupId];
        if(groupIds.some(gid=>group(s,gid)?.status!=='ACTIVE'))return fail('接替涉及的组已归档，暂不接受；请由组织管理者处理任务');
        if (s.users.filter(x => x.status === 'ACTIVE').length >= s.organization.seatLimit) return fail('接受时组织席位已满，请先释放席位');
        const h=s.handoffs.find(h=>h.inviteId===inv.id);
        if(inv.handoffId&&(!h||h.status!=='WAITING_FOR_TARGET'||!validHandoffTasks(s,h)))return fail('接替任务资格已变化，请先处理原清退任务');
        const uid = id('u'); s.users.push({ id: uid, name: inv.name, email: inv.email, orgRole: 'member', status: 'ACTIVE', memberships: groupIds.map(gid=>member(gid,inv.roles?.[gid]||'T3')) });
        inv.status='ACCEPTED';
        if(h){h.targetId=uid;executeUnifiedHandoff(s,h);}
        extra.uid = uid; message = h?'已模拟接受组织邀请，系统自动完成示例业务接替；无额外确认，配额未继承或相加':'已模拟受邀人接受；组身份生效，个人额度默认不追加限制'; break;
      }
      case 'addGroup': {
        const name = String(payload.name || '').trim();
        if (!name) return fail('请填写组名');
        if (s.groups.some(x => x.name === name && x.status === 'ACTIVE')) return fail('该组名已存在');
        if(payload.paymentEnabled!==undefined&&typeof payload.paymentEnabled!=='boolean')return fail('支付开通状态须为明确开关值');
        const enabled=payload.paymentEnabled===true;
        const gid = id('g'); s.groups.push({ id: gid, name, status: 'ACTIVE', isDefault: false, quotaLimit: s.organization.quotaLimit, used: 0, quotas:extraQuotas(s.organization.quotas.search.quotaLimit,0,s.organization.quotas.channelUnlock.quotaLimit,0,'inherit'), paymentEnabled: enabled, paymentMode:'dedicated', fundBalance: 0, fundCycle: enabled?1:0, fundUsed: 0, fundPending: 0, requireT2PaymentRelease: false }); extra.groupId = gid; message = '空组已创建，允许 0 名成员和 0 名 T2；支付按建组选择，开通后另行分配专用余额'; break;
      }
      case 'renameGroup': {
        if (!g || !String(payload.name || '').trim()) return fail('组和名称不能为空');
        g.name = String(payload.name).trim(); break;
      }
      case 'setRole': {
        if (!m || m.status !== 'ACTIVE' || !['T2', 'T3'].includes(payload.role)) return fail('请选择有效组成员和 T2/T3 身份');
        m.role = payload.role; message = '组内身份已修改；同组允许多名 T2，其他组身份不变'; break;
      }
      case 'setOrgRole': {
        if (a.orgRole !== 'owner') return fail('任免组织 Admin 仅允许组织 Owner 操作');
        if (!u || u.orgRole === 'owner' || !['admin', 'member'].includes(payload.orgRole)) return fail('不能通过该动作修改组织 Owner');
        u.orgRole = payload.orgRole; message = '组织身份已修改；业务组身份和项目 ACL 均保持'; break;
      }
      case 'transferOrgOwner': {
        if (a.orgRole !== 'owner' || !u || u.status !== 'ACTIVE' || u.id === a.id) return fail('仅当前组织 Owner 可将所有权转给其他有效组织成员');
        a.orgRole = 'admin'; u.orgRole = 'owner'; message = '组织所有权已移交；项目和组内身份未改变'; break;
      }
      case 'setPolicy': {
        if (!canManageOrganization(s, actorId)) return fail('需要组织管理身份；T2 不能修改组织全局策略');
        if (!Object.hasOwn(s.policies,payload.key)) return fail('未知组织策略');
        if (['adminRemoveMembers','adminArchiveGroups'].includes(payload.key)&&a.orgRole!=='owner') return fail('仅组织 Owner 可配置 Admin 的成员移除和组归档权限');
        s.policies[payload.key] = !!payload.value; message = '组织策略已更新，现有对象的系统授权来源实时重新计算'; break;
      }
      case 'setGroupPolicy': {
        if (!canManageOrganization(s, actorId) || !g || g.status !== 'ACTIVE') return fail('需要有效组和组织管理权限；组策略编辑主体仍需评审');
        if (payload.key !== 'requireT2PaymentRelease') return fail('未知组级策略');
        g.requireT2PaymentRelease = !!payload.value;
        message = g.requireT2PaymentRelease?'已开启组级支付审核；按当前策略和有效组长实时重算，不保存创建时快照':'已关闭组级支付审核；解除等待中的组长闸门，不恢复已逾期预约';
        break;
      }
      case 'setQuota': {
        if (!g || g.status !== 'ACTIVE') return fail('需要有效业务组');
        if (payload.uid) {
          if (!leadQuota(s, actorId, g.id)) return fail('只有获委派的本组 T2 可配置成员个人额度；组织管理身份不越级');
          if (!m || m.status !== 'ACTIVE') return fail('目标账号不是有效组成员');
        } else if (!canManageOrganization(s, actorId)) return fail('T2 不能修改组本身的上限');
        const items=payload.items || [payload],updates=[];
        if (!Array.isArray(items)||!items.length) return fail('请选择配额项');
        const seen=new Set();
        for (const item of items) {
          const scopeId=item.scopeId || 'email',q=quota(s,g.id,scopeId,payload.uid);
          if (!q||seen.has(scopeId)) return fail('配额项无效或重复');
          seen.add(scopeId);
          if (!['inherit','capped'].includes(item.mode)) return fail('请选择共享或追加上限');
          const parent=payload.uid?q.group:q.organization,target=payload.uid?q.member:q.group;
          const unchanged=target.quotaMode==='capped'&&target.quotaLimit===Number(item.limit);
          if (item.mode==='capped'&&(!number(item.limit)||!unchanged&&Number(item.limit)>parent.quotaLimit)) return fail(payload.uid?'个人上限不能超过组上限；同组个人上限之和可以超配':'组上限不能超过组织上限');
          updates.push({target,mode:item.mode,limit:item.mode==='inherit'?parent.quotaLimit:Number(item.limit)});
        }
        updates.forEach(({target,mode,limit})=>{target.quotaMode=mode;target.quotaLimit=limit;});
        message = '配额已保存；低于已用量时可用量为 0，历史消耗不回滚'; break;
      }
      case 'batchIncreaseQuota': {
        if (!g || !leadQuota(s, actorId, g.id) || !number(payload.amount)) return fail('需要有效组、增量和配额管理权限');
        const q=quota(s,g.id,payload.scopeId||'email');if(!q)return fail('未知配额项');
        if (Array.isArray(payload.uids) && !payload.uids.length) return fail('请至少选择一个成员');
        const targets = s.users.filter(x => active(s,x.id,g.id)&&(!payload.uids||payload.uids.includes(x.id))).map(x=>({uid:x.id,m:quota(s,g.id,payload.scopeId||'email',x.id).member})).filter(x=>x.m.quotaMode==='capped');
        if (targets.some(x => x.m.quotaLimit + Number(payload.amount) > q.group.quotaLimit)) return fail('至少一个账号增加后将超过组上限，整批未执行');
        targets.forEach(x => x.m.quotaLimit += Number(payload.amount)); message = '已增加 ' + targets.length + ' 个 capped 成员；共享模式已跳过'; break;
      }
      case 'consume': {
        if (!payload.scopeId || payload.scopeId === 'email') return fail('邮件发送沿用现有路径核算，不能用当前操作人直接扣量模拟；请查看邮件发送与解锁说明');
        const q=quota(s,payload.groupId,payload.scopeId||'email',actorId),amount=Number(payload.amount);
        if (!active(s, actorId, payload.groupId) || !g) return fail('当前组身份无效');
        if(!q)return fail('未知配额项');
        const mm=q.member;
        if (!Number.isFinite(amount) || amount <= 0) return fail('消耗量必须大于 0');
        if (q.organization.used + amount > q.organization.quotaLimit) return fail('组织额度不足，未扣减');
        if (q.group.used + amount > q.group.quotaLimit) return fail('组额度不足，未扣减');
        if (mm.quotaMode === 'capped' && mm.used + amount > mm.quotaLimit) return fail('个人额度不足，未扣减');
        mm.used += amount; q.group.used += amount; q.organization.used += amount; message = '消费已通过组织 → 组 → 当前操作账号三级校验'; break;
      }
      case 'addMembership': {
        if (!u || u.status !== 'ACTIVE' || !g || g.status !== 'ACTIVE') return fail('账号或目标组无效');
        if (m) return fail('该成员已经在组内或仍有待完成的退组任务');
        u.memberships.push(member(g.id, payload.role === 'T2' ? 'T2' : 'T3'));
        s.projects.filter(x => x.groupId === g.id).forEach(x => x.collaborators.filter(c => c.uid === u.id).forEach(c => c.disabled = false));
        message = '组成员关系已新增；目标组内被禁用且未删除的原授权恢复'; break;
      }
      case 'removeMembership': {
        if (!u || !m || m.status !== 'ACTIVE') return fail('目标成员没有可移除的 ACTIVE 组关系');
        if(!canRemoveMember(s,actorId,u.id,m.groupId,!!payload.asGroupLead))return fail('仅组织 Owner 或获开启成员移除策略的 Admin 可移出组或组织；组长只处理本组业务交接');
        if (u.orgRole === 'owner' && (payload.organizationExit || u.memberships.filter(x => x.status === 'ACTIVE').length <= 1)) return fail('组织 Owner 必须先转让组织所有权，且至少保留一个 ACTIVE 业务组');
        const memberships = payload.organizationExit ? u.memberships.filter(x => x.status === 'ACTIVE' || x.status === 'REMOVING') : [m];
        if (payload.organizationExit) u.status = 'REMOVING';
        const ids = [];
        memberships.forEach(mm => {
          mm.status = 'REMOVING';
          const oldTask = s.tasks.find(t => t.uid === u.id && t.groupId === mm.groupId && t.status === 'REMOVING');
          if (oldTask) { if (payload.organizationExit) {oldTask.organizationExit=true;oldTask.initiatorScope='organization';} ids.push(oldTask.id); return; }
          const task = { id: id('task'), type: 'REMOVAL', uid: u.id, groupId: mm.groupId, status: 'REMOVING', organizationExit: !!payload.organizationExit, initiatorScope:'organization',initiatedBy:actorId,targetRole:mm.role, targetId: null, objectCount: removalObjects(s,{groupId:mm.groupId,uid:u.id}).length };
          s.tasks.push(task); ids.push(task.id);
        }); extra.taskId = ids[0]; extra.taskIds = ids; message = '成员已进入 REMOVING 并立即失权；资产暂未移交，可稍后处理'; break;
      }
      case 'startOrganizationExit': {
        if(!canRemoveMember(s,actorId))return fail('Admin 移除成员策略未开启；仅 Owner 可发起组织清退');
        if(!u||!['ACTIVE','REMOVING'].includes(u.status)||u.orgRole==='owner')return fail('请选择可清退的非组织 Owner 成员');
        const memberships=u.memberships.filter(mm=>['ACTIVE','REMOVING'].includes(mm.status)),mode=payload.mode||'later';
        if(!memberships.length||!['later','existing','invite'].includes(mode))return fail('没有待移交的组关系或接收方式无效');
        const groupIds=memberships.map(mm=>mm.groupId),old=s.handoffs.find(h=>h.uid===u.id&&h.status!=='COMPLETED');
        const oldInvite=s.invites.find(i=>i.id===old?.inviteId&&i.status==='PENDING');
        let target=null,missing=[],email='';
        if(mode!=='later'&&groupIds.some(gid=>group(s,gid)?.status!=='ACTIVE'))return fail('涉及已归档组：可先清退并稍后处理，不在此流程自动恢复归档组');
        if(mode==='existing'){
          target=user(s,payload.targetId);
          if(!target||target.status!=='ACTIVE'||target.id===u.id)return fail('请选择组织内其他有效接收人');
          missing=groupIds.filter(gid=>!active(s,target.id,gid));
          if(missing.some(gid=>membership(s,target.id,gid)))return fail('接收人有未结束的退组关系，不能直接覆盖为有效身份');
        }
        if(mode==='invite'){
          email=String(payload.email||'').trim().toLowerCase();
          if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return fail('请输入新同事的有效邮箱');
          if(s.users.some(x=>x.email.toLowerCase()===email&&x.status!=='REMOVED')||s.invites.some(i=>i.email===email&&i.status==='PENDING'&&i.id!==oldInvite?.id))return fail('邮箱已在组织或已有待接受邀请，请使用现有账号或处理原邀请');
          const seats=s.users.filter(x=>x.status==='ACTIVE'&&x.id!==u.id).length+s.invites.filter(i=>i.status==='PENDING'&&i.id!==oldInvite?.id).length;
          if(seats>=s.organization.seatLimit)return fail('没有可保留的接替席位；请先处理组织席位');
          missing=groupIds;
        }
        // Validate the complete receiver selection before revoking the departing identity.
        const activeMembership=memberships.find(mm=>mm.status==='ACTIVE');
        if(activeMembership){const removed=act(s,actorId,'removeMembership',{uid:u.id,groupId:activeMembership.groupId,organizationExit:true});if(!removed.ok)return removed;}
        else {u.status='REMOVING';s.tasks.filter(t=>t.uid===u.id&&t.status==='REMOVING').forEach(t=>t.organizationExit=true);}
        if(oldInvite)oldInvite.status='CANCELLED';
        const tasks=s.tasks.filter(t=>t.uid===u.id&&t.status==='REMOVING'),h=old||{id:id('handoff'),uid:u.id};
        Object.assign(h,{mode,targetId:target?.id||null,inviteId:null,groupIds,taskIds:tasks.map(t=>t.id),authorizedBy:actorId,status:mode==='later'?'PENDING_ASSIGNMENT':mode==='invite'?'WAITING_FOR_TARGET':'READY'});
        if(!old)s.handoffs.push(h);
        tasks.forEach(t=>{t.handoffId=h.id;t.organizationExit=true;});
        if(mode==='existing')missing.forEach(gid=>{
          target.memberships.push(member(gid,'T3'));
          s.projects.filter(p=>p.groupId===gid).forEach(p=>p.collaborators.filter(c=>c.uid===target.id).forEach(c=>c.disabled=false));
        });
        if(mode==='invite'){
          const inv={id:id('invite'),name:String(payload.name||email.split('@')[0]),email,groupId:groupIds[0],groupIds,roles:Object.fromEntries(groupIds.map(gid=>[gid,'T3'])),role:'T3',quotaMode:'inherit',status:'PENDING',handoffId:h.id,replacementSeat:true};
          s.invites.push(inv);h.inviteId=inv.id;
        }
        if(mode==='existing')executeUnifiedHandoff(s,h);
        extra.handoffId=h.id;message=mode==='invite'?'清退已生效；受邀人接受组织邀请后系统自动移交，无额外接替确认':mode==='existing'?'系统已自动完成示例业务接替；个人配额不继承或相加，历史用量与支付占用不变':'清退已生效；各组长可在本组处理业务交接';break;
      }
      case 'completeHandoff': {
        return fail('统一接替由提交或接受组织邀请自动触发，不提供单独确认执行动作');
      }
      case 'cancelRemoval': {
        const task = s.tasks.find(t => t.id === payload.taskId);
        if (!task || task.status !== 'REMOVING') return fail('任务已结束');
        if(!canRemoveMember(s,actorId))return fail('仅组织 Owner 或获开启成员移除策略的 Admin 可撤销单组移除；组长不能撤销人员关系变更');
        if (task.organizationExit) return fail('组织移出不可撤销');
        if (group(s, task.groupId)?.status !== 'ACTIVE') return fail('组已归档，不能撤销为有效业务身份');
        membership(s, task.uid, task.groupId).status = 'ACTIVE'; task.status = 'CANCELLED'; message = '退组已撤销；尚无资产移交，无需逆向恢复'; break;
      }
      case 'completeGroupHandoff':
      case 'completeRemoval': {
        const task = s.tasks.find(t => t.id === payload.taskId);
        if (!task || task.status !== 'REMOVING') return fail('任务已结束或不存在');
        const businessAction=type==='completeGroupHandoff';
        if(businessAction?!canHandleRemoval(s,actorId,task):!canRemoveMember(s,actorId))return fail('本组业务交接仅由本组有效组长处理；组织侧结束关系须具备成员移除权限，不能指派业务接收人');
        const h=s.handoffs.find(h=>h.id===task.handoffId),whole=!!h&&h.mode!=='later';
        if(whole)return fail('统一接替由系统按既定接收人自动处理，不通过单组操作改派');
        if(!businessAction&&(removalObjects(s,task).length||payload.targetId||payload.crmTargetId))return fail('存在业务对象时由本组组长交接；组织侧仅可确认没有业务交接项的关系结束');
        const departing = user(s, task.uid), target = payload.targetId ? user(s, payload.targetId) : null;
        const objects = s.projects.filter(x => x.groupId === task.groupId);
        const owned = objects.filter(x => x.ownerId === departing.id);
        const hasCrmAssignment = objects.some(x => x.module === 'crm' && x.assigneeId === departing.id);
        const crmTargetId = payload.crmTargetId || null;
        if (owned.length && (!target || target.id === departing.id || !active(s, target.id, task.groupId))) return fail('项目型对象必须选择一个同组 ACTIVE 接收人；未指定可继续保留 REMOVING');
        if (target && (!active(s, target.id, task.groupId) || target.id === departing.id)) return fail('接收人须为同组其他 ACTIVE 成员');
        if (crmTargetId && (!hasCrmAssignment || crmTargetId === departing.id || !active(s, crmTargetId, task.groupId))) return fail('CRM 接收人须为同组其他 ACTIVE 成员，且仅适用于存在原对接记录的任务');
        if (!task.organizationExit && !departing.memberships.some(x => x.groupId !== task.groupId && x.status === 'ACTIVE')) return fail('最后一个业务组：请先加入另一真实组或改为组织移出');
        objects.forEach(x => {
          if (x.ownerId === departing.id) { clearConversationOwner(s,x.id); x.ownerId = target.id; }
          if (x.module === 'crm' && x.assigneeId === departing.id) x.assigneeId = crmTargetId;
          x.collaborators = x.module==='crm'?[]:x.collaborators.filter(c => c.uid !== departing.id && c.uid !== x.ownerId && c.uid !== x.assigneeId);
        });
        clearConversationMember(s,departing.id,task.groupId);
        membership(s, departing.id, task.groupId).status = 'REMOVED'; task.status = 'COMPLETED'; task.targetId = target?.id || null;
        task.crmTargetId = crmTargetId; task.hasCrmAssignment = hasCrmAssignment;
        if(h&&h.taskIds.every(tid=>s.tasks.find(t=>t.id===tid)?.status==='COMPLETED'))h.status='COMPLETED';
        s.notifications.push({ id: id('notice'), scope: 'group', groupId: task.groupId, title: group(s, task.groupId).name + '：' + departing.name + ' 的本组交接已完成', message: '原组、历史创建人、用量与资金承担快照保持不变', uid: actorId, at: new Date().toISOString() });
        if (task.organizationExit && s.tasks.filter(t => t.uid === departing.id && t.organizationExit).every(t => t.status === 'COMPLETED')) {
          departing.status = 'REMOVED';
          s.notifications.push({ id: id('notice'), scope: 'organization', groupId: null, title: departing.name + ' 的组织清退已完成', message: '所有组的清退子任务均已完成，组织成员关系已移除', uid: task.initiatedBy || actorId, at: new Date().toISOString() });
        }
        message = businessAction?'本组业务交接已完成；系统按原移除决定结束组关系':'无业务交接项已确认；系统结束成员关系'; break;
      }
      case 'archiveGroup': {
        if (!g || g.status !== 'ACTIVE') return fail('该组不存在或已归档');
        if (g.isDefault) return fail('默认组必须始终存在，不可归档');
        if (!canArchiveGroup(s,actorId,g.id)) return fail('Admin 归档组策略未开启；仅 Owner 可归档业务组');
        if (payload.confirmIrreversible !== true) return fail('请二次确认归档不可自行解除；异常恢复仅可转线下处理');
        const owner = s.users.find(x => x.orgRole === 'owner');
        if (active(s, owner.id, g.id) && !owner.memberships.some(x => x.groupId !== g.id && x.status === 'ACTIVE' && group(s, x.groupId)?.status === 'ACTIVE')) return fail('组织 Owner 需要保留另一个有效业务组');
        if (g.fundBalance > 0) extra.fundEventId = recordFunds(s, actorId, 'archive_return', g.fundBalance, { group: g, reason: '归档返还未占用余额', groupDelta: -g.fundBalance });
        g.paymentEnabled = false; g.status = 'ARCHIVED'; message = '组已冻结归档；未占用余额已返还组织，历史与既有资金承诺保留'; break;
      }
      case 'addCollaborator': {
        if (!p || !rights.manage) return fail('仅对象 Owner/Assignee 或被授予管理协作者能力的人可操作');
        if (p.module === 'resource' && p.sharingMode !== 'selected') return fail('收藏夹仅在指定成员模式下添加名单；本组公开及组长来源不能逐人取消');
        if (!u || !active(s, u.id, p.groupId)) return fail('候选协作者必须为对象所属组 ACTIVE 成员');
        if ([p.ownerId, p.assigneeId].includes(u.id)) return fail('该账号已是 Owner/Assignee，不新建重复协作身份');
        if (p.collaborators.some(c => c.uid === u.id)) return fail('该账号已有显式协作关系');
        if(p.module==='email'&&(s.conversations||[]).some(c=>c.projectId===p.id&&c.assignedUids.includes(u.id)))return fail('该账号已是本项目下对话的转交人；请先移除对话转交关系，再加入项目协作者');
        p.collaborators.push({ uid: u.id, disabled: false, canManage: false, canExecute: false }); message = '协作者已加入，获得当前对象常规业务读写；附加能力默认关闭'; break;
      }
      case 'removeCollaborator': {
        if (!p || !rights.manage) return fail('没有管理协作者权限');
        const before = p.collaborators.length; p.collaborators = p.collaborators.filter(c => c.uid !== payload.uid);
        if (before === p.collaborators.length) return fail('只有系统来源时不可手动删除；请检查组织策略');
        message = '显式协作关系已删除；系统 T2 等其他独立来源仍可能生效'; break;
      }
      case 'setCapability': {
        if (p?.module === 'crm') return fail('CRM 不设置协作者或附加协作能力，使用原四项写权限');
        if (p?.module === 'resource') return fail('收藏夹治理仅 Owner 专属，不可授予管理协作者等附加能力');
        if (p?.module === 'monitor') return fail('内容监控不新增管理协作者委派，项目治理和名单仅 Owner');
        const emailManager=p?.module==='email'&&payload.capability==='canManage'&&rights.manage;
        if (!p || !(rights.grant||emailManager)) return fail('仅对象 Owner 可授予附加能力；邮件名单管理员可继续授予名单管理权');
        if (!['canManage', 'canExecute'].includes(payload.capability) || (payload.capability === 'canExecute' && p.module !== 'payment')) return fail('该对象不支持此附加能力');
        const c = p.collaborators.find(x => x.uid === payload.uid && !x.disabled);
        if (!c || !active(s, c.uid, p.groupId)) return fail('只有有效显式 Collaborator 可获附加能力');
        c[payload.capability] = !!payload.value; message = emailManager?'邮件名单管理权已更新；沿用现有可继续授予的规则':'附加能力已更新，不产生可继续转授的资格'; break;
      }
      case 'setConversationAssignments': {
        const c=conversation(s,payload.conversationId),context=c&&project(s,c.projectId),r=conversationAccess(s,actorId,payload.conversationId);
        if(!c||!r.manageAssignments)return fail('仅所属邮件项目 Owner 可设置对话转交人');
        const uids=payload.uids;
        if(!Array.isArray(uids)||uids.length>50||new Set(uids).size!==uids.length)return fail('请选择0至50个不重复的转交人；空选表示取消全部转交');
        if(uids.some(uid=>!active(s,uid,context.groupId)||uid===context.ownerId||formalEmailMember(context,uid)))return fail('转交人须为同组有效成员，且不能是项目 Owner 或正式项目协作者');
        c.assignedUids=[...uids];
        if(uids.length)delete c.unreadBy[context.ownerId];
        message=uids.length?'对话转交人已更新；不改变项目 Owner 或协作者，后续提醒不再发给 Owner':'全部转交人已移除；后续提醒恢复 Owner，历史未读不会补回';break;
      }
      case 'simulateConversationIncoming': {
        const c=conversation(s,payload.conversationId),r=conversationAccess(s,actorId,payload.conversationId);
        if(!c||!r.read)return fail('需要对话的有效组内访问权才能运行来信示意');
        const context=project(s,c.projectId),at=new Date().toISOString();
        c.hasReply=true;c.preview='虚构来信：已收到合作方案，期待进一步沟通。';
        conversationRecipients(s,c.id).forEach(uid=>{
          c.unreadBy[uid]=(c.unreadBy[uid]||0)+1;
          s.notifications.push({id:id('notice'),scope:'conversation',groupId:context.groupId,conversationId:c.id,title:c.creatorName+' 的示例来信',message:'本地示意通知；未连接真实邮箱或发信服务',uid,at});
        });
        message='已模拟一封来信及当前有效接收人；未执行真实收发、解锁或扣量';break;
      }
      case 'setCollectionMode': {
        if (!p || p.module !== 'resource' || !rights.manage) return fail('只有收藏夹 Owner 可修改共享模式、说明及指定名单');
        if (!['private','group','selected'].includes(payload.mode)) return fail('请选择私有、本组公开或指定成员');
        const description = String(payload.description ?? p.description ?? '').trim();
        if (description.length > 500) return fail('收藏夹说明不能超过 500 个字符');
        if (payload.mode !== 'selected' && p.collaborators.length && payload.confirmClear !== true) return fail('切出指定成员模式将移除原指定名单，请显式确认；组长系统来源不受影响');
        if (payload.mode !== 'selected') p.collaborators = [];
        p.sharingMode = payload.mode; p.description = description;
        message = '收藏夹范围与说明已更新；组长隐式来源仍仅受全局策略控制，未变更配额'; break;
      }
      case 'addCollectionItem': {
        if (!p || p.module !== 'resource' || !rights.write) return fail('需要该收藏夹的有效内容写权限');
        const name = String(payload.name || '').trim(), platform = String(payload.platform || 'YouTube'), note = String(payload.note || '').trim();
        if (!name || name.length > 100 || note.length > 500 || !['YouTube','Instagram','TikTok','X'].includes(platform)) return fail('请填写有效样例达人、平台和备注（名称最多100字、备注最多500字）');
        const item = {id:id('collection-item'),name,platform,note};
        p.items = [...(p.items || []),item]; extra.itemId = item.id;
        message = '样例达人已加入夹内容；未执行真实收藏、解锁或配额变更'; break;
      }
      case 'editCollectionItem':
      case 'removeCollectionItem': {
        if (!p || p.module !== 'resource' || !rights.write) return fail('需要该收藏夹的有效内容写权限');
        const item = p.items?.find(x => x.id === payload.itemId);
        if (!item) return fail('收藏夹样例条目不存在');
        const note = String(payload.note || '').trim();
        if (type === 'editCollectionItem' && note.length > 500) return fail('备注不能超过500个字符');
        if (type === 'editCollectionItem') item.note = note;
        else p.items = p.items.filter(x => x.id !== item.id);
        message = type === 'editCollectionItem' ? '收藏备注已更新；未改写平台达人档案或夹设置' : '样例条目已移除；未执行真实删除或返还解锁配额'; break;
      }
      case 'setMonitorProjectSettings': {
        if (!p || p.module !== 'monitor' || !rights.manage) return fail('只有监控项目 Owner 可以修改项目说明');
        if (Object.keys(payload).some(key => !['projectId','description'].includes(key))) return fail('本表单仅修改项目说明，不变更内容、名单、责任或额度');
        const description = String(payload.description ?? '').trim();
        if (description.length > 500) return fail('项目说明不能超过500个字符');
        p.description = description;
        message = '项目说明已更新；监控内容、协作来源和配额未改变'; break;
      }
      case 'editMonitorItem': {
        if (!p || p.module !== 'monitor' || !rights.write) return fail('需要该监控项目的有效内容写权限');
        if (Object.keys(payload).some(key => !['projectId','itemId','note','responsibleUid'].includes(key))) return fail('这里只修改样例备注和内容负责人；时长、系统指标及配额须按原流程另行处理');
        const item = p.items?.find(x => x.id === payload.itemId);
        if (!item) return fail('监控样例内容不存在');
        const note = String(payload.note ?? item.note ?? '').trim();
        const responsibleUid = payload.responsibleUid ?? item.responsibleUid;
        if (note.length > 500 || !responsibleUid || !active(s,responsibleUid,p.groupId)) return fail('备注最多500字，内容负责人须为项目所属组有效成员');
        item.note = note; item.responsibleUid = responsibleUid;
        message = '样例内容备注和负责人已更新；未转交项目 Owner、扩展访问权或改变监控配额'; break;
      }
      case 'transferOwner': {
        if(p?.module==='crm')return fail('CRM 对接人转交沿用 CRM 改派入口，不使用项目 Owner 转交');
        if (!p || !rights.transfer) return fail('仅当前 Owner 可主动转交；邮件及支付对象仅通过账号级交接变更负责人');
        if (!active(s, payload.targetId, p.groupId) || payload.targetId === p.ownerId) return fail('新 Owner 必须为同组其他 ACTIVE 成员');
        p.ownerId = payload.targetId; p.collaborators = p.collaborators.filter(c => c.uid !== payload.targetId);
        message = 'Owner 已转交；新 Owner 的重复 ACL 已清理，原 Owner 不自动成为协作者'; break;
      }
      case 'assignCRM': {
        if (!p || p.module !== 'crm' || !rights.write) return fail('CRM 指派和改派沿用原普通记录写权限，并限记录所属组');
        if (!payload.targetId || !active(s, payload.targetId, p.groupId)) return fail('请选择同组 ACTIVE 对接人；日常不主动清空');
        p.assigneeId = payload.targetId; p.collaborators = []; message = 'CRM 对接人已改派；记录组和其他组业务记录不变，不产生协作名单'; break;
      }
      case 'saveCRMRecord': {
        if(!p||p.module!=='crm'||!rights.write)return fail('需要记录所属组有效身份及原 CRM 编辑权限');
        if(Object.keys(payload).some(key=>!['projectId','cooperationStatus','note'].includes(key)))return fail('普通 CRM 编辑仅修改本记录进度和备注，不改基础资料、对接人或授权');
        const cooperationStatus=payload.cooperationStatus??p.cooperationStatus,note=String(payload.note??p.note??'').trim();
        if(!['待跟进','洽谈中','合作中','已完成'].includes(cooperationStatus)||note.length>500)return fail('请选择示例合作状态，备注最多500字');
        p.cooperationStatus=cooperationStatus;p.note=note;message='本组 CRM 合作信息已保存；共享基础资料、其他组记录及配额不变';break;
      }
      case 'setCRMWritePermissions': {
        if(!canManageOrganization(s,actorId))return fail('既有 CRM 数据管理设置仅由组织管理身份操作');
        const permissions=payload.permissions;
        if(!Array.isArray(permissions)||permissions.some(v=>![1,2,3,4].includes(v))||new Set(permissions).size!==permissions.length)return fail('仅支持 CRM 原四项写权限，选项不可重复');
        s.crmWritePermissions=[...permissions];message='CRM 原四项写权限已更新，仍先按记录所属组隔离；未新增协作者';break;
      }
      case 'moveProjects': {
        const targetGroup = group(s, payload.targetGroupId), sourceGroup = group(s, payload.sourceGroupId);
        if (!u || !targetGroup || !sourceGroup || payload.targetGroupId === payload.sourceGroupId || !active(s, u.id, targetGroup.id)) return fail('Owner 必须先加入有效目标组，且来源和目标不同');
        const moved = s.projects.filter(x => x.ownerId === u.id && x.groupId === sourceGroup.id && x.module !== 'crm' && x.status !== 'DELETED');
        moved.forEach(x => { x.groupId = targetGroup.id; x.collaborators.forEach(c => c.disabled = !active(s, c.uid, targetGroup.id)); });
        message = '已迁移该 Owner 在来源组的 ' + moved.length + ' 个项目；目标组外 ACL 禁用保留，资金历史不变'; break;
      }
      case 'setGroupPaymentAccess': {
        if (!g || g.status !== 'ACTIVE' || typeof payload.enabled !== 'boolean') return fail('请选择有效组及明确的支付开通状态');
        if (g.paymentEnabled === payload.enabled) return fail('组支付状态没有变化');
        const reason = String(payload.reason || '').trim();
        if (payload.enabled) {
          const amount = Number(payload.amount ?? 0);
          if (!validMoney(amount) || amount > balances(s, g.id).unallocated) return fail('首次分配须为非负金额（最多两位小数），且不得超过组织未分配余额');
          if(usesSharedFunds(s,g.id)&&amount!==0)return fail('默认组共享组织未分配可用余额，不重复分配专用余额');
          if (amount > 0 && !reason) return fail('首次分配必须填写原因');
          g.paymentEnabled = true; g.fundCycle += 1;
          if (amount > 0) extra.fundEventId = recordFunds(s, actorId, 'allocate', amount, { group: g, reason, groupDelta: amount });
          message = usesSharedFunds(s,g.id)?'默认组支付已开通；共享组织未分配可用余额，不占用其他组资金':'组支付已开通；仅可使用该组专用可用余额';
        } else {
          if (g.fundBalance > 0) extra.fundEventId = recordFunds(s, actorId, 'close_return', g.fundBalance, { group: g, reason: reason || '关闭支付返还未占用余额', groupDelta: -g.fundBalance });
          g.paymentEnabled = false;
          message = '组支付已关闭；未占用余额返还组织，既有占用保留';
        }
        break;
      }
      case 'allocateFunds':
      case 'returnFunds': {
        const amount = Number(payload.amount);
        if (!g || g.status !== 'ACTIVE' || !g.paymentEnabled || !validMoney(amount) || amount <= 0) return fail('请选择已开通支付的有效组，调整金额须大于 0 且最多两位小数');
        if(usesSharedFunds(s,g.id))return fail('默认组共享余额没有独立分配或收回动作；已分配到其他组的资金不属于此余额');
        const reason = String(payload.reason || '').trim(), allocating = type === 'allocateFunds';
        if (!reason) return fail('资金调整必须填写原因');
        if (allocating && amount > balances(s, g.id).unallocated) return fail('组织未分配余额不足，不能超额分配');
        if (!allocating && amount > g.fundBalance) return fail('只能收回该组未占用的可用余额');
        const relatedEventId = payload.relatedEventId;
        if (relatedEventId && (!allocating || !s.fundEvents.some(e => e.id === relatedEventId && e.type === 'topup' && e.walletDelta > 0))) return fail('只能关联本组织已到账的充值流水');
        extra.fundEventId = recordFunds(s, actorId, allocating ? 'allocate' : 'return', amount, { group: g, reason, relatedEventId, groupDelta: allocating ? amount : -amount });
        message = allocating ? '资金已分配到组专用余额' : '组未占用余额已收回到组织未分配余额'; break;
      }
      case 'rechargeFunds': {
        const amount = Number(payload.amount);
        if (!validMoney(amount) || amount <= 0) return fail('充值金额须大于 0 且最多两位小数');
        if (payload.groupId) return fail('线下充值只能进入组织待分配余额，请另行分配');
        extra.fundEventId = recordFunds(s, actorId, 'topup', amount, { reason: '模拟线下充值到账', walletDelta: amount });
        message = '模拟到账已记录，资金进入组织待分配余额'; break;
      }
      case 'setPaymentLimit': {
        if (!g || !leadQuota(s, actorId, g.id)) return fail('只有获委派的本组 T2 可配置个人支付上限；组织管理身份不越级');
        if (!m || m.status !== 'ACTIVE' || !(payload.limit === null || number(payload.limit))) return fail('请选择有效组成员和合法金额，null 表示不设额外个人上限');
        m.paymentLimit = payload.limit === null ? null : Number(payload.limit); message = '账号支付上限已保存；仍受组资金和组织钱包约束'; break;
      }
      case 'saveRecipient': {
        if (!a.memberships.some(mm=>active(s,actorId,mm.groupId))) return fail('需要本组织有效业务身份；模板共享不绕过冻结或退出限制');
        const existing=payload.recipientId ? recipient(s,payload.recipientId) : null;
        if (payload.recipientId && !existing) return fail('收款模板不存在或已删除');
        const fields=Object.fromEntries(['channelId','channelName','name','account'].map(key=>[key,String(payload[key]||'').trim()]));
        if (Object.values(fields).some(value=>!value)) return fail('请填写频道、收款人及示例收款账号');
        const key=r=>[r.channelId.trim().toLowerCase(),r.name.trim().toLowerCase(),r.account.replace(/\s/g,'').toLowerCase()].join('\u0000');
        if (s.recipients.some(r=>r.status==='ACTIVE'&&r.id!==existing?.id&&key(r)===key(fields))) return fail('同频道已有相同收款信息，不重复保存；真实字段去重规则留到 Spec');
        const saved=existing||{id:id('recipient'),source:'组织共享',status:'ACTIVE'};
        Object.assign(saved,fields);
        if (!existing) s.recipients.push(saved);
        extra.recipientId=saved.id;message='组织共享收款模板已保存；不修改任何已保存支付单的收款快照';break;
      }
      case 'deleteRecipient': {
        if (!a.memberships.some(mm=>active(s,actorId,mm.groupId))) return fail('需要本组织有效业务身份');
        const r=recipient(s,payload.recipientId);
        if (!r) return fail('收款模板不存在或已删除');
        r.status='DELETED';message='收款模板已从快捷选择中移除；已有支付单及草稿的收款信息保持不变';break;
      }
      case 'savePayment': {
        const amount = Number(payload.amount);
        if (!p || p.module !== 'payment' || !rights.write || p.status !== 'DRAFT') return fail('只有有效 Owner/Collaborator 可修改草稿');
        if(!group(s,p.groupId)?.paymentEnabled)return fail('本组未开通支付，不能保存草稿；原草稿和资金责任保留');
        if (!validMoney(amount) || amount <= 0) return fail('金额必须大于 0 且最多两位小数');
        const selected=payload.recipientId !== undefined ? recipient(s,payload.recipientId) : null;
        if (payload.recipientId !== undefined && !selected) return fail('请选择有效的示例历史收款模板');
        if (selected) {p.recipientId=selected.id;p.recipientSnapshot=clone(selected);}
        p.paymentAmount = amount; message = '草稿已保存；未创建正式支付单，暂不形成资金占用'; break;
      }
      case 'submitPayment': {
        if (!p || p.module !== 'payment' || !rights.execute || p.status !== 'DRAFT') return fail('正式提交需要 Owner 或显式 can_execute_payment，且对象必须是草稿');
        if (!group(s, p.groupId)?.paymentEnabled) return fail('本组尚未开通支付，不能正式提交');
        if (!active(s, p.ownerId, p.groupId)) return fail('Owner 不是同组有效成员，需先完成移交');
        const money = balances(s, p.groupId, p.ownerId), amount = p.paymentAmount;
        if (money.orgAvailable < amount) return fail('组织钱包可用余额不足');
        if (money.groupRemaining < amount) return fail('所属组支付余额不足');
        if (money.memberRemaining < amount) return fail('Owner 个人支付上限不足；不使用提交人的个人额度');
        const gg = group(s, p.groupId), mm = membership(s, p.ownerId, p.groupId);
        p.scheduled = !!payload.scheduled; p.scheduledAt = payload.when || null;
        p.fundingUid = p.ownerId; p.fundingGroupId = p.groupId; p.fundingCommitted = true; p.submitterId = actorId;
        const decision=paymentReview(s,p);p.reviewSkipReason=decision.reason;
        p.status = decision.required ? 'WAITING_REVIEW' : payload.scheduled ? 'SCHEDULED' : 'FORMAL';
        p.fundingMode=usesSharedFunds(s,gg.id)?'shared':'dedicated';
        p.fundingCycle = gg.fundCycle; p.fundingMemberIndex = user(s, p.ownerId).memberships.indexOf(mm);
        mm.paymentPending = roundMoney(mm.paymentPending + amount);
        extra.fundEventId = recordFunds(s, actorId, 'hold', amount, { group: gg, project: p, reason: '正式提交占用原资金', groupDelta: p.fundingMode==='shared'?0:-amount, pendingDelta: amount });
        message = '正式提交已占用 Owner 与所属组金额；实际提交人仅记录执行身份' + (p.status === 'WAITING_REVIEW' ? '，已进入待组长审核' : ''); break;
      }
      case 'cancelPayment': {
        if (!p || !rights.execute || !p.fundingCommitted || !['FORMAL', 'SCHEDULED', 'WAITING_REVIEW', 'SCHEDULE_EXPIRED'].includes(p.status)) return fail('需要资金执行权和可取消的正式支付单');
        extra.fundEventId = settlePayment(s, actorId, p, false);
        message = '支付单已作废；按原组与资金周期释放占用，不改写历史'; break;
      }
      case 'refundPayment': {
        const amount = Number(payload.amount), totalRefunded = roundMoney((p?.refundedAmount || 0) + amount);
        if (!p || p.module !== 'payment' || p.status !== 'PAID' || !validMoney(amount) || amount <= 0 || totalRefunded > p.paymentAmount) return fail('只确认已支付单实际到账的退款，累计不得超过原支付金额');
        const gg = group(s, p.fundingGroupId), toGroup = acceptsFundingReturn(gg, p);
        p.refundedAmount = totalRefunded;
        const original=fundingMembership(s,p);
        if(original)original.paymentUsed=Math.max(0,roundMoney((original.paymentUsed||0)-amount));
        extra.fundEventId = recordFunds(s, actorId, 'refund', amount, { group: gg, project: p, reason: '模拟确认退款到账', walletDelta: amount, groupDelta: toGroup ? amount : 0 });
        message = (toGroup ? '退款已回到原组专用余额' : '退款已回到组织共享未分配余额')+'；原承担人对应个人已用已冲回，不提高配置上限或恢复失效身份'; break;
      }
      case 'deleteDraft': {
        if (!p || p.module !== 'payment' || !rights.delete) return fail('只有 Owner/有效 Collaborator 可删除草稿；正式支付单不能删除');
        p.status = 'DELETED'; message = '草稿已删除；正式支付和资金历史未受影响'; break;
      }
      case 'releasePayment': {
        const waitingSchedule = p?.scheduled && p.status === 'WAITING_REVIEW';
        if (!p || !rights.execute || !p.fundingCommitted || (!waitingSchedule && !['FORMAL', 'SCHEDULED'].includes(p.status))) return fail('需要执行权和可放行订单');
        const decision=paymentReview(s,p),needsReview=decision.required;p.reviewSkipReason=decision.reason;
        if ((waitingSchedule||p.status === 'SCHEDULED') && needsReview) {
          p.status = 'SCHEDULE_EXPIRED'; message = '预约到期时尚未通过审核；不执行、不补审，原占用保留，可作废'; break;
        }
        if (needsReview) { p.status = 'WAITING_REVIEW'; message = '已进入待组长放行（评审示意）'; break; }
        extra.fundEventId = settlePayment(s, actorId, p, true);
        message = '已模拟支付执行，原承担人的占用转已支付'; break;
      }
      case 'reviewPayment': {
        if (!p || p.status !== 'WAITING_REVIEW' || !p.fundingCommitted || !isLead(s, actorId, p.groupId)) return fail('只有同组 ACTIVE T2 可以审核待放行单');
        if(!paymentReview(s,p).required)return fail('按当前策略与资格无需组长审核，不得用过期审核动作推进');
        p.reviewedBy = actorId;
        if (p.scheduled) { p.status = 'SCHEDULED'; message = '定时单预审核已通过，等待预约时点；资金快照保持不变'; }
        else {
          extra.fundEventId = settlePayment(s, actorId, p, true);
          message = '任一同组 T2 已通过最终闸门并模拟执行；资金承担快照保持不变';
        }
        break;
      }
      case 'createProject': {
        if (!g || !active(s, actorId, g.id)) return fail('需要有效业务组身份');
        if (!['email', 'monitor', 'resource', 'crm', 'payment'].includes(payload.module)) return fail('未知业务模块');
        const profile=payload.module==='crm'?s.creatorProfiles.find(x=>x.id===payload.creatorProfileId):null;
        if(payload.module==='crm'&&(!profile||['collaborators','assigneeId','ownerId','canManage','canExecute'].some(key=>Object.hasOwn(payload,key))))return fail('请选择共享达人资料；创建 CRM 记录不导入协作名单或额外身份');
        if(profile&&s.projects.some(x=>x.module==='crm'&&x.groupId===g.id&&x.creatorProfileId===profile.id&&x.status!=='DELETED'))return fail('该达人在当前组已有 CRM 记录，不能重复创建；其他组可独立建档');
        const name=String(payload.name|| (profile?profile.name+' · 合作记录':'')).trim();
        if(!name)return fail('需要填写对象名称');
        if (payload.module === 'payment' && !g.paymentEnabled) return fail('本组尚未开通支付，不能新建支付草稿');
        const item = { id: id('project'), name, module: payload.module, groupId: g.id, ownerId: payload.module === 'crm' ? null : actorId, assigneeId: payload.module === 'crm' ? actorId : null, creatorId: actorId, collaborators: [], status: payload.module === 'payment' ? 'DRAFT' : 'ACTIVE', paymentAmount: 500 };
        if(profile)Object.assign(item,{creatorProfileId:profile.id,cooperationStatus:'待跟进',note:''});
        if (payload.module === 'resource') Object.assign(item,{sharingMode:'private',description:'',items:[]});
        if (payload.module === 'monitor') Object.assign(item,{description:'',items:[]});
        s.projects.push(item); extra.projectId = item.id; message = '对象已创建，固定归属于当前业务组'; break;
      }
      case 'renameProject': {
        const name = String(payload.name || '').trim();
        if (!p || !rights.write) return fail('需要当前对象的有效普通写权限');
        if (p.module === 'resource' && !rights.manage) return fail('收藏夹名称属于夹治理，仅 Owner 可修改；协作者只编辑夹内容');
        if (p.module === 'monitor' && !rights.manage) return fail('监控项目名称属于项目治理，仅 Owner 可修改；协作者可维护监控内容');
        if (p.module === 'email' && p.ownerId !== actorId) return fail('邮件项目名称沿用现有规则，仅 Owner 可以修改');
        if (['PAID', 'CANCELLED', 'DELETED'].includes(p.status)) return fail('终态对象不能继续修改');
        if (!name) return fail('请填写对象名称');
        p.name = name; message = '对象名称已更新；企业、组、责任人与历史归属不变'; break;
      }
      case 'deleteProject': {
        if (!p || p.module === 'payment') return fail('支付对象使用专门的草稿删除或正式单作废流程');
        if (p.module === 'crm') return fail('CRM 记录硬删除权限待确认，本示意不提供硬删除');
        if (!rights.delete || p.ownerId !== actorId) return fail('仅当前项目 Owner 可以删除；普通协作写权限不包含删除');
        p.status = 'DELETED'; message = '项目已模拟删除；历史审计继续保留'; break;
      }
      case 'addLabel': {
        if (!g || !active(s, actorId, g.id) || !String(payload.name || '').trim()) return fail('需要有效组身份和标签名称');
        const module = payload.module || 'monitor';
        if (module === 'monitor' && !manageMonitorLabels(s, actorId)) return fail('当前策略限制 T3 管理组织共享监控标签定义');
        s.labels.push({ id: id('tag'), name: String(payload.name).trim(), groupId: g.id, creatorId: actorId, module }); message = '标签定义已创建；createdGroupId 不随创建人转组漂移'; break;
      }
      case 'renameLabel':
      case 'deleteLabel': {
        const label = s.labels.find(x => x.id === payload.labelId);
        if (!label || (label.module !== 'monitor' && (!active(s, actorId, label.groupId) || (payload.groupId && payload.groupId !== label.groupId)))) return fail('需要标签所在组的当前有效身份');
        if (label.module === 'crm') return fail('CRM 标签使用独立高风险动作，不能走普通标签管理绕过');
        if (label.module === 'monitor' && !manageMonitorLabels(s, actorId)) return fail('当前策略仅允许组织管理身份或有效 T2 管理组织共享监控标签定义');
        if (type === 'renameLabel') {
          const name = String(payload.name || '').trim();
          if (!name) return fail('请填写标签名称');
          label.name = name; message = '标签已改名；创建来源组保持不变';
        } else { s.labels = s.labels.filter(x => x.id !== label.id); message = '标签定义已删除（模拟）；不授予任何项目操作权限'; }
        break;
      }
      case 'deleteCRMLabel': {
        const label = s.labels.find(x => x.id === payload.labelId && x.module === 'crm');
        if (!label) return fail('CRM 标签不存在');
        if (a.orgRole !== 'owner') return fail('CRM 标签删除是独立高风险权限；Admin 范围与 T2 委派尚待确认，本示例仅开放组织 Owner');
        s.labels = s.labels.filter(x => x.id !== label.id);
        message = '已删除组织共享 CRM 标签定义（模拟），不以记录写权限替代删除资格'; break;
      }
      default: return fail('该操作尚未纳入示意引擎：' + type);
    }
    if(['setGroupPolicy','setRole','addMembership','removeMembership','cancelRemoval','startOrganizationExit','acceptInvite','completeGroupHandoff','completeRemoval'].includes(type))reconcilePaymentReviews(s);
    s.audit.unshift({ id: id('audit'), actorId, actorName: a.name, action: type, groupId: payload.groupId || p?.groupId || null, objectId: payload.projectId || payload.taskId || payload.uid || payload.recipientId || extra.recipientId || null, message, at: new Date().toISOString() });
    return Object.assign({ ok: true, message }, extra);
  }
  function quota(s,gid,scopeId='email',uid) {
    if(!quotaScopes.some(x=>x.id===scopeId))return null;
    const g=group(s,gid),m=uid?membership(s,uid,gid):null;
    if(!g||(uid&&!m))return null;
    return {organization:scopeId==='email'?s.organization:s.organization.quotas[scopeId],group:scopeId==='email'?g:g.quotas[scopeId],member:m?(scopeId==='email'?m:m.quotas[scopeId]):null};
  }
  return { createState, user, group, project, recipient, membership, active, canManageOrganization, isLead, canRemoveMember, canArchiveGroup, canHandleRemoval, removalObjects, access, conversationAccess, conversationsForGroup, conversationRecipients, conversationSender, usesSharedFunds, balances, act, clone, quotaScopes, quota };
});
