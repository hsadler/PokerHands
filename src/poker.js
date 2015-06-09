var poker = {
  // Returns the name of the input hand.
  // See the specs for the required formats.
  labelHand: function(hand) {
    var handData = poker.getHandData(hand);
    console.log(handData.toString());
  },
  getHandData: function(hand) {
    hand = hand.split(' ');
    return _.map(hand, function(card) {
      return card.split('');
    });
  },
  getCardValue: function(cardData) {
    return poker.cards.indexOf(cardData[1]);
  },
  getHighCard: function(handData) {
    // return _.reduce(handData, function(memo, cardData) {
    //   if(poker.getCardValue(cardData[1])) {}
    // }, 0);

  },

  cards: ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'],
  suites: ['H', 'D', 'C', 'S']
};
