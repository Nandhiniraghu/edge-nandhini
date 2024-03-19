export default function decorate(block) {
    const imageElement =block.querySelector('img');
    const textDiv = block.querySelector('.download.block > div:nth-child(2)');
    const text = textDiv.querySelector('p').textContent.trim();
    const downloadLink = document.createElement('a');
    downloadLink.href = imageElement.src;
    downloadLink.setAttribute('download', text);
    downloadLink.textContent = text;
    const childDivs = block.querySelectorAll('.download.block > div');
    block.appendChild(downloadLink);
    downloadLink.addEventListener('click', function(event) {
        event.preventDefault();
        const anchor = event.target;
        const url = anchor.href;
        const filename = anchor.getAttribute('download');
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(blobUrl);
            });
    });
}