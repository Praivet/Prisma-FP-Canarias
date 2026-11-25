'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('role_permissions', [{
      id: 1,
      role_id: 1,               /* ADMIN */
      permission_id: 1
    },{
      id: 2,
      role_id: 1,
      permission_id: 2
    },{
      id: 3,
      role_id: 1,
      permission_id: 3
    },{
      id: 4,
      role_id: 1,
      permission_id: 4
    },{
      id: 5,
      role_id: 1,
      permission_id: 5
    },{
      id: 6,
      role_id: 1,
      permission_id: 6
    },{
      id: 7,
      role_id: 1,
      permission_id: 7
    },{
      id: 8,
      role_id: 1,
      permission_id: 8
    },{
      id: 9,
      role_id: 1,
      permission_id: 9
    },{
      id: 10,
      role_id: 1,
      permission_id: 10
    },{
      id: 11,
      role_id: 1,
      permission_id: 11
    },{
      id: 12,
      role_id: 1,
      permission_id: 12
    },{
      id: 13,
      role_id: 1,
      permission_id: 13
    },{
      id: 14,
      role_id: 1,
      permission_id: 14
    },{
      id: 15,
      role_id: 1,
      permission_id: 15
    },{
      id: 16,
      role_id: 1,
      permission_id: 16
    },{
      id: 17,
      role_id: 1,
      permission_id: 17
    },{
      id: 18,
      role_id: 1,
      permission_id: 18
    },{
      id: 19,
      role_id: 1,
      permission_id: 19
    },{
      id: 20,
      role_id: 1,
      permission_id: 20
    },{
      id: 21,
      role_id: 1,
      permission_id: 21
    },{
      id: 24,
      role_id: 1,
      permission_id: 24
    },{
      id: 25,
      role_id: 1,
      permission_id: 25
    },{
      id: 26,
      role_id: 1,
      permission_id: 26
    },{
      id: 27,
      role_id: 1,
      permission_id: 27
    },{
      id: 28,
      role_id: 1,
      permission_id: 28
    },{
      id: 29,
      role_id: 1,
      permission_id: 29
    },{
      id: 30,
      role_id: 1,
      permission_id: 30
    },{
      id: 31,
      role_id: 1,
      permission_id: 31
    },{
      id: 32,
      role_id: 1,
      permission_id: 32
    },{
      id: 33,
      role_id: 1,
      permission_id: 33
    },{
      id: 34,
      role_id: 1,
      permission_id: 34
    },{
      id: 35,
      role_id: 1,
      permission_id: 35
    },{
      id: 36,
      role_id: 1,
      permission_id: 36
    },{
      id: 37,
      role_id: 1,
      permission_id: 37
    },{
      id: 38,
      role_id: 1,
      permission_id: 38
    },{
      id: 39,
      role_id: 1,
      permission_id: 39
    },{
      id: 40,
      role_id: 1,
      permission_id: 40
    },{
      id: 41,
      role_id: 1,
      permission_id: 41
    },{
      id: 42,
      role_id: 1,
      permission_id: 42
    },{
      id: 43,
      role_id: 1,
      permission_id: 43
    },{
      id: 44,
      role_id: 1,
      permission_id: 44
    },{
      id: 45,
      role_id: 1,
      permission_id: 45
    },{
      id: 46,
      role_id: 1,
      permission_id: 46
    },{
      id: 47,
      role_id: 1,
      permission_id: 47
    },{
      id: 48,
      role_id: 1,
      permission_id: 48
    },{
      id: 49,
      role_id: 1,
      permission_id: 49
    },{
      id: 50,
      role_id: 1,
      permission_id: 50
    },{
      id: 51,
      role_id: 1,
      permission_id: 51
    },{
      id: 52,
      role_id: 1,
      permission_id: 52
    },{
      id: 53,
      role_id: 1,
      permission_id: 53
    },{
      id: 54,
      role_id: 1,
      permission_id: 54
    },{
      id: 55,
      role_id: 1,
      permission_id: 55
    },{
      id: 56,
      role_id: 1,
      permission_id: 56
    },{
      id: 57,
      role_id: 1,
      permission_id: 57
    },{
      id: 58,
      role_id: 1,
      permission_id: 58
    },{
      id: 59,
      role_id: 1,
      permission_id: 59
    },{
      id: 60,
      role_id: 1,
      permission_id: 60
    },{
      id: 61,
      role_id: 1,
      permission_id: 61
    },{
      id: 62,
      role_id: 1,
      permission_id: 62
    },{
      id: 63,
      role_id: 1,
      permission_id: 63
    },{
      id: 64,
      role_id: 1,
      permission_id: 64
    },{
      id: 65,
      role_id: 1,
      permission_id: 65
    },{
      id: 66,
      role_id: 1,
      permission_id: 66
    },{
      id: 67,
      role_id: 1,
      permission_id: 67
    },{
      id: 68,
      role_id: 1,
      permission_id: 68
    },{
      id: 69,
      role_id: 1,
      permission_id: 69
    },{
      id: 70,
      role_id: 1,
      permission_id: 70
    },{
      id: 71,
      role_id: 1,
      permission_id: 71
    },{
      id: 72,
      role_id: 1,
      permission_id: 72
    },{
      id: 73,
      role_id: 1,
      permission_id: 73
    },{
      id: 74,
      role_id: 1,
      permission_id: 74
    },{
      id: 75,
      role_id: 1,
      permission_id: 75
    },{
      id: 76,
      role_id: 1,
      permission_id: 76
    },{
      id: 77,
      role_id: 1,
      permission_id: 77
    },{
      id: 78,
      role_id: 1,
      permission_id: 78
    },{
      id: 79,
      role_id: 1,
      permission_id: 79
    },{
      id: 80,
      role_id: 1,
      permission_id: 80
    },{
      id: 81,
      role_id: 1,
      permission_id: 81
    },{
      id: 82,
      role_id: 1,
      permission_id: 82
    },{
      id: 83,
      role_id: 1,
      permission_id: 83
    },{
      id: 84,
      role_id: 1,
      permission_id: 84
    },{
      id: 85,
      role_id: 1,
      permission_id: 85
    },{
      id: 86,
      role_id: 1,
      permission_id: 86
    },{
      id: 87,
      role_id: 1,
      permission_id: 87
    },{
      id: 88,
      role_id: 1,
      permission_id: 88
    },{
      id: 89,
      role_id: 1,
      permission_id: 89
    },{
      id: 92,
      role_id: 1,
      permission_id: 92
    },{
      id: 93,
      role_id: 1,
      permission_id: 93
    },{
      id: 94,
      role_id: 1,
      permission_id: 94
    },{
      id: 95,
      role_id: 1,
      permission_id: 95
    },{
      id: 99,
      role_id: 1,
      permission_id: 99
    },{
      id: 100,
      role_id: 1,
      permission_id: 100
    },{
      id: 101,
      role_id: 1,
      permission_id: 101
    },{
      id: 102,
      role_id: 1,
      permission_id: 102
    },{
      id: 103,
      role_id: 1,
      permission_id: 103
    },{
      id: 104,
      role_id: 1,
      permission_id: 104
    },{
      id: 105,
      role_id: 1,
      permission_id: 105
    },{
      id: 106,
      role_id: 1,
      permission_id: 106
    },{
      id: 107,
      role_id: 2,               /* COORDINATOR */
      permission_id: 25
    },{
      id: 108,
      role_id: 2,
      permission_id: 29
    },{
      id: 109,
      role_id: 2,
      permission_id: 33
    },{
      id: 110,
      role_id: 2,
      permission_id: 37
    },{
      id: 111,
      role_id: 2,
      permission_id: 41
    },{
      id: 112,
      role_id: 2,
      permission_id: 45
    },{
      id: 113,
      role_id: 2,
      permission_id: 49
    },{
      id: 114,
      role_id: 2,
      permission_id: 57
    },{
      id: 115,
      role_id: 2,
      permission_id: 69
    },{
      id: 116,
      role_id: 2,
      permission_id: 70
    },{
      id: 117,
      role_id: 2,
      permission_id: 71
    },{
      id: 118,
      role_id: 2,
      permission_id: 72
    },{
      id: 119,
      role_id: 2,
      permission_id: 73
    },{
      id: 120,
      role_id: 2,
      permission_id: 77
    },{
      id: 121,
      role_id: 2,
      permission_id: 78
    },{
      id: 122,
      role_id: 2,
      permission_id: 79
    },{
      id: 123,
      role_id: 2,
      permission_id: 80
    },{
      id: 124,
      role_id: 2,
      permission_id: 81
    },{
      id: 125,
      role_id: 2,
      permission_id: 82
    },{
      id: 126,
      role_id: 2,
      permission_id: 83
    },{
      id: 127,
      role_id: 2,
      permission_id: 84
    },{
      id: 128,
      role_id: 2,
      permission_id: 85
    },{
      id: 129,
      role_id: 2,
      permission_id: 86
    },{
      id: 130,
      role_id: 2,
      permission_id: 87
    },{
      id: 131,
      role_id: 2,
      permission_id: 88
    },{
      id: 132,
      role_id: 2,
      permission_id: 89
    },{
      id: 133,
      role_id: 2,
      permission_id: 93
    },{
      id: 134,
      role_id: 2,
      permission_id: 94
    },{
      id: 135,
      role_id: 2,
      permission_id: 99
    },{
      id: 136,
      role_id: 2,
      permission_id: 103
    },{
      id: 137,
      role_id: 3,               /* TEACHER */
      permission_id: 25
    },{
      id: 138,
      role_id: 3,
      permission_id: 26
    },{
      id: 139,
      role_id: 3,
      permission_id: 27
    },{
      id: 140,
      role_id: 3,
      permission_id: 29
    },{
      id: 141,
      role_id: 3,
      permission_id: 30
    },{
      id: 142,
      role_id: 3,
      permission_id: 31
    },{
      id: 143,
      role_id: 3,
      permission_id: 33
    },{
      id: 144,
      role_id: 3,
      permission_id: 34
    },{
      id: 145,
      role_id: 3,
      permission_id: 35
    },{
      id: 146,
      role_id: 3,
      permission_id: 36
    },{
      id: 147,
      role_id: 3,
      permission_id: 37
    },{
      id: 148,
      role_id: 3,
      permission_id: 38
    },{
      id: 149,
      role_id: 3,
      permission_id: 39
    },{
      id: 150,
      role_id: 3,
      permission_id: 40
    },{
      id: 151,
      role_id: 3,
      permission_id: 41
    },{
      id: 152,
      role_id: 3,
      permission_id: 45
    },{
      id: 153,
      role_id: 3,
      permission_id: 49
    },{
      id: 154,
      role_id: 3,
      permission_id: 53
    },{
      id: 155,
      role_id: 3,
      permission_id: 57
    },{
      id: 156,
      role_id: 3,
      permission_id: 58
    },{
      id: 157,
      role_id: 3,
      permission_id: 59
    },{
      id: 158,
      role_id: 3,
      permission_id: 61
    },{
      id: 159,
      role_id: 3,
      permission_id: 65
    },{
      id: 160,
      role_id: 3,
      permission_id: 69
    },{
      id: 161,
      role_id: 3,
      permission_id: 70
    },{
      id: 162,
      role_id: 3,
      permission_id: 71
    },{
      id: 163,
      role_id: 3,
      permission_id: 73
    },{
      id: 164,
      role_id: 3,
      permission_id: 74
    },{
      id: 165,
      role_id: 3,
      permission_id: 75
    },{
      id: 166,
      role_id: 3,
      permission_id: 99
    },{
      id: 167,
      role_id: 3,
      permission_id: 103
    },{
      id: 168,
      role_id: 4,               /* STUDENT */
      permission_id: 25
    },{
      id: 169,
      role_id: 4,
      permission_id: 29
    },{
      id: 170,
      role_id: 4,
      permission_id: 33
    },{
      id: 171,
      role_id: 4,
      permission_id: 37
    },{
      id: 172,
      role_id: 4,
      permission_id: 61
    },{
      id: 173,
      role_id: 4,
      permission_id: 62
    },{
      id: 174,
      role_id: 4,
      permission_id: 63
    },{
      id: 175,
      role_id: 4,
      permission_id: 77
    },{
      id: 176,
      role_id: 4,
      permission_id: 81
    },{
      id: 177,
      role_id: 4,
      permission_id: 89
    },{
      id: 178,
      role_id: 4,
      permission_id: 90
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role_permissions', { role_id: [1, 2, 3, 4] });
  }
};
