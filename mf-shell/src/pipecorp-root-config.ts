import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@pipecorp/mf-layout",
  app: () => System.import("@pipecorp/mf-layout"),
  activeWhen: ["/layout"]
});
registerApplication({
  name: "@pipecorp/mf-login",
  app: () => System.import("@pipecorp/mf-login"),
  activeWhen: ["/login"]
});

start({
  urlRerouteOnly: true,
});
