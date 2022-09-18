export interface SyslogMessage {
  gatewayTime: number;
  date: number;
  host: string;
  protocol: string;
  message: string;
}

export interface MyPluginConfig {
  port: number;
  address: string;
  exclusive: boolean;
}

export default (pluginName: string, existingPluginConfig: any): MyPluginConfig => {
  let newConfig: MyPluginConfig = {
    port: 514,
    address: '0.0.0.0',
    exclusive: false
  };
  return newConfig;
};