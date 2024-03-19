export default function decorate(block) {
    const imageElement =block.querySelector('img');
    const imageUrl = imageElement.src;
    console.log(imageUrl);
    const title = block.querySelector('.download.block > div:nth-child(2) p').textContent.trim();
    const tag = block.querySelector('.download.block > div:nth-child(3) p').textContent.trim();
    const description = block.querySelector('.download.block > div:nth-child(4) p');
    const actionText = block.querySelector('.download.block > div:nth-child(5) p').textContent.trim();
    const titleDiv = document.createElement(`${tag}`);
    const downloadDiv = document.createElement('div');
    if(title) {
        titleDiv.classList.add('downloadTitle');
        const titleAnchor = document.createElement('a');
        titleAnchor.href = imageUrl;
        titleAnchor.textContent = title;
        titleDiv.appendChild(titleAnchor);
        downloadDiv.appendChild(titleDiv);
    }
    if(description) {
        description.classList.add('downloadDescription');
        downloadDiv.appendChild(description);
    }
    if(actionText) {
        const actionAnchor = document.createElement('a');
        actionAnchor.classList.add('downloadAction');
        actionAnchor.href = imageUrl;
        actionAnchor.textContent = actionText;
        downloadDiv.appendChild(actionAnchor);
    }
    downloadDiv.classList.add('downloadContainer');
    downloadDiv.setAttribute('tabIndex', 0);
    downloadDiv.setAttribute('onClick', imageUrl);
    const filename = actionText || title || 'download';
    const childDivs = block.querySelectorAll('.download.block > div');
    childDivs.forEach(childDiv => {
        block.removeChild(childDiv);
    });
    block.appendChild(downloadDiv);
    downloadDiv.addEventListener('click', function(event) {
        event.preventDefault();
        fetch(imageUrl)
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