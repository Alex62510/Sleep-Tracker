"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { checkUser } from "@/lib/checkUser";

interface RecordData {
  text: string | null;
  duration: number;
  date: string;
  startTime: string;
  endTime: string;
}

interface RecordResult {
  data?: RecordData;
  error?: string;
}

async function createSleepRecord(formData: FormData): Promise<RecordResult> {
  const notesValue = formData.get("notes");
  const durationValue = formData.get("duration");
  const dateValue = formData.get("date");
  const startTimeValue = formData.get("startTime");
  const endTimeValue = formData.get("endTime");

  if (
    !durationValue ||
    !dateValue ||
    !startTimeValue ||
    !endTimeValue ||
    startTimeValue === "" ||
    endTimeValue === "" ||
    dateValue === ""
  ) {
    return { error: "Notes, duration, startTime, endTime or date is missing" };
  }

  const text: string = notesValue ? notesValue.toString() : "";
  const startTime: string = startTimeValue.toString();
  const endTime: string = endTimeValue.toString();
  const duration: number = parseFloat(durationValue.toString());
  let date: string;

  try {
    const inputDate = dateValue.toString();
    const [year, month, day] = inputDate.split("-");
    const dateObj = new Date(
      Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), 12, 0, 0),
    );
    date = dateObj.toISOString();
  } catch (error) {
    console.error("Invalid date format:", error);
    return { error: "Invalid date format" };
  }

  const user = await checkUser();
  if (!user) return { error: "User not found" };

  try {
    const createdRecord = await db.record.create({
      data: {
        text,
        duration,
        date,
        startTime,
        endTime,
        userId: user.clerkUserId,
      },
    });

    const recordData: RecordData = {
      text: createdRecord.text,
      duration: createdRecord.duration,
      startTime: createdRecord.startTime,
      endTime: createdRecord.endTime,
      date: createdRecord.date?.toISOString() || date,
    };

    revalidatePath("/");

    return { data: recordData };
  } catch (error) {
    console.error("Error adding sleep record:", error);
    return {
      error: "An unexpected error occurred while adding the sleep record.",
    };
  }
}

export default createSleepRecord;
