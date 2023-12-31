export const createUpload = (accept?: string): Promise<File> => {
  let lock = false;
  return new Promise((resolve, reject) => {
    const el = document.createElement("input");

    el.style.display = "none";
    el.setAttribute("id", String(+new Date()));
    el.setAttribute("type", "file");

    if (accept) {
      el.setAttribute("accept", accept);
    }

    document.body.appendChild(el);

    const handleChange = function () {
      lock = true;
      if (!el.files) {
        return reject("File not Selected");
      }
      const file = el.files[0];

      if (file) {
        resolve(file);
      } else {
        reject("File not Selected");
      }
      const elInDom = document.getElementById(el.id);

      if (elInDom) {
        document.body.removeChild(elInDom);
      }
    };
    const handleFocus = function () {
      setTimeout(() => {
        const elInDom = document.getElementById(el.id);

        if (!lock && elInDom) {
          reject("cancel");
          document.body.removeChild(elInDom);
        }
      }, 300);
    };

    el.addEventListener("change", handleChange, { once: true });
    window.addEventListener("focus", handleFocus, { once: true });

    // open file select box
    el.click();
  });
};
