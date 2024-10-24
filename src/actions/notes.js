"use server";

import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { baseUrl } from "./config";
import { getToken } from "@/lib/token";

export async function fetchNotes() {
  const response = await fetch(`${baseUrl}/notes`);
  const notes = await response.json();
  return notes;
}

export async function fetchNoteById(noteId) {
  const response = await fetch(`${baseUrl}/notes/${noteId}`);

  if (!response.ok) notFound();

  const note = await response.json();
  return note;
}

export async function createNote(formData) {
  const note = Object.fromEntries(formData);

  const token = await getToken();

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const response = await fetch(`${baseUrl}/notes`, {
    method: "POST",
    headers,
    body: JSON.stringify(note),
  });

  await response.json();

  revalidatePath("/notes");
}
