const SyslogServer = require('syslog-server');
import { CPlugin, CPluginClient } from "@bettercorp/service-base/lib/ILib";
import { MyPluginConfig, SyslogMessage } from './sec.config';

export class syslog extends CPluginClient<any> {
  public readonly _pluginName: string = "syslog";

  async onMessage(listener: (data: SyslogMessage) => void): Promise<void> {
    this.refPlugin.onEvent(await this.pluginName(), "message", listener);
  }
}

export class Plugin extends CPlugin<MyPluginConfig> {
  private Server: any;
  init(): Promise<void> {
    const self = this;
    return new Promise(async (resolve) => {
      self.Server = new SyslogServer();
      self.Server.on("message", (value: any) => {
        self.log.info(`Message from: ${ value.host }`);
        self.log.debug(value.date);     // the date/time the message was received
        //features.log.info(value.host);     // the IP address of the host that sent the message
        self.log.debug(value.protocol); // the version of the IP protocol ("IPv4" or "IPv6")
        self.log.debug(value.message);  // the syslog message

        self.emitEvent(null, 'message', {
          gatewayTime: new Date().getTime(),
          date: new Date(value.date).getTime(),
          host: value.host,
          protocol: value.protocol,
          message: value.message
        } as SyslogMessage);
      });
      resolve();
    });
  }

  loaded(): Promise<void> {
    const self = this;
    return new Promise(async (resolve) => {
      self.Server.start({
        port: (await self.getPluginConfig()).port,
        address: (await self.getPluginConfig()).address,
        exclusive: (await self.getPluginConfig()).exclusive
      });
      self.log.info(' - - Syslog listening on port: ' + (await self.getPluginConfig()).port);
      resolve();
    });
  }
}