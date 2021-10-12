import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@pipecorp/mf-layout",
  app: () => System.import("@pipecorp/mf-layout"),
  activeWhen: ["/"]
});
registerApplication({
  name: "@pipecorp/mf-login",
  app: () => System.import("@pipecorp/mf-login"),
  activeWhen: ["/"]
});

start({
  urlRerouteOnly: true,
});
