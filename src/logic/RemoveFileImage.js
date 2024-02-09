export const removeFileImage = (index) => {
  const newArray = [...filesImages.slice(0, index), ...filesImages.slice(index + 1)]
  setFilesImages(newArray)
}
