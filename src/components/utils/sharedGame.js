function encodeSharedGameParams(options = {}) {
  const answer = options.answer.trim().toLowerCase();
  const hint = options.hint.trim();

  return window.btoa(window.encodeURIComponent(`${answer}::${hint}`));
}

function decodeSharedGameParams() {
  const queryParams = new URLSearchParams(window.location.search);
  const gameParam = window.decodeURIComponent(
    window.atob(queryParams.get('g') || '')
  );

  if (!gameParam) return;

  const separator = '::';
  const splitIndex = gameParam.indexOf(separator);
  const answer = gameParam.substring(0, splitIndex).toLowerCase();
  const hint = gameParam.substring(splitIndex + separator.length);

  return { answer: answer, hint: hint };
}

export { encodeSharedGameParams, decodeSharedGameParams };
