import mammoth from 'mammoth';

export const docx = {
  toHTML: async (arrayBuffer) => {
    const { value } = await mammoth.convertToHtml({ arrayBuffer }, {
      ignoreEmptyParagraphs: false,
    });
    const plainText = value.replace(/<[^>]*>/g, ' ');
    return plainText;
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

    let byteNumbers = new Uint8Array(html.outerHTML.length);
    for (let i = 0; i < html.outerHTML.length; i++) {
      byteNumbers[i] = html.outerHTML.charCodeAt(i);
    }
    const blob = new Blob([ html.outerHTML ], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.download = `${title}.doc`;
    a.href = url;
    document.body.appendChild(a);                                                                  
    a.click();                                                                                     
    document.body.removeChild(a);
  },
};