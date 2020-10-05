exports.default = ( jsonConfig, pluginName ) => {
  jsonConfig.plugins = jsonConfig.plugins || {};
  jsonConfig.plugins[pluginName] = jsonConfig.plugins[pluginName] || {};
  jsonConfig.plugins[pluginName].port = jsonConfig.plugins[pluginName].port || 514;
  jsonConfig.plugins[pluginName].address = jsonConfig.plugins[pluginName].address || '0.0.0.0';
  jsonConfig.plugins[pluginName].exclusive = jsonConfig.plugins[pluginName].exclusive || false;

  return jsonConfig;
}