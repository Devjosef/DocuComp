import { createUser, loginUser, updateUserProfile, removeUserFromCompany, getAllUsers, addUserToCompany } from '../../lib/userManagement';
import { supabase } from '../../utils/supabaseClient';

jest.mock('../../utils/supabaseClient');

describe('User Management', async () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createUser should create a new user', async () => {
    const mockUser = { 
      id: '1', 
      email: 'test@example.com', 
      app_metadata: {}, 
      user_metadata: {}, 
      aud: 'authenticated', 
      created_at: new Date().toISOString() 
    };
    jest.spyOn(supabase.auth, 'signUp').mockResolvedValue({ data: {
        user: mockUser,
        session: null
    }, error: null });

    const user = await createUser('test@example.com', 'password');
    expect(user).toEqual(mockUser);
  });

  test('loginUser should log in a user', async () => {
    const mockUser = { 
      id: '1', 
      email: 'test@example.com', 
      app_metadata: {}, 
      user_metadata: {}, 
      aud: 'authenticated', 
      created_at: new Date().toISOString() 
    };
    jest.spyOn(supabase.auth, 'signInWithPassword').mockResolvedValue({ data: {
        user: mockUser,
        session: { 
            access_token: 'mockAccessToken',
            refresh_token: 'mockRefreshToken',
            expires_in: 3600,
            token_type: 'bearer',
            user: mockUser
        } // Provide a mock session object with necessary properties
    }, error: null });

    const user = await loginUser('test@example.com', 'password');
    expect(user).toEqual(mockUser);
  });

  test('updateUserProfile should update user profile', async () => {
    const mockData = { id: '1', name: 'Updated Name' };
    jest.spyOn(supabase.from('users'), 'update').mockReturnThis();
    jest.spyOn(supabase.from('users'), 'match').mockResolvedValue({ data: mockData, error: null });
    const data = await updateUserProfile('1', { name: 'Updated Name' });
    expect(data).toEqual(mockData);
  });

  test('removeUserFromCompany should remove a user from a company', async () => {
    jest.spyOn(supabase.from('users'), 'delete').mockReturnThis();
    jest.spyOn(supabase.from('users'), 'match').mockResolvedValue({ data: null, error: null });
    await expect(removeUserFromCompany('1', '1')).resolves.not.toThrow();
    });

    await expect(removeUserFromCompany('1', '1')).resolves.not.toThrow();
  });

  test('getAllUsers should fetch all users', async () => {
    const mockUsers = [{ id: '1', email: 'test@example.com' }];
    jest.spyOn(supabase.from('users'), 'select').mockResolvedValue({ data: mockUsers, error: null });
    const users = await getAllUsers();
    expect(users).toEqual(mockUsers);
  });

  test('addUserToCompany should add a user to a company', async () => {
    const mockData = { user_id: '1', company_id: '1' };
    jest.spyOn(supabase.from('users'), 'insert').mockResolvedValue({ data: mockData, error: null });

    const data = await addUserToCompany('1', '1');
    expect(data).toEqual(mockData);
  });
