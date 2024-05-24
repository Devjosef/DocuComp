import { supabase } from '@/lib/supabaseClient'

interface AuditEvent {
    userId: string;
    action: string;
    details: string;
    timestamp: string;
}

class AuditTrail {
    private static instance: AuditTrail;

    private constructor() {}

    public static getInstance(): AuditTrail {
        if (!AuditTrail.instance) {
            AuditTrail.instance = new AuditTrail();
        }
        return AuditTrail.instance;
    }
    
    async logEvent(event: AuditEvent): Promise<void> {
        const { data, error } = await supabase
        .from('audit logs')
        .insert([{
            user_id: event.userId,
            action: event.action,
            details: event.details,
            created_at: event.timestamp
        }]);

        if (error) {
            console.error('Error logging audit event:', error);
            throw error;
        }
        console.log('Audit event logged:', data);
    }
}

export default AuditTrail;