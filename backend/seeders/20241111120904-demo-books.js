'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserting demo books into the 'Books' table
    await queryInterface.bulkInsert('Books', [
      {
        title: 'The game of all heavens, the cheater who started from Demon Slayer',
        description: 'One day two hundred years ago, countless huge portals appeared all over the earth, and the world ushered in an irresistible [Game of Fate]. Evil spirits that feed on humans, giants behind high walls, the Holy Grail filled with despair, and human lives became meaningless numbers in an instant. But the time traveler Tong Gu discovered that these worlds are not the same as the animation dramas in his memory, so... Demon Slayer World, please let Muzan bask in the sun; One Piece World, give Momonosuke and Xiaoyu a new identity; Giant World,... Fate Game, please call me a cheater. Experienced worlds: [Demon Slayer] [Jujutsu] [Gantz] [One Piece] [Legend of the Magic Soldiers] [Hunter x Hunter: Greed Island] In progress world: [One Punch Man] Upcoming worlds: [Re:0] [Fate] [Magic Index]... Tags: Infinite Flow and Hot Blood',
        author_id: 1,
        cover_img: '',
        status: 'completed',
        publisher: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes made by the seeder
    await queryInterface.bulkDelete('Books', null, {});
  }
};
