import crypto from 'crypto';

class CacheLayer {
  private map: Record<string, any> = {};

  set(key: string, value: any) {
    const hash = this.hash(key);
    this.map[hash] = value;
  }

  get(key: string) {
    const hash = this.hash(key);
    return this.map[hash];
  }

  hash(key: string) {
    return crypto.createHash('md5').update(key).digest('hex');
  }
}

export const cache = new CacheLayer();
