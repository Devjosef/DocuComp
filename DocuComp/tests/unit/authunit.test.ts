import { signInWithGitHub, signInWithGoogle } from '../../lib/auth/oauthhandlers';
import { supabase } from '../../utils/supabaseClient';

jest.mock('../../utils/supabaseClient');

describe('OAuth Handlers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('signInWithGitHub should sign in with GitHub', async () => {
    const mockData = { provider: 'github' as const, url: 'https://github.com/login' };
    const mockResponse = { data: mockData, error: null };
    jest.spyOn(supabase.auth, 'signInWithOAuth').mockResolvedValue(mockResponse);

    const result = await signInWithGitHub();
    expect(result.data).toEqual(mockData);
  });

  test('signInWithGoogle should sign in with Google', async () => {
    const mockData = { provider: 'google' as const, url: 'https://google.com/login' };
    const mockResponse = { data: mockData, error: null };
    jest.spyOn(supabase.auth, 'signInWithOAuth').mockResolvedValue(mockResponse);

    const result = await signInWithGoogle();
    expect(result.data).toEqual(mockData);
  });
});