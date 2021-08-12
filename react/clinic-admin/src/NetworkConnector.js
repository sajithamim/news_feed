import React, { useEffect } from 'react';

const NetworkDetector = () => {

    const [isDisconnected, setIsDisconnected] = useState(false);

    useEffect(() => {
        window.addEventListener('online', handleConnectionChange);
        window.addEventListener('offline', handleConnectionChange);
    }, [])


    // componentWillUnmount() {
    //     window.removeEventListener('online', this.handleConnectionChange);
    //     window.removeEventListener('offline', this.handleConnectionChange);
    // }


    handleConnectionChange = () => {
        const condition = navigator.onLine ? 'online' : 'offline';
        if (condition === 'online') {
            const webPing = setInterval(
                () => {
                    fetch('//google.com', {
                        mode: 'no-cors',
                    })
                        .then(() => {
                            this.setState({ isDisconnected: false }, () => {
                                return clearInterval(webPing)
                            });
                        }).catch(() => setIsDisconnected(true))
                }, 2000);
            return;
        }
        return setIsDisconnected(true);
    }

    render() {
        // const { isDisconnected } = this.state;
        return (
            <div>
                {isDisconnected && (<div className="internet-error">
                    <p>Internet connection lost</p>
                </div>)
                }
                <ComposedComponent {...this.props} />
            </div>
        );
    }
}
export default NetworkDetector;