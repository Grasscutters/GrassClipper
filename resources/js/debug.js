const debug = {
  log: async (...args) => {
    const cfg = await getCfg()

    if (cfg.debug) console.log('[DEBUG] ', ...args)
  },
  warn: async (...args) => {
    const cfg = await getCfg()

    if (cfg.debug) console.log('[WARNING] ', ...args)
  },
  error: async (...args) => {
    const cfg = await getCfg()

    if (cfg.debug) console.log('[ERROR] ', ...args)
  }
}