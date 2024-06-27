import { getAllUsers, addUserToCompany } from '../../../lib/userManagement';
import { supabase } from '../../../utils/supabaseClient';

jest.mock('../../../utils/supabaseClient');

describe('Supabase User Management', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllUsers should fetch all users', async () => {
    const mockUsers = [{ id: '1', email: 'test@example.com' }];
    supabase.from = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: mockUsers, error: null })
    });

    const users = await getAllUsers();
    expect(users).toEqual(mockUsers);
  });

  test('addUserToCompany should add a user to a company', async () => {
    const mockData = { user_id: '1', company_id: '1' };
    supabase.from = jest.fn().mockReturnValue({
      insert: jest.fn().mockResolvedValue({ data: mockData, error: null })
    });

    const data = await addUserToCompany('1', '1');
    expect(data).toEqual(mockData);
  });
});