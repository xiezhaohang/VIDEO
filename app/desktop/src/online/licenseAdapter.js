class LicenseAdapter {
  constructor(license = {}) { this.license = license; }
  canRunLocalJobs(now = Date.now()) {
    if (this.license.status === 'active') return { allowed: true, reason: 'active' };
    const grace = Date.parse(this.license.offline_grace_until || 0);
    if (this.license.status === 'offline_grace' || grace > now) return { allowed: true, reason: 'offline_grace' };
    if (this.license.status === 'revoked') return { allowed: false, reason: 'revoked' };
    return { allowed: true, reason: 'alpha_local_fallback' };
  }
}

module.exports = { LicenseAdapter };
