const SyslogServer = require('syslog-server');
import { IPlugin, PluginFeature } from '@bettercorp/service-base/lib/ILib';

export class Plugin implements IPlugin {
  private Server = new SyslogServer();
  init (features: PluginFeature): Promise<void> {
    const self = this;
    return new Promise((resolve) => {
      self.Server.on("message", (value: any) => {
        features.log.info(`SYSLOG Message from: ${value.host}`);
        features.log.info(value.date);     // the date/time the message was received
        //features.log.info(value.host);     // the IP address of the host that sent the message
        features.log.info(value.protocol); // the version of the IP protocol ("IPv4" or "IPv6")
        features.log.info(value.message);  // the syslog message

        features.emitEvent(null, 'message', {
          gatewayTime: new Date().getTime(),
          date: new Date(value.date).getTime(),
          host: value.host,
          protocol: value.protocol,
          message: value.message
        });
      });

      self.Server.start({
        port: features.config.plugins.syslog.port,
        address: features.config.plugins.syslog.address,
        exclusive: features.config.plugins.syslog.exclusive
      });
      features.log.info(' - - Syslog listening on port: ' + features.config.plugins.syslog.port);
      resolve();
    });
  }
}