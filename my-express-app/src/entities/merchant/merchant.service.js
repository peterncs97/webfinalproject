const MerchantRepository = require('./merchant.repository');

class MerchantService {
  #merchantRepository = new MerchantRepository();

  async getMerchantById(merchantId) {
    return await this.#merchantRepository.getMerchantById(merchantId);
  }

  async getMerchantBySceneId(sceneId) {
    return await this.#merchantRepository.getMerchantBySceneId(sceneId);
  }
}

module.exports = MerchantService;