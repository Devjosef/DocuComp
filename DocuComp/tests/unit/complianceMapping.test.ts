import { mapDocumentToCompliance } from '../../lib/complianceMapping';
import { supabase } from '../../utils/supabaseClient';

jest.mock('../../utils/supabaseClient');

describe('Compliance Mapping', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('mapDocumentToCompliance should map a document to a compliance requirement', async () => {
    const mockData = { document_id: 1, compliance_requirement_id: 'XYZ' };
    supabase.from.mockReturnValue({
      insert: jest.fn().mockResolvedValue({ data: mockData, error: null })
    });

    const data = await mapDocumentToCompliance(1, 'XYZ');
    expect(data).toEqual(mockData);
  });
});