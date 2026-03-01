'use server';

import { AlatSchema } from "@/features/alat/lib/shcema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

const createIpm = AlatSchema.omit({id_alat:true});

export async function createIpmAction(formData: FormData) {
  // Simulate a delay for demonstration purposes
  await new Promise((resolve) => setTimeout(resolve, 1000));
  

}

