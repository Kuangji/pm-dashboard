(() => {
  'use strict';

  const engine = window.Brand754;
  const state = engine.createState('normal');
  const platforms = [['youtube', 'YouTube', '#377DFF'], ['instagram', 'Instagram', '#9C66D8'], ['tiktok', 'TikTok', '#239E91']];
  const colors = ['#FA6300', '#9771CB', '#377DFF', '#8491A5'];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const format = value => value.toLocaleString('zh-CN', {maximumFractionDigits:1});
  const percentage = (count, total) => total ? count * 100 / total : null;
  const percent = value => value === null ? '—' : format(value) + '%';
  const key = video => video.platform + ':' + video.id;
  const byPlatform = (records, platform) => records.filter(record => record.platform === platform);
  const totalViews = records => engine.summarize(records).views;
  const details = new Map();
  const dialog = document.querySelector('#chart-detail');
  let scopeText = '';

  function detailButton(id, label, title, records, caption) {
    details.set(id, {title, records, caption});
    return '<button type="button" class="chart-button" data-drill="' + id + '">' + label + '</button>';
  }
  function card(id, title, caption, body) {
    return '<section class="chart-panel" id="chart-' + id + '"><header><h2>' + title + '</h2><p class="chart-intro">' + caption + '</p></header>' + body + '</section>';
  }
  function bar(value, color) {
    return '<div class="track" aria-hidden="true"><i style="width:' + (value ?? 0) + '%;background:' + color + '"></i></div>';
  }
  function stacked(parts) {
    return '<div class="stack" aria-hidden="true">' + parts.map(part => '<i style="width:' + (part.pct ?? 0) + '%;background:' + part.color + '"></i>').join('') + '</div>';
  }
  function swatch(color) {
    return '<i class="swatch" style="background:' + color + '" aria-hidden="true"></i>';
  }

  function overlapChart(pool, groups) {
    const sets = groups.map(group => new Set(group.records.map(key)));
    const bins = [[], [], [], []];
    for (const item of pool) {
      const first = sets[0].has(key(item));
      const second = sets[1].has(key(item));
      const bucket = first ? (second ? 1 : 0) : (second ? 2 : 3);
      bins[bucket].push(item);
    }
    const names = ['仅'+groups[0].name, '同时命中两者', '仅'+groups[1].name, '均未命中'];
    const parts = bins.map((items,i) => ({pct:percentage(items.length,pool.length),color:colors[i]}));
    const controls = bins.map((items,i) => detailButton('overlap-'+i, swatch(colors[i])+names[i]+'<strong>'+items.length+' 条</strong>',
      names[i], items, '占主品牌视频数 '+percent(parts[i].pct))).join('');
    return card('overlap','子视图重叠','将主池视频按命中组合分成四组，每条视频只计入一组。',
      stacked(parts)+'<div class="segment-controls">'+controls+'</div>');
  }

  function missingChart(pool, uncovered) {
    const rows = platforms.map(([id,name,color]) => {
      const items = byPlatform(uncovered,id);
      const all = byPlatform(pool,id);
      const pct = percentage(items.length,all.length);
      const button = detailButton('missing-'+id,items.length+' / '+all.length+' 条 · '+percent(pct),
        name+' · 未覆盖视频',items,'同平台主品牌视频 '+all.length+' 条，未覆盖 '+items.length+' 条。');
      return '<div class="metric-line"><span>'+name+'</span>'+bar(pct,color)+button+'</div>';
    }).join('');
    return card('missing','各平台未覆盖率','每个平台单独取分母。右侧显示未覆盖数 / 该平台主池视频数。',rows);
  }

  function compositionChart(groups) {
    const rows = groups.map(group => {
      const parts = platforms.map(([id,name,color]) => {
        const records = byPlatform(group.records,id);
        return {id,name,color,records,pct:percentage(records.length,group.records.length)};
      });
      const controls = parts.map(part => detailButton('platform-'+group.id+'-'+part.id,
        swatch(part.color)+part.name+' '+percent(part.pct),group.name+' · '+part.name,part.records,
        '该平台有 '+part.records.length+' 条，占本视图 '+group.records.length+' 条视频的 '+percent(part.pct)+'。')).join('');
      return '<div class="chart-group"><h3 class="series-title">'+group.name+' · '+group.records.length+' 条</h3>'+stacked(parts)+'<div class="platform-controls">'+controls+'</div></div>';
    }).join('');
    return card('platform','平台构成','每行以该子视图的视频数为分母，三段分别表示各平台的组内占比。',rows);
  }

  function sharesChart(pool, groups) {
    const baseViews = totalViews(pool);
    const rows = groups.map(group => {
      const views = totalViews(group.records);
      const videoShare = percentage(group.records.length,pool.length);
      const viewShare = views === null || baseViews === null ? null : percentage(views,baseViews);
      const delta = videoShare !== null && viewShare !== null ? viewShare-videoShare : null;
      const subtitle = delta === null ? '差值 —' : '差值 '+(delta > 0 ? '+' : '')+format(delta)+' 个百分点';
      const lines = [['视频占比',videoShare,colors[0],group.records.length+' / '+pool.length+' 条'],
        ['观看占比',viewShare,colors[2],(views === null ? '—' : format(views))+' / '+(baseViews === null ? '—' : format(baseViews))+' 次观看']].map(([label,pct,color,caption],i) => {
        const records = i ? [...group.records].sort((a,b) => b.views-a.views) : group.records;
        return '<div class="metric-line"><span>'+label+'</span>'+bar(pct,color)+detailButton('share-'+group.id+'-'+i,percent(pct),group.name+' · '+label+'分子',records,caption+'，分母为同批主品牌。')+'</div>';
      }).join('');
      return '<div class="chart-group"><h3 class="series-title">'+group.name+' <small>'+subtitle+'</small></h3>'+lines+'</div>';
    }).join('');
    return card('shares','视频占比与观看占比','比较每个子视图在主池中的两项占比，差值取观看占比减视频占比。',rows);
  }

  function concentrationChart(groups) {
    const rows = groups.map(group => {
      const views = totalViews(group.records);
      const ranked = [...group.records].sort((a,b) => b.views-a.views || key(a).localeCompare(key(b)));
      const top = ranked.slice(0,5);
      const topViews = totalViews(top);
      const pct = views === null || topViews === null ? null : percentage(topViews,views);
      const parts = [{pct,color:colors[0]},{pct:pct===null?null:100-pct,color:'#E5E7EB'}];
      return '<div class="chart-group"><h3 class="series-title">'+group.name+' · '+percent(pct)+'</h3>'+stacked(parts)
        +detailButton('top-'+group.id,'查看前 '+top.length+' 条视频',group.name+' · 观看量前 '+top.length+' 条',top,
          '前 '+top.length+' 条贡献 '+(topViews===null?'—':format(topViews))+' 次观看；本视图共 '+(views===null?'—':format(views))+' 次。')+'</div>';
    }).join('');
    return card('top','头部视频观看集中度','按同一截至时点的观看量排序，前 5 条观看量除以该视图全部视频观看量。视图不足 5 条时使用全部视频。','<div class="top-list">'+rows+'</div>');
  }

  function render() {
    const days = Number(document.querySelector('#range').value);
    const scope = {days,platform:'all'};
    const data = engine.compare(state,scope);
    const contents = id => engine.readComparisonContents(state,id,scope,data.batchId).records;
    const pool = contents('pool');
    const groups = data.rows.map(row => ({...row,records:contents(row.id)}));
    scopeText = data.dateStart+' 至 '+data.dateEnd+' · 全部平台 · 截至 '+data.cutoff+' · '+data.batchId;
    document.querySelector('#scope').textContent = scopeText+' · 主池 '+pool.length+' 条视频';
    details.clear();
    document.querySelector('#charts').innerHTML = overlapChart(pool,groups)+missingChart(pool,contents('uncovered'))
      +compositionChart(groups)+sharesChart(pool,groups)+concentrationChart(groups);
  }

  document.querySelector('#range').addEventListener('change',render);
  document.querySelector('#charts').addEventListener('click',event => {
    const button = event.target.closest('[data-drill]');
    if (!button) return;
    const item = details.get(button.dataset.drill);
    document.querySelector('#detail-title').textContent = item.title;
    document.querySelector('#detail-scope').textContent = scopeText;
    document.querySelector('#detail-metric').textContent = item.caption+' 共 '+item.records.length+' 条明细。';
    const rows = item.records.map(record => '<tr><td>'+escape(record.title)+'</td><td>'+escape(platforms.find(([id])=>id===record.platform)[1])
      +'</td><td>'+record.date+'</td><td>'+(record.views===null?'—':format(record.views))+'</td></tr>').join('');
    document.querySelector('#detail-rows').innerHTML = rows
      ? '<table><thead><tr><th scope="col">视频</th><th scope="col">平台</th><th scope="col">发布日期</th><th scope="col">观看量</th></tr></thead><tbody>'+rows+'</tbody></table>'
      : '<p>当前窗口没有符合条件的视频。</p>';
    dialog.showModal();
    document.querySelector('#detail-rows').scrollTop=0;
  });
  render();
})();
