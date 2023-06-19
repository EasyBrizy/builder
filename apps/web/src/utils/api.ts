interface GetHTML {
  pageSlug: string;
  token: string;
}

interface OutputHTML {
  html: string;
  styles: Array<string>;
  scripts: Array<string>;
  error?: string;
}

export const getHtml = async (data: GetHTML): Promise<OutputHTML> => {
  const res = await fetch("http://localhost:3009/api/data", {
    next: { tags: ["html"] },
  });

  try {
    const rj = await res.json();
    const html = rj.html;
    const styles = JSON.parse(rj.styles);
    const scripts = JSON.parse(rj.scripts);

    return { html, styles, scripts };
  } catch (e) {
    if (process.env["NODE_ENV"] !== "production") {
      console.error(e);
    }
    return { html: "", styles: [], scripts: [] };
  }
};
