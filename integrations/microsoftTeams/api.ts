import { Client } from '@microsoft/microsoft-graph-client';

export const sendTeamsMessage = async (teamId: string, message: string) => {
    const client = Client.init({
        authProvider: (done) => {
            done(null, teamsConfig.appPassword); // First parameter takes an error if you can't get an access token
        }
    });

    try {
        await client.api(`/teams/${teamId}/sendActivity`)
            .post({ message });
    } catch (error) {
        console.error('Microsoft Teams API error: ', error);
    }
};