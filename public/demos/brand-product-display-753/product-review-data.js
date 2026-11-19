/* Shared, explicitly fictitious relation set for P04 counts and P05 pagination. */
(() => {
  const channels=[
    {id:'channel-star',name:'星野数码评测',handle:'@HoshinoTech'},
    {id:'channel-desk',name:'桌面研究所',handle:'@DeskLab'},
    {id:'channel-north',name:'北境科技',handle:'@NorthTech'},
    {id:'channel-empty',name:'影像实验室',handle:'@VisualLab'}
  ];
  const counts={p1:[12,4,3],p2:[3,2,1],p3:[2,1,1],p4:[2,3,1],p5:[1,1,1],p6:[2,1,0],p7:[1,0,1],p8:[4,0,0],p9:[2,2,0],p10:[1,0,0],p11:[3,0,1],p12:[1,1,0]};
  const associationVideos=[
    {id:'assoc-multi',ad:true,promotionCategory:'paid',title:'桌面工作流的五件升级装备',image:'./assets/video-1.jpg',date:'2026-11-10',duration:'12:36',views:'15.3万',likes:'3420',comments:'128',viewsValue:153000,likesValue:3420,commentsValue:128,brands:['brand-a','brand-b','brand-c'],products:['p1','p2','p3','p4','p5']},
    {id:'assoc-single',ad:false,promotionCategory:'suspected',title:'一台平板，能否替代我的电脑？',image:'./assets/video-2.jpg',date:'2026-10-22',duration:'00:48',views:'8.2万',likes:'2180',comments:'76',viewsValue:82000,likesValue:2180,commentsValue:76,brands:['brand-b'],products:['p4']},
    {id:'assoc-brand-only',ad:false,promotionCategory:'natural',title:'聊聊这个品牌的一年变化',image:'./assets/video-3.jpg',date:'2026-10-12',duration:'10:24',views:'12.6万',likes:'2890',comments:'102',viewsValue:126000,likesValue:2890,commentsValue:102,brands:['brand-c'],products:[]}
  ];
  // Fixed mock aggregates for the complete current-channel relation set, not the visible video page.
  const productMetrics={
    p1:{totalViews:1803000,engagementRatePct:2.0576},p2:{totalViews:507000,engagementRatePct:2.0006},
    p3:{totalViews:333000,engagementRatePct:2.0640},p4:{totalViews:235000,engagementRatePct:2.4698},
    p5:{totalViews:153000,engagementRatePct:2.3190},p6:{totalViews:366000,engagementRatePct:1.8320},
    p7:{totalViews:186000,engagementRatePct:1.8172},p8:{totalViews:708000,engagementRatePct:1.8630},
    p9:{totalViews:366000,engagementRatePct:1.8320},p10:{totalViews:186000,engagementRatePct:1.8172},
    p11:{totalViews:540000,engagementRatePct:1.8472},p12:{totalViews:null,engagementRatePct:null}
  };
  // 同一视频在频道、商品入口共用发布日期；仅筛选范围各自独立。
  const mockDates=['2026-11-16','2026-10-10','2026-08-01','2026-06-01','2026-11-12','2026-10-30','2026-09-10','2026-07-15','2026-11-01','2026-08-24','2026-06-25','2026-11-16'];
  // 显式虚构分类独立于 AD、品牌和商品关系；同一 canonical 视频由上方固定配置覆盖。
  const mockPromotionCategories=['natural','paid','suspected','natural','suspected','paid','natural','paid','suspected','natural','paid','suspected'];
  const cache=new Map();
  function videos(productId){
    if(cache.has(productId))return cache.get(productId);
    const p=ChannelReviewData.products.find(p=>p.id===productId);if(!p)return [];
    let index=0;
    const result=(counts[productId]||[]).flatMap((count,channelIndex)=>Array.from({length:count},(_,i)=>{
      const n=index++;
      return {id:productId+'-video-'+(n+1),productId,channelId:channels[channelIndex].id,title:p.name+' · '+['使用体验','桌面搭配','长期评测','升级记录'][i%4]+' '+(i+1),image:'./assets/video-'+(n%3+1)+'.jpg',date:mockDates[n%mockDates.length],duration:'12:36',views:(18.6-n*.6).toFixed(1)+'万',likes:String(3200-n*51),comments:String(180-n*4),viewsValue:186000-n*6000,likesValue:3200-n*51,commentsValue:180-n*4,promotionCategory:mockPromotionCategories[n%mockPromotionCategories.length],ad:channelIndex===0&&i===0,brands:p.brandId?[p.brandId]:[],products:[productId]};
    })).map(v=>{if(associationVideos[0].products.includes(productId)&&v.channelId===channels[0].id&&v.id===productId+'-video-1')return {...v,...associationVideos[0]};if(productId==='p4'&&v.channelId===channels[0].id&&v.id==='p4-video-2')return {...v,...associationVideos[1]};return v;}).sort((a,b)=>b.date.localeCompare(a.date));
    cache.set(productId,result);return result;
  }
  const count=(id,channelId)=>videos(id).filter(v=>!channelId||v.channelId===channelId).length;
  const detailHref=(id,channelId='')=>'./product.html?id='+encodeURIComponent(id)+(channelId?'&channelId='+encodeURIComponent(channelId)+'#videos':'');
  const clone=value=>Array.isArray(value)?value.map(clone):value&&typeof value==='object'
    ?Object.fromEntries(Object.entries(value).map(([key,item])=>[key,clone(item)])):value;
  const promotionTypes=[{id:'natural',label:'自然传播'},{id:'paid',label:'付费推广'},{id:'suspected',label:'疑似付费推广'}];
  function analytics(rows,{unavailable=false}={}){
    const unknown=()=>({videoCount:null,viewsSum:null,likesSum:null,commentsSum:null,contentSeries:null,viewsSeries:null});
    if(unavailable||!Array.isArray(rows)||rows.some(row=>!row||row.id===undefined||row.id===null||row.id===''))return unknown();
    const seen=new Set();
    const list=rows.filter(row=>{
      const key=JSON.stringify([row.platform??row.platformId??'',row.channelId??'',row.id]);
      if(seen.has(key))return false;
      seen.add(key);return true;
    });
    const known=key=>list.every(row=>typeof row[key]==='number'&&Number.isFinite(row[key]));
    const sum=key=>known(key)?list.reduce((total,row)=>total+row[key],0):null;
    const viewsSum=sum('viewsValue');
    const classified=list.every(row=>promotionTypes.some(type=>type.id===row.promotionCategory));
    const series=key=>promotionTypes.map(type=>{
      const group=list.filter(row=>row.promotionCategory===type.id);
      const value=key?group.reduce((total,row)=>total+row[key],0):group.length;
      const denominator=key?viewsSum:list.length;
      return {id:type.id,label:type.label,value,ratio:denominator===0?null:value/denominator};
    });
    // 不完整指标不参与总和或占比兜底；已知空集合与未知分别返回 0 和 null。
    return clone({videoCount:list.length,viewsSum,likesSum:sum('likesValue'),commentsSum:sum('commentsValue'),
      contentSeries:classified?series(null):null,viewsSeries:classified&&viewsSum!==null?series('viewsValue'):null});
  }
  window.ProductReviewData={associationVideos,productMetrics,channels,videos,count,detailHref,analytics,currentChannelId:'channel-star'};
})();
