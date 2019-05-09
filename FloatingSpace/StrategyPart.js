
function newStrategyPart () {
  const MODULE_NAME = 'Strategy Part'
  const ERROR_LOG = true

  const logger = newWebDebugLog()
  logger.fileName = MODULE_NAME

  let thisObject = {
    type: undefined,
    menu: undefined,
    isOnFocus: false,
    container: undefined,
    payload: undefined,
    codeEditor: undefined,
    partTitle: undefined,
    physics: physics,
    drawBackground: drawBackground,
    drawMiddleground: drawMiddleground,
    drawForeground: drawForeground,
    drawOnFocus: drawOnFocus,
    getContainer: getContainer,
    finalize: finalize,
    initialize: initialize
  }

  thisObject.container = newContainer()
  thisObject.container.initialize(MODULE_NAME, 'Circle')
  thisObject.container.isClickeable = false
  thisObject.container.isDraggeable = false
  thisObject.container.frame.radius = 0
  thisObject.container.frame.position.x = 0
  thisObject.container.frame.position.y = 0

  let image
  let imagePath

  let selfFocusEventSubscriptionId
  let selfNotFocuskEventSubscriptionId
  let selfMouseClickEventSubscriptionId

  return thisObject

  function finalize () {
    thisObject.container.eventHandler.stopListening(selfFocusEventSubscriptionId)
    thisObject.container.eventHandler.stopListening(selfNotFocuskEventSubscriptionId)
    thisObject.container.eventHandler.stopListening(selfMouseClickEventSubscriptionId)

    thisObject.container.finalize()
    thisObject.container = undefined
    thisObject.payload = undefined
    thisObject.menu.finalize()
    thisObject.menu = undefined
    thisObject.partTitle.finalize()
    thisObject.partTitle = undefined

    if (thisObject.codeEditor !== undefined) {
      thisObject.codeEditor.finalize()
      thisObject.codeEditor = undefined
    }

    image = undefined
    imagePath = undefined
  }

  function initialize (payload) {
    thisObject.payload = payload

    let menuItemsInitialValues = []
    switch (thisObject.payload.node.type) {
      case 'Strategy': {
        imagePath = 'Images/icons/style-01/quality.png'
        menuItemsInitialValues = [
          {
            action: 'Reload Strategy',
            actionFunction: thisObject.payload.onMenuItemClick,
            label: 'Reload Last Saved',
            visible: false,
            imagePathOn: 'Images/icons/style-01/pixel.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: -60
          },
          {
            action: 'Save Strategy',
            actionFunction: thisObject.payload.onMenuItemClick,
            label: 'Save Changes',
            visible: false,
            imagePathOn: 'Images/icons/style-01/upload.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: -20
          },
          {
            action: 'Delete Strategy',
            actionFunction: thisObject.payload.onMenuItemClick,
            label: 'Delete This Strategy',
            visible: false,
            imagePathOn: 'Images/icons/style-01/trash.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 20
          },
          {
            action: 'Open Settings',
            actionFunction: thisObject.payload.onMenuItemClick,
            label: 'Settings',
            visible: false,
            imagePathOn: 'Images/icons/style-01/tools.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 60
          }]
        break
      }
      case 'Strategy Entry Event': {
        imagePath = 'Images/icons/style-01/startup.png'
        menuItemsInitialValues = [
          {
            action: 'Add Situation',
            actionFunction: thisObject.payload.onMenuItemClick,
            label: 'Add Situation',
            visible: false,
            imagePathOn: 'Images/icons/style-01/attractive.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 0
          }]
        break
      }
      case 'Strategy Exit Event': {
        imagePath = 'Images/icons/style-01/support.png'
        menuItemsInitialValues = [
          {
            action: 'Add Situation',
            actionFunction: thisObject.payload.onMenuItemClick,
            label: 'Add Situation',
            visible: false,
            imagePathOn: 'Images/icons/style-01/attractive.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 0
          }]
        break
      }
      case 'Trade Entry Event': {
        imagePath = 'Images/icons/style-01/compass.png'
        menuItemsInitialValues = [
          {
            action: 'Add Situation',
            actionFunction: thisObject.payload.onMenuItemClick,
            label: 'Add Situation',
            visible: false,
            imagePathOn: 'Images/icons/style-01/attractive.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 0
          }]
        break
      }
      case 'Stop': {
        imagePath = 'Images/icons/style-01/pixel.png'
        menuItemsInitialValues = [
          {
            action: 'Add Phase',
            actionFunction: thisObject.payload.onMenuItemClick,
            label: 'Add Phase',
            visible: false,
            imagePathOn: 'Images/icons/style-01/placeholder.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 0
          }]
        break
      }
      case 'Take Profit': {
        imagePath = 'Images/icons/style-01/competition.png'
        menuItemsInitialValues = [
          {
            action: 'Add Phase',
            actionFunction: thisObject.payload.onMenuItemClick,
            label: 'Add Phase',
            visible: false,
            imagePathOn: 'Images/icons/style-01/placeholder.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 0
          }]
        break
      }
      case 'Phase': {
        imagePath = 'Images/icons/style-01/testing.png'
        thisObject.codeEditor = newCodeEditor()
        thisObject.codeEditor.initialize()
        thisObject.codeEditor.container.connectToParent(thisObject.container, false, false, true, true, false, false, false, false)

        imagePath = 'Images/icons/style-01/placeholder.png'
        menuItemsInitialValues = [
          {
            action: 'Edit Code',
            actionFunction: thisObject.codeEditor.activate,
            label: 'Edit Code',
            visible: false,
            imagePathOn: 'Images/icons/style-01/html.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 40
          },
          {
            action: 'Add Situation',
            actionFunction: thisObject.payload.onMenuItemClick,
            label: 'Add Situation',
            visible: false,
            imagePathOn: 'Images/icons/style-01/attractive.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 0
          },
          {
            action: 'Delete Phase',
            actionFunction: thisObject.payload.onMenuItemClick,
            label: 'Delete This Phase',
            visible: false,
            imagePathOn: 'Images/icons/style-01/trash.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: -40
          }]
        break
      }
      case 'Situation': {
        imagePath = 'Images/icons/style-01/attractive.png'
        menuItemsInitialValues = [
          {
            action: 'Add Condition',
            actionFunction: thisObject.payload.onMenuItemClick,
            label: 'Add Condition',
            visible: false,
            imagePathOn: 'Images/icons/style-01/testing.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 20
          },
          {
            action: 'Delete Situation',
            actionFunction: thisObject.payload.onMenuItemClick,
            label: 'Delete This Situation',
            visible: false,
            imagePathOn: 'Images/icons/style-01/trash.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: -20
          }]
        break
      }
      case 'Condition': {
        imagePath = 'Images/icons/style-01/testing.png'
        thisObject.codeEditor = newCodeEditor()
        thisObject.codeEditor.initialize()
        thisObject.codeEditor.container.connectToParent(thisObject.container, false, false, true, true, false, false, false, false)
        menuItemsInitialValues = [
          {
            action: 'Edit Code',
            actionFunction: thisObject.codeEditor.activate,
            label: 'Edit Code',
            visible: false,
            imagePathOn: 'Images/icons/style-01/html.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 20
          },
          {
            action: 'Delete Condition',
            actionFunction: thisObject.payload.onMenuItemClick,
            label: 'Delete This Condition',
            visible: false,
            imagePathOn: 'Images/icons/style-01/trash.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: -20
          }]
        break
      }
      default: {
        if (ERROR_LOG === true) { logger.write('[ERROR] initialize -> Part Type not Recognized -> type = ' + thisObject.payload.node.type) }
      }
    }

/* Initialize the Menu */

    thisObject.menu = newCircularMenu()
    thisObject.menu.initialize(menuItemsInitialValues, thisObject.payload)
    thisObject.menu.container.connectToParent(thisObject.container, false, false, true, true, false, false, true, true)

/* Initialize Part Title */

    thisObject.partTitle = newStrategyPartTitle()
    thisObject.partTitle.container.connectToParent(thisObject.container, false, false, true, true, false, false, true, true)
    thisObject.partTitle.initialize(thisObject.payload)

/* Load Part Image */

    if (imagePath !== undefined) {
      image = new Image()
      image.onload = onImageLoad

      function onImageLoad () {
        image.canDrawIcon = true
      }
      image.src = window.canvasApp.urlPrefix + imagePath
    }

    selfFocusEventSubscriptionId = thisObject.container.eventHandler.listenToEvent('onFocus', onFocus)
    selfNotFocuskEventSubscriptionId = thisObject.container.eventHandler.listenToEvent('onNotFocus', onNotFocus)
    selfMouseClickEventSubscriptionId = thisObject.container.eventHandler.listenToEvent('onMouseClick', onMouseClick)
  }

  function getContainer (point) {
    let container

    container = thisObject.partTitle.getContainer(point)
    if (container !== undefined) { return container }

    container = thisObject.menu.getContainer(point)
    if (container !== undefined) { return container }

    if (thisObject.container.frame.isThisPointHere(point, true) === true) {
      return thisObject.container
    } else {
      return undefined
    }
  }

  function physics () {
    thisObject.menu.physics()
    thisObject.partTitle.physics()

    if (thisObject.codeEditor !== undefined) {
      thisObject.codeEditor.physics()
    }

    if (thisObject.payload.chainParent === undefined) { return }

    thisObject.payload.targetPosition.x = thisObject.payload.chainParent.payload.position.x
    thisObject.payload.targetPosition.y = thisObject.payload.chainParent.payload.position.y
  }

  function onFocus () {
    thisObject.isOnFocus = true
  }

  function onNotFocus () {
    thisObject.isOnFocus = false
    if (thisObject.codeEditor !== undefined) {
      thisObject.codeEditor.deactivate()
    }
  }

  function onMouseClick (event) {

  }

  function drawBackground (params) {
    if (thisObject.isOnFocus === false) {
      drawConnectingLine()
      thisObject.menu.drawBackground()
    }
  }

  function drawMiddleground (params) {
    if (thisObject.isOnFocus === false) {
      drawText(params)
      thisObject.partTitle.draw(params)
    }
  }

  function drawForeground (params) {
    if (thisObject.isOnFocus === false) {
      drawBodyAndPicture(params)
      thisObject.menu.drawForeground()
    }
  }

  function drawOnFocus (params) {
    if (thisObject.isOnFocus === true) {
      drawConnectingLine()
      thisObject.menu.drawBackground()

      if (thisObject.codeEditor !== undefined) {
        thisObject.codeEditor.drawBackground()
        thisObject.codeEditor.drawForeground()
      }

      drawText(params)
      thisObject.partTitle.draw(params)

      if (thisObject.codeEditor !== undefined) {
        if (thisObject.codeEditor.visible === false) {
          drawBodyAndPicture(params)
          thisObject.menu.drawForeground()
        }
      } else {
        drawBodyAndPicture(params)
        thisObject.menu.drawForeground()
      }
    }
  }

  function drawConnectingLine () {
    if (thisObject.payload.chainParent === undefined) { return }

    let targetPoint = {
      x: thisObject.payload.targetPosition.x,
      y: thisObject.payload.targetPosition.y
    }

    let position = {
      x: 0,
      y: 0
    }

    position = thisObject.container.frame.frameThisPoint(position)

    if (thisObject.container.frame.radius > 1) {
            /* Target Line */

      browserCanvasContext.beginPath()
      browserCanvasContext.moveTo(position.x, position.y)
      browserCanvasContext.lineTo(targetPoint.x, targetPoint.y)
      browserCanvasContext.strokeStyle = 'rgba(204, 204, 204, 0.5)'
      browserCanvasContext.setLineDash([1, 4])
      browserCanvasContext.lineWidth = 1
      browserCanvasContext.stroke()
      browserCanvasContext.setLineDash([0, 0])
    }

    if (thisObject.container.frame.radius > 0.5) {
            /* Target Spot */

      let radius = 1

      browserCanvasContext.beginPath()
      browserCanvasContext.arc(targetPoint.x, targetPoint.y, radius, 0, Math.PI * 2, true)
      browserCanvasContext.closePath()
      browserCanvasContext.fillStyle = 'rgba(30, 30, 30, 1)'
      browserCanvasContext.fill()
    }
  }

  function drawText (params) {
/* Text Follows */
    let position = {
      x: 0,
      y: 0
    }

    position = thisObject.container.frame.frameThisPoint(position)

    let radius = thisObject.container.frame.radius
            /* Label Text */
    let labelPoint
    let fontSize = params.currentFontSize
    let label

    if (radius > 6) {
      const MAX_LABEL_LENGTH = 30

      label = params.payload.subTitle
      label = addIndexNumber(label)

      if (label !== undefined) {
        if (label.length > MAX_LABEL_LENGTH) {
          label = label.substring(0, MAX_LABEL_LENGTH) + '...'
        }

        labelPoint = {
          x: position.x - label.length / 2 * fontSize * FONT_ASPECT_RATIO,
          y: position.y + radius * 2 / 3 + fontSize * FONT_ASPECT_RATIO + 15
        }

        browserCanvasContext.font = fontSize + 'px ' + UI_FONT.PRIMARY
        browserCanvasContext.fillStyle = params.labelStrokeStyle
        browserCanvasContext.fillText(label, labelPoint.x, labelPoint.y)
      }
    }
  }

  function addIndexNumber (label) {
    switch (thisObject.type) {
      case 'Phase': {
        let parent = thisObject.payload.parentNode
        for (let i = 0; i < parent.phases.length; i++) {
          let phase = parent.phases[i]
          if (phase.id === thisObject.payload.node.id) {
            label = label + ' #' + (i + 1)
            return label
          }
        }
        break
      }
      case 'Situation': {
        let parent = thisObject.payload.parentNode
        for (let i = 0; i < parent.situations.length; i++) {
          let situation = parent.situations[i]
          if (situation.id === thisObject.payload.node.id) {
            label = label + ' #' + (i + 1)
            return label
          }
        }
        break
      }
      case 'Condition': {
        let parent = thisObject.payload.parentNode
        for (let i = 0; i < parent.conditions.length; i++) {
          let condition = parent.conditions[i]
          if (condition.id === thisObject.payload.node.id) {
            label = label + ' #' + (i + 1)
            return label
          }
        }
        break
      }
      default: {
        return label
      }
    }
  }

  function drawBodyAndPicture (params) {
    let position = {
      x: params.container.frame.position.x,
      y: params.container.frame.position.y
    }

    let radius = params.container.frame.radius

    if (radius > 0.5 && image === undefined) {
            /* Main FloatingObject */

      browserCanvasContext.beginPath()
      browserCanvasContext.arc(position.x, position.y, radius * 2 / 3, 0, Math.PI * 2, true)
      browserCanvasContext.closePath()

      browserCanvasContext.fillStyle = params.fillStyle

      browserCanvasContext.fill()

      browserCanvasContext.beginPath()
      browserCanvasContext.arc(position.x, position.y, radius * 1 / 3, 0, Math.PI * 2, true)
      browserCanvasContext.closePath()

      browserCanvasContext.fillStyle = 'rgba(' + UI_COLOR.BLACK + ', 1)'

      browserCanvasContext.fill()
    }

        /* Image */

    if (image !== undefined) {
      if (image.canDrawIcon === true) {
        browserCanvasContext.drawImage(image, position.x - params.currentImageSize / 2, position.y - params.currentImageSize / 2, params.currentImageSize, params.currentImageSize)
      }
    }
  }
}
