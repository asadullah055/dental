/* "use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const fullName = formData.get("fullName") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1️⃣ AUTH SIGNUP
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signupError) {
    console.log("Signup error:", signupError.message);
    return;
  }

  const userId = signupData.user?.id;
  if (!userId) {
    console.log("User ID missing");
    return;
  }

  // 2️⃣ INSERT PROFILE USING SERVICE ROLE
  const { error: dbErr } = await supabase.from("profiles").insert({
    id: userId,
    full_name: fullName,
    phone: phone,
    email: email,
  });

  if (dbErr) {
    console.log("Profile insert error:", dbErr.message);
    return;
  }

  revalidatePath("/", "layout");
  redirect("/");
}
 */
