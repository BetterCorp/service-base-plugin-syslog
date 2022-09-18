const SyslogServer = require("syslog-server");
import { ServiceCallable, ServicesBase } from "@bettercorp/service-base";
import { MyPluginConfig, SyslogMessage } from "./sec.config";

export interface SyslogEvents extends ServiceCallable {
  onMessage(data: SyslogMessage): Promise<void>;
}

export class Service extends ServicesBase<
  ServiceCallable,
  SyslogEvents,
  ServiceCallable,
  ServiceCallable,
  ServiceCallable,
  MyPluginConfig
> {
  private _server: any;
  public override async init(): Promise<void> {
    this._server = new SyslogServer();
    const self = this;
    this._server.on("message", (value: any) => {
      self.log.info(
        "Message from: {host} ({message})",
        {
          host: value.host,
          message: value.message,
        },
        true
      );

      self.emitEvent("onMessage", {
        gatewayTime: new Date().getTime(),
        date: new Date(value.date).getTime(),
        host: value.host,
        protocol: value.protocol,
        message: value.message,
      } as SyslogMessage);
    });
  }
  public override async run(): Promise<void> {
    this._server.start({
      port: (await this.getPluginConfig()).port,
      address: (await this.getPluginConfig()).address,
      exclusive: (await this.getPluginConfig()).exclusive,
    });
    this.log.info(
      " - - Syslog listening on port: " + (await this.getPluginConfig()).port
    );
  }
}
