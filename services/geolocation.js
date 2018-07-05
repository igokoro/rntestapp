export const getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(
    position => {
      this.setState({
        deviceLatitude: position.coords.deviceLatitude,
        deviceLongitude: position.coords.deviceLongitude,
        error: null
      });
    },
    error => this.setState({ error: error.message }),
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
  );
};
