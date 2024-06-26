import { NextApiRequest } from 'next/types';
import fetchData from '../../app/pages/api/data';
import { supabase } from '../../utils/supabaseClient';

jest.mock('../../utils/supabaseClient');
describe('Document Management', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetchData should fetch data from allowed table', async () => {
    const mockData = [{ id: 1, content: 'Test Document' }];
    supabase.from = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: mockData, error: null })
    });

    const mockRequest = {
      query: { table: 'documents' },
      cookies: {},
      body: {},
      env: {},
      aborted: false,
      method: 'GET',
      headers: {},
      url: '',
      statusCode: 200,
      statusMessage: 'OK',
      socket: {} as any,
      connection: {} as any,
      httpVersion: '1.1',
      httpVersionMajor: 1,
      httpVersionMinor: 1,
      complete: true,
      rawHeaders: [],
      rawTrailers: [],
      trailers: {},
      setTimeout: jest.fn(),
      destroy: jest.fn(),
      readable: true,
      readableHighWaterMark: 0,
      readableLength: 0,
      readableObjectMode: false,
      upgrade: false
    } as unknown as NextApiRequest;

    const data = await fetchData(mockRequest, { supabase } as any);
    expect(data).toEqual(mockData);
  });
  test('fetchData should throw error for unauthorized table', async () => {
    const mockSupabase = {
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: null, error: 'Unauthorized access attempt to \'unauthorized_table\'. This table is not permitted for direct API access.' })
      })
    } as unknown as NextApiRequest;

    const mockRequest = {
      query: { table: 'unauthorized_table' },
      cookies: {},
      body: {},
      env: {},
      aborted: false,
      method: 'GET',
      headers: {},
      url: '',
      statusCode: 200,
      statusMessage: 'OK',
      socket: {},
      connection: {},
      httpVersion: '1.1',
      httpVersionMajor: 1,
      httpVersionMinor: 1,
      complete: true,
      rawHeaders: [],
      rawTrailers: [],
      trailers: {},
      setTimeout: jest.fn(),
      destroy: jest.fn(),
      readable: true,
      readableHighWaterMark: 0,
      readableLength: 0,
      readableObjectMode: false,
      upgrade: false
    } as unknown as NextApiRequest;
    
    await expect(fetchData(mockRequest, { supabase: mockSupabase } as any)).rejects.toThrow('Unauthorized access attempt to \'unauthorized_table\'. This table is not permitted for direct API access.');
  });
});
