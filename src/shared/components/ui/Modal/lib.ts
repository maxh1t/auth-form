import { MODAL_ROOT_CLASS } from './constants'

export function createModalRoot() {
  const modalRoot = document.createElement('div')
  modalRoot.id = MODAL_ROOT_CLASS
  document.body.appendChild(modalRoot)

  return modalRoot
}
