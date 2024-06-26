import { checkCompliance } from '../../lib/complianceTracking';
import { supabase } from '../../utils/supabaseClient';

jest.mock('../../utils/supabaseClient');

describe('Compliance Tracking', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('checkCompliance should return compliance status', async () => {
    const mockData = { compliance: true };
    jest.spyOn(supabase, 'from').mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockData, error: null })
    });

    const complianceStatus = await checkCompliance(1);
    expect(complianceStatus).toBe(true);
  });
  test('checkCompliance should throw error if fetching data fails', async () => {
    jest.spyOn(supabase, 'from').mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: { message: 'Error' } })
    });

    await expect(checkCompliance(1)).rejects.toThrow('Failed to check document compliance. Please try again.');
  });
});
