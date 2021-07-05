/* eslint-disable no-plusplus */
import Resizer from 'react-image-file-resizer';

export function getImageFromBuffer(buffer:any) {
  const imageSrc = `data:image/jpeg;base64,${Buffer.from(buffer).toString('base64')}`;
  return imageSrc;
}

export const resizeFile = (file:any, size:number) => new Promise((resolve) => {
  Resizer.imageFileResizer(
    file,
    size,
    size,
    'JPEG',
    100,
    0,
    (uri) => {
      resolve(uri);
    }
  );
});

export async function getFileFromBase64(string64:string, fileName:string) {
  const trimmedString = string64.replace('dataimage/jpegbase64', '');
  console.log('trimmed string : ', trimmedString);
  const type = 'image/jpeg';
  const imageContent = atob(trimmedString);
  const buffer = new ArrayBuffer(imageContent.length);
  const view = new Uint8Array(buffer);

  for (let n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n);
  }
  const blob = new Blob([buffer], { type });
  return new File([blob], fileName, { lastModified: new Date().getTime(), type });
}
