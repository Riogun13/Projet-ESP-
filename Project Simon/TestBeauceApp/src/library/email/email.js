
import { Linking } from 'react-native';
  
export default class Email {
  constructor(){
  }
  
  static generateEmail(destinationEmail, subject, body) {
    Linking.openURL('mailto:'+destinationEmail+'?subject='+subject+'&body='+body);
  }
}