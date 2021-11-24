import crypto from 'crypto';

type Key = string | Record<string | number, any>;

class CacheLayer {
  private map: Record<string, any> = {};

  set(key: Key, value: any) {
    const normalized = this.normalize(key);
    const hash = this.hash(normalized);
    this.map[hash] = value;
  }

  get(key: Key) {
    const normalized = this.normalize(key);
    const hash = this.hash(normalized);
    return this.map[hash];
  }
  normalize(key: Key) {
    if (typeof key === 'string') return key;
    return JSON.stringify(key);
  }
  hash(key: string) {
    return crypto.createHash('md5').update(key).digest('hex');
  }
}

export const cache = new CacheLayer();
