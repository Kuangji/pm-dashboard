// File-based review copy: share identical data blocks across drill-down links.
(function () {
  'use strict';

  const links = 'brand754:assets:';
  const blocks = 'brand754:asset-block:';

  function putBlock(data) {
    const json = JSON.stringify(data);
    let hash = 2166136261;
    for (let i = 0; i < json.length; i++) hash = Math.imul(hash ^ json.charCodeAt(i), 16777619);
    const stem = blocks + (hash >>> 0).toString(36) + '-' + json.length;
    let name = stem;
    for (let i = 1; ; i++) {
      const previous = localStorage.getItem(name);
      if (previous === json) return name;
      if (previous === null) {
        localStorage.setItem(name, json);
        return name;
      }
      name = stem + '-' + i;
    }
  }

  function getBlock(name) {
    if (typeof name !== 'string' || !name.startsWith(blocks)) throw Error('名单数据无效');
    const raw = localStorage.getItem(name);
    if (raw === null) throw Error('名单数据已失效');
    return JSON.parse(raw);
  }

  function write(key, payload) {
    const { records, views, accounts, ids, ...header } = payload;
    const refs = [];
    for (let i = 0; i < records.length; i += 128) refs.push(putBlock(records.slice(i, i + 128)));
    const manifest = { format: 'blocks-v1', header, records: refs, views: putBlock(views) };
    if (accounts) manifest.accounts = putBlock(accounts);
    if (ids) manifest.ids = putBlock(ids);
    // Publish the link only after every block has been written successfully.
    localStorage.setItem(links + key, JSON.stringify(manifest));
  }

  function read(key) {
    const raw = localStorage.getItem(links + key);
    if (!raw) return null;
    const manifest = JSON.parse(raw);
    if (manifest.format !== 'blocks-v1') return manifest;
    const records = manifest.records.flatMap(getBlock);
    const payload = { ...manifest.header, records, views: getBlock(manifest.views) };
    if (manifest.ids) payload.ids = getBlock(manifest.ids);
    if (manifest.accounts) payload.accounts = getBlock(manifest.accounts);
    return payload;
  }

  function prune() {
    const keep = new Set();
    const candidates = [];
    for (let i = 0; i < localStorage.length; i++) {
      const name = localStorage.key(i);
      if (name.startsWith(blocks)) candidates.push(name);
      if (!name.startsWith(links)) continue;
      let item;
      try { item = JSON.parse(localStorage.getItem(name)); } catch { continue; }
      if (item?.format === 'blocks-v1') {
        for (const block of [...item.records, item.views, item.accounts, item.ids]) keep.add(block);
      }
    }
    for (const name of candidates) if (!keep.has(name)) localStorage.removeItem(name);
  }

  window.BrandAssetStore = {
    read,
    write(key, payload) {
      try { write(key, payload); }
      catch (error) { prune(); throw error; }
    },
    remove(key) {
      localStorage.removeItem(links + key);
      prune();
    }
  };
})();
