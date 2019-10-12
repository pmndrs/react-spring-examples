export const DRAG_STATUS = {
  NONE: 'none',
  CLICKED: 'clicked',
  DOUBLE_CLICKED: 'double clicked',
  DRAG_STARTED: 'drag started',
  DRAG_ENDED: 'drag ended',
}

export const getDragStatusColor = dragStatus => {
  switch (dragStatus) {
    case DRAG_STATUS.CLICKED:
      return 'lightgreen'
    case DRAG_STATUS.DOUBLE_CLICKED:
      return 'lightskyblue'
    case DRAG_STATUS.DRAG_STARTED:
    case DRAG_STATUS.DRAG_ENDED:
      return 'lightsalmon'
    case DRAG_STATUS.NONE:
    default:
      return 'grey'
  }
}
