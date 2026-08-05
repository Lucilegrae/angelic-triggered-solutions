"use server";

import { createClient } from "@/utils/supabase/server";

export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get("email") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/auth/callback"
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Password reset email sent." };
}
