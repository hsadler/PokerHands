var poker = {
  // Returns the name of the input hand.
  // See the specs for the required formats.
  labelHand: function(hand) {
    //short vars for methods
    var getPData = poker.getPairData;
    var getPType = poker.getPairType;
    var getHCard = poker.getHighCard;
    var messagePT = poker.messagePairType;
    var messageFT = poker.messageFlushType;
    var messageHC = poker.messageHighCard;
    var getSData = poker.getSuitData;

    //get some data
    poker.handData = poker.getHandData(hand);
    var hData = poker.handData;

    poker.pairData = getPData(hData);
    //poker.isPair; //set in .getPairType()
    poker.pairType = getPType(poker.pairData);
    var pT = poker.pairType;

    poker.suitData = getSData(hData);
    //poker.isFlush; //set in .getSuitData()

    poker.straightData = poker.getStraightData(hData);
    //poker.isStraight //set in .getStraightData()

    poker.highCard = getHCard(hData);
    var hCard = poker.highCard;

    //logging....
    // console.log(poker);
    console.log('\n' + hData.toString());
    // console.log(poker.pairData);
    console.log('is pair: ' + poker.isPair);
    // console.log(pT);
    // console.log(poker.suitData);
    console.log('is flush: ' + poker.isFlush);
    console.log('is straight: ' + poker.isStraight);
    console.log('high card: ' + hCard);

    //logic to decipher hand label
    if(poker.isStraight && poker.isFlush) {
      console.log(poker.messageStraightFlush());
      return poker.messageStraightFlush();
    } else if(poker.isStraight) {
      console.log(poker.messageStraight());
      return poker.messageStraight();
    } else if(poker.isFlush) {
      console.log(messageFT());
      return messageFT();
    } else if(poker.isPair) {
      console.log(messagePT(pT));
      return messagePT(pT);
    } else {
      console.log(messageHC(hCard));
      return messageHC(hCard);
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
    poker.isPair = (function() {
      return pairData.length < 5 ? true : false;
    })();
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
  getSuitList: function(handData) {
    return _.map(handData, function(data) {
      return data[1];
    });
  },
  getSuitData: function(handData) {
    var suitList = poker.getSuitList(handData);
    poker.isFlush = (function() {
      return _.uniq(suitList).length === 1 ? true : false;
    })();
    return suitList;
  },
  messageFlushType: function() {
    if(poker.isFlush) {
      return 'Flush with high card ' + poker.highCard[0];
    } else {
      throw 'ERROR: is not flush';
    }
  },
  getStraightData: function(handData) {
    var valList = poker.getValueList(handData);
    valList = _.map(valList, function(card) {
      return poker.getCardValue(card);
    });
    valList.sort(function(a, b) { return a - b; });

    var start = valList[0];
    var straightComp1 = _.range(start, start + 5);
    var straightComp2 = [0, 1, 2, 3, 12];
    var arraysEqual = poker.arraysAreEqual;

    poker.isStraight = (function() {
      var isStraight = false;
      if(arraysEqual(valList, straightComp1) || arraysEqual(valList, straightComp2)) {
        isStraight = true;
      }
      return isStraight;
    })();
    poker.isBottomStraight = arraysEqual(valList, straightComp2) ? true : false;
    poker.isTopStraight = arraysEqual(valList, [8, 9, 10, 11, 12]) ? true : false;
  },
  messageStraight: function() {
    if(poker.isBottomStraight) {
      return 'Straight up to 5';
    } else {
      return 'Straight up to ' + poker.highCard[0];
    }
  },
  messageStraightFlush: function() {
    if(poker.isTopStraight && poker.isFlush) {
      return 'Royal flush';
    } else if(poker.isBottomStraight) {
      return 'Straight flush up to 5';
    }
    else {
      return 'Straight flush up to ' + poker.highCard[0];
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

