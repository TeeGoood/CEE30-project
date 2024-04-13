import { checkWinner } from "./utilities";

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
    description: "สามารถใช้เพื่อบังคับเปลี่ยนเป้าที่ฝั่งตรงข้ามออกเป็น'กระดาษ'",
    preSkill: function (game, player) {
      const number = player.getNumber() == 1 ? 2 : 1;
      opponent = game.getPlayerByNumber(number);
      opponent.setAvailableChoices(
        choicesEnum.filter((choice) => choice != "paper")
      );
    },
    postSkill: function (game, player) {
      checkWinner(game);
    },
  },

  Rock_Out: {
    description: "สามารถใช้เพื่อบังคับเปลี่ยนเป้าที่ฝั่งตรงข้ามออกเป็น'ค้อน'",
    preSkill: function (game,player) {
      const number = player.getNumber() == 1 ? 2 : 1;
      opponent = game.getPlayerByNumber(number);
      opponent.setAvailableChoices(
        choicesEnum.filter((choice) => choice != "rock")
      );
    },
    postSkill: function (game, player) {
      checkWinner(game);
    }
  },

  Hopecutting_Scissors: {
    description: "สามารถใช้เพื่อบังคับเปลี่ยนเป้าที่ฝั่งตรงข้ามออกเป็น'กรรไกร'",
    preSkill: function (game,player) {
      const number = player.getNumber() == 1 ? 2 : 1;
      opponent = game.getPlayerByNumber(number);
      opponent.setAvailableChoices(
        choicesEnum.filter((choice) => choice != "scissors")
      );
    },
    postSkill: function (game, player) {
      checkWinner(game);
    }
  },

  OneMoreTime: {
    description: "สามารถใช้เพื่อให้ฝั่งตรงข้ามไม่ได้แต้ม หากเขาเป่าชนะในตานี้",
    preSkill: function (game,player) {
      
    },
    postSkill: function (game,player) {
      const number = player.getNumber() == 1 ? 2 : 1;
      opponent = game.getPlayerByNumber(number)
      oppo_ch = opponent.getChoice();
      player_ch = player.getChoice();
      if (
        (oppo_ch === "rock" && player_ch === "scissors") ||
        (oppo_ch === "paper" && player_ch === "rock") ||
        (oppo_ch === "scissors" && player_ch === "paper")
      ) {
        // set ให้ฝั่งตรงข้ามออกช้อยเดียวกันเพื่อให้ฝั่งตรงข้ามไม่ได้แต้มตอนคิดคะแนน
        opponent.setChoice(player_ch);
      }
      checkWinner(game);
    }
  },

  Makeit_Or_Breakit: {
    description: "ผู้ชนะในตานี้จะได้รับ 2 แต้ม",
    preSkill: function (game,player) {
      
    },
    postSkill: function (game,player) {
      const number = player.getNumber() == 1 ? 2 : 1;
      opponent = game.getPlayerByNumber(number)
      prescore_oppo = opponent.getScore();
      prescore_player = player.getScore();
      checkWinner(game);
      if (player.getScore() > prescore_player) {
        player.setScore(player.getScore() + 1);
      } else (opponent.getScore() > prescore_oppo) {
        opponent.setScore(opponent.getScore() + 1);
      }
    }
  },

  Rock_You: {
    description: "สามารถใช้เพื่อให้ฝั่งตรงข้ามไม่ได้คะแนน หากเขาเป่าชนะด้วย'ค้อน'",
    preSkill: function (game,player) {

    },
    postSkill: function (game,player) {
      const number = player.getNumber() == 1 ? 2 : 1;
      opponent = game.getPlayerByNumber(number)
      prescore_oppo = opponent.getScore();
      checkWinner(game);
      if (opponent.getScore() > prescore_oppo && opponent.getChoice() == "rock") {
        opponent.setScore(prescore_oppo);
      }
    }
  },

  Paper_Cut: {
    description: "สามารถใช้เพื่อให้ฝั่งตรงข้ามไม่ได้คะแนน หากเขาเป่าชนะด้วย'กระดาษ'",
    preSkill: function(game,player) {

    },
    postSkill: function(game,player) {
      const number = player.getNumber() == 1 ? 2 : 1;
      opponent = game.getPlayerByNumber(number)
      prescore_oppo = opponent.getScore();
      checkWinner(game);
      if (opponent.getScore() > prescore_oppo && opponent.getChoice() == "paper") {
        opponent.setScore(prescore_oppo);
      }
    }
  },

  Snipping_Victory: {
    description: "สามารถใช้เพื่อให้ฝั่งตรงข้ามไม่ได้คะแนน หากเขาเป่าชนะด้วย'กรรไกร'",
    preSkill: function(game,player) {

    },
    postSkill: function(game,player) {
      const number = player.getNumber() == 1 ? 2 : 1;
      opponent = game.getPlayerByNumber(number)
      prescore_oppo = opponent.getScore();
      checkWinner(game);
      if (opponent.getScore() > prescore_oppo && opponent.getChoice() == "scissors") {
        opponent.setScore(prescore_oppo);
      }
    }
  },
}