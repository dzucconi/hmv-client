export const empty = parent => {
  const children = parent.childNodes;
  for (var i = children.length - 1; i >= 0; i--) {
    parent.removeChild(children[i]);
  }
};

export const tag = (type, { id, klass }, html) => {
  const el = document.createElement(type);
  if (id) el.id = id;
  if (klass) el.className = klass;
  el.innerHTML = html;
  return el;
};
