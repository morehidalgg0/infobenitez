/**
 * Helper to download images directly to the agent's computer
 */
export const downloadSingleImage = async (url, filename = 'propiedad-foto.jpg') => {
  try {
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) throw new Error('Fetch failed');
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
    return true;
  } catch (err) {
    // Fallback: create temporary direct anchor
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  }
};

export const downloadAllImages = async (images, propertyRef = 'PROPIEDAD', onProgress) => {
  let count = 0;
  for (let i = 0; i < images.length; i++) {
    const imgUrl = images[i];
    const filename = `${propertyRef}-foto-${i + 1}.jpg`;
    await downloadSingleImage(imgUrl, filename);
    count++;
    if (onProgress) onProgress(count, images.length);
    // Small delay between downloads to prevent browser spam blocking
    await new Promise(resolve => setTimeout(resolve, 350));
  }
  return count;
};
