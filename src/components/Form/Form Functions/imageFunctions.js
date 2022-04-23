function getBase64(file) {
  return new Promise((resolve) => {
    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
}

function checkFileSize(size) {
  if (size >= 1048576) {
    return (size / 1048576).toFixed(1);
  }
}

export { getBase64 };
export { checkFileSize };
