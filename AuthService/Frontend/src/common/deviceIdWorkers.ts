const getDeviceIdentifier = () => {
    // Retrieve the existing identifier from local storage
    let deviceIdentifier = localStorage.getItem('deviceIdentifier');

    if (!deviceIdentifier) {
        const userAgent = navigator.userAgent;

        // Simple function to infer device type from the user agent
        const getDeviceType = (userAgent: string) => {
            if (userAgent.match(/tablet|ipad|playbook|silk/i)) {
                return 'Tablet';
            } else if (userAgent.match(/Mobile|Android|iPhone|BlackBerry|Phone/i)) {
                return 'Mobile';
            } else {
                return 'Desktop';
            }
        };

        const deviceType = getDeviceType(userAgent);

        const screenResolution: string = `${window.screen.width}x${window.screen.height}`;


        // Generate the device identifier string
        deviceIdentifier = `Device-${deviceType}-${screenResolution}-${Math.random().toString(36).slice(2, 22)}`;

        // Save the newly generated identifier in local storage
        localStorage.setItem('deviceIdentifier', deviceIdentifier);
    }

    return deviceIdentifier;
};

export default getDeviceIdentifier