exports.default = ( jsonConfig ) => {
  jsonConfig.plugins = jsonConfig.plugins || {};
  jsonConfig.plugins.netflow = jsonConfig.plugins.netflow || {};
  jsonConfig.plugins.netflow.port = jsonConfig.plugins.netflow.port || 2055;

  return jsonConfig;
}