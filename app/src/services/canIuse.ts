/**
 * HasAvif
 * @author folenski
 *
 * Check if browser support avif with canvas
 * @since 11/02/2025 - Version initiale
 */

export class CanIuse {
  public static hasAvif(srcTest : string): Promise<boolean> {
    // Return a promise that resolves with a boolean value indicating AVIF support.
    return new Promise((resolve) => {
      const img = new Image();
      // Minimal AVIF data URI (a 1x1 pixel image)
      img.src = srcTest;
      img.onload = () => {
        // The image loads, indicating support – You can also check for img.width > 0 if desired.
        resolve(true);
      };
      img.onerror = () => {
        // The image failed to load, so the browser probably doesn't support AVIF.
        resolve(false);
      };
    });
  }
}
