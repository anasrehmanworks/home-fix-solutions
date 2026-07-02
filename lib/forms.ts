export type FormState = {
  ok: boolean;
  message: string;
};

export function requiredFieldsPresent(formData: FormData, fields: string[]) {
  return fields.every((field) => {
    const value = formData.get(field);
    return value instanceof File ? value.size > 0 : typeof value === "string" && value.trim().length > 0;
  });
}

export function submissionResponse(ok: boolean, message: string, status = 200) {
  return Response.json({ ok, message }, { status });
}

export async function submitToTaskskill(formName: string, formData: FormData) {
  const endpoint = process.env.TASKSKILL_WEBHOOK_URL ?? process.env.TASKSKILL_API_URL;
  if (!endpoint) {
    return { forwarded: false };
  }

  const payload: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};
  for (const [key, value] of formData.entries()) {
    const existing = payload[key];
    if (existing) {
      payload[key] = Array.isArray(existing) ? [...existing, value] : [existing, value];
    } else {
      payload[key] = value;
    }
  }

  const outbound = new FormData();
  outbound.set("formName", formName);
  outbound.set("payload", JSON.stringify(payload, (_key, value) => {
    if (value instanceof File) {
      return { name: value.name, size: value.size, type: value.type };
    }
    return value;
  }));

  for (const [key, value] of formData.entries()) {
    if (value instanceof File && value.size > 0) {
      outbound.append(key, value, value.name);
    }
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: process.env.TASKSKILL_API_KEY
      ? { Authorization: `Bearer ${process.env.TASKSKILL_API_KEY}` }
      : undefined,
    body: outbound
  });

  if (!response.ok) {
    throw new Error(`Taskskill submission failed with status ${response.status}`);
  }

  return { forwarded: true };
}
