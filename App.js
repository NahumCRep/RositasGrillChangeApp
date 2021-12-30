import AppNavigation from './components/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';

import * as SQLite from 'expo-sqlite'

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => { },
        };
      },
    };
  }

  const db = SQLite.openDatabase("rositasDB.db");
  return db;
}
const db = openDatabase();
export default function App() {
    // useEffect(() => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "create table if not exists food (id text primary key not null, name text, price real, category text, combo text);"
  //     );
  //   });
  // }, []);
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}


