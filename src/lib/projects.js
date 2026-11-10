/** Illustrations that ship a dedicated drawing. Any other project falls back to the default. */
export const ILLUSTRATIONS = ['crm', 'intranet']

/** @param {{ illustration?: string }} project */
export const illustrationKey = (project) => (ILLUSTRATIONS.includes(project?.illustration) ? project.illustration : 'default')
