import { SecConfig } from "@bettercorp/service-base";

export interface SyslogMessage {
  gatewayTime: number;
  date: number;
  host: string;
  protocol: string;
  message: string;
}

export interface MyPluginConfig {
  port: number; // Port: The port to bind the server on
  address: string; // Address: 127.0.0.1/0.0.0.0 address to bind the server too.
  exclusive: boolean; // Exclusive: Is it exclusive
}

export class Config extends SecConfig<MyPluginConfig> {
  migrate(
    mappedPluginName: string,
    existingConfig: MyPluginConfig
  ): MyPluginConfig {
    return {
      port: existingConfig.port !== undefined ? existingConfig.port : 514,
      address:
        existingConfig.address !== undefined
          ? existingConfig.address
          : "0.0.0.0",
      exclusive:
        existingConfig.exclusive !== undefined
          ? existingConfig.exclusive
          : false,
    };
  }
}
