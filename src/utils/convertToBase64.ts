export const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });

export default convertToBase64;
