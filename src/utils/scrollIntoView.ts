export function scrollIntoView<ElementType extends Element>(
  element: ElementType,
  visibilityRatio: number,
  isIntersectingFromAbove: boolean,
  hasScrolled: boolean
): void {
  if (hasScrolled) return;
  if (visibilityRatio < 1 && element && isIntersectingFromAbove) {
    // scrollIntoView(alignToTop)
    element.scrollIntoView(true);
  } else if (visibilityRatio < 1 && element && !isIntersectingFromAbove) {
    element.scrollIntoView(false);
  }
}
