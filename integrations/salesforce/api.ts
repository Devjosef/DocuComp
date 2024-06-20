import jsforce from 'jsforce';
import { salesforceConfig } from './config';

class SalesforceAPI {
  private conn;

  constructor() {
    this.conn = new jsforce.Connection({
      oauth2: {
        clientId: salesforceConfig.clientId,
        clientSecret: salesforceConfig.clientSecret,
        redirectUri: 'http://localhost:3000/oauth2/callback'
      }
    });
  }

  async getSalesforceData() {
    try {
      await this.conn.loginWithRefreshToken(salesforceConfig.refreshToken);
      // Perform operations
    } catch (error) {
      console.error('Salesforce API error:', error);
      throw error;
    }
  }
}

const salesforceAPI = new SalesforceAPI();
export default salesforceAPI;