const SyslogServer = require('syslog-server');
import { PluginFeature } from '@bettercorp/service-base/lib/ILib';

module.exports.init = (features: PluginFeature) => {
  const server = new SyslogServer();
  server.on("message", (value: any) => {
    features.log.info(`SYSLOG Message from: ${value.host}`);
    features.log.info(value.date);     // the date/time the message was received
    //features.log.info(value.host);     // the IP address of the host that sent the message
    features.log.info(value.protocol); // the version of the IP protocol ("IPv4" or "IPv6")
    features.log.info(value.message);  // the syslog message

    features.emitEvent('message', false, {
      gatewayTime: new Date().getTime(),
      date: new Date(value.date).getTime(),
      host: value.host,
      protocol: value.protocol,
      message: value.message
    });
  });

  server.start({
    port: features.config.plugins.syslog.port,
    address: features.config.plugins.syslog.address,
    exclusive: features.config.plugins.syslog.exclusive
  });
  features.log.info(' - - Syslog listening on port: ' + features.config.plugins.syslog.port);
};
