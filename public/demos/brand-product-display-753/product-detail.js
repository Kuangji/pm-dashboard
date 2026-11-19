(() => {
  'use strict';
  const D=window.ChannelReviewData,R=window.ProductReviewData;
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const standalone=!!document.querySelector('#product-page');
  const params=new URLSearchParams(location.search);
  const PUBLICATION_ID='product-publications',PUBLICATION_START='2026-05-22',PUBLICATION_END='2026-11-18';
  const state={productId:standalone?(params.get('id')||'p1'):'p1',channelId:standalone?(params.get('channelId')||''):'',page:1,size:10,activeTab:'video',videoSort:'date',status:'available',publicationGrain:'month',publicationBucket:null};
  if(state.channelId&&!R.channels.some(c=>c.id===state.channelId))state.channelId='invalid-channel';
  const host=()=>document.querySelector('#product-page,#product-detail-demo');
  const channel=id=>R.channels.find(c=>c.id===id);
  function brandMarkup(p){const b=D.brands.find(b=>b.id===p.brandId);return b?'<a href="./destination.html?type=brand&id='+b.id+'" target="_blank" rel="noopener">'+esc(b.name)+'</a>':'--';}
  function videoCards(rows){return '<div class="product-video-grid">'+rows.map(v=>'<div class="product-video-item">'+window.ChannelAssociations.card({...v,...Object.fromEntries([['views','viewsValue'],['likes','likesValue'],['comments','commentsValue']].filter(([,key])=>key in v&&!(typeof v[key]==='number'&&Number.isFinite(v[key]))).map(([display])=>[display,'--']))},'plain','product-'+v.id)+'<div class="product-video-author"><span class="channel-avatar">'+esc(channel(v.channelId).name.slice(0,1))+'</span><span><strong>'+esc(channel(v.channelId).name)+'</strong><small>'+esc(channel(v.channelId).handle)+'</small></span></div></div>').join('')+'</div>';}
  const number=value=>typeof value==='number'&&Number.isFinite(value)?value.toLocaleString('zh-CN'):'--';
  const compact=value=>typeof value!=='number'||!Number.isFinite(value)?'--':Math.abs(value)>=10000?Number((value/10000).toFixed(2)).toLocaleString('zh-CN')+'万':number(value);
  const percent=value=>value===null?'--':Number((value*100).toFixed(1))+'%';
  const iconPath=key=>'./assets/product-'+key+'.svg';
  const sectionHeading=title=>'<div class="online-section-heading"><span aria-hidden="true"></span><h2>'+esc(title)+'</h2></div>';
  function ratioChart(title,series,key){
    const total=series?.reduce((sum,item)=>sum+item.value,0);
    const colors={natural:'#87B1FF',paid:'#FCA166',suspected:'#88E0B8'};
    let body;
    if(series===null)body='<div class="product-ratio-empty" role="status">推广类型'+(key==='views'?'或播放量':'')+'数据未提供</div>';
    else if(!total)body='<div class="product-ratio-empty" role="status">暂无可计算的'+esc(title)+'</div>';
    else{
      const circumference=2*Math.PI*76;let offset=0;
      const segments=series.filter(item=>item.value>0).map(item=>{
        const length=item.ratio*circumference,start=offset;offset+=length;
        const label=item.label+'：'+percent(item.ratio)+'（'+number(item.value)+(key==='content'?'条视频':'次播放')+'）';
        return '<circle cx="100" cy="100" r="76" fill="none" stroke="'+colors[item.id]+'" stroke-width="20" stroke-linecap="round" stroke-dasharray="'+Math.max(0,length-3)+' '+(circumference-Math.max(0,length-3))+'" stroke-dashoffset="'+(-start)+'" data-product-ratio="'+item.id+'" data-value="'+item.value+'" data-ratio="'+item.ratio+'"><title>'+esc(label)+'</title></circle>';
      }).join('');
      body='<svg class="product-donut" viewBox="0 0 200 200" role="img" aria-label="'+esc(title+'，'+series.map(item=>item.label+' '+percent(item.ratio)).join('，'))+'"><g transform="rotate(-90 100 100)">'+segments+'</g></svg>';
    }
    const legend=series?'<div class="product-ratio-legend">'+series.map(item=>'<span tabindex="0" title="'+esc(item.label+'：'+number(item.value)+(key==='content'?'条视频':'次播放'))+'"><i style="background:'+colors[item.id]+'"></i><b>'+percent(item.ratio)+'</b>'+esc(item.label)+'</span>').join('')+'</div>':'';
    return '<div class="product-ratio-card" data-product-ratio-chart="'+key+'"><h3>'+esc(title)+'</h3>'+body+legend+'</div>';
  }
  function videoOverview(data){
    const metrics=[['viewsSum','总播放量','views'],['videoCount','总内容量','videos'],['commentsSum','总评论数','comments'],['likesSum','总点赞量','likes']];
    return '<section class="online-module product-video-overview" data-product-overview>'+sectionHeading('关联视频总览')+'<div class="online-card product-overview-card"><div class="product-summary-metrics">'+metrics.map(([key,label,icon])=>'<div class="product-summary-metric"><img src="'+iconPath(icon)+'" alt=""><div><span>'+label+'</span><strong data-product-summary="'+key+'" data-value="'+(data[key]??'unknown')+'" title="'+number(data[key])+'">'+compact(data[key])+'</strong></div></div>').join('')+'</div><div class="product-ratio-grid">'+ratioChart('内容占比',data.contentSeries,'content')+ratioChart('播放量占比',data.viewsSeries,'views')+'</div></div></section>';
  }
  function sortVideos(rows){
    const keys={views:'viewsValue',likes:'likesValue',comments:'commentsValue'};
    const key=keys[state.videoSort];
    // 完整筛后集合排序再分页；缺失置后，真实0有效，同值保留原稳定顺序。
    return rows.map((video,index)=>({video,index})).sort((a,b)=>{
      if(!key)return b.video.date.localeCompare(a.video.date)||a.index-b.index;
      const av=a.video[key],bv=b.video[key],ak=typeof av==='number'&&Number.isFinite(av),bk=typeof bv==='number'&&Number.isFinite(bv);
      if(ak!==bk)return ak?-1:1;
      return (ak?bv-av:0)||a.index-b.index;
    }).map(item=>item.video);
  }
  function productTabs(){
    return '<div class="product-detail-tabs" role="tablist" aria-label="商品详情数据TAB">'+[['video','关联视频'],['influencer','关联网红']].map(([id,label])=>'<button id="product-tab-'+id+'" role="tab" class="'+(state.activeTab===id?'active':'')+'" aria-selected="'+(state.activeTab===id)+'" aria-controls="product-'+id+'-panel" tabindex="'+(state.activeTab===id?'0':'-1')+'" data-product-action="tab" data-tab="'+id+'">'+label+'</button>').join('')+'<small>近180天已收录关联</small></div>';
  }
  function influencerReference(){
    return '<section id="product-influencer-panel" role="tabpanel" aria-labelledby="product-tab-influencer" data-product-influencer-reference><p class="product-filter-context">本TAB沿商品全部关联网红范围，不受「关联视频」TAB的频道筛选或时间段选择影响。</p><div class="product-influencer-skeleton"><h2>关联网红画像 · 沿现有模块</h2><p>规模／分类／平均与中位粉丝、受众分布和流量占比</p><i></i><i></i><h2>关联网红列表 · 沿现有模块</h2><p>播放量／合作规模／互动率／粉丝量榜单</p><i></i><i></i><small>范围隔离示意；本轮不重建以上线上图表。</small></div></section>';
  }
  function page(){
    const p=D.products.find(p=>p.id===state.productId);
    if(!p)return '<h1>商品数据详情</h1><div class="online-no-data">暂无该商品的示意数据</div><a class="btn" href="./index.html#products">返回商品列表</a>';
    // 全部模块共用商品×频道×180天完整去重集合；只有完整清单进一步应用选桶。
    const allRows=state.status==='available'?[...new Map(R.videos(p.id).filter(v=>v.date>=PUBLICATION_START&&v.date<PUBLICATION_END&&(!state.channelId||v.channelId===state.channelId)).map(v=>[JSON.stringify([v.platform??v.platformId??'',v.channelId??'',v.id]),v])).values()]:[];
    const data=R.analytics(allRows,{unavailable:state.status!=='available'});
    const rows=sortVideos(state.publicationBucket?allRows.filter(v=>v.date>=state.publicationBucket.start&&v.date<state.publicationBucket.end):allRows);
    const pages=Math.max(1,Math.ceil(rows.length/state.size));state.page=Math.min(state.page,pages);
    const visible=rows.slice((state.page-1)*state.size,state.page*state.size),selected=channel(state.channelId);
    const selectedLabel=selected?selected.name:state.channelId?'未知频道':'全部频道';
    const totalText=state.status==='unavailable'?'关联数据未提供':'共 '+rows.length+' 条关联视频';
    const picker='<div class="product-channel-picker"><label for="product-channel-search">网红频道</label><div class="product-channel-control"><input id="product-channel-search" role="combobox" aria-autocomplete="list" aria-controls="product-channel-options" aria-expanded="false" autocomplete="off" placeholder="搜索名称或 @账号" value="'+esc(selected?.name||(state.channelId?'未知频道':''))+'"><button data-product-action="clear" aria-label="清除频道筛选" '+(!state.channelId?'disabled':'')+'>×</button></div><div id="product-channel-options" role="listbox" aria-label="频道候选" hidden></div></div>';
    const videoPanel='<section id="product-video-panel" role="tabpanel" aria-labelledby="product-tab-video"><div class="product-video-section-head" data-product-shared-filters><div><span class="muted">筛选本TAB内的总览、占比、趋势与完整清单</span><p class="product-shared-scope">当前频道：<strong>'+esc(selectedLabel)+'</strong> · 近180天已收录关联</p></div>'+picker+'</div>'+videoOverview(data)+
      window.PublicationTrend.render({id:PUBLICATION_ID,title:'商品关联内容发布趋势',rows:allRows,start:PUBLICATION_START,end:PUBLICATION_END,grain:state.publicationGrain,context:'近180天已收录关联 · '+selectedLabel,unavailable:state.status!=='available',selected:state.publicationBucket})+
      '<p class="product-trend-scope-note">点击趋势柱仅筛选下方「全部关联视频」；总览、占比图和趋势保留当前频道整段范围。</p>'+
      (state.publicationBucket?'<div class="product-filter-context" data-product-publication-selection><span>完整清单已选时间段：<strong>'+esc(state.publicationBucket.label)+'</strong></span><button class="btn" data-product-action="publication-clear">清除时间段</button></div>':'')+
      '<section id="videos" class="product-full-videos"><div class="product-video-section-head"><h2>全部关联视频</h2><label class="product-video-sort" for="product-video-sort">排序<select id="product-video-sort" '+(state.status!=='available'?'disabled':'')+'>'+[['date','发布时间 · 最新优先'],['views','播放量 · 从高到低'],['likes','点赞量 · 从高到低'],['comments','评论数 · 从高到低']].map(([value,label])=>'<option value="'+value+'" '+(state.videoSort===value?'selected':'')+'>'+label+'</option>').join('')+'</select></label></div><div class="product-filter-context"><span>当前频道：<strong>'+esc(selectedLabel)+'</strong></span><span>范围：近180天已收录关联</span></div>'+
      (state.status==='unavailable'?'<div class="product-video-empty"><strong>关联数据未提供</strong><p>暂时无法读取关联视频，不能据此判断没有关联。</p></div>':visible.length?videoCards(visible):'<div class="product-video-empty"><strong>当前条件暂无已收录关联视频</strong><p>可清除频道筛选或已选时间段查看其他视频。</p><button class="btn" data-product-action="clear">查看全部频道</button></div>')+
      '<div class="product-video-pagination"><span id="product-video-total" aria-live="polite">'+totalText+'</span><div class="product-pagination-controls"><button data-product-action="prev" aria-label="关联视频上一页" '+(state.page<=1||state.status!=='available'?'disabled':'')+'>‹</button><span>'+state.page+' / '+pages+'</span><button data-product-action="next" aria-label="关联视频下一页" '+(state.page>=pages||state.status!=='available'?'disabled':'')+'>›</button><label for="product-page-size" class="sr-only">关联视频每页数量</label><select id="product-page-size">'+[10,20,50].map(n=>'<option value="'+n+'" '+(state.size===n?'selected':'')+'>'+n+'条/页</option>').join('')+'</select></div></div></section></section>';
    return '<div class="product-detail-module"><h1>商品数据详情</h1><section class="product-detail-header"><img class="product-detail-image" src="'+p.image+'" alt="'+esc(p.name)+'"><div class="product-detail-info"><h2>'+esc(p.name)+'</h2><p>品牌：'+brandMarkup(p)+' <span class="product-info-divider">|</span> 商品ASIN：<span>DEMO-'+p.id.toUpperCase()+'</span></p><p>商品分类：<span class="online-product-category" title="'+esc(p.category)+'">'+esc(p.category)+'</span></p><strong class="online-product-price">'+esc(p.price)+'</strong></div></section>'+productTabs()+(state.activeTab==='video'?videoPanel:influencerReference())+'</div>';
  }
  function updateURL(){if(!standalone)return;const url=new URL(location.href);if(state.channelId)url.searchParams.set('channelId',state.channelId);else url.searchParams.delete('channelId');history.replaceState(null,'',url.pathname+url.search+url.hash);}
  function render(focus=''){const root=host();if(!root)return;root.innerHTML=page();if(focus)root.querySelector(focus)?.focus({preventScroll:true});}
  function choose(id){state.channelId=id;state.page=1;state.publicationBucket=null;updateURL();render('#product-channel-search');hideOptions();}
  function options(query=''){
    const list=document.querySelector('#product-channel-options');if(!list)return;
    const candidates=R.channels.filter(c=>(c.name+' '+c.handle).toLowerCase().includes(query.toLowerCase()));
    list.innerHTML='<button role="option" aria-selected="'+(!state.channelId)+'" data-product-action="channel" data-channel="">全部频道</button>'+candidates.map(c=>'<button role="option" aria-selected="'+(state.channelId===c.id)+'" data-product-action="channel" data-channel="'+c.id+'">'+esc(c.name)+' <small>'+esc(c.handle)+'</small></button>').join('')+(!candidates.length?'<p>没有匹配的频道</p>':'');
    list.hidden=false;document.querySelector('#product-channel-search').setAttribute('aria-expanded','true');
  }
  function hideOptions(){const list=document.querySelector('#product-channel-options');if(list)list.hidden=true;document.querySelector('#product-channel-search')?.setAttribute('aria-expanded','false');}
  document.addEventListener('focusin',e=>{if(e.target.id==='product-channel-search'){options();}else if(!e.target.closest('.product-channel-picker'))hideOptions();});
  document.addEventListener('input',e=>{if(e.target.id==='product-channel-search')options(e.target.value);});
  document.addEventListener('click',e=>{
    const bar=e.target.closest('[data-trend-id="'+PUBLICATION_ID+'"][data-trend-bucket]');
    if(bar&&state.status==='available'){
      const bucket=window.PublicationTrend.getBucket(PUBLICATION_ID,Number(bar.dataset.trendBucket));
      if(!bucket)return;
      state.publicationBucket={start:bucket.start,end:bucket.end,label:bucket.label};state.page=1;
      render('[data-trend-id="'+PUBLICATION_ID+'"][data-trend-bucket="'+bar.dataset.trendBucket+'"]');return;
    }
    const el=e.target.closest('[data-product-action]');
    if(!el){if(!e.target.closest('.product-channel-picker'))hideOptions();return;}
    const action=el.dataset.productAction;
    if(action==='tab'){state.activeTab=el.dataset.tab;render('#product-tab-'+state.activeTab);return;}
    if(action==='channel')choose(el.dataset.channel);
    if(action==='clear')choose('');
    if(action==='publication-clear'){state.publicationBucket=null;state.page=1;render('[data-trend-grain="'+PUBLICATION_ID+'"], [data-trend-id="'+PUBLICATION_ID+'"][data-trend-grain]');}
    if(action==='next'||action==='prev'){state.page+=action==='next'?1:-1;render('[data-product-action="'+action+'"]');}
  });
  document.addEventListener('change',e=>{
    const el=e.target;
    if(el.matches('[data-trend-grain]')&&(el.dataset.trendGrain===PUBLICATION_ID||el.dataset.trendId===PUBLICATION_ID)){
      if(!['day','week','month'].includes(el.value))return;
      state.publicationGrain=el.value;state.publicationBucket=null;state.page=1;
      render('[data-trend-grain="'+PUBLICATION_ID+'"], [data-trend-id="'+PUBLICATION_ID+'"][data-trend-grain]');return;
    }
    if(el.id==='product-video-sort'){if(!['date','views','likes','comments'].includes(el.value))return;state.videoSort=el.value;state.page=1;render('#product-video-sort');return;}
    if(el.id==='product-page-size'){state.size=Number(el.value);state.page=1;render('#product-page-size');}
    if(el.id==='product-video-status'){state.status=el.value;state.page=1;state.publicationBucket=null;render();}
  });
  document.addEventListener('keydown',e=>{
    if(e.target.matches('[data-product-action="tab"]')&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();state.activeTab=e.key==='Home'?'video':e.key==='End'?'influencer':state.activeTab==='video'?'influencer':'video';render('#product-tab-'+state.activeTab);return;}
    if(e.target.id==='product-channel-search'&&e.key==='Enter'){e.preventDefault();const q=e.target.value.toLowerCase();const match=R.channels.find(c=>(c.name+' '+c.handle).toLowerCase().includes(q));if(q&&match)choose(match.id);else options(q);}
    if(e.target.id==='product-channel-search'&&e.key==='ArrowDown'){e.preventDefault();options(e.target.value===channel(state.channelId)?.name?'':e.target.value);document.querySelector('#product-channel-options [role="option"]')?.focus();}
    if(e.target.matches('#product-channel-options [role="option"]')&&['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();const all=[...document.querySelectorAll('#product-channel-options [role="option"]')],i=all.indexOf(e.target);all[(i+(e.key==='ArrowDown'?1:-1)+all.length)%all.length].focus();}
    if(e.key==='Escape'&&e.target.closest('.product-channel-picker')){hideOptions();document.querySelector('#product-channel-search').focus();hideOptions();}
  });
  let drawerState=null;
  function renderChannelDrawer(focus=''){
    const st=drawerState,dialog=document.querySelector('#channel-product-dialog');if(!st||!dialog)return;
    const p=D.products.find(p=>p.id===st.productId),c=channel(st.channelId);
    const rows=st.status==='available'?(st.period?window.BrandPeriodReview.videos(st.productId):R.videos(st.productId).filter(v=>v.channelId===st.channelId)):[];
    const pages=Math.max(1,Math.ceil(rows.length/st.size));st.page=Math.min(st.page,pages);
    const visible=rows.slice((st.page-1)*st.size,st.page*st.size);
    dialog.innerHTML='<div class="online-drawer-header"><h2 id="channel-product-dialog-title">商品关联视频</h2><button class="btn icon" data-product-drawer-action="close" aria-label="关闭商品关联视频" autofocus>×</button></div><div class="online-drawer-body"><div class="channel-product-drawer-header"><img src="'+p.image+'" alt=""><div><a href="'+R.detailHref(p.id)+'" target="_blank" rel="noopener">'+esc(p.name)+'</a><p>当前频道：'+esc(c?.name||'未知频道')+'</p><small>'+esc(st.period?'品牌数据 · '+window.BrandPeriodReview.label():'内容数据 · 沿来源范围')+' · 仅当前频道</small></div></div>'+
      (st.status!=='available'?'<div class="product-video-empty"><strong>关联数据未提供</strong><p>暂时无法读取本频道关联视频。</p></div>':visible.length?videoCards(visible):'<div class="product-video-empty"><strong>暂无已收录关联视频</strong><p>当前频道在该关联范围内没有已收录记录。</p></div>')+
      '<div class="product-video-pagination"><span class="channel-product-video-total" aria-live="polite">'+(st.status==='available'?'共 '+rows.length+' 条关联视频':'关联数据未提供')+'</span><div class="product-pagination-controls"><button data-product-drawer-action="prev" aria-label="商品关联视频上一页" '+(st.page<=1?'disabled':'')+'>‹</button><span>'+st.page+' / '+pages+'</span><button data-product-drawer-action="next" aria-label="商品关联视频下一页" '+(st.page>=pages?'disabled':'')+'>›</button><label class="sr-only" for="channel-product-page-size">商品关联视频每页数量</label><select id="channel-product-page-size">'+[10,20,50].map(n=>'<option value="'+n+'" '+(st.size===n?'selected':'')+'>'+n+'条/页</option>').join('')+'</select></div></div><p class="caption">虚构关联与数值，仅作功能示意；商品详情可查看其他频道。</p></div>';
    if(focus){let target=dialog.querySelector(focus);if(!target||target.disabled)target=dialog.querySelector('.product-pagination-controls button:not(:disabled)')||dialog.querySelector('[data-product-drawer-action="close"]');target?.focus({preventScroll:true});}
  }
  function openChannelDrawer(productId,trigger,status='available',context='content'){
    if(!D.products.some(p=>p.id===productId))return;
    let dialog=document.querySelector('#channel-product-dialog');
    if(!dialog){dialog=document.createElement('dialog');dialog.id='channel-product-dialog';dialog.className='online-drawer channel-product-drawer';dialog.setAttribute('aria-labelledby','channel-product-dialog-title');document.body.append(dialog);}
    drawerState={productId,channelId:R.currentChannelId,page:1,size:10,status,trigger,period:context==='brand'?window.BrandPeriodReview.getRange():null};
    dialog.onclose=()=>{const origin=drawerState?.trigger;dialog.innerHTML='';drawerState=null;if(origin?.isConnected)origin.focus({preventScroll:true});};
    dialog.onclick=e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}};
    renderChannelDrawer();if(!dialog.open)dialog.showModal();
  }
  document.addEventListener('click',e=>{
    const el=e.target.closest('[data-product-drawer-action]');if(!el||!drawerState)return;
    const action=el.dataset.productDrawerAction;
    if(action==='close'){document.querySelector('#channel-product-dialog').close();return;}
    if(action==='next'||action==='prev'){drawerState.page+=action==='next'?1:-1;renderChannelDrawer('[data-product-drawer-action="'+action+'"]');document.querySelector('#channel-product-dialog .online-drawer-body').scrollTop=0;}
  });
  document.addEventListener('change',e=>{if(e.target.id==='channel-product-page-size'&&drawerState){drawerState.size=Number(e.target.value);drawerState.page=1;renderChannelDrawer('#channel-product-page-size');}});
  window.ProductVideoReview={page,openChannelDrawer,cards:videoCards,getState:()=>({...state,publicationBucket:state.publicationBucket?{...state.publicationBucket}:null}),reset:()=>{state.activeTab='video';state.videoSort='date';state.channelId='';state.page=1;state.size=10;state.status='available';state.publicationGrain='month';state.publicationBucket=null;},sampleControl:()=>'<div class="review-baseline-tools"><label for="product-video-status">视频关联样例 <select id="product-video-status"><option value="available" '+(state.status==='available'?'selected':'')+'>已收录数据</option><option value="unavailable" '+(state.status==='unavailable'?'selected':'')+'>关联数据未提供</option></select></label><span class="muted">独立功能示意 · 虚构集合</span></div>'};
  if(standalone){const controls=document.createElement('div');controls.innerHTML=ProductVideoReview.sampleControl();document.querySelector('#product-page').before(controls);render();if(location.hash==='#videos')document.querySelector('#videos')?.scrollIntoView();}
})();
