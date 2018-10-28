import path from 'path';

export default {
  extensions: ['*', '.js', '.jsx', '.json'],
  alias: {
    api: path.resolve(__dirname, '../../src/common/api'),
    components: path.resolve(__dirname, '../../src/common/components'),
    icons: path.resolve(__dirname, '../../src/common/icons'),
    constants: path.resolve(__dirname, '../../src/common/constants'),
    locales: path.resolve(__dirname, '../../src/common/locales'),
    utils: path.resolve(__dirname, '../../src/common/utils'),
    assets: path.resolve(__dirname, '../../src/common/assets'),
    routes: path.resolve(__dirname, '../../src/common/routes'),
    modules: path.resolve(__dirname, '../../src/state/modules'),
    store: path.resolve(__dirname, '../../src/state/store'),
    features: path.resolve(__dirname, '../../src/features'),
    styles: path.resolve(__dirname, '../../src/styles')
  }
};
