export const graphCmsImageUrl = (handle, resize = {fit:'clip'}) => {
    let resizeParms = [];
    if (resize.fit) resizeParms.push('fit:'+resize.fit);
    if (resize.width) resizeParms.push('w:'+resize.width);
    if (resize.height) resizeParms.push('h:'+resize.height);
    return `https://media.graphcms.com/resize=${resizeParms.toString()}/${handle}`;
  };
