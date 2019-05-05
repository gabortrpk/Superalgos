
function newStrategyPart () {
  const MODULE_NAME = 'Strategy Part'

  let thisObject = {
    type: undefined,
    menu: undefined,
    container: undefined,
    physics: physics,
    drawBackground: drawBackground,
    drawForeground: drawForeground,
    getContainer: getContainer,
    initialize: initialize
  }

  thisObject.container = newContainer()
  thisObject.container.initialize(MODULE_NAME, 'Circle')
  thisObject.container.isClickeable = false
  thisObject.container.isDraggeable = false
  thisObject.container.frame.radius = 0
  thisObject.container.frame.position.x = 0
  thisObject.container.frame.position.y = 0

  let floatingLayer
  let isMouseOver = false
  let image
  let imagePath

  return thisObject

  function initialize (pFloatingLayer, pType) {
    floatingLayer = pFloatingLayer

    let menuItemsInitialValues = []
    switch (pType) {
      case 'Strategy': {
        imagePath = 'Images/icons/style-01/quality.png'
        menuItemsInitialValues = [
          {
            label: 'Settings',
            visible: false,
            imagePathOn: 'Images/icons/style-01/tools.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 60
          },
          {
            label: 'Delete This Strategy',
            visible: false,
            imagePathOn: 'Images/icons/style-01/trash.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 20 * 1
          }]
        break
      }
      case 'Strategy Entry': {
        imagePath = 'Images/icons/style-01/startup.png'
        menuItemsInitialValues = [
          {
            label: 'Add Situation',
            visible: false,
            imagePathOn: 'Images/icons/style-01/attractive.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 60
          }]
        break
      }
      case 'Strategy Exit': {
        imagePath = 'Images/icons/style-01/support.png'
        menuItemsInitialValues = [
          {
            label: 'Add Situation',
            visible: false,
            imagePathOn: 'Images/icons/style-01/attractive.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 60
          }]
        break
      }
      case 'Trade Entry': {
        imagePath = 'Images/icons/style-01/compass.png'
        menuItemsInitialValues = [
          {
            label: 'Add Situation',
            visible: false,
            imagePathOn: 'Images/icons/style-01/attractive.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 60
          }]
        break
      }
      case 'Trade Exit': {
        imagePath = 'Images/icons/style-01/broken-link.png'
        menuItemsInitialValues = [
          {
            label: 'Add Situation',
            visible: false,
            imagePathOn: 'Images/icons/style-01/attractive.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 60
          }]
        break
      }
      case 'Stop': {
        imagePath = 'Images/icons/style-01/pixel.png'
        menuItemsInitialValues = [
          {
            label: 'Add Phase',
            visible: false,
            imagePathOn: 'Images/icons/style-01/placeholder.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 60
          }]
        break
      }
      case 'Take Profit': {
        imagePath = 'Images/icons/style-01/competition.png'
        menuItemsInitialValues = [
          {
            label: 'Add Phase',
            visible: false,
            imagePathOn: 'Images/icons/style-01/placeholder.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 60
          }]
        break
      }
      case 'Phase': {
        imagePath = 'Images/icons/style-01/placeholder.png'
        menuItemsInitialValues = [
          {
            label: 'Edit Code',
            visible: false,
            imagePathOn: 'Images/icons/style-01/html.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 60
          },
          {
            label: 'Add Situation',
            visible: false,
            imagePathOn: 'Images/icons/style-01/attractive.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 20 * 1
          },
          {
            label: 'Delete This Phase',
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
      case 'Situation': {
        imagePath = 'Images/icons/style-01/attractive.png'
        menuItemsInitialValues = [
          {
            label: 'Add Condition',
            visible: false,
            imagePathOn: 'Images/icons/style-01/testing.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 60
          },
          {
            label: 'Delete This Situation',
            visible: false,
            imagePathOn: 'Images/icons/style-01/trash.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 20 * 1
          }]
        break
      }
      case 'Condition': {
        imagePath = 'Images/icons/style-01/testing.png'
        menuItemsInitialValues = [
          {
            label: 'Edit Code',
            visible: false,
            imagePathOn: 'Images/icons/style-01/html.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 60
          },
          {
            label: 'Delete This Condition',
            visible: false,
            imagePathOn: 'Images/icons/style-01/trash.png',
            imagePathOff: 'Images/icons/style-01/target.png',
            rawRadius: 8,
            targetRadius: 0,
            currentRadius: 0,
            angle: 20 * 1
          }]
        break
      }
      default: {
        if (ERROR_LOG === true) { logger.write('[ERROR] initialize -> Part Type not Recognized -> type = ' + pType) }
      }
    }

    thisObject.menu = newCircularMenu()
    thisObject.menu.initialize(menuItemsInitialValues)

/* Load Part Image */

    if (imagePath !== undefined) {
      image = new Image()
      image.onload = onImageLoad

      function onImageLoad () {
        image.canDrawIcon = true
      }
      image.src = window.canvasApp.urlPrefix + imagePath
    }

    thisObject.container.eventHandler.listenToEvent('onMouseOver', onMouseOver)
    thisObject.container.eventHandler.listenToEvent('onMouseClick', onMouseClick)
    thisObject.container.eventHandler.listenToEvent('onMouseNotOver', onMouseNotOver)
  }

  function getContainer (point) {
    let container

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
  }

  function onMouseOver () {
    thisObject.menu.container.eventHandler.raiseEvent('onMouseOver')
    isMouseOver = true
  }

  function onMouseNotOver () {
    thisObject.menu.container.eventHandler.raiseEvent('onMouseNotOver')
    isMouseOver = false
  }

  function onMouseClick (event) {

  }

  function drawBackground (pFloatingObject) {
    drawPartBackground(pFloatingObject)
    thisObject.menu.drawBackground()
  }

  function drawPartBackground (pFloatingObject) {
    if (pFloatingObject.payload.parentNode === undefined) { return }

    /* Here we do the trick of recalculation the position of the anchor by setting it to the position of its parent */
    let parentFloatingObject = floatingLayer.getFloatingObject(pFloatingObject.payload.parentNode.handle)

    if (isMouseOver === false) {
      pFloatingObject.payload.profile.position.x = parentFloatingObject.container.frame.position.x
      pFloatingObject.payload.profile.position.y = parentFloatingObject.container.frame.position.y
    }

   /* Here I continue painting the background */

    let point = {
      x: pFloatingObject.payload.profile.position.x,
      y: pFloatingObject.payload.profile.position.y
    }

    if (pFloatingObject.container.frame.radius > 1) {
            /* Target Line */

      browserCanvasContext.beginPath()
      browserCanvasContext.moveTo(pFloatingObject.container.frame.position.x, pFloatingObject.container.frame.position.y)
      browserCanvasContext.lineTo(point.x, point.y)
      browserCanvasContext.strokeStyle = 'rgba(204, 204, 204, 0.5)'
      browserCanvasContext.setLineDash([1, 4])
      browserCanvasContext.lineWidth = 1
      browserCanvasContext.stroke()
      browserCanvasContext.setLineDash([0, 0])
    }

    if (pFloatingObject.container.frame.radius > 0.5) {
            /* Target Spot */

      let radius = 1

      browserCanvasContext.beginPath()
      browserCanvasContext.arc(point.x, point.y, radius, 0, Math.PI * 2, true)
      browserCanvasContext.closePath()
      browserCanvasContext.fillStyle = 'rgba(30, 30, 30, 1)'
      browserCanvasContext.fill()
    }
  }

  function drawForeground (pFloatingObject) {
    drawPartForeground(pFloatingObject)
    thisObject.menu.drawForeground()
  }

  function drawPartForeground (pFloatingObject) {
    let position = {
      x: pFloatingObject.container.frame.position.x,
      y: pFloatingObject.container.frame.position.y
    }

    let radius = pFloatingObject.container.frame.radius

    if (radius > 0.5 && image === undefined) {
            /* Main FloatingObject */

      browserCanvasContext.beginPath()
      browserCanvasContext.arc(position.x, position.y, radius * 2 / 3, 0, Math.PI * 2, true)
      browserCanvasContext.closePath()

      browserCanvasContext.fillStyle = pFloatingObject.fillStyle

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
        browserCanvasContext.drawImage(image, position.x - pFloatingObject.currentImageSize / 2, position.y - pFloatingObject.currentImageSize / 2, pFloatingObject.currentImageSize, pFloatingObject.currentImageSize)
      }
    }

        /* Label Text */

    if (radius > 6 && isMouseOver === true) {
      browserCanvasContext.strokeStyle = pFloatingObject.labelStrokeStyle

      let labelPoint
      let fontSize = pFloatingObject.currentFontSize

      browserCanvasContext.font = fontSize + 'px ' + UI_FONT.PRIMARY

      let label

      label = pFloatingObject.payload.profile.upLabel

      if (label !== undefined) {
        labelPoint = {
          x: position.x - label.length / 2 * fontSize * FONT_ASPECT_RATIO,
          y: position.y - radius - fontSize * FONT_ASPECT_RATIO - 10
        }

        browserCanvasContext.font = fontSize + 'px ' + UI_FONT.PRIMARY
        browserCanvasContext.fillStyle = pFloatingObject.labelStrokeStyle
        browserCanvasContext.fillText(label, labelPoint.x, labelPoint.y)
      }

      label = pFloatingObject.payload.profile.downLabel

      if (label !== undefined && isMouseOver === true) {
        labelPoint = {
          x: position.x - label.length / 2 * fontSize * FONT_ASPECT_RATIO,
          y: position.y + radius + fontSize * FONT_ASPECT_RATIO + 15
        }

        browserCanvasContext.font = fontSize + 'px ' + UI_FONT.PRIMARY
        browserCanvasContext.fillStyle = pFloatingObject.labelStrokeStyle
        browserCanvasContext.fillText(label, labelPoint.x, labelPoint.y)
      }
    }
  }
}
