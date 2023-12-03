export const decodeBase64Image = (base64String: string): Promise<string> =>
  new Promise((resolve) => {
    const base64WithoutPrefix = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
    const binaryData = atob(base64WithoutPrefix);

    const arrayBuffer = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i += 1) {
      arrayBuffer[i] = binaryData.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer]);

    const imageUrl = URL.createObjectURL(blob);

    resolve(imageUrl);
  });

export default decodeBase64Image;
