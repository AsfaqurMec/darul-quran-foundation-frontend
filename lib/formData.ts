const isFile = (value: unknown): value is File => typeof File !== 'undefined' && value instanceof File;

const appendToFormData = (formData: FormData, key: string, value: unknown): void => {
  if (value === undefined || value === null || value === '') return;
  if (Array.isArray(value)) {
    // For arrays, append each item with the same key (FormData supports multiple values with same key)
    // Or stringify if it's an array of non-file values
    const hasFiles = value.some((item) => isFile(item));
    if (hasFiles) {
      value.forEach((item) => appendToFormData(formData, key, item));
    } else {
      // For non-file arrays, stringify them
      formData.append(key, JSON.stringify(value));
    }
    return;
  }
  if (isFile(value)) {
    formData.append(key, value);
    return;
  }
  formData.append(key, String(value));
};

const containsFile = (value: unknown): boolean => {
  if (Array.isArray(value)) {
    return value.some((item) => containsFile(item));
  }
  return isFile(value);
};

export const buildRequestPayload = (
  data: Record<string, unknown>
): { body: FormData | Record<string, unknown>; headers?: Record<string, string> } => {
  const hasFile = Object.values(data).some((value) => containsFile(value));
  if (!hasFile) {
    return { body: data };
  }
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => appendToFormData(formData, key, value));
  // Let the HTTP client (e.g., axios/fetch) set the Content-Type with proper boundary automatically
  return { body: formData };
};
