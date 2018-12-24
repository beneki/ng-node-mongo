import { HostConfig } from './HostConfig';

export const EndpointConfig =  {
    getEndpointAddress: (method, config = HostConfig) => {
        if(config) {
            config = Object.assign(HostConfig, config)
        }
        const { protocol, host, port, domain } = config;
        //return `${protocol}://${host}:${port}/${domain}/${method}`;//"http://localhost:3000/api/"
        return `${protocol}://${host}/${domain}/${method}`;//"http://localhost:3000/api/"
    }
    // TO-DO functions... .

}
