const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('director', {
  chooseFolder: () => ipcRenderer.invoke('dialog:folder'), chooseFile: filters => ipcRenderer.invoke('dialog:file', filters),
  listProjects: () => ipcRenderer.invoke('projects:list'), createProject: project => ipcRenderer.invoke('projects:create', project),
  updateProject: (id, patch) => ipcRenderer.invoke('projects:update', id, patch), runJob: (config, render) => ipcRenderer.invoke('workflow:run', config, render),
  listJobs: () => ipcRenderer.invoke('jobs:list'), reviewJob: (id, review) => ipcRenderer.invoke('jobs:review', id, review),
  showFile: file => ipcRenderer.invoke('shell:show', file), onlineState: () => ipcRenderer.invoke('online:state'),
  refreshOnline: () => ipcRenderer.invoke('online:refresh'), downloadUpdate: () => ipcRenderer.invoke('online:download-update'),
  installUpdate: file => ipcRenderer.invoke('online:install-update', file),
});
