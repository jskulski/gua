const nconf = require('nconf');
const assert = require('chai').assert;
const tempfile = require('tempfile');

const goPieces = require('../src/snu').goPieces;
const config = require('../src/services_config');
const Service = require('../src/services/service');
const _ = function() {}

const ShownService = Service('shown_service', 'Shown Service', 'http://www.example.com/', _)
const HiddenService = Service('hidden_service', 'Hiddent Service', 'http://www.example.com/', _)
const NotInConfigService = Service('unknown_service', 'Unknown Service', 'http://www.example.com/', _)

const ServiceDirectory = [
  ShownService,
  HiddenService,
]

const serviceConfigJSON = {
  'shown': [ 'shown_service' ],
  'hidden': [ 'hidden_service' ]
  // 'unknown_service': false
}

describe('Configuration', function() {
  it('should only gather reports for known & shown', (done) => {
    const gathererSpy = function(renderer, service) {
      assert.deepEqual(service, ShownService);
      assert.notDeepEqual(service, HiddenService);
      assert.notDeepEqual(service, NotInConfigService);
      done();
    };

    goPieces(serviceConfigJSON, _, gathererSpy, ServiceDirectory)
  });


  it('can generate a config file with current services', () => {
    generatedConfig = config.generateConfig([ ShownService ], [ HiddenService ]);

    assert.deepEqual(generatedConfig, {
      shown: [ ShownService.key ],
      hidden: [ HiddenService.key ]
    })
  });

  it('can write a generated configuration then read from it', () => {
    tmpFilePath = tempfile('.yml')
    generatedConfig = config.generateConfig(ServiceDirectory);

    config.saveConfig(generatedConfig, tmpFilePath);
    storedConfig = config.loadConfig(tmpFilePath);

    assert.deepEqual(storedConfig, generatedConfig);
  });
});