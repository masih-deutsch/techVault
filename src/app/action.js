"use server";

import { revalidatePath } from 'next/cache';
import { createLib, removeLib, updateLib } from '../components/neon';



export async function createLibAction(prev, formData) {
  try {
    const payload = {
      name: formData.get('name'),
      category: formData.get('category'),
      description: formData.get('description'),
      installCommand: formData.get('installCommand'),
      docsUrl: formData.get('docsUrl')
    };

    if (!payload.name || !payload.category || !payload.description || !payload.installCommand || !payload.docsUrl) {
      return { success: false, message: "All fields are required" };
    }

    const res = await createLib({ ...payload, isBookmarked: false, personalNote: null });
    revalidatePath("/");
    revalidatePath("/mylib");
    return { success: true, message: `${res.name} has been successfully created` };

  } catch (error) {
    return { success: false, message: error.message };
  }
}



export async function updateLibAction(target, prev, formData) {

  try {
    const payload = {
      name: formData.get('name'),
      category: formData.get('category'),
      description: formData.get('description'),
      installCommand: formData.get('installCommand'),
      docsUrl: formData.get('docsUrl')
    };

    if (!payload.name || !payload.category || !payload.description || !payload.installCommand || !payload.docsUrl) {
      return { success: false, message: "All fields are required" };
    }

    const res = await updateLib({
      id: target.id,
      isBookmarked: target.isBookmarked,
      personalNote: target.personalNote,
      ...payload
    });
    revalidatePath("/");
    revalidatePath("/mylib");
    return { success: true, message: `${res.name} has been successfully updated` };

  } catch (error) {
    return { success: false, message: error.message };
  }
}


export async function removeLibAction(id, prev, formData) {
  try {
    const res = await removeLib(id);
    revalidatePath("/");
    revalidatePath("/mylib");
    return { success: true, message: `${res.name} has been removed` };
  } catch (error) {
    return { success: false, message: error.message };
  }
}


export async function isBookmarkedAction(data) {
  try {
    const payload = { ...data, isBookmarked: !data.isBookmarked };
    await updateLib(payload);
    revalidatePath("/");
    revalidatePath("/mylib");
    return { success: true, message: "Your bookmark has been successfully updated" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}