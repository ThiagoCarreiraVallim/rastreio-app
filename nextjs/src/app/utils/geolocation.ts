export function getCurrentPosition(
  options?: PositionOptions
): Promise<{ lat: number, lng: number }> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        resolve({
          lat: -11.8701658,
          lng: -55.5159256,
        })
      },
      options
    );
  });
}