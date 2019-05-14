import firebase from 'react-native-firebase';

class NotifService {

  constructor() {
    this.lastId = 0;
    this.notifStringId = 'BeauceArtId';
    this.nearSculptureNotifId = 'BeauceArtNotifNearSculpture';
    if(!this.hasPermission()){
      this.requestPermission();
    }
    this.configure();
    //this.configure(onRegister, onNotification);
  }

  configure(){
    this.configureNotificationChannel();
  }

  configureNotificationChannel(){
    // Build a channel
    const channel = new firebase.notifications.Android.Channel('beauceArtChannel', 'Beauce Art Channel', firebase.notifications.Android.Importance.Max)
    .setDescription('Beauce Art app notification channel')
    .setVibrationPattern([500]);

    // Create the channel
    firebase.notifications().android.createChannel(channel);
  }

  getNewId(){
    this.lastId++;
    return this.notifStringId + this.lastId;
  }

  localNotif(id, title, body, data){
    if(id == null)
      id = this.getNewId();

    if(data == null)
      data = {};

    const notification = new firebase.notifications.Notification()
      .setNotificationId(id)
      .setTitle(title)
      .setBody(body)
      .setData(data);
      
    notification
      .android.setChannelId('beauceArtChannel')
      .android.setSmallIcon('ic_notification');

    firebase.notifications().displayNotification(notification);
  }

  removeAllDeliveredNotifications(){
    firebase.notifications().removeAllDeliveredNotifications();
  }

  removeDeliveredNotification(notificationId){
    firebase.notifications().removeDeliveredNotification(notificationId);
  }

  async hasPermission() {
    const enabled = await firebase.messaging().hasPermission();
    return enabled;
  }

  async requestPermission() {
    let answer = true;
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
      answer = false;
    }
    return answer;
  }
}

export default NotifService;