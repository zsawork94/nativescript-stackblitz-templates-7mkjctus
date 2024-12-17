export class User {
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.email = data.email || '';
    this.phone = data.phone || '';
    this.location = data.location || '';
    this.experience = data.experience || '';
    this.services = data.services || [];
    this.rating = data.rating || 0;
    this.ratingCount = data.ratingCount || 0;
    this.isServiceProvider = data.isServiceProvider || false;
  }
}