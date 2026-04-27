/**
 * Webpack entry for the playwright test page.
 *
 * Exposes the browser `Task` class (and the configure helper)
 * on `window` so the playwright spec can do:
 *
 *   const task = new window.Task({ host: '...' })
 *   await task.convert(...)
 *
 * The webpack UMD output also attaches the bundle as
 * `window.task` (the `library.name` from the config), so
 * `page.html` falls back to `window.task.default` when
 * resolving `window.Task`.
 */

import Task from '~/code/browser'
import { configure } from '~/code/tool/shared/config'

;(window as unknown as { Task: typeof Task }).Task = Task
;(window as unknown as { configure: typeof configure }).configure = configure

export default Task
export { Task, configure }
