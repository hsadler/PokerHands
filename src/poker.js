var poker = {
  // Returns the name of the input hand.
  // See the specs for the required formats.
  labelHand: function(hand) {
    //short vars for methods
    var getPData = poker.getPairData;
    var getPType = poker.getPairType;
    var messagePT = poker.messagePairType;

    //get some data
    poker.handData = poker.getHandData(hand);
    poker.pairData = getPData(poker.handData);
    poker.pairType = getPType(poker.pairData);

    console.log(poker.handData.toString());
    // console.log(poker.pairData);
    // console.log(poker.pairType);

    //logic to decipher hand label
    //refactor for no repitition, create isPair boolean...
    var pT = poker.pairType;
    if(pT === 'Four of a kind') {
      console.log(messagePT(pT));
      return messagePT(pT);
    }
    else if(pT === 'Full house') {
      console.log(messagePT(pT));
      return messagePT(pT);
    }
    else if(pT === 'Three of kind') {
      console.log(messagePT(pT));
      return messagePT(pT);
    }
    else if(pT === 'Two pair') {
      console.log(messagePT(pT));
      return messagePT(pT);
    }
    else if(pT === 'Pair') {
      console.log(messagePT(pT));
      return messagePT(pT);
    }
    else {
      var highCard = poker.getHighCard(poker.handData);
      return poker.messageHighCard(highCard);
    }
  },
  getHandData: function(hand) {
    hand = hand.split(' ');
    return _.map(hand, function(card) {
      return card.split('');
    });
  },
  getPairData: function(handData) {
    var values = poker.getValueList(handData).sort();
    var splitVals = [];
    var currVal = [];
    _.each(values, function(val, index, coll) {
      if(index === 0) {
        currVal.push(val);
      } else {
        if(val === coll[index - 1]) {
          currVal.push(val);
          if(index === handData.length - 1) {
            splitVals.push(currVal);
          }
        } else {
          splitVals.push(currVal);
          currVal = [val];
          if(index === handData.length - 1) {
            splitVals.push(currVal);
          }
        }
      }
    });
    var pairData = _.map(splitVals, function(valArr) {
      return [valArr.length, valArr[0]];
    });
    return pairData.sort();
  },
  getCardValue: function(cardData) {
    return poker.cards.indexOf(cardData[0]);
  },
  getValueList: function(handData) {
    return _.map(handData, function(card) {
      return card[0];
    });
  },
  getPairType: function(pairData) {
    pairData = _.map(pairData, function(data) {
      return data[0];
    });
    var eq = poker.arraysAreEqual;
    if(eq(pairData, [1, 1, 1, 1, 1])) return 'No pair';
    else if(eq(pairData, [1, 1, 1, 2])) return 'Pair';
    else if(eq(pairData, [1, 2, 2])) return 'Two pair';
    else if(eq(pairData, [1, 1, 3])) return 'Three of kind';
    else if(eq(pairData, [2, 3])) return 'Full house';
    else if(eq(pairData, [1, 4])) return 'Four of a kind';
  },
  messagePairType: function(pairData) {
    var defCard1 = poker.pairData[poker.pairData.length - 1][1];
    var defCard2 = poker.pairData[poker.pairData.length - 2][1];
    if(poker.pairType === 'Two pair') {
      return poker.pairType + ' of ' + defCard1 + ' and ' + defCard2;
    }
    else {
      return poker.pairType + ' of ' + defCard1;
    }
  },
  getHighCard: function(handData) {
    var cVal = poker.getCardValue;
    return _.reduce(handData, function(memo, cardData) {
      if(cVal(cardData) > cVal(memo)) {
        memo = cardData;
        return memo;
      } else return memo;
    }, ['2', null]);
  },
  messageHighCard: function(cardData) {
    console.log(cardData[0] + ' High');
    return cardData[0] + ' High';
  },


  // cards formatted ['9', 'H'] etc.
  cards: ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'],
  suites: ['H', 'D', 'C', 'S'],
  //utility functions
  arraysAreEqual: function(arr1, arr2) {
    var test = true;
    _.each(arr1, function(el, index) {
      if(el !== arr2[index]) {
        test = false;
      }
    });
    return test;
  }
};

