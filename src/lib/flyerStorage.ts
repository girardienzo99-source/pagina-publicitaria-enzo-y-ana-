import type { FlyerData } from '../types';

/** Without a database, admin edits are kept in this browser's localStorage. */
const STORAGE_KEY = 'rcw_flyer_config_v1';

export function loadStoredFlyerConfig(defaults: FlyerData): FlyerData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<FlyerData>;
    return { ...defaults, ...parsed };
  } catch {
    return defaults;
  }
}

export function saveFlyerConfig(data: FlyerData): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function clearStoredFlyerConfig(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
