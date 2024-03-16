import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import HomeScreen from './Components/HomeScreen';
import Settings from './Components/Settings';
import Messages from './Components/Messages';
import Jacoszek from './Components/Jacoszek';
import Kordella from './Components/Kordella';
import Zelazkiewicz from './Components/Zelazkiewicz';
import Switalski from './Components/Switalski';
import Kozakowski from './Components/Kozakowski';
import { CustomDarkTheme, CustomLightTheme } from './Components/Theme'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EditProfile from './Components/Settings/Pages/Account/EditProfile';
import Security from './Components/Settings/Pages/Account/Security';
import Logout from './Components/Settings/Pages/Account/Logout';
import SwitchAccount from './Components/Settings/Pages/Account/SwitchAccount';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { showNotification } from './src/notification';
import tw from 'twrnc';
import { Platform } from 'react-native';
import SmsListener from '@ernestbies/react-native-android-sms-listener';
import {PermissionsAndroid } from 'react-native';
import Notifications from './Components/Settings/Pages/Notifications/Notifications';
import Push_notif from './Components/Settings/Pages/Notifications/Push-notif';
import Connected from './Components/Settings/Pages/APPS/Connected';
import Mgmt from './Components/Settings/Pages/APPS/Mgmt';

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="SettingsMain" component={Settings} options={{ headerShown: false }} />
      <SettingsStack.Screen name="EditProfile" component={EditProfile} />
      <SettingsStack.Screen name="Security" component={Security} />
      <SettingsStack.Screen name="Logout" component={Zelazkiewicz} options={{title: "Logowanie"}} />
      <SettingsStack.Screen name="SwitchAccount" component={Zelazkiewicz} />
      <SettingsStack.Screen name="Notifications" component={Notifications} />
      <SettingsStack.Screen name="Push_notif" component={Push_notif} />
      <SettingsStack.Screen name="Connected" component={Connected} />
      <SettingsStack.Screen name="Mgmt" component={Mgmt} />
    </SettingsStack.Navigator>
  );
}

const requestNotificationPermission = async () => {
  if (Platform.OS === "android") {
    try {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then(
        response => {
          if (!response) {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS, {
              title: 'Notification',
              message:
                'App needs access to your notification ' +
                'so you can get Updates',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            })
          }
        }
      ).catch(
        err => {
          console.log("Notification Error=====>", err);
        }
      )
    } catch (err) {
      console.log(err);
    }
  }
};

async function requestReadSmsPermission() {
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
    );

    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
    );
  } catch (err) { }
}

function Mrowinski() {
  const [selectedTime, setSelectedTime] = useState<string>('');
  requestNotificationPermission();

  const [receivedMessage, setReceivedMessage] = useState<SmsMessage | null>(null);

  useEffect(() => {
    requestReadSmsPermission();
    const listener = SmsListener.addListener(handleMessageReceived);

    return () => {
      listener.remove();
    };
  }, []);

  let licznik: number = 0;

  const handleMessageReceived = (message: SmsMessage) => {
    licznik = 0;
    setReceivedMessage(message);
    checkForLink(message.body);
    checkForSuspiciousWords(message.body);
    checkForVulgarWords(message.body);
    checkForLinks(message.body);
    detectSocialEngineeringAttempts(message.body);
    if(licznik > 0) {
      showNotification('Warning', 'This message is suspicious');
    }
  };

  function checkForLink(url: string): void {

    const reversed = 'ptth:/' + url.split('').reverse().join('');
    if (url.includes(reversed)) {
      licznik++;
        return;
    }

    const suspiciousStrings = ['login', 'bank', 'account', 'password', 'credential'];
    for (let i = 0; i < suspiciousStrings.length; i++) {
        if (url.includes(suspiciousStrings[i])) {
            licznik++;
            return;
        }
    }

    const shorteningServices = ['bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'ow.ly'];
    for (let i = 0; i < shorteningServices.length; i++) {
        if (url.includes(shorteningServices[i])) {
            licznik++;
            return;
        }
    }
}


  function checkForSuspiciousWords(message: string): void {
    const suspiciousWords = ['kliknij','sprawdź','login', 'bank', 'account', 'password', 'credential', 'card', 'pin'];

    for (let i = 0; i < suspiciousWords.length; i++) {
        if (message.toLowerCase().includes(suspiciousWords[i])) {
            licznik++;  
            return;
        }
    }
}

function detectSocialEngineeringAttempts(message: string): void {
  const suspiciousPhrases = [
    'podaj swoje hasło',
    'potrzebuję twoich danych logowania',
    'zaloguj się na moje konto',
    'wyślij mi pieniądze',
    'potrzebuję twojego numeru karty kredytowej',
    'to jest pilne',
    'twoje konto zostanie zablokowane',
    'twoje konto jest zagrożone',
    'musisz natychmiast zaktualizować swoje dane',
    'kliknij tutaj, aby wygrać nagrodę',
    'potrzebuję twojej pomocy finansowej',
    'sprawdź tę nagrodę, którą wygrałeś',
    'kliknij na ten link, aby uzyskać rabat',
    'kliknij tutaj, aby odebrać darmowe prezenty',
    'potrzebuję twojego potwierdzenia tożsamości',
    'twój rachunek został zawieszony',
    'twoje konto jest zagrożone',
    'musisz natychmiast zaktualizować swoje dane'
  ];  

  for (let phrase of suspiciousPhrases) {
      if (message.includes(phrase)) {
          licznik++;
          return;
      }
  }
}

function checkForVulgarWords(message: string): void {
  const vulgarWords = ['chuj','chuja', 'chujek', 'chuju', 'chujem', 'chujnia',
  'chujowy', 'chujowa', 'chujowe', 'cipa', 'cipę', 'cipe', 'cipą',
  'cipie', 'dojebać','dojebac', 'dojebie', 'dojebał', 'dojebal',
  'dojebała', 'dojebala', 'dojebałem', 'dojebalem', 'dojebałam',
  'dojebalam', 'dojebię', 'dojebie', 'dopieprzać', 'dopieprzac',
  'dopierdalać', 'dopierdalac', 'dopierdala', 'dopierdalał',
  'dopierdalal', 'dopierdalała', 'dopierdalala', 'dopierdoli',
  'dopierdolił', 'dopierdolil', 'dopierdolę', 'dopierdole', 'dopierdoli',
  'dopierdalający', 'dopierdalajacy', 'dopierdolić', 'dopierdolic',
  'dupa', 'dupie', 'dupą', 'dupcia', 'dupeczka', 'dupy', 'dupe', 'huj',
  'hujek', 'hujnia', 'huja', 'huje', 'hujem', 'huju', 'jebać', 'jebac',
  'jebał', 'jebal', 'jebie', 'jebią', 'jebia', 'jebak', 'jebaka', 'jebal',
  'jebał', 'jebany', 'jebane', 'jebanka', 'jebanko', 'jebankiem',
  'jebanymi', 'jebana', 'jebanym', 'jebanej', 'jebaną', 'jebana',
  'jebani', 'jebanych', 'jebanymi', 'jebcie', 'jebiący', 'jebiacy',
  'jebiąca', 'jebiaca', 'jebiącego', 'jebiacego', 'jebiącej', 'jebiacej',
  'jebia', 'jebią', 'jebie', 'jebię', 'jebliwy', 'jebnąć', 'jebnac',
  'jebnąc', 'jebnać', 'jebnął', 'jebnal', 'jebną', 'jebna', 'jebnęła',
  'jebnela', 'jebnie', 'jebnij', 'jebut', 'koorwa', 'kórwa', 'kurestwo',
  'kurew', 'kurewski', 'kurewska', 'kurewskiej', 'kurewską', 'kurewska',
  'kurewsko', 'kurewstwo', 'kurwa', 'kurwaa', 'kurwami', 'kurwą', 'kurwe',
  'kurwę', 'kurwie', 'kurwiska', 'kurwo', 'kurwy', 'kurwach', 'kurwami',
  'kurewski', 'kurwiarz', 'kurwiący', 'kurwica', 'kurwić', 'kurwic',
  'kurwidołek', 'kurwik', 'kurwiki', 'kurwiszcze', 'kurwiszon',
  'kurwiszona', 'kurwiszonem', 'kurwiszony', 'kutas', 'kutasa', 'kutasie',
  'kutasem', 'kutasy', 'kutasów', 'kutasow', 'kutasach', 'kutasami',
  'matkojebca', 'matkojebcy', 'matkojebcą', 'matkojebca', 'matkojebcami',
  'matkojebcach', 'nabarłożyć', 'najebać', 'najebac', 'najebał',
  'najebal', 'najebała', 'najebala', 'najebane', 'najebany', 'najebaną',
  'najebana', 'najebie', 'najebią', 'najebia', 'naopierdalać',
  'naopierdalac', 'naopierdalał', 'naopierdalal', 'naopierdalała',
  'naopierdalala', 'naopierdalała', 'napierdalać', 'napierdalac',
  'napierdalający', 'napierdalajacy', 'napierdolić', 'napierdolic',
  'nawpierdalać', 'nawpierdalac', 'nawpierdalał', 'nawpierdalal',
  'nawpierdalała', 'nawpierdalala', 'obsrywać', 'obsrywac', 'obsrywający',
  'obsrywajacy', 'odpieprzać', 'odpieprzac', 'odpieprzy', 'odpieprzył',
  'odpieprzyl', 'odpieprzyła', 'odpieprzyla', 'odpierdalać',
  'odpierdalac', 'odpierdol', 'odpierdolił', 'odpierdolil',
  'odpierdoliła', 'odpierdolila', 'odpierdoli', 'odpierdalający',
  'odpierdalajacy', 'odpierdalająca', 'odpierdalajaca', 'odpierdolić',
  'odpierdolic', 'odpierdoli', 'odpierdolił', 'opieprzający',
  'opierdalać', 'opierdalac', 'opierdala', 'opierdalający',
  'opierdalajacy', 'opierdol', 'opierdolić', 'opierdolic', 'opierdoli',
  'opierdolą', 'opierdola', 'piczka', 'pieprznięty', 'pieprzniety',
  'pieprzony', 'pierdel', 'pierdlu', 'pierdolą', 'pierdola', 'pierdolący',
  'pierdolacy', 'pierdoląca', 'pierdolaca', 'pierdol', 'pierdole',
  'pierdolenie', 'pierdoleniem', 'pierdoleniu', 'pierdolę', 'pierdolec',
  'pierdola', 'pierdolą', 'pierdolić', 'pierdolicie', 'pierdolic',
  'pierdolił', 'pierdolil', 'pierdoliła', 'pierdolila', 'pierdoli',
  'pierdolnięty', 'pierdolniety', 'pierdolisz', 'pierdolnąć',
  'pierdolnac', 'pierdolnął', 'pierdolnal', 'pierdolnęła', 'pierdolnela',
  'pierdolnie', 'pierdolnięty', 'pierdolnij', 'pierdolnik', 'pierdolona',
  'pierdolone', 'pierdolony', 'pierdołki', 'pierdzący', 'pierdzieć',
  'pierdziec', 'pizda', 'pizdą', 'pizde', 'pizdę', 'piździe', 'pizdzie',
  'pizdnąć', 'pizdnac', 'pizdu', 'podpierdalać', 'podpierdalac',
  'podpierdala', 'podpierdalający', 'podpierdalajacy', 'podpierdolić',
  'podpierdolic', 'podpierdoli', 'pojeb', 'pojeba', 'pojebami',
  'pojebani', 'pojebanego', 'pojebanemu', 'pojebani', 'pojebany',
  'pojebanych', 'pojebanym', 'pojebanymi', 'pojebem', 'pojebać',
  'pojebac', 'pojebalo', 'popierdala', 'popierdalac', 'popierdalać',
  'popierdolić', 'popierdolic', 'popierdoli', 'popierdolonego',
  'popierdolonemu', 'popierdolonym', 'popierdolone', 'popierdoleni',
  'popierdolony', 'porozpierdalać', 'porozpierdala', 'porozpierdalac',
  'poruchac', 'poruchać', 'przejebać', 'przejebane', 'przejebac',
  'przyjebali', 'przepierdalać', 'przepierdalac', 'przepierdala',
  'przepierdalający', 'przepierdalajacy', 'przepierdalająca',
  'przepierdalajaca', 'przepierdolić', 'przepierdolic', 'przyjebać',
  'przyjebac', 'przyjebie', 'przyjebała', 'przyjebala', 'przyjebał',
  'przyjebal', 'przypieprzać', 'przypieprzac', 'przypieprzający',
  'przypieprzajacy', 'przypieprzająca', 'przypieprzajaca',
  'przypierdalać', 'przypierdalac', 'przypierdala', 'przypierdoli',
  'przypierdalający', 'przypierdalajacy', 'przypierdolić',
  'przypierdolic', 'qrwa', 'rozjebać', 'rozjebac', 'rozjebie',
  'rozjebała', 'rozjebią', 'rozpierdalać', 'rozpierdalac', 'rozpierdala',
  'rozpierdolić', 'rozpierdolic', 'rozpierdole', 'rozpierdoli',
  'rozpierducha', 'skurwić', 'skurwiel', 'skurwiela', 'skurwielem',
  'skurwielu', 'skurwysyn', 'skurwysynów', 'skurwysynow', 'skurwysyna',
  'skurwysynem', 'skurwysynu', 'skurwysyny', 'skurwysyński',
  'skurwysynski', 'skurwysyństwo', 'skurwysynstwo', 'spieprzać',
  'spieprzac', 'spieprza', 'spieprzaj', 'spieprzajcie', 'spieprzają',
  'spieprzaja', 'spieprzający', 'spieprzajacy', 'spieprzająca',
  'spieprzajaca', 'spierdalać', 'spierdalac', 'spierdala', 'spierdalał',
  'spierdalała', 'spierdalal', 'spierdalalcie', 'spierdalala',
  'spierdalający', 'spierdalajacy', 'spierdolić', 'spierdolic',
  'spierdoli', 'spierdoliła', 'spierdoliło', 'spierdolą', 'spierdola',
  'srać', 'srac', 'srający', 'srajacy', 'srając', 'srajac', 'sraj',
  'sukinsyn', 'sukinsyny', 'sukinsynom', 'sukinsynowi', 'sukinsynów',
  'sukinsynow', 'śmierdziel', 'udupić', 'ujebać', 'ujebac', 'ujebał',
  'ujebal', 'ujebana', 'ujebany', 'ujebie', 'ujebała', 'ujebala',
  'upierdalać', 'upierdalac', 'upierdala', 'upierdoli', 'upierdolić',
  'upierdolic', 'upierdoli', 'upierdolą', 'upierdola', 'upierdoleni',
  'wjebać', 'wjebac', 'wjebie', 'wjebią', 'wjebia', 'wjebiemy',
  'wjebiecie', 'wkurwiać', 'wkurwiac', 'wkurwi', 'wkurwia', 'wkurwiał',
  'wkurwial', 'wkurwiający', 'wkurwiajacy', 'wkurwiająca', 'wkurwiajaca',
  'wkurwić', 'wkurwic', 'wkurwi', 'wkurwiacie', 'wkurwiają', 'wkurwiali',
  'wkurwią', 'wkurwia', 'wkurwimy', 'wkurwicie', 'wkurwiacie', 'wkurwić',
  'wkurwic', 'wkurwia', 'wpierdalać', 'wpierdalac', 'wpierdalający',
  'wpierdalajacy', 'wpierdol', 'wpierdolić', 'wpierdolic', 'wpizdu',
  'wyjebać', 'wyjebac', 'wyjebali', 'wyjebał', 'wyjebac', 'wyjebała',
  'wyjebały', 'wyjebie', 'wyjebią', 'wyjebia', 'wyjebiesz', 'wyjebie',
  'wyjebiecie', 'wyjebiemy', 'wypieprzać', 'wypieprzac', 'wypieprza',
  'wypieprzał', 'wypieprzal', 'wypieprzała', 'wypieprzala', 'wypieprzy',
  'wypieprzyła', 'wypieprzyla', 'wypieprzył', 'wypieprzyl', 'wypierdal',
  'wypierdalać', 'wypierdalac', 'wypierdala', 'wypierdalaj',
  'wypierdalał', 'wypierdalal', 'wypierdalała', 'wypierdalala',
  'wypierdalać', 'wypierdolić', 'wypierdolic', 'wypierdoli',
  'wypierdolimy', 'wypierdolicie', 'wypierdolą', 'wypierdola',
  'wypierdolili', 'wypierdolił', 'wypierdolil', 'wypierdoliła',
  'wypierdolila', 'zajebać', 'zajebac', 'zajebie', 'zajebią', 'zajebia',
  'zajebiał', 'zajebial', 'zajebała', 'zajebiala', 'zajebali', 'zajebana',
  'zajebani', 'zajebane', 'zajebany', 'zajebanych', 'zajebanym',
  'zajebanymi', 'zajebiste', 'zajebisty', 'zajebistych', 'zajebista',
  'zajebistym', 'zajebistymi', 'zajebiście', 'zajebiscie', 'zapieprzyć',
  'zapieprzyc', 'zapieprzy', 'zapieprzył', 'zapieprzyl', 'zapieprzyła',
  'zapieprzyla', 'zapieprzą', 'zapieprza', 'zapieprzy', 'zapieprzymy',
  'zapieprzycie', 'zapieprzysz', 'zapierdala', 'zapierdalać',
  'zapierdalac', 'zapierdalaja', 'zapierdalał', 'zapierdalaj',
  'zapierdalajcie', 'zapierdalała', 'zapierdalala', 'zapierdalali',
  'zapierdalający', 'zapierdalajacy', 'zapierdolić', 'zapierdolic',
  'zapierdoli', 'zapierdolił', 'zapierdolil', 'zapierdoliła',
  'zapierdolila', 'zapierdolą', 'zapierdola', 'zapierniczać',
  'zapierniczający', 'zasrać', 'zasranym', 'zasrywać', 'zasrywający',
  'zesrywać', 'zesrywający', 'zjebać', 'zjebac', 'zjebał', 'zjebal',
  'zjebała', 'zjebala', 'zjebana', 'zjebią', 'zjebali', 'zjeby'];
  

  for (let word of vulgarWords) {
      if (message.includes(word)) {
          licznik++;
          return;
      }
  }

}

const checkForLinks = (message: string): void => {
  const PopularLinks = [
    'google.com',
    'facebook.com',
    'youtube.com',
    'wp.pl',
    'google.pl',
    'onet.pl',
    'allegro.pl',
    'interia.pl',
    'wikipedia.org',
    'olx.pl',
    'gazeta.pl',
    'o2.pl',
    'instagram.com',
    'ceneo.pl',
    'tvn24.pl',
    'pudelek.pl',
    'cda.pl',
    'netflix.com',
    'librus.pl',
    'wyborcza.pl',
    'money.pl',
    'otomoto.pl',
    'twitter.com',
    'filmweb.pl',
    'wykop.pl',
    'fakt.pl',
    'sport.onet.pl',
    'businessinsider.com.pl',
    'sport.pl',
    'ipko.pl',
    'medonet.pl',
    'vulcan.net.pl',
    'radiozet.pl',
    'naszemiasto.pl',
    'google.com.br',
    'jbzd.com.pl',
    'plotek.pl',
    'tvp.pl',
    'pomponik.pl',
    'mbank.pl',
    'abczdrowie.pl',
    'plejada.pl',
    'flashscore.pl',
    'sport.interia.pl',
    'aliexpress.com',
    'demotywatory.pl',
    'onnetwork.tv',
    'pikio.pl',
    'ingbank.pl',
    'mediaexpert.pl',
    'poradnikzdrowie.pl',
    'otodom.pl',
    'messenger.com',
    'play.pl',
    'lotto.pl',
    'gemius.pl',
    'linkedin.com',
    'pepper.pl',
    'ing.pl',
    'booking.com',
    'centrum24.pl',
    'mp.pl',
    'dobreprogramy.pl',
    'pracuj.pl',
    'bankier.pl',
    'euro.com.pl',
    'pinterest.com',
    'twitch.tv',
    'meczyki.pl',
    'zalando.pl',
    'plus.pl',
    'wprost.pl',
    'datezone.com',
    'poczta-polska.pl',
    'komputerswiat.pl',
    'finanse.wp.pl',
    'vod.pl',
    'telemagazyn.pl',
    'sprzedajemy.pl',
    'pekao24.pl',
    't-mobile.pl',
    'gemius.com',
    'kwejk.pl',
    'yahoo.com',
    'elektroda.pl',
    'brainly.pl',
    'zalukaj.com',
    'orange.pl',
    'auto-swiat.pl',
    'meteo.pl',
    'doz.pl'
];

  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const links = message.match(urlRegex);

  if (!links) {
      return;
  }

  const linkWithoutProtocol = links.map(link => link.replace('https://', '')).join(' ');

  for (let link of links) {
      if (!PopularLinks.includes(linkWithoutProtocol)) {
          licznik++;
          return;
      }  
}

}

 
}

const Tab = createBottomTabNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const scheme = useColorScheme(); // Use color scheme for theme

  useEffect(() => {
    // Change the state after 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // Show the loading screen without navigation bar and footer
    return <Kordella />;
  }

  // Once loading is complete, render the navigation container
  return (
    <NavigationContainer theme={scheme === 'dark' ? CustomDarkTheme : CustomLightTheme}>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Strona Główna',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen name="Nadzór Wiadomości" component={Switalski} options={{
          title: 'Nadzór Wiadomości',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="message" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name="Assistant" component={Jacoszek} options={{
          title: 'Asystent',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="assistant" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name="Options" component={SettingsStackScreen} options={{
          title: 'Ustawienia',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
