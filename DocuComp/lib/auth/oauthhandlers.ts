import { supabase } from "../../utils/supabaseClient";

// Function to handle sign-in with Github
export const signInWithGitHub = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL || "http://localhost3000/welcome",
      },
    });
    
    if (error) throw new Error(`Github login failed: ${error.message}`);
    return { data };
  } catch (error) {
    console.error("Error during GitHub Oauth sign-in:", error);
    throw new Error(`Error during GitHub Oauth sign-in: ${error.message}`);
  }
};

// Function to handle sign-in with Google
export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL || "http://localhost3000/welcome",
      },
    });
  
    if (error) throw new Error(`Google login failed: ${error.message}`);
    return { data };
  } catch (error) {
    console.error("Error during Google Oauth sign-in:", error);
    throw new Error(`Error during Google Oauth sign-in: ${error.message}`);
  }
};

