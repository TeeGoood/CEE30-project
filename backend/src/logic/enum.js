export const gameStatesEnum = [
  "waiting_player",
  "break",
  "card_select",
  "choice_select",
  "game_end",
];
export const choicesEnum = ["rock", "paper", "scissors"];
export const resultsEnum = ['player1', 'player2', 'draw'];

export const cardsEnum = {

  Paper_Loss: {
    description: "สามารถใช้เพื่อบังคับเปลี่ยนเป้าที่ฝั่งตรงข้ามออกเป็น กระดาษ",
    preSkill: function (game, player) {
      const number = player.getNumber == 1 ? 2 : 1;
      game.getPlayerByNumber(number);
      player.setAvailableChoices(
        choicesEnum.filter((choice) => choice != "paper")
      );
    },
    postSkill: function (game, player) {
      checkWinner(game);
    },
  },

  Rock_Out: {
    description: "สามารถใช้เพื่อบังคับเปลี่ยนเป้าที่ฝั่งตรงข้ามออกเป็น ค้อน",
    preSkill: function (game,player) {
      const number = player.getNumber == 1 ? 2 : 1;
      game.getPlayerByNumber(number);
      player.setAvailableChoices(
        choicesEnum.filter((choice) => choice != "rock")
      );
    },
    postSkill: function (game, player) {
      checkWinner(game);
    }
  },

  Hopecutting_Scissors: {
    description: "สามารถใช้เพื่อบังคับเปลี่ยนเป้าที่ฝั่งตรงข้ามออกเป็น กรรไกร",
    preSkill: function (game,player) {
      const number = player.getNumber == 1 ? 2 : 1;
      game.getPlayerByNumber(number);
      player.setAvailableChoices(
        choicesEnum.filter((choice) => choice != "scissors")
      );
    },
    postSkill: function (game, player) {
      checkWinner(game);
    }
  },
}