import jsforce from 'jsforce';

const conn = new jsforce.Connection({
    oauth2: {
        clientId: salesforceConfig.clientId,
        clientSecret: salesforceConfig.clientSecret,
        redirectUri: 'http://localhost:3000/oauth2/callback'
    }
});

export const getSalesforceData = async () => {
    try {
        await conn.loginWithRefreshToken(salesforceConfig.refreshToken);
        // Perform operations
    } catch (error) {
        console.error('Salesforce API error: ', error);
    }
};