async function getData() {
  const url = "https://api.imgflip.com/get_memes";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    const memes = result.data.memes;
    const productModalItem = document.querySelectorAll(".product-modal__item");
    productModalItem.forEach((element, id) => {
      if (memes[id]) {
        const img = document.createElement("img");
        img.src = memes[id].url;
        img.style.height = "100%";
        img.style.width = "100%";
        img.style.objectFit = "cover";
        element.appendChild(img);
      }
    });
  } catch (error) {
    console.error(error.message);
  }
}
getData();
