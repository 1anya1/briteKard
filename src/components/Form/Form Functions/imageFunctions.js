function getBase64(file) {
  return new Promise((resolve) => {
    console.log(file);
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
  if (size < 2097152) {
    return true;
  }
}

export { getBase64 };
export { checkFileSize };
