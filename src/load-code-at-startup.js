export const ERROR_LOADING_KATA = 'Error loading the kata from ...';

export function loadSourceCode(loadRemoteFile, {kataName, gistId}, setEditorContent, showUserHint) {
  if (gistId) {
    loadGist(gistId, showUserHint, setEditorContent);
  } else {
    loadKata(kataName, showUserHint, setEditorContent);
  }

  function loadKata(kataName, showUserHint, setEditorContent) {
    const url = `http://katas.tddbin.com/katas/${kataName}.js`;
    loadRemoteFile(url, (error, data) => {
      if (error) {
        showUserHint(ERROR_LOADING_KATA);
      } else {
        setEditorContent(data);
      }
    });
  }

  function loadGist(gistId, showUserHint, setEditorContent) {
    const url = `https://api.github.com/gists/${gistId}`;
    loadRemoteFile(url, (error, data) => {
      if (error) {
        showUserHint(ERROR_LOADING_KATA);
      } else {
        setEditorContent(JSON.parse(data).files['test.js'].content);
      }
    });
  }
}
