import Firebase from 'react-native-firebase';

var emitter = require('tiny-emitter/instance');

module.exports = emitter;

// emitter.on('onSculptureCollectionUpdate', function (sculptures) {
//   console.log("onSculptureCollectionUpdate", sculptures);
// });

let sculptures = null;
let sculpturesRef = Firebase.firestore().collection('Sculpture');
let sculpturesSubscribe = null;

onSculptureCollectionUpdate = (querySnapshot) => {
  const mySculptures = {};
  querySnapshot.forEach((doc) => {
    if(typeof mySculptures[doc.data().Thematic.Year] === "undefined"){
      mySculptures[doc.data().Thematic.Year] = {};
    }
    mySculptures[doc.data().Thematic.Year][doc._ref._documentPath._parts[1]] = doc.data();
  });
  sculptures = mySculptures;
  emitter.emit('onSculptureCollectionUpdate', sculptures);
}

function subscription(){
  if(typeof subscription.subscribe == 'undefined'){
    sculpturesSubscribe = sculpturesRef.onSnapshot(onSculptureCollectionUpdate);
    subscription.subscribe = true;
  }
}

subscription();