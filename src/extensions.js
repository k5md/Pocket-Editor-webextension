import mammoth from 'mammoth';
import showdown from 'showdown';

const sanitizeHTML = (html) => {
  const plainText = html.replace(/<[^>]*>/g, ' ');
  return plainText;
};

const triggerDownload = (title, extension, href) => {
  const a = document.createElement('a');
  a.download = `${title}.${extension}`;
  a.href = href;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const docx = {
  toHTML: async (arrayBuffer) => {
    const { value } = await mammoth.convertToHtml({ arrayBuffer }, {
      ignoreEmptyParagraphs: false,
    });
    return sanitizeHTML(value);
  },
};

export const doc = {
  fromHTML: (innerHTML, title) => {
    const html = document.createElement('html');
    const head = document.createElement('head');
    const innerHead = `
      <xml>
        <word:WordDocument>
          <word:View>Print</word:View>
          <word:Zoom>90</word:Zoom>
          <word:DoNotOptimizeForBrowser/>
        </word:WordDocument>
      </xml>
    `;
    head.innerHTML = innerHead;

    const body = document.createElement('body');
    body.innerHTML = innerHTML;

    html.appendChild(head);
    html.appendChild(body);

    const blob = new Blob([html.outerHTML], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    triggerDownload(title, 'doc', url);
  },
};

export const txt = {
  fromHTML: (innerHTML, title) => {
    const text = sanitizeHTML(innerHTML);
    const blob = new Blob([text], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    triggerDownload(title, 'txt', url);
  },

  toHTML: async (arrayBuffer) => {
    const blob = new Blob([arrayBuffer], { type: 'text/html;charset=utf-8' });
    const text = await new Response(blob).text();
    return sanitizeHTML(text);
  },
};

export const md = {
  fromHTML: (innerHTML, title) => {
    const converter = new showdown.Converter();
    const markdown = converter.makeMarkdown(innerHTML);
    const blob = new Blob([markdown], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    triggerDownload(title, 'md', url);
  },

  toHTML: async (arrayBuffer) => {
    const blob = new Blob([arrayBuffer], { type: 'text/html;charset=utf-8' });
    const text = await new Response(blob).text();
    const converter = new showdown.Converter();
    const html = converter.makeHtml(text);
    return sanitizeHTML(html);
  },
};
