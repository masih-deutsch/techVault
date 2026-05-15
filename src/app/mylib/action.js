"use server";

import { revalidatePath } from 'next/cache';
import { updateLib } from '@/components/neon';
// import { updateLib } from '@/components/api';



export async function removeMyLibAction(target) {
  try {
    const res = await updateLib({ ...target, isBookmarked: !target.isBookmarked });
    revalidatePath("/mylib");
    return { success: true, message: `${res.name} has been removed` };
  } catch (error) {
    return { success: false, message: error.message };
  }
}


export async function personalNoteAction(data) {
  try {
    const res = await updateLib(data);
    revalidatePath("/mylib");
    return { success: true, message: `${res.name} note, has been updated` };
  } catch (error) {
    return { success: false, message: error.message };
  }
}