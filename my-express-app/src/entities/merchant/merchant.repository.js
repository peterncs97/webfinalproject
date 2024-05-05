const db = require("../../database/db");
const Op = db.Sequelize.Op;
const Merchant = db.merchant;
const Item = db.item;

class MerchantRepository {
  async getMerchantById(id) {
    return await Merchant.findByPk(id, {
      include: [
        {
          model: Item,
          order: [['id', 'ASC']],
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  async getMerchantBySceneId(sceneId) {
    return await Merchant.findOne({
      where: {
        sceneId: sceneId,
      },
      include: [
        {
          model: Item,
          order: [['id', 'ASC']],
          through: {
            attributes: [],
          },
        },
      ],
    });
  }
}

module.exports = MerchantRepository;