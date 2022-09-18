import { ServiceCallable, ServicesClient } from "@bettercorp/service-base";
import {
  MyPluginConfig,
  SyslogMessage,
} from "../../plugins/service-syslog-server/sec.config";
import { SyslogEvents } from "../../plugins/service-syslog-server/plugin";

export class syslogServer extends ServicesClient<
  ServiceCallable,
  SyslogEvents,
  ServiceCallable,
  ServiceCallable,
  ServiceCallable,
  MyPluginConfig
> {
  public override readonly _pluginName: string = "service-syslog-server";

  async onMessage(listener: {
    (data: SyslogMessage): Promise<void>;
  }): Promise<void> {
    await this._plugin.onEvent("onMessage", listener);
  }
}
