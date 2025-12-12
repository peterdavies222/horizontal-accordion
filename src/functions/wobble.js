export function wobble(element, event) {
  // CONFIGURE HERE
  const MAX_HORIZONTAL_DISPLACEMENT = 8;
  const MAX_ANGLE_MAGNITUDE = 15;
  const ANGLE_DAMPENING = 3;

  // mouse location on page
  const mouseX = event.pageX;
  const mouseY = event.pageY;

  // element location
  const elementInfo = element.getBoundingClientRect();
  const elementWidth = elementInfo.width;
  const elementHeight = elementInfo.height;
  const elementX = elementInfo.x + elementWidth / 2; // horizontal center
  const elementY = elementInfo.y + elementHeight / 2; // vertical center

  // mouse location on element
  const relativeX = mouseX - elementX;
  const relativeY = elementY - mouseY;
  const percentageX = (relativeX / elementWidth) * 2;
  const percentageY = (relativeY / elementHeight) * 2;

  // rotation transformation calculation
  let angle = Math.abs(Math.atan(relativeY / relativeX));
  angle = (angle * 180) / Math.PI;
  angle = angle > MAX_ANGLE_MAGNITUDE ? MAX_ANGLE_MAGNITUDE : angle;
  angle =
    (relativeX >= 0 && relativeY >= 0) || (relativeX <= 0 && relativeY <= 0)
      ? -angle
      : (relativeX >= 0 && relativeY <= 0) || (relativeX <= 0 && relativeY >= 0)
      ? angle
      : 0;
  angle = (angle * Math.abs(percentageX)) / ANGLE_DAMPENING;

  // horizontal and vertical transformation calculation
  const maxXTranslation = MAX_HORIZONTAL_DISPLACEMENT;
  const xTranslation = maxXTranslation * percentageX;
  const yTranslation =
    (elementHeight / elementWidth) * maxXTranslation * -percentageY;

  // final transformation
  element.style.transform = `rotate(${angle}deg) translate(${xTranslation}px, ${yTranslation}px)`;
}

export function unwobble(element) {
  element.style.transform = "none";
}
